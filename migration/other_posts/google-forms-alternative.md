---
title: Using Replit and Google Sheets to Make a Simple Google Forms Alternative
author: Nicolas Bohorquez
date: 2022-1-18
cover: https://blog.replit.com/images/replitdisk.jpeg
categories: projects
---

[Replit](https://replit.com), a cloud native code environment, provides all the tools you need to collaborate, create, test, and deploy software applications in a single place. Think of it as a new-generation Integrated Development Environment (IDE), with integrated support for authentication/authorization, data persistence, and auto deployment that makes your software development experience thrive. 

Replit’s cloud native nature means you only need a web browser to get started, reducing your cost in local infrastructure, and allowing you to work in real-time even if your team is remote. 

In this tutorial, you’ll learn how to create a [Python web application](https://www.python.org) that lets you build dynamic forms. You’ll be able to display different sections given specific conditions.

This might sound similar to [Google Forms](https://www.google.com/forms/about/), but you’ll be able to create several extension points to make the application more customizable and robust. 

![Dynaform sample](https://i.imgur.com/sGRUmcU.gif)

## Implementing the Google Forms Alternative

Before you begin this tutorial, you’ll need to create a [Replit account](https://replit.com/signup?from=landing). It’s a comprehensive solution for developers who want to create web applications, APIs, static HTML sites, frontend applications, games, and more. The integrated environment supports a large number of programming languages (C#, Java, Python, JS, Erlang, QBasic, Swift, Dart, Kotlin) and provides templates for many frameworks (Rails, Kaboom, Django, Pygame, Flask). It also integrates with GitHub natively and includes all that’s required to launch a software product.



Sign in if you already have an account. You can also follow along on [this article’s repl](https://replit.com/@NicolasBohorqu1/Dynaform?v=1). 

Once signed in to Replit, create a Python repl with the Flask template. There’s no need to install anything once you’ve selected the template Flask—Replit automatically adds the necessary imports to the `pyproject.toml` file and creates a `main.py` file with the required code. 

Select a new project template.

![Replit flask template](https://i.imgur.com/id2WObq.png)

The example application (DynaForm) will allow the users to:

* Create forms with several sections and fields per section.
* Customize the order of the sections on a form based on dynamic criteria (an answer that has a specific value or function).
* Respond to a form.
* View answers as a table.
* Export answers to a Google Spreadsheet.

Here’s a diagram of the application’s components:

![Dynaform design](https://i.imgur.com/3ITmsJT.png)

You’re able to define the dynamic views and the behavior of the entire form using a master-detail model (FormContainer and SectionForm) that contains a workflow definition and a target spreadsheet.

By taking advantage of the nature of Replit's database, each instance of the FormContainer will include its own set of answers as a collection of Python's dictionaries in which keys are each of the section fields. The `utils` and `gsheets` files contain helper code for the entire project.

### Building the Models

The master part of the `master-detail model` is the FormContainer class—it’s defined as a simple [WTForm](https://wtforms.readthedocs.io/en/3.0.x/) with three attributes (`name`, `spreadsheet_id`, and `workflow`) and a custom validator.

To help you separate the master details classes from the controllers, views, and utils code, add a new file named `forms.py` and include this code: 

```python
import json
from flask_wtf import FlaskForm
from wtforms.validators import InputRequired, Length
from wtforms import StringField, TextAreaField, SubmitField, ValidationError

class FormContainerForm(FlaskForm):
  class Meta:
    csrf = False
        
  name = StringField(
    "Form name",
    validators=[
        InputRequired(),
        Length(min=4, max=255)
    ]
  )

  spreadsheet_id = StringField(
	"Google Spreadsheet Id",
	validators=[
    	InputRequired(),
    	Length(min=20, max=255)
	]
  )

  workflow = TextAreaField(
    "Workflow Definition (JSON)",
    validators=[
        InputRequired()
    ]
  )

  submit = SubmitField("Create form")

  def validate_workflow(form, field):
    try:
      json.loads(field.data)
    except:
      raise ValidationError("Use a valid JSON please")
```

![Adding forms.py](https://i.imgur.com/4yoBu4s.png)

This code defines the `FormContainerForm` class, its attributes, validators, and Submit button. The custom validator function `validate_workflow(form, field)` is applied to the workflow attribute and tries to parse the string content as a JSON document. If it fails, the `ValidationError` exception occurs. 

While the class has three attributes declared, its instances will include the answers and a collection of the SectionForm. The SectionForm class can also be defined in a similar way in the same file:

```python
class SectionForm(FlaskForm):
  class Meta:
    csrf = False
        
  sectionId = StringField(
    "Task Id",
    validators=[
        InputRequired(),
        Length(min=3, max=255)
    ]
  )

  section = TextAreaField(
    "Section Definition (JSON)",
    validators=[
        InputRequired()
    ]
  )

  submit = SubmitField("Save section")

  def validate_section(form, field):
    try:
      json.loads(field.data)
    except:
      raise ValidationError("Use a valid JSON please")
```

Using Python's libraries in Replit's projects is straightforward—just add them to the `pyproject.toml` file. Replit will update the environment and install all the required dependencies:

```toml
[tool.poetry]
name = "repl_python3_Flask"
version = "0.1.0"
description = "Dynamic forms"
authors = ["Nicolas Bohorquez <nicolas.bohorquez@alephsa.com>"]

[tool.poetry.dependencies]
python = "^3.8"
Flask = "^2.0.2"
WTForms = "^3.0.1"
Flask-WTF = "^1.0.0"
replit = "^3.2.4"
google-api-python-client = "^2.34.0"
google-auth-httplib2 = "^0.1.0"
google-auth-oauthlib = "^0.4.6"

[tool.poetry.dev-dependencies]

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"

```
### Building the Controllers

The controllers layer will initialize the models with default values, persist the changes into the Replit's Database, and redirect or render the appropriate view in each case.

To start, you’ll use the [CRUD (create, read, update, and delete)](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) actions for the FormContainer. 

First, replace the original code in the `main.py` file with the following contents:

```python
import json
import uuid
from replit import db
from gsheets import write_spread_sheet_data
from forms import FormContainerForm, SectionForm
from flask import Flask, render_template, flash, redirect, url_for, request
from utils import db_init, dotdict, default_wf, default_sections, evaluate, hash_id, tabulate_answers, to_pretty_json

db_init()
app = Flask('app')
app.secret_key = 'A-SUPER-SECRET-STRING'

@app.route("/", methods=["GET"])
def list():
  forms = db["forms"]
  return render_template("list.html", forms = forms)

@app.route("/add", methods=["GET"])
@app.route("/add/<formName>", methods=["GET", "POST"])
def add(formName=None):
  formData = FormContainerForm(request.form)
  fName = "newform"
  #new form
  if request.method == "GET":
	formData.workflow.data = default_wf()
  #edit existing form
  if request.method == "GET" and formName is not None:
	form = dotdict(db["forms"][hash_id(formName)])
	formData.workflow.data = form.workflow
	formData.spreadsheet_id.data = form.spreadsheet_id
	formData.name.data = form.name
	fName = form.name
  #saving form
  if request.method == "POST" and formData.validate():
	fName = formData.name.data
	formId = hash_id(fName)
	#edit only workflow, keep sections and answers
	if formId in db["forms"]:
  	form = dotdict(db["forms"][formId])
  	form.workflow = json.dumps(json.loads(formData.workflow.data), indent=2)
  	form.spreadsheet_id = formData.spreadsheet_id.data
  	db["forms"][formId] = form
	#persist the new form
	else:    
  	db["forms"][formId] = {
      	"name": fName
      	, "spreadsheet_id" : formData.spreadsheet_id.data
      	, "workflow": formData.workflow.data
      	, "sections": default_sections()
      	, "answers": {}
  	}

	flash("Form saved!")
	return redirect(url_for('sections', formName=fName, form=formData))

  return render_template("add.html", formName=fName, form=formData)

@app.route('/delete/<formName>')
def delete(formName):
  del db["forms"][hash_id(formName)]
  flash("Form deleted!")
  return redirect(url_for('list'))
```

Several methods are defined:

* The **list** loads all the available forms from the database and renders the view. You can think of [Replit's database](https://docs.replit.com/hosting/database-faq) as a persistent Python dictionary. More formally, it’s a key-value cloud storage with client interfaces for several programming languages, including [JavaScript](https://www.javascript.com), [Go](https://go.dev), and Python. 
* The **add** method has three purposes: initialize new forms to be persisted with a default workflow and default sections; persist new forms; and update existing ones. It redirects to the sections CRUD view for new/edited forms or to the add view in case of the form initialization.

> Notice that the *add* method is mapped as a route with or without the `formName` argument, this will be used to understand if you need to initialize, add, or edit a *FormContainer*. 

* The **delete** method requires a `formName argument` to delete it from the database. It includes a confirmation message before redirecting to the list action.

Some complementary helper methods are imported from the utils and gsheets modules that haven’t been created yet. To fix this, create a `utils.py` file with the following contents:

```python
import json
import hashlib
import logging
from replit import db

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger("utils_logger")

class dotdict(dict):
	"""dot.notation access to dictionary attributes"""
	__getattr__ = dict.get
	__setattr__ = dict.__setitem__
	__delattr__ = dict.__delitem__

def db_init():
  if "forms" not in db.keys():
  	db["forms"] = {}

def hash_id(id):
  result = hashlib.md5(str(id).encode())
  return result.hexdigest()

def default_wf():
  return json.dumps({
	"init":{
  	"section":"init"
  	,"transitions":[
    	{
      	"taskId": "end"
      	, "condition": "answer.name.lower() == 'None'.lower()"
    	}
    	, {
      	"taskId": "more"
      	, "condition": "True"
    	}
  	]
	}
	, "more":{
  	"section":"more"
  	,"transitions":[
    	{
      	"taskId": "end"
      	, "condition": "True"
    	}
  	]
	}
	, "end":{
  	"section":"end"
	}
  }
, indent=2)

def default_sections():
  return json.dumps({
	"init":
	[
  	{
    	"type": "paragraph",
    	"subtype": "p",
    	"label": "Hello, this is a simple form"
  	},
  	{
    	"type": "text",
    	"required": True,
    	"label": "Name",
    	"placeholder": "What is your name?",
    	"className": "form-control",
    	"name": "name",
    	"subtype": "text"
  	},
  	{
    	"type": "button"
    	,"label": "Submit"
    	,"subtype": "submit"
    	,"name": "submit"
  	}
	],
	"more":
	[
  	{
    	"type": "paragraph",
    	"subtype": "p",
    	"label": "Tell us a little bit more, please"
  	},
  	{
    	"type": "text",
    	"required": True,
    	"label": "Surname",
    	"placeholder": "What is your surname?",
    	"className": "form-control",
    	"name": "surename",
    	"subtype": "text"
  	},
  	{
    	"type": "button"
    	,"label": "Submit"
    	,"subtype": "submit"
    	,"name": "submit"
  	}
	],
	"end":
  	[
    	{
    	"type": "paragraph"
    	,"subtype": "p"
    	,"label": "Thank you"
    	}
  	]
	}
, indent=2)

def evaluate( wf, step, vals):
  answer = dotdict(vals)

  if step != "" and "transitions" in wf[step]:
	for t in wf[step]["transitions"]:
  	try:
    	if eval(t["condition"],{'__builtins__':{}, "answer":answer}) == True:
      	return str(t["taskId"])
  	except Exception as e:
    	print('Error evaluating condition: %s' % t["condition"])
    	logger.error(e)

  return 'init'    

def tabulate_answers(vals):
  kDict = {"id":None}
  answers = []
  for id in vals:
	ko = sorted(vals[id].keys())
	for k in ko:
  	kDict[k] = None

  for id in vals:
	currAnswers = []
	for k in kDict.keys():
  	v = id
  	if k != "id":
    	v = vals[id][k] if k in vals[id] else ""
  	currAnswers.append(str(v))
	answers.append(currAnswers)
  return kDict.keys(), answers

def to_pretty_json(value):
  return json.dumps(value, sort_keys=True, indent=4, separators=(',', ': '))
```

The `utils.py` file includes several small chunks of code that are used across the entire project:

* `dotdict` is a wrapper class that helps you use dot notation to access elements in a dictionary (`dict.key`).
* The `db_init()` method creates an empty collection with the key _forms_ into the Replit’s database if it doesn’t exist yet.
* The `hash_id(id)` method uses MD5 hashing algorithm to create some sort of identifier of instances inside the Replit’s database. 
* `evaluate(wf, step, vals)` executes the transition logic of the FormContainer sections (more detail on this method later).
* `tabulate_answers(vals)` transforms the answers collection of dictionaries into a list of strings containing the labels of the form’s questions, and a list of answers to those questions. This will be helpful for rendering and exporting the final user's answers collected in each form.

The most interesting part of this project is the workflow/sections definition.

The `utils.py` file contains two helper methods: `default_wf` and `default_sectons`. The workflow consists of a set of tasks in a dictionary with the name of the step as key. Each step contains a section, which will be the actual view that’s rendered, and some transitions, which are the possible next steps in the flow. Each transition contains a `taskId` that is the expected next step, and a condition that will be evaluated dynamically to select the proper transition. 

The flow requires an `init` step and an `end` step without transitions to stop the flow. Similarly the `default_sections` method creates a JSON object that contains sections named in the same vein as the workflow's steps.

Each section is a JSON array of fields. The schema for the definition is borrowed from the [FormBuilder](https://formbuilder.online/) project, since it’s the tool that will render the sections in the browser. 

Also, you need to add a `gsheets.py` file that contains the necessary code to authenticate and access the [Google Spreadsheet API](https://developers.google.com/sheets/api). For now, add the following code to the file:

```python
import os
import json
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, update the secret google-json-key.
SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

def load_user_secrets_from_local():
  creds_json = json.loads(os.environ['google-json-key'])
  credentials = service_account.Credentials.from_service_account_info(
    	creds_json, scopes=SCOPES)
  return credentials

def write_spread_sheet_data(spreadsheet_id, headers, table):
  creds = load_user_secrets_from_local()
  table.insert(0,[str(h) for h in headers])
  try:
	service = build('sheets', 'v4', credentials=creds)
	body = {
    	'values': table
	}
	result = service.spreadsheets().values().update(
    	spreadsheetId=spreadsheet_id, range="A1",
    	valueInputOption='USER_ENTERED', body=body).execute()
	return result.get('updatedCells')
  except HttpError as err:
	print(err)
```

This file only contains two methods: one to authenticate (`load_user_secrets_from_local`) and another (`write_spread_sheet_data`) to write the collected answers of a form into a spreadsheet (more detail on this later).

For now, let’s complete the CRUD logic by adding the necessary code to manage the sections of a FormContainer.

Add the following code to the `main.py` file. This includes the CRUD implementation for the SectionForm model that is very similar to the previous one: a method to list all the sections in a form (**sections**), one to initialize/add/edit a single section (**section**), and one to remove a section from the FormContainer:

```python 
@app.route("/sections/<formName>", methods=["GET", "POST"])
def sections(formName):
  form = dotdict(db["forms"][hash_id(formName)])
  sections = json.loads(form.sections)
  newSectionId = str(uuid.uuid4())
  return render_template("sections.html", form = form, sections=sections, newSectionId=newSectionId)

@app.route("/section/<formName>", methods=["GET"])
@app.route("/section/<formName>/<sectionId>", methods=["GET","POST"])
def section(formName, sectionId=None):
  form = dotdict(db["forms"][hash_id(formName)])
  formData = SectionForm(request.form)
  sections = json.loads(form["sections"])
  section = sections[sectionId] if sectionId in sections else json.loads("[{}]")
  if request.method == "GET":
    formData.sectionId.data = sectionId
    formData.section.data = json.dumps(section)

  if request.method == "POST" and formData.validate():
    sectionId = formData.sectionId.data
    sections[sectionId] = json.loads(formData.section.data)
    form["sections"] = json.dumps(sections, indent=2)
    db["forms"][hash_id(formName)] = form
    flash("Section saved!")
    return redirect(url_for('sections', formName=formName))

  return render_template("section.html", formName=formName, form = formData, section=section, sectionId=sectionId)

@app.route("/remove/<formName>/<section>", methods=["GET", "POST"])
def remove(formName, section):
  form = dotdict(db["forms"][hash_id(formName)])
  sections = json.loads(form["sections"])
  del sections[section]
  form["sections"] = json.dumps(sections)
  db["forms"][hash_id(formName)] = form
  
  flash("Section removed!")
  return redirect(url_for('sections', formName=formName))
```

The `section` method requires a `formName` argument (remember that sections are the details in the master-detail model), and can receive an optional one (`sectionId`) if you need to initialize, add, or edit a section in a form.

### Building the Views

The views for the CRUD actions are simple [Jinja](https://jinja.palletsprojects.com/en/3.0.x/templates/) templates composed of HTML and some render logic that creates a simple layout.

To create the layout, create a new folder in Replit named `templates` and then add a file named `layout.html` with the following contents:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Dynaforms v1</title>
    </head>
    <body>
    {% with messages = get_flashed_messages() %}
        {% if messages %}
            <ul class=flashes>
            {% for message in messages %}
            <li>{{ message }}</li>
            {% endfor %}
            </ul>
        {% endif %}
    {% endwith %}

    <ul>
        <li><a href="/">View forms</a></li>
        <li><a href="/add">Create form</a></li>
    </ul>


    {% block body %}{% endblock %}
    </body>
</html>
```

The layout contains three common elements: 
* a header with all the messages included to confirm operations
* two links to the basic actions of the application (list all the available forms and create a new form)
* the render of the body of the derived views 

Now that the layout is defined, create a new `list.html` file. This will be the view that shows the available forms with the following code:

```html
{% extends "layout.html" %}
{% block body %}
    <h1>DynaForms</h1>
    <ul>
    {% for id, f in forms.items()|sort(attribute='1.name') %}
        <li><a href="/section/{{ f.name }}">{{ f.name }} </a> | <a href="/sections/{{ f.name }}">Sections</a> | <a href="/execute/{{ f.name }}">Respond</a> | <a href="/add/{{ f.name }}">Edit</a>  | <a href="/delete/{{ f.name }}">Delete</a> 
        {% if f["answers"].keys()|length > 0 %}
        | <a href="/answers/{{ f.name }}">View answers</a> 
        {% endif %}
        </li>
    {% endfor %}
    </ul>

{% endblock %}|
```

This view extends the previously created `layout` and adds a body that iterates over the forms dictionary and renders the name of the form and some useful links to other actions. 

Once the list view is done, continue with the add/edit view for the FormContainer. This requires you to render an HTML form that captures the name of the FormContainer, the associated Google Spreadsheet ID, and the workflow definition.

Before you create the view, it’s helpful to render the FormContainer form by adding a new `macros.html` file with the this code:

```html
{% macro render_field(field) %}
  <dt>{{ field.label }}
  <dd>{{ field(**kwargs)|safe }}
  {% if field.errors %}
	<ul class=errors>
	{% for error in field.errors %}
  	<li>{{ error }}</li>
	{% endfor %}
	</ul>
  {% endif %}
  </dd>
{% endmacro %}
```

Create an `add.html` file to leverage the power of WTForm to render the add/edit view of the `add` action:

```html
{% extends "layout.html" %}
{% block body %}
    {% from "_macros.html" import render_field %}
    <h1>Create Form</h1>
    <form action="/add/{{formName}}" method="post">
      <dl>
        <dt>Title:
        <dd>{{ form.name }}
        <dt>Workflow:
        <dd>{{ form.workflow(cols="50", rows="20")|safe }}
      </dl>
        
      {{ form.submit }}
    </form>
{% endblock %}
```

This template creates a static form that captures the name of the FormContainer and its workflow. To show the sections of a single FormContainer, add a `sections.html` view—this will iterate over each section in a form and uses JavaScript to highlight the JSON definition of the section:

```html
{% extends "layout.html" %}
{% block body %}
    <h1>{{form.name}} - Form sections</h1>
    <div><a href="/section/{{form.name}}/{{newSectionId}}">Add section</a></div>
    <table>
     <thead>
        <tr>
          <th>Id</th><th>JSON definition</th><th>Actions</th>
        </tr>
     </thead>
     <tbody>
       {% for k,v in sections.items() %}
        <tr>
          <td>{{k}}</td>
          <td>
            <pre>
              <code class="language-json">{{v|tojson_pretty|safe}}</code>
            </pre>
          </td>
          <td>
            <a href="/section/{{form.name}}/{{k}}">Edit</a> | 
            <a href="/remove/{{form.name}}/{{k}}">Delete</a> 
          </td>
        </tr>
       {% endfor %}
     </tbody>
    </table>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/languages/json.min.js"></script>
<script>hljs.highlightAll();</script>
{% endblock %}
```

At this point, you can run the code using the big green button in the Replit’s IDE to test the first CRUD set of actions that manages the FormContainer lifecycle.

### Dynamic Form Rendering

The previous sections created the structure needed to hold the forms, but now they need to be rendered to collect answers. To do this, you need execution logic that will evaluate the workflow defined and render the proper section.

You can view the default workflow as a simple flowchart:

![Default workflow flowchart](https://i.imgur.com/zcGHLNY.png)

The condition to show the `more` or the `end` section depends on the value of the `name` field. If it’s equal to the `none` string, then the `end` section will be rendered. Otherwise more details are collected using the `more` section. 

> The condition uses the [Python's String `lower()` method](https://docs.python.org/3/library/stdtypes.html#str.lower) method. You can use any of Python's methods as part of the condition definition. 

Previously you defined the method `evaluate( wf, step, vals)` in the  `utils.py` file. This is used to evaluate the conditions and return the next step to be rendered:

```python
def evaluate( wf, step, vals):
  answer = dotdict(vals)

  if step != "" and "transitions" in wf[step]:
    for t in wf[step]["transitions"]:
      try:
        if eval(t["condition"],{'__builtins__':{}, "answer":answer}) == True:
          return str(t["taskId"])
      except Exception as e:
        logger.error('Error evaluating condition: %s' % t["condition"])
        logger.error(e)

  return 'init'    
```

To evaluate the condition of the workflow definition, the current step and the current values of the answers are crucial.

The first step in any workflow is the one labeled as `init`. It’s the default returned value. Otherwise each transition is evaluated using Python's eval function. This function takes the condition defined and passes the current state of the answer dictionary as an object to be used in the evaluation.

In this way, the condition `answer.name.lower() == 'None'.lower()` takes the value of the `name` field in the current answer and compares it to a fixed value. When the first condition is evaluated as True, the method returns the step defined in the transition as the next step.

This evaluation logic requires an action in the controller that will take the formName as an argument to initialize the workflow execution with a new answer. This action loads the proper section to be rendered in each step of the execution. 

In the `main.py` file the `execute` action is defined:

```python
@app.route('/execute/<formName>', methods=["GET", "POST"])
def execute(formName):
  vals = {}
  currStep = ""
  formId = hash_id(formName)
  formData = dotdict(request.form)
  form = dotdict(db["forms"][formId])
  #keys of the dynamic form that comes as part of the response but are not needed as part of the workflow evaluation
  metaKeys = ["formName", "formResponseId", "sectionName", "submit"]
  formResponseId = formData.formResponseId if "formResponseId" in formData else str(uuid.uuid4())
  currVals = db["forms"][formId]["answers"][formResponseId] if formResponseId in db["forms"][formId]["answers"] else vals
  
  if request.method == "POST":
    currStep = formData["sectionName"]
    vals = { k:v for (k,v) in formData.items() if k not in metaKeys}
  
  currVals.update( vals )  
  #workflow's transition evaluation
  currStep = evaluate( json.loads(form.workflow), currStep, currVals )
  #persist the current answer values
  db["forms"][formId]["answers"][formResponseId] = currVals
  #load the section to be rendered in the next step
  section = [{k:val for (k,val) in v.items()} for v in json.loads(form.sections)[currStep]]

  return render_template('navigate.html', formName=form.name, section=json.dumps(section),  sectionName=currStep, formResponseId=formResponseId)
```

The companion view `navigate.html` defines a static form that always goes to the same `execute` action. It includes hidden fields to pass the form definition and current step being rendered:

```html
{% extends "layout.html" %}
{% block body %}
    <h1>{{formName}} - {{sectionName}}</h1>
    <section id="sectionName">
      <div>
        <form id="form" action="/execute/{{formName}}" method="POST">
          <input type="hidden" name="formName" value="{{formName}}"/>
          <input type="hidden" name="sectionName" value="{{sectionName}}"/>
          <input type="hidden" name="formResponseId" value="{{formResponseId}}"/>
          <div id="formContainer"></div>
        </form>
      </div>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
      <script src="https://formbuilder.online/assets/js/form-render.min.js"></script>
      <script>
        jQuery($ => {
          const escapeEl = document.createElement("textarea");
          const formData = '{{section|safe}}';
          const addLineBreaks = html => html.replace(new RegExp("><", "g"), ">\n<");
          // Grab markup and escape it
          const $markup = $("<div/>");
          $markup.formRender({ formData });
          
          // set < code > innerText with escaped markup
          $("#formContainer").append( addLineBreaks($markup.formRender("html")) );
        });
      </script>
    </section>
{% endblock %}
```

It also uses the [jQuery's](https://jquery.com) form-render plugin to dynamically add the HTMLl fields defined in the section of the current step. Once you click the `respond` link for each form, the execution starts with a new answer. 

You can add a simple view of the form's answers by adding the `answers` action to the `main.py` file. Rely on the logic to transform the collection of dictionaries that represents the answers in the Replit's database into a simple tabular form of the previously defined `tabulate answers` method:

```python
@app.route('/answers/<formName>')
def answers(formName):
	form = db["forms"][hash_id(formName)]
	headers, table = tabulate_answers(form["answers"])

	return render_template('answers.html',
                       	form=form,
                       	keys=headers,
                       	answers=table)
```

The `answers.html` view renders the table with all the collected answers for the current FormContainer:

```html
{% extends "layout.html" %}
{% block body %}
    <h1>{{form.name}} - Answers</h1>
    <table>
      <thead>
        <tr>
      {% for k in keys %}
          <th><b>{{k}}</b></th>
      {% endfor %}
        </tr>
      </thead>
      {% for r in answers %}
          <tr>
            {% for c in r %}
            <td>{{c}}</td>
            {% endfor %}
          </tr>
      {% endfor %}
    </ul>

{% endblock %}
```

![Dynamic answers collected](https://i.imgur.com/AjYLjiM.png)

Notice that one execution took the direct ending path (the `surname` field was not collected), and the other one followed the entire workflow.

### Export to Google Spreadsheets

Now that you can define dynamic forms and collect answers, you can share them using Google Spreadsheets. To do this, create a new project in the [Google Cloud Platform](https://console.cloud.google.com) using the console.

![Google Cloud project](https://i.imgur.com/CHgmD7E.png) 

Activate the Google Sheet API for the project using the Google Console API [Library](https://console.cloud.google.com/apis/library).

![Google project add API](https://i.imgur.com/J7IDZMU.png)

After activation, you need a [service account](https://developers.google.com/identity/protocols/oauth2/service-account#python) to access the spreadsheet. You can add a new service account using the [IAM & Admin management](https://console.cloud.google.com/iam-admin/serviceaccounts) Google Console.

![Create a service account](https://i.imgur.com/1poulCT.png)

Remember to grant the editor role to the service account in order to be able to modify the spreadsheet associated with the FormContainer.

![Add the editor role](https://i.imgur.com/V4y8hhR.png)

Grant user access to the service account.

![Grant user access](https://i.imgur.com/pkFGr28.png)

Finally, you need a JSON file key to identify the service account through the API. Generate these through the KEYS tab of the service account by clicking **ADD KEY**.

![Add new key](https://i.imgur.com/lqnMkzh.png)

Copy the contents of the JSON file and return to the Replit IDE. Click **Lock** to create a new Secret.

![Secrets or env vars](https://i.imgur.com/3Q2UVjr.png)

Name the Secret `google-json-key` and copy the entire contents of the JSON key file previously created.

![Google secret key env var](https://i.imgur.com/kxiCHMo.png)

This is the environment variable read in the `load_user_secrets_from_local` method of the `gsheets.py` defined before. Now the `write_spread_sheet_data` can send an authenticated request to the API to update the spreadsheet with all the answers collected from a form. 

Finally, add the following code to the `main.py` file:


```python
@app.route('/export/<formName>')
def export_gs(formName):
	form = db["forms"][hash_id(formName)]
	headers, table = tabulate_answers(form["answers"])
	cells = write_spread_sheet_data(form["spreadsheet_id"], headers, table)
	flash("%s Answers of %s exported to google sheets" % (formName, cells))
	return redirect(url_for('list'))
```

This method takes the tabulated answers and writes them to the spreadsheet defined as an attribute of the current FormContainer. As feedback, it will render the number of answers written into the spreadsheet.

But before you can do that, you must share the spreadsheet with the user of the service account created (you can find the email at the `client_email` key of the JSON file generated).

![Shared spreadsheet](https://i.imgur.com/W37YjEA.png)

## Going Further

You can improve this schema of dynamic form rendering in several ways. Consider the following suggestions using Replit's environment:

* Add an authentication/authorization schema based on the current user's profile, a simple matter with Replit's [ReplitAuthContext](https://replit-py.readthedocs.io/en/latest/api.html#replit.web.app.ReplitAuthContext). A working example of how to use it is available on the [Technical Challenge Website](https://docs.replit.com/tutorials/28-technical-challenge-site).
* It’s [dangerous to use `eval` to evaluate the transition's conditions](https://nedbatchelder.com/blog/201206/eval_really_is_dangerous.html). The JSON schema used to define the workflow is fragile. Explore the possibility of replacing it with a more industry-standard workflow like the
[BPMN Specification (Business Process Model and Notation)](https://spiffworkflow.readthedocs.io/en/latest/).
* The SectionForm editor could use the jQuery's [*form-builder*](https://formbuilder.online/) plugin to allow end users to create their sections following the [WYSIWYG paradigm](https://en.wikipedia.org/wiki/WYSIWYG).
* Extend the solution to include dynamic CSS style definitions for the section's rendering view. This will make your forms more aesthetically pleasing and user-friendly. They can also be improved to respond and render properly on mobile devices.
* Add a method to export the collected answers as a CSV file or another format to be used in a spreadsheet, like [LibreOffice](LibreOffice).

## Conclusion 

Using [Replit's](https://replit.com/) platform makes it easy to create a simple MVC web application. With the code editor, file manager, and Replit's key-value database, you can create CRUD interfaces and a dynamic yet simple evaluation engine. 

Use or fork the [repl from this tutorial](https://replit.com/@NicolasBohorqu1/Dynaform?v=1) and continue to practice setting up simple form websites that are more customizable than Google Forms.
