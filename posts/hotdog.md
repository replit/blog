---
title: Not Hotdog
author: Yev Barkalov
date: 2018-07-19T17:00:36.000Z
categories: projects
---

Today we're going to write a program that tells you whether an image is a hotdog or not!

If you didn't get the reference, here's the scene from HBO's Silicon Valley

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/ACmydtFDTGs?rel=0" frameborder="0" allow="autoplay; encrypted-media" style="margin: 0 auto;display:block;" allowfullscreen></iframe>

Before we can start working on this, we need to ask how we can even get a computer to tell us what's in an image. The long answer is machine learning, a field of computer science that involves a lot of research and computational resources. The short answer is we'll use an API.

There are plenty of image recognition APIs and services such as Google Cloud's Cloud Vision API or AWS' Amazon Rekognition, however, we're going to be using [Clarifai](https://clarifai.com/) since we can easily use it for free with no hassle. We'll be using their API and, if you want to delve into their docs, you can find them right [here](https://clarifai.com/developer/guide/). For this tutorial, I'll be sticking with the code provided in their [API Guide](https://clarifai.com/developer/guide/) in the "Images" section.

To begin, let's start up a repl on [Repl.it](https://repl.it)

![replit python](/public/images/blog/hotdog/python.gif)

Then, in a new tab, [create a Clarifai account](https://clarifai.com/developer/account/signup).

![clarifai signup](/public/images/blog/hotdog/signup.png)

Once you've done so, go to the [application dashboard](https://clarifai.com/developer/account/applcations) and select "Create New Application"

![clarifai applications](/public/images/blog/hotdog/application.png)

Put in a name for your application and get the API key for that application

![clarifai apikey](/public/images/blog/hotdog/apikey.png)

That's it for stuff outside the editor, now it's time to get working!

In the Python repl, create an `.env` file and put in your API key like so

```
API_KEY=afadee25a3fa4ce192d66cae17f7200b
```

We're creating a `.env` file because the `.env` file is only accessible to the owner of the repl, making it a smart location for API keys or other secrets that you wouldn't want others to have access to. It's important that you do not put the key in quotes otherwise it will not work, for more info on `.env` files in Repl.it check out [this post](https://repl.it/site/docs/secret-keys).

Next, let's create a  `requirements.txt` file for our dependencies and put the following into its contents. We'll be needing `dotenv` so we can access the `.env` file as well as `clarifai` to use the Clarifai API via Python

```
dotenv
clarifai
```

Let's start `main.py` by grabbing the api key from our `.env` file

```python
import os

API_KEY = os.getenv("API_KEY")
```

Then we follow it with the imports we need for Clarifai

```python
from clarifai.rest import ClarifaiApp
from clarifai.rest import Image
```

Using ClarifaiApp and our API key, we create our app

```python
app = ClarifaiApp(api_key=API_KEY)
```

Next, we'll need to obtain a "model" for the app. The model represents the type of information to get from the image. In this case, we want to get a particular type of food so we'll use the "food items" model. If you're interested in the other models offered, check out Clarifai's [models page](https://clarifai.com/models)

```python
model = app.models.get("food-items-v1.0")
```

As for the image I'll use a Wikipedia image of a hot dog

![hot dog](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hot_dog_with_mustard.png/1200px-Hot_dog_with_mustard.png)

And, to use it with our model, we have Clarifai's `Image`

```python
url = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Hot_dog_with_mustard.png/1200px-Hot_dog_with_mustard.png"

image = Image(url=url)
```

Lastly, we *predict*

```python
result = model.predict([image])

```

The returned `result` is a dictionary that should look similar to this

![returned result](/public/images/blog/hotdog/response.png)

Feel free to poke around and see what specific structures are in the object but the loop that will give us the tags Clarifai returns is

```python
for concept in result["outputs"][0]["data"]["concepts"]:
    print (concept["name"])
```

Since we only care if the displayed food is a hot dog, let's check each tag for being either "hotdog" or "hot dog"

```python
hotdog = False
for concept in result["outputs"][0]["data"]["concepts"]:
    if concept["name"] == "hotdog" or concept["name"] == "hot dog":
       hotdog = True
       break
if hotdog:
   print ("Hotdog")
else:
   print ("Not hotdog")
```

And, with that, we can now determine whether or not an image is a hot dog. Go ahead and try out different urls and see it work!

<iframe height="400px" width="100%" src="https://repl.it/@yevbar/not-hotdog-simple?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>

Of course, we can do a lot better than just a script that prints "Hot dog" or "Not hot dog". If you remember from the Silicon Valley clip, they actually returned an image with the text "Hot dog" or "Not hot dog" on it. So, let's make that happen.

To do that with Python, we'll use the Python Imaging Library (PIL). I'll be using [this](https://www.1001freefonts.com/hours.font) custom font but feel free to use your own. If you use this one, you'll download a zip file with the ttf as its contents. Once you extract the ttf file or get your own, upload it to your repl

![replit upload files](/public/images/blog/hotdog/upload.png)

In order to use PIL, we'll need to add `pillow` to our requirements.txt

```
dotenv
clarifai
pillow
```

With that in, let's add the needed imports in `app.py`

```python
from PIL import Image, ImageDraw, ImageFont
```

Since we've been retrieving the image by a url, we don't actually have the image saved locally. However, we can use requests to obtain the image

```python
import requests
from io import BytesIO

response = requests.get(url)
base = Image.open(BytesIO(response.content)).convert('RGBA')
```

Since I named my ttf file `font.ttf`, we'll prepare the text like so

```python
size = width, height = pattern.size
draw = ImageDraw.Draw(pattern, "RGBA")
font = ImageFont.truetype("font.ttf", 100)
```

We only want to write "Hotdog" if it's a hotdog and "Not hot dog" if it isn't so we need distinguish that. I also put in some shifts in placement so that the text is more centered

```python
if hotdog:
  draw.text((275 10),"Hotdog",(0, 0, 0, 255), font=font)
else:
  draw.text((50, 10),"Not hotdog",(0, 0, 0, 255), font=font)
```

Since we used RGBA for coloring, we're going to have to save the file as a png

```python
pattern.save("result.png")
```

![hotdog](/public/images/blog/hotdog/hotdog.png)

With that, we've put the characters from Silicon Valley to shame. However, we now need to resize the images because, if you provide a smaller image, the text will go out of view. So, proceeding the line assigning `size`, let's put the following

```python
if size[0] < 1200:
  base = base.resize((1200, size[1]*1200/size[0]))
size = width, height = base.size
```

The reason for the second `size` assignment is because we may have changed the size of the image in the line before.

Running now should resolve the issue with size. The next thing to tackle is the color of the text; if the text is white and the image is dark then we're fine but what about when they're both bright colors? To solve that, we should place the text inside a rectangle like subtitles.

First, let's make the determined string "Hotdog" or "Not hotdog" be a variable

```python
text = "Hotdog" if hotdog else "Not hotdog"
```

Next, I'm going to move the coordinates for the text into variables too

```python
x = 275 if hotdog else 50
y = 10
```

With these variables, we can get the width of the rectangle needed then draw it

```python
w, h = font.getsize(text)
draw.rectangle((x, y, x + w, y + h), fill='white')
```
Now we should always be able to read the text. As one final thing, let's make the background of the text green or red based on whether or not it's a hotdog

```python
draw.rectange((x, y, x + w, y + h), fill="green" if hotdog else "red")
```

![not hotdog](/public/images/blog/hotdog/not_hotdog.png)

As you can see, a hamster is not a hot dog and you made "Not hotdog" using Python!

As always if you have any questions or want to say hi, feel to send me an email at [yev@repl.it](mailto:yev@repl.it) and till next time!