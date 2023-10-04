---
title: "Sep 29 Incident Update: Read-Only Repls"
author: Luis Héctor Chávez
date: 2023-10-04T00:00:00Z
categories: infra
---

On Sep 29, we had a period of about 2.5h from 14:00 to 16:30 (Pacific Time), in which an incomplete build was pushed to our infrastructure that handles storing Repl data. This caused Repls opened during that time window to become read-only or stop working. Any Repl not opened during that timeframe was not affected. We have addressed the root cause, recovered 98% of the affected Repls, and continue to work on recovering the remaining 2%. We understand that your data not being available is unacceptable for both you and your users. This post summarizes what happened and what we're doing to improve Replit so that this does not happen again.


## Technical details

Here is the timeline of what happened, all times in Pacific Time:

* On July 19, we released a new [storage system](https://blog.replit.com/replit-storage-the-next-generation). This works by recording "manifests" that represent snapshots of the filesystem at a specific point in time, and the manifests point at blocks that contain the users' data. This enables fast and efficient Repl forking. 
* To improve that system, we’ve been working on a change to make obtaining filesystems and saving changes faster by batching commits and executing them asynchronously. This change was being vetted in a test cluster and we were diagnosing failure modes with writing manifests and running garbage collection that caused data corruption.
* On Sep 29 at 14:00, as part of attempting to deploy additional logging statements to the test cluster, the new (unfinished) feature was inadvertently deployed to production clusters. This is when the outage began. Any Repl loaded with this build could have potentially been put into an error state showing “read only filesystem” or other I/O errors.
* After being alerted to the issue through our monitoring, we immediately began rolling back. By 16:30 there were no faulty builds of the storage infrastructure in production. From this point forward no new Repls were affected.
* Recognizing the severity of the issue, we began a 24/7 recovery rotation.
* At 17:30 we manually repaired the filesystems of official templates. All new Repls created from scratch from this point forward were unaffected.
* The engineering team worked throughout the weekend to figure out a good process to recover the Repls from backups with minimal or no data loss.
* On Sep 30 at 02:30, a first batch of the recovery process started running, and it was able to recover 30% of the affected Repls by the time it finished running at 19:10.
* In parallel, the team was working on two tasks: recovering objects from a backup system, and working on additional versions of the recovery process that ran faster and were able to recover more Repls.
* On Sep 30 at 20:30, the second iteration of the recovery process was able to restore 70% of the affected Repls.
* On Oct 1 at 07:30, a third iteration of the recovery process was able to restore 81% of the affected Repls.
* On Oct 2 at 13:30, a fourth iteration of the recovery process was able to restore 86% of the affected Repls.
* On Oct 2 at 19:00 a fifth iteration of the recovery process was able to restore 98% of the affected Repls.
* The team is continuing to work on restoring the remaining 2% of Repls. If you are affected, reach out to [support@replit.com](mailto:support@replit.com) or [https://report-read-only-repls.replit.app/](https://report-read-only-repls.replit.app/) with a link to your Repl and we can give you more detailed updates.

## What are the next steps for Replit?

The bug that triggered the incident has been fixed, but we’re making changes so that we don't run into the same or similar issues in the future: The root cause was that a change was inadvertently deployed to production clusters due to a lack of guardrails around deployments, so that's where most of our efforts are going towards. We are taking several actions:

* We're adding automated canary analysis to prevent changes with anomalous behavior from progressing from staging into production.
* We’re adjusting the speed at which storage infrastructure is deployed, so that a faulty build is unable to have widespread impact.
* In addition, we're updating the backup system to our storage solution that allows us to recover data faster and at more granular levels.


## What if my Repl is still affected?

If your Repl is in the remaining 2.5% of affected Repls which have not yet been restored, you can email [support@replit.com](mailto:support@replit.com) or [https://report-read-only-repls.replit.app/](https://report-read-only-repls.replit.app/) with a link to your Repl(s) and we’ll give you more detailed updates as we work towards our goal of 100% restoration.