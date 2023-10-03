---
title: "Speeding up Deployments with Lazy Image Streaming"
author: Connor Brewster
date: 2023-09-06
cover: https://blog.replit.com/images/deployments-image-streaming/lazy_header.png
categories: news,product
---

![](https://blog.replit.com/images/deployments-image-streaming/lazy_header.png)


Replit Deployments is our new offering that allows you to quickly go from idea, to code, to production. To make the experience as seamless as possible, we built tooling to convert a Repl into a container imager which can be deployed to either a Google Cloud Virtual Machine or to Cloud Run. Early on, we started to hit some issues with large images taking too long to deploy to a virtual machine. It could take minutes to pull and unpack the container image before it could be started. There’s two angles of attack: reduce the image size or speed up the pulling of images. It's preferable to shrink the container image size; however, that is not always possible. In this post we’ll go into some of the technologies and approaches used to speed up image pulling/booting.


## What is a container image?

First, we’ll need to establish some baseline knowledge around container images. If you already know the details, you can skip this section.

At a high level, a container image provides both a root filesystem and configuration for running a containerized workload. Inside the container, the filesystem is mounted to the root directory `/`. The root filesystem is stored as a list of multiple compressed tarballs, called layers, which are overlaid on top of each other. That is, if two layers have the same file, layers later in the list have higher precedence and their files replace the files from lower layers.

Here is a simplified view of what an image manifest looks like. It contains a list of layers which point to compressed tarball layers that comprise the root filesystem of the container.
![Simplified diagram of container image manifest format](../static/images/deployments-image-streaming/manifest.svg)

To start a container, you must first pull and unpack the image. This is done by querying the registry for the image’s manifest. The manifest contains metadata about the image and references to the layers that make up the root filesystem. The layers are then downloaded locally as part of the pull phase. Unpacking the layers depends on the backend being used, but the most common one is [overlay2](https://docs.docker.com/storage/storagedriver/overlayfs-driver/#how-the-overlay2-driver-works). This backend uses [OverlayFS](https://docs.kernel.org/filesystems/overlayfs.html), a special filesystem built into the Linux kernel, which allows each layer to be overlaid on top of the previous layer. If a file is present in both an upper and lower layer, the file in the upper layer "wins" and is the file that is accessible in the overlaid filesystem.

The process of downloading and unpacking large images is slow for a couple of reasons: The most obvious one is that it's network bound. Additionally, decompressing the layers can be CPU intensive. On small VMs with shared CPUs, CPU utilization can become a big issue since shared CPU VM offerings typically throttle the CPU after enough sustained usage.

![basic timeline of container cold boot where layers must be downloaded before the container starts](../static/images/deployments-image-streaming/download-before.svg)

Again, the best solution to improve image pulling speeds is to make the image smaller. Use slimmer base images and don’t copy files you don’t need, there’s many resources online on how to optimize depending on which tools and languages you are using. However, in our case, we want to avoid making the user write optimized Dockerfiles and we want to be general enough to deploy any Repl. While we continue to optimize the image size, it became clear that optimizing image pulling may be a faster approach to get improved deployment times.


## Lazy Image Streaming

In practice, containers don’t use all of the files in the image’s file system. Yet, normally, the container cannot start until the full filesystem is pulled and unpacked. What if we could start the container before the image was fully downloaded? It turns out that this is possible and there are many different projects implementing this. Most of these projects utilize a special “filesystem” in the linux kernel called [FUSE (Filesystem in Userspace)](https://en.wikipedia.org/wiki/Filesystem_in_Userspace#:~:text=Filesystem%20in%20Userspace%20(FUSE)%20is,systems%20without%20editing%20kernel%20code). This feature allows user-space processes to implement the filesystem. The kernel will forward all filesystem requests to the FUSE process which will then handle the request.

FUSE allows decoupling the container’s root file system from downloading the file system itself. As file system requests are made (i.e. readdir/open/read) the FUSE process can download the files and directory metadata on demand instead of needing them up-front. However, compressed tarballs do not provide random access to the files inside. This is a problem if we want to pull files on demand. To address this problem, there are a couple of approaches: convert the image into a format that is seekable or push additional metadata that makes existing images seekable. These are the approaches taken by the eStargz Snapshotter and the SOCI snapshotter, respectively.

To go back to our earlier diagram, with FUSE, our container startup can look like this. First we download some table of contents (TOC), then we can start the container and continue to download the layers in the background:
![improved timeline where only a table of contents needs to be downloaded before the container starts](../static/images/deployments-image-streaming/download-after.svg)

## Stargz Snapshotter

The first lazy image streaming solution we looked at was [stargz snapshotter](https://github.com/containerd/stargz-snapshotter). This snapshotter requires container images to be stored in the container registry in a special, eStargz, format which is more seekable than traditional container images. eStargz stands for "extended seekable .tar.gz". This format produces a compressed tarball which is seekable while still being compatible with existing .tar.gz extractors.

The eStargz format is seekable through a couple of tricks:

* Each file is individually compressed and then concatenated together, as both tar and gz format support concatenation. This allows each file to be individually decompressed.
* A table of contents is included in a known location which allows the snapshotter to find the location of any file inside the layer without needing to read the whole layer.

Read more details about the eStargz format [here](https://github.com/containerd/stargz-snapshotter/blob/main/docs/estargz.md).

With this format, a FUSE filesystem can fetch the table of contents of each layer and construct a small database of file metadata for the container's root filesystem. When files are read, the filesystem can load each file individually by using <code>[Range](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range)</code> requests to the container registry. In the background the filesystem can also continue to download files even if they haven’t been accessed yet to help speed up runtime in case those files are needed in the future.

The main drawback of the stargz snapshotter is that it requires modifying the container images themselves. So it is not directly compatible with existing container images. While it is great that stargz images are compatible with regular runtimes, you will still likely need to run a conversion step. Additionally, compressing each file individually leads to worse compression ratios and can result in larger images, especially if the filesystem contains many small files.


### SOCI Snapshotter

Some folks were not satisfied with having to convert all container images to this new format in order to take advantage of lazy streaming. The [SOCI snapshotter](https://github.com/awslabs/soci-snapshotter) is a fork of the stargz snapshotter from AWS Labs. SOCI (Seekable OCI) stores additional metadata in the container registry next to the container images themselves which provide the needed metadata to seek into a traditional OCI container image. This approach requires no modification to the original image.

So how do we seek into a .tar.gz without changing the format?

First, we still need a table of contents, this is the easy part: You can read the whole layer and record all the files present in the layer and their metadata. However, we still need a way to randomly access these files from the compressed layer.

SOCI uses [“zTOC”s](https://github.com/awslabs/soci-snapshotter/blob/main/docs/glossary.md) (gzip table of contents) to provide resumable checkpoints in the gzip stream and a table of contents of the underlying tarball. Gzip [de]compression is stateful and relies on a sliding window of the decompressed data when [de]compressing. The zTOC records all the states of the decompression at multiple checkpoints within the compressed stream and it includes the offset in both the compressed and decompressed views of the payload. To decompress a portion of the stream, you only need to restore the state of the decompressor at one of the checkpoints and continue decompression. If you’re curious about how this works, check out our [implementation of zTOC generation](http://github.com/replit/ztoc-rs/).

To randomly access a file, the file can be located from the table of contents which will include the location of the file in the decompressed payload. Using the offset of the file and the zTOC, the bookend gzip checkpoints can be located and only the portion of the layer between those checkpoints needs to be downloaded.

With zTOCs, SOCI can acheive the same functionality as the stargz snapshotter but without requiring image modification or a reduction in compression ratio.

We decided to go with this approach because we liked that we could try this out without needing to alter our existing images and that we could avoid individually compressing every file sine our images may contain many small files.

## Tradeoffs

Lazy image streaming comes with some trade-offs, the main one is that FUSE is much slower than a normal filesystem. Each filesystem operation must go from userspace, to kernel space, to userspace (FUSE daemon), to kernel space, and finally back to userspace. This overhead is incurred on every filesystem operation. So while your container may have faster cold start times, the performance at runtime may be worse if the application is relying on heavy use of the container's root file system. Always perform your own testing to see if this tradeoff is worthwhile for your application.

## Results

Without lazy image streaming enabled, it used to take 3-4 minutes for some Repls to cold boot in the VM. With SOCI snapshotter enabled, we can now cold boot the container in under 30 seconds even on small VMs with a small number of vCPUs.

Cloud Run deployments also benefit from a similar technology that Google has developed which also provides image streaming transparently for images hosted by Artifact Registry. This same feature can be enabled for Google Kubernetes Engine (GKE), you can read more about that [here](https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming).

Utilizing image streaming, we were able to cut over 3 minutes from Repl deployment times. We’ll continue to optimize our image building process and deployment flow to make deployments even faster in the future.

## Come work with us

If diving deep into the layers of containers, microVMs, and the Linux kernel is your thing, consider [working with us](https://replit.com/site/careers) to build the best platform for going from idea, to code, to production.