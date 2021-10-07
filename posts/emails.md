---
title: The wild west of the internet
author: Nathan Zilora
date: 2021-07-29
cover: https://blog.repl.it/images/emails/we_missed_you.png
categories: projects
---

Emails are the wild west of the internet. A lawless land filled with incompatibility and unexpected behaviors. At the same time, it’s still one of the best ways we can reach our customers and inform them about new features and events that they might be interested in. I’m going to talk about a recent experience I had with the emails, specifically Gmail iOS dark mode. My hope is that you can learn from this experience and it’ll save you the time and turmoil it cost me.

We try to publish our newsletters once every two weeks. Wednesday is the day I release the draft for people to review. Thursday I put the plain text into our newsletter HTML. Finally on Friday I put our email into Sendgrid, put out test emails, and when everyone gives the go ahead they’re sent out to thousands of thousands of people. Except one Friday, things didn't go as planned. 

![Gmail's inverted version of our email](images/emails/whitethemeemail.png)

For whatever reason, the email our CEO recived was totally inverted. The background color and text color are opposite of what they’d normally be. That newsletter should have looked like this instead:

![Normal email](images/emails/real_newsletter.PNG)

So what gives? Why did just our CEO receive a light theme email, and everyone else got our normal dark theme email? The answer is, of course, what email client people are using. If you go on your browser and visit a website, and then visit that same website on a different browser, it should look pretty much the same. However if you open the same email with HTML on different email clients, it would not be hard to find differences between them. Our CEO is using Gmail, on iOS 14 darkmode. Thanks to [Litmus](https://www.litmus.com/blog/the-ultimate-guide-to-dark-mode-for-email-marketers/) we can see that email clients have varying support for when users request dark mode.

![Email darkmode compare](images/emails/darkmode.PNG)

There’s a lot to unpack here, but right now we’re specifically interested in the Gmail iOS app. We can see that it (along with Outlook 2019 Windows 10) does a full invert. That would explain why our email was totally changed. So, if there was some way to detect when Gmail was using dark mode, we could change the CSS to invert everything, and then Gmail inverts the email back to its original state! Except Gmail, unlike the top 3 clients in the table above, does not support media queries to detect dark mode. Media queries essentially conditional CSS that only applies if something is true. For example, if someone has a small screen, you might use a media query to detect that and change the CSS so that the html doesn’t spread out as much. But Gmail does not support that. In fact, according to [CanIEmail](https://www.caniemail.com/) Gmail doesn’t support a lot of styling, despite being the second most popular email client.

![Gmail needs to step it up](images/emails/gmail_stinks.PNG)


30th out of 32 is not a good score. Enough complaining though, this problem needs a solution. I stumbled across this [GitHub repository called “email-bugs”](https://github.com/hteumeuleu/email-bugs/issues/68). The purpose is to help developers discover why an email client might be acting weird. Low and behold the dark mode inversion had a very long issue thread, starting from October 2019! In this thread people were posting countless emails being broken by this inversion. Sometimes those inversions were pretty funny.

![Fun email gone creepy](images/emails/we_missed_you.PNG)

But most of the people in the thread were just reporting that this was a problem. Theories were crafted on how to fix it but no one had an answer. Until-

![The promised hotfix](images/emails/the_solution.PNG)

More than a year after this was an issue, someone finally had the solution. Or really, a hack. Here is a quick summary of how it works.

This hack abuses a few CSS properties Gmail supports, `linear-gradient` and `mix-blend-mode`. You need to nest three `<div>` elements that apply a background and font color.
```html
<div style="background:#000; background-image:linear-gradient(#000,#000); color:#fff;">
    <div style="background:#000; mix-blend-mode:screen;">
        <div style="background:#000; mix-blend-mode:difference;">
            Lorem ipsum dolor, sit amet, consectetur adipisicing elit.
        </div>
    </div>
</div>
```
Gmail, when inverting the colors, will change the CSS to look like this:
```html
<div style="background:#fff; background-image:linear-gradient(#000,#000); color:#000;">
    <div style="background:#fff; mix-blend-mode:screen;">
        <div style="background:#fff; mix-blend-mode:difference;">
            Lorem ipsum dolor, sit amet, consectetur adipisicing elit.
        </div>
    </div>
</div>
```
`mix-blend-mode: difference` tells Gmail that the darker of the colors should be subtracted from the lighter color.  When darkmode, this means the background is `#fff - #fff` which is `#000` (black). When in lightmode, it means the background is `#000 - #000` which is also `#000`! But what about font color? Specifically in lightmode, the equation would look like `#000 - #fff`. Except there are no negative colors, so Gmail will take the absolute value of the difference, which ends up being `#fff` (white). The whole hack is a bit more complicated than this, especially when you try using colors other than black and white, so I suggest giving [Rémi Parmentier’s blog post a read](https://www.hteumeuleu.com/2021/fixing-gmail-dark-mode-css-blend-modes/) if you want the full explanation. 

The last thing we need to do before implementing these changes is make it a Gmail specific fix. We don’t want this code running on clients where our email is already working! To do this we can take advantage of the fact that email clients are inconsistent. [HowToTarget.email](https://howtotarget.email/) provides information on different hacks that will allow you to run CSS, but only for certain email clients. Gmail’s hack looks like this:
```css
u + .body .foo {
  css here….
}
```
For whatever reason, Gmail changes the DOCTYPE element into `<u></u>`. By then giving the `<body>` element the `class=”body”` tag, we can create CSS that will only run on Gmail. Except I don’t have an iPhone, so I can’t see if it’s actually working. In fact, I can’t see if our email works on most of the devices we send our emails to, because I only own a few devices and clients! Having a device for each service is totally unreasonable. The solution is email testing tools.  We use [Litmus](https://www.litmus.com/), however many other options are available, such as:


* [PutsMail](https://putsmail.com/)
* [Inbox Inspector](http://www.inboxinspector.com/)
* [Mailtrap](https://mailtrap.io/)
* [EmailReach](http://www.emailreach.com/)
* [Email on Acid](https://www.emailonacid.com/signup)
* And many more!

All we have to do is paste our email’s code into the Litmus website, and they’ll send back screenshots from different clients and devices of what it looks like. Luckily on almost all the clients, our email looks great! Unfortunately, this is what iOS Gmail dark mode looks like, after we added the hack.

![So close....](images/emails/inverted_more.PNG)

The good news is, our background and text color is fixed! The bad news is images and the header’s colors are inverted. 

This is unfortunately where our story ends. Despite our best efforts we were not able to fix the images and stop them from inverting. Until Gmail adds more features that let us detect dark mode, this will be a problem. We decided that the inverted images email is better than the light mode dark mode mess we started with, and that’s the version we’ll be sending out from now on. We’ll keep our eyes peeled if Gmail adds any new features but until then, try to be a bit understanding if our emails, or any emails for that matter, look slightly off.

Emails are the wild west of the internet. A lawless land filled with incompatibility and unexpected behaviors. Creating the greatest email of all time requires hacky work arounds, and obscure tricks. If you’re thinking about sending newsletters to your subscribers, do your research and use email testing tools. If you have any questions, you can contact me at `nathan@repl.it` or `Zwack010#0001` on the [Replit Discord](https://replit.com/discord). Thanks for reading my story, and good luck developing!
