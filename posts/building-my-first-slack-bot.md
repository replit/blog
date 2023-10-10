---
title: "I’m not a programmer, and I used AI to build my first bot"
author: Jeff Burke
date: 2023-10-05
cover: https://blog.replit.com/images/slack-bot/building-my-first-slack-bot.jpg
categories: other
---

![](/images/slack-bot/building-my-first-slack-bot.jpg)

Before I joined Replit, I had never written a line of code.

![](/images/slack-bot/slackbot-demo-vF.mp4)

A few weeks ago, I built a Slack Bot that uses Google LLMs to provide daily channel summaries. You can [fork the template](https://replit.com/@jeff/SlackBot?v=1) or [get started with 100 Days of Code](https://replit.com/learn/100-days-of-python).

None of this was possible without Replit. Let me explain why:
1. Getting started with no setup
2. Using Replit AI capabilities
3. Learning LLMs with ModelFarm
4. Simple hosting and deployments

## Getting started with no setup
I studied Finance, Marketing, and Math. I never took a single Computer Science class. During my time playing professional baseball, I tried to learn to code to earn some money to support my training. At Boston Consulting Group, I attempted to learn Python to automate some basic data manipulation and scraping tasks we did.

Every time, I would get stuck early on. It would take far too long to see any output. The process was too slow, high-friction, and boring. Half of my time felt like it was just spent getting set up.

Fast forward to last year, and [we released 100 Days of Code on Replit](https://replit.com/learn/100-days-of-python). It was the best experience I had ever had:
* No wasted time to set up my development environment
* Daily, digestible lessons
* Video and written content directly in the editor, so there was no tab and context switching
* Ghostwriter helped with the boilerplate code to make me super efficient in later lessons

Within days and weeks, I was building legit projects, and I was using these skills to improve my day-to-day work at Replit. 

Once you learn how easy getting started can be, you won’t go anywhere else. Replit is the only place I will ever code.

## Using Replit AI capabilities
Replit’s AI helped me learn in 100 Days of Code faster, but it is also super helpful with creating new projects and understanding other projects. For example, for my Slack bot, I began with a simple prompt:

`Generate code that allows me to call on the Slack API and log the messages from a specific Slack channel`

I knew nothing about the Slack API. I had not visited the docs yet. I wanted to start with Ghostwriter.

```python
import os
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError

# use your own oauth token that you receive from Slack, remember not to reveal it to others
slack_token = os.environ["SLACK_API_TOKEN"]
client = WebClient(token=slack_token)

channel_id = 'your_channel_id' # insert your channel id here

try:
    result = client.conversations_history(channel=channel_id)
    messages = result.data['messages']
    for msg in messages:
        print(msg)
except SlackApiError as e:
    assert e.response["ok"] is False
    assert e.response["error"]
    print(f"Got an error: {e.response['error']}")
```

This was a great starting point, and instead of copy and pasting from another tab, I was able to just one click insert into the development environment. 

![](/images/slack-bot/insert-code-vF.mp4)


One of the tricky components of Slack is managing the bot permissions. You can read the docs, but in this case, I just asked:

![](/images/slack-bot/ghostwriter-prompt.png)

Replit’s AI was able to give a pretty clear answer, so I simply added those permissions. 

![](/images/slack-bot/edit-code-vF.mp4)

I was able to use Edit Code to make small adjustments like change the message logging to only messages for that day. In cases where I generated new code, I was also able to ask the AI to explain specific lines, which helped me learn.

For someone who was building this project alone, Replit’s AI was basically able to not only speed up the process but also act like a tutor.

## Learning LLMs with ModelFarm
I wanted this Slack bot to provide utility. For me, I am a part of so many Slack channels at Replit, and it is a struggle to track them all. Summarizing the channels would provide a lot of utility. To do that, I would need to use LLMs.

[Replit recently launched the ModelFarm](https://blog.replit.com/modelfarm), and for a month, the cost of the Google Vertex models is free. So I decided to use these for summaries.

```python
# Only log today's messages
          if message_timestamp.date() == date.today():
            user_id = message.get('user', 'N/A')
            user_info = client.users_info(user=user_id)
            user_name = user_info["user"]["name"]
            timestamp_str = message_timestamp.strftime('%Y-%m-%d %H:%M:%S')
            message_content = f"{user_name} said {message['text']}"
            channel_content += f"{message_content}\n"
```

This block of code:
* Logs every message from that day
* Reformats to say “{username} said {message}” (ex., “Jeff said I am OOO”)
* Combines into one massive message labeled `channel_content`

Then we had one paragraph of all the messages. Using Model Farm, I created this:

```python
  response: TextGenerationResponse = model.predict(
      f"Read all of the text in {channel_content}. Please make sure to include which user said each discussion point. Then provide a summary in bullets on all the main discussion points",
      temperature=0.8,
      top_p=0.8,
      top_k=40,
      max_output_tokens=256)
  response_text = response.text
  print(response_text)
```

This is a fascinating part of LLMs. With all of my messages stored in `channel_content`, I now want to send them to the model. But within this prompt, I wanted to give the Vertex model clear instructions, so I just embedded a prompt that basically says:
* Read all of the messages in `channel_content`
* Include the username
* Provide a summary of main points
* And format with bullets

So the input included some long messages from my peers:

![](/images/slack-bot/slack-channel-messages.png)

And when I click run, the Vertex model produced:

![](/images/slack-bot/vertex-output.png)

Much cleaner and more concise. Way easier and faster to digest. 

## Simple hosting and deployments
Once I completed my Slack Bot, the question was… how do I share it? There are a variety of cloud providers, but I have never used them. And Googling them leads to more questions than answers. Everyone labels everything differently.

Finally, most of them function off Git. Replit can use Git too, so that is not a huge issue, except for the fact that I do not know how to use Git. 

![](/images/slack-bot/deploy-demo-vF.mp4)

This is where Replit deployments comes in. I can deploy directly from the editor. No need for other vendors. Now that I have done the hard work (creating the project), sharing is made easy. And because I have Replit Pro, I already have allocation for Autoscale deployments, so I do not need to pay anything additional.

This is WAY easier than anywhere else. Plus, it includes analytics and more. 

You can fork [this template](https://replit.com/@jeff/SlackBot?v=1), and if you add your Slack API Keys (in secrets), it will work right away. No API keys for the models required. And it's free!

I also attached some dummy data, so people are not seeing our internal Replit conversations. But it works! If you’d like to try it out, reach out to me directly on [X (@Jeff_Burke14)](https://twitter.com/Jeff_Burke14), and I will get you set up.

## Helpful resources
* [Start 100 Days of Code](https://replit.com/learn/100-days-of-python)
* [Fork the template](https://replit.com/@jeff/SlackBot?v=1)



