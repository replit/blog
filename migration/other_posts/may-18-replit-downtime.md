---
title: May 18 Replit downtime
author: Luis Héctor Chávez
date: 2023-05-20T00:30:00.000Z
categories: infra
---
Yesterday, we had a period of about 2h from 11:45 to 13:56 (Pacific Time) in which all users were unable to access their Repls through the site. We have addressed the root cause, and the system is now operating normally. We know a two-hour downtime is not acceptable for you or your users. This post summarizes what happened and what we're doing to improve Replit so that this does not happen again.

# Technical details

Here is the timeline of what happened, all times in Pacific Time:
* In 2021, we changed the way that configuration is pushed to the VMs that run Repls and streamlined multiple kinds of configurations. During this migration, a latent bug that we had not hit was introduced. When we tried to see if a configuration kind had been updated, we acquired a [Golang RwMutex](https://pkg.go.dev/sync#RWMutex) for reading, but if there was not a handler for that configuration kind, the read-lock would not be released.
  * Golang's RwMutex are write-preferring, so acquiring multiple read-locks is allowed as long as there are no goroutines attempting to acquire a write-lock. When that happens, it will cause any future read-locks to block.
* On May 16, 2023,we introduced a new configuration kind, but we did not add a handler, which means that from this point on we were leaking read-locks, but the system was able to make progress.
* 10:28 on May 18, a regular build went out to production. This had a configuration change to the service that runs Repls.
* 11:45, the CD pipeline pushed the configuration change to all clusters simultaneously and was the first time that the write-lock was attempted to be acquired. At this point all VMs triggered the deadlock within minutes of each other. This caused all VMs to report being unhealthy and our internal load-balancer to not be able to send traffic to any VM.
During normal operation, a machine not being able to launch containers would mark itself as not-alive so that the autoscaler could recreate that VM. But this deadlock caused the [liveness probe](https://cloud.google.com/load-balancing/docs/health-checks) to fail-open, so all VMs were being left alone but not being able to serve traffic.
* 11:55, we started getting pages for widespread failures. A build started rolling out to production an hour or so ago, so we quickly suspected that the build was bad. The standard procedure during an incident [is to roll back first, ask questions later](https://outage.party/) and increase capacity in the system to accommodate for the extra load. Unfortunately the rollback process didn't go as smoothly, and it took us two tries and 40 minutes to push the last-known good build back to production. Then, when the rollback process finished, it had reset all the extra capacity we had given the system to its previous size.
* By this point, the vast majority of the VMs were idling doing nothing, and the few VMs that were able to serve traffic were getting too many requests too quickly and started getting swamped and reporting unhealthy for the purposes of load-balancing. The auto-scaler was configured only to look at metrics related to the load caused by running Repls, but it was missing a signal to look at the number of incoming requests. Since the extra capacity we had added was reset, this caused the auto-scaler to start making all the VM Managed Instance Groups smaller and smaller, because on average the utilization of the system was pretty low.
* 12:42, enough capacity with the correct build had been brought online, the system had started slowly recovering, and some users were able to get access to their Repls. But the recovery wasn't progressing fast enough.
We were prioritizing getting rid of the VMs that were running the old build so that most of the capacity was in the new build, but the sizes of the Instance Groups were already too low to recover at a desirable rate, and the auto-scaler was still getting mixed signals which caused the instance groups to not be able to grow to the correct size.
* 13:17, we shipped a change to make retries less aggressive, which reduced a bit of load.
* 13:28, we scaled up all instance groups once more to accommodate for the extra load. This was when everything started recovering in earnest.
* 13:56, the last alert stopped, and the system had fully recovered. At this point, we started looking to find the root cause of the issue to avoid making changes that would trigger it again.
* 16:15 the root cause was discovered by dumping the goroutines of a VM that hadn't yet been removed by the autoscaler from the rollout.
* 19:39 a new build with a bugfix for the deadlock was pushed to production, so that we no longer hit this one issue.

# What are the next steps for Replit?

The bug that triggered the incident has been fixed, but per our blameless postmortem culture we're more interested in making changes so that we don't run into the same or similar issues in the future, and we don't take as much time to resolve going forward. To do so, we are taking several actions:
* We're changing our CD system so that rollbacks to good-known-states are fast, reliable, and robust against operator errors and make the systems not express conflicting intents, and ensure that the necessary capacity for quick recovery is available.
  * Longer-term we are also considering investing in an intent-based CD to make this process even more reliable.
  * We're also going to do regular Disaster and Recovery Training exercises to ensure that rollbacks are still working when we need them to.
* We're making configuration changes no longer hit production simultaneously: they will be staggered by cluster and with a longer jitter to reduce the blast radius.
* We are revamping the logic that handles healthiness and liveness so that catastrophic failures can recover on their own.
* We're also investing in more static analysis to prevent whole families of correctness issues from making it to production.