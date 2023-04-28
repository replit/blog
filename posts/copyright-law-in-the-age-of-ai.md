---
title: "Copyright Law in the Age of AI: The Role of Licensing in Replit's Development"
author: J Malcolm
date: 2023-05-01T07:00:00.000Z
cover: https://blog.replit.com/images/Ai-blog.jpg
categories: ai
profiles: qirtaiba
---
![Header Image](https://blog.replit.com/images/Ai-blog.jpg)

Thousands of unique users code in Replit every day. Few of them probably give much thought to the copyright that attaches to their code. They might be surprised to learn that copyright – specifically, the way that Repls are licensed – is fundamental to the way that Replit works.

As the [AI software revolution](https://blog.replit.com/chroma) proceeds apace, copyright law is again playing a fundamental role in how it develops – and in how Replit brings the benefits of this technology to our users. We’ll explain all in this blog post. But before we get there, time for a history lesson.


## A brief history of software licensing

The relationship between copyright and computer software wasn’t always obvious, even to lawyers. Early versions of the Unix operating system, developed at Bell Labs in the 1970s, were distributed freely along with their source code, so that the recipients of the code could hack on it. Decades later this led to a [copyright lawsuit](https://law.justia.com/cases/federal/district-courts/FSupp/832/790/1428569/), but following its settlement, entirely free distributions of Unix became legally available, with their components licensed under free software licenses such as the MIT license.

Dennis Richie, one of the developers of Unix, [said in 1979](https://www.read.seas.harvard.edu/~kohler/class/aosref/ritchie84evolution.pdf), “What we wanted to preserve was not just a good environment in which to do programming, but a system around which a fellowship could form.” If that sounds a little bit like the philosophy that underpins Replit, well that’s not entirely a coincidence. Unix is the historical predecessor of Linux, the free operating system that powers every Repl on Replit. And the MIT license is the same license that we apply to public Repls, which enables you to fork, modify, and freely distribute their code. 

At the same time that developers were hacking around copyright law to create the beginnings of a free software ecosystem, the personal computing boom of the 1980s was also ramping up. It was becoming clear that there was a mass market for computer software, with big money to be made. The first true “killer app” of the 1980s was the electronic spreadsheet, the most successful example of which was Lotus 1-2-3.

Of course, other companies wanted in on the action. One of them was Borland, which created its own clone of 1-2-3 called Quattro Pro. This too [ended up in a lawsuit](https://openjurist.org/516/us/233), with Lotus claiming that Quattro Pro’s duplication of 1-2-3’s functionality and appearance was an infringement of copyright, even though the source code was different. Borland narrowly succeeded in the Supreme Court, where a distinction was drawn between software’s interface or “look and feel”, which is not protected by copyright, and its implementation in code, which is protected.


## Scraping and copying: when it is legal?

We’re at a similar place today when it comes to AI and copyright. Once again, technology has moved faster than the law, so that even lawyers aren’t entirely sure how copyright law applies to the training of large language models (LLMs) and the protection of their outputs. However there are some precedents to give us an idea of the considerations that courts will be thinking about as this case law develops. To explain more, again we have to take a step back in history.

In 1999, a revolutionary music sharing program called Napster was released, soon becoming a viral sensation used by millions around the world. Napster created a crowdsourced global database of music, which allowed its users to share tracks with each other for free. The problem was that the copyright owners weren’t getting paid for any of the sharing that Napster facilitated. This soon resulted in – you guessed it – another seminal [copyright lawsuit](https://casetext.com/case/metallica-v-napster-inc), brought against Napster by none other than the heavy metal band, Metallica.

In a fictionalized conversation from the movie _The Social Network_, Napster founder and Facebook investor Sean Parker claims that Napster “brought down the record company.” Mark Zuckerberg retorts, “Sorry, you didn't bring down the record companies. They won.” Parker responds, “In court.” He was right; in a broader sense, Napster won. The disruption that it brought to music distribution was directly responsible for shifting the industry away from its old business model of selling music on plastic disks. Apple launched iTunes in 2001, the same year as the first Napster ruling, paving the way for the licensed streaming services of today.

Internet search engines created a similar disruptive change with their business model of scraping and indexing search content from across the Internet, without explicitly securing the permission of the copyright owners of that content. Yet in a lawsuit against Amazon and Google for scraping image content to create thumbnails for display on their platforms, [this practice was ruled to be legal](https://cdn.ca9.uscourts.gov/datastore/opinions/2007/12/03/0655405.pdf).

What made the difference between Napster’s failure and Google’s success? In a word, the difference is that Google’s use was _transformative_, because the copyright content that it scraped was used in a novel new application. Search indexing didn’t simply undermine and compete with the copyright owner’s use of the indexed content, but rather was considered as a new “fair use” that is permitted under copyright law.


## Training LLMs – fair use or not?

How does this apply to the training of LLMs – is this closer to Napster’s case, or to Google’s? Well, the jury’s still out on this – almost literally, as there are a number of lawsuits pending in which companies on one side or the other argue their case. Generative AI vendors [Midjourney and Stability AI](https://petapixel.com/2023/04/20/midjourney-and-stable-diffusion-ask-us-court-to-dismiss-artists-lawsuit/) are being sued by artists who claim that their works were used for training, at the same time as Stability AI is separately being [sued by Getty Images](https://ipwatchdog.com/2023/04/05/briefing-ip-law-blog-getty-images-sues-stability-ai-copyright-infringement-stable-diffusion-training/id=158984/) for scraping its stock photographs.

More relevant for Replit, there is a pending [class action lawsuit](https://www.theverge.com/2023/1/28/23575919/microsoft-openai-github-dismiss-copilot-ai-copyright-lawsuit) against Microsoft, Github, and OpenAI over Github’s Copilot coding assistant, with the plaintiffs alleging that the use of their code for training Copilot amounts to “software piracy on an unprecedented scale”. One of the responses raised in defense is that because all of the code used for training was released publicly under open source licenses, the plaintiffs are unable to show that they have actually suffered any loss.

Meanwhile, companies aren’t waiting for the law to become settled. Reddit, for example, has begun [charging for access to content through its API](https://www.nytimes.com/2023/04/18/technology/reddit-ai-openai-google.html), knowing that Reddit posts are already a popular source of training data for LLMs. Given the costs that some platforms are [charging for API access](https://www.wired.com/story/twitter-data-api-prices-out-nearly-everyone/) to their content (Twitter is charging $42K/month), there is also an emerging push for [open source large language models](https://www.nature.com/articles/d41586-023-01295-4) – those that are only trained on open source data that is free of copyright restrictions.


## What is Replit doing?

While these legal wranglings are ongoing, Replit’s early decision to default license all public Repls [under the MIT license](https://docs.replit.com/legal-and-security-info/licensing-info) proved a sensible one in ways that we couldn’t have predicted at the time. We chose MIT because it was the best fit for our mission to empower the next billion software creators. Replit contains thousands of working code examples in public Repls, and you can fork and remix any of them without any restrictions at all.

This flexibility also happens to be the perfect foundation for the brave new legal frontier of generative AI. Unlike many other open source licenses – such as the very popular GNU General Public License (GPL), which requires remixed code to be shared under the same license – the MIT license imposes no such restrictions on how the code is used. This makes public Repls the perfect source of training data for a coding LLM such as Ghostwriter.

For the technically-minded, we wrote a blog post about [how we do training here](https://blog.replit.com/llm-training). The post explains how before we use code for training, we first purge it of Personal Identifiable Information (PII), including emails, IP addresses, and secret keys, to avoid the possibility that the LLM might learn such information and suggest it in generated code.

We understand that some people might not want their code to be used for training, because it may contain a proprietary algorithm or other sensitive information. If that applies to you, we’ve got you covered too. Sensitive code can simply be kept in a private repl, which is not automatically MIT licensed. Private repls (including individual, team, and Bounty repls) won’t be used for machine learning. 

As AI technologies continue to develop at a rapid pace, copyright law has once again taken a pivotal position in the future of software development. The history of software licensing and copyright law described above shows that the evolution of technology often outpaces the law, leaving many unanswered questions. As lawsuits continue to mount around the training of LLMs, it remains to be seen how courts will handle the question of fair use and transformative applications.

In the meantime, Replit continues to take a creator-friendly approach, building Ghostwriter on the same open source foundations that have powered our platform since the beginning. It shouldn’t come as a surprise that Replit is the perfect platform for machines to learn to code. After all, we built it for human beings to be able to do exactly that. Replit remains the best place for coders to learn, share, and collaborate – and now, it’s also the best place to leverage the unfolding possibilities of generative AI.
