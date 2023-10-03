---
title: April 2 Potential GitHub Credentials Exposure
author: Luis Héctor Chávez
date: 2023-04-04T02:00:00Z
categories: security,eng
---
Yesterday, on April 2, 2023, Replit discovered a site vulnerability that may have exposed GitHub [auth tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github#githubs-token-formats) for <0.01% of Replit users, stemming from use of the [GitHub import feature](https://docs.replit.com/programming-ide/using-git-on-replit/import-repository). This could have permitted unauthorized read/write access to all the repositories of those users by default (users can choose to authorize just a subset of repositories).

We have no indication that those exposed tokens were misused or used to exploit GitHub repositories.

The vulnerability has been fixed, all existing GitHub auth tokens associated with the Replit app have been revoked, and access to the GitHub import feature has been restored.

The number of exposed users was limited to <0.01% because there are two preconditions that needed to be met for a user’s Repl to be vulnerable:
* The Repl was created using the GitHub import feature; and
* One of:
    * The Repl was public and it was forked by another user
    * The Repl was a statically-hosted HTML Repl and the user had interacted with the files in the git reflog through the editor
    * The Repl had an HTTP server configured to serve all the files in the current directory

We have notified all users meeting these two preconditions whose tokens may have been exposed. All users will need to re-approve the use of GitHub in Replit since their previous approvals have been revoked out of caution.

# Technical details

In 2019, we introduced a feature that allowed users to import a GitHub repository as a Repl. In order to communicate with GitHub on a user's behalf, Replit used [user-to-server tokens](https://docs.github.com/en/apps/creating-github-apps/authenticating-with-a-github-app/authenticating-with-a-github-app-on-behalf-of-a-user). For repositories selected by the user, these tokens grant Replit access to:
* Administration: read and write access for repository creation, deletion, settings, teams, and collaborators.
* Contents: read and write access for repository contents, commits, branches, downloads, releases, and merges.
* Metadata: read only access to search repositories, list collaborators, and access repository metadata.
* Email addresses: read only access to the user’s email addresses.

This feature cloned the repository with a URL that contained the user-to-server token, which was written to a file in GitHub-imported Repls in the git [reflog](https://git-scm.com/docs/gitrepository-layout#Documentation/gitrepository-layout.txt-logsrefsheadscodenamecode).

As a result of this vulnerability,
* If the Repl's visibility was set to public, the reflog could have been left vulnerable to local inspection after forking the Repl.
* If the Repl had an HTTP server, either because the Repl was a statically-hosted HTML Repl or because it was configured to serve all the files in the current directory, the reflog was left vulnerable to remote inspection over the internet.

# What action do affected users need to take?

There is no action needed to secure Replit connections to GitHub. We revoked all prior users' authorizations (regardless of whether they were exposed or not), so all users will be re-authenticated automatically when using GitHub related features.

However, notified users should conduct an audit of their GitHub logs to check public and private repositories for evidence of suspicious activity. To request logs from GitHub:
* For organizations: please see the instructions in the GitHub document, [Review the audit log for your organization](https://docs.github.com/en/organizations/keeping-your-organization-secure/managing-security-settings-for-your-organization/reviewing-the-audit-log-for-your-organization).
* For personal accounts: please see the instructions in the GitHub document, [Reviewing your security log](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/reviewing-your-security-log).

Private GitHub repositories often contain secret information such as credentials. If notified users find any suspicious activity, they should revoke or rotate visible secrets in any repository that they granted Replit access to.

If a user finds evidence of suspicious activity in their connected GitHub repositories or other impact, they should open a case with [Replit Support (support@replit.com)](mailto:support@replit.com).

# What actions has Replit taken so far?

We started investigating immediately after receiving the notice about a potential vulnerability. Within hours, our security team took prompt action to analyze and mitigate the issue. We took the following actions to remedy (all times US Pacific Time):
* **Sunday, April 2, 2023**
* 11:21: An internal incident was created and scope and mitigation steps determined.
* 11:48: Disabled the GitHub import feature to prevent more users from being affected by this. _**No new users are affected after this point**_.
* 11:52: Began enumerating all users that had their auth tokens exposed.
* 12:37: Began revoking all auth tokens for all users, regardless of exposure.
* 12:50: Discovered root cause and relevant code removed.
* 13:29: Examined HTTP logs to determine which users had attempts to access their auth tokens for possible exposure.
* 15:03: Addressed the original vulnerability by no longer passing the auth token into the URL when importing GitHub repositories.
* 17:30: Started rejecting any attempts to perform any commands that would result in an auth token being written to the git reflog. No more auth tokens have been exposed since this point.
* 18:07: Audited all codepaths that were related to GitHub authentication and authorization.
* 18:19: Deleted the GitHub app to immediately revoke all preexisting auth tokens. _**Any previously-exposed auth tokens stopped working at this point.**_
* **Monday, April 3, 2024**
* 08:43: After all mitigation steps were in place, a new GitHub app was created to restore the functionality that was disabled securely. 
* 13:43: Examined all Repls to identify whether there were auth tokens in their reflogs to see which users were in a potentially vulnerable state.
* 18:00: Notified impacted users directly by email. 

# What are the next steps for Replit?

Replit takes security very seriously, especially when it relates to users' data.  We are taking complete responsibility of this incident. Every time there is a security incident, we want to learn from it and make changes so that it (or similar incidents) don't happen again.

In addition to fixing this particular vulnerability, we will increase the use of static code analysis tools to ensure information is not sent without appropriate corresponding permissions. We are also preparing to scan Repls for instances of potentially misplaced credentials. This goes beyond the scope of this incident, is generally a good practice, and can help protect other secrets like Discord tokens.

# Responsible disclosure

Thanks to [@LuisAFK](https://replit.com/@LuisAFK), a 14-year-old hacker from the Replit community, for finding and reporting this vulnerability and following a [responsible disclosure](https://en.wikipedia.org/wiki/Coordinated_vulnerability_disclosure) process with us. If you want to report a vulnerability to us, please reach out to [security@replit.com](mailto:security@replit.com) and we can coordinate.