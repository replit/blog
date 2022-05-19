---
title: Input/Outputing Testing & Autograding
author: Wade Bourne & Derrick McMillen
date: 2020-12-16
cover: https://repl.art/multi2.png
categories: edu
---

Today, a highly requested feature has been released: **Input/Output testing & autograding**.  The Input/Output Tests pane is embeded within all new and existing Teams for Education projects.

<img src="https://cms.repl.it/assets/input-output-tests.png" style="width: 400px" alt="input/output tests">

This pane contains tools designed to simplify testing code. Instead of manually entering typing input and checking output for every submission, the autograder allows you to define and automate testing. 

## How do I use it?

Input/Output tests is only available for projects created within the [Teams for Education](https://repl.it/teams) product. This feature is available on all projects - new and existing. 

Click on the <img src="https://cms.repl.it/assets/input-output-tests-checkmark.png" alt="checkmark" style="width: 30px; margin: 0; display: inline-block; vertical-align: middle;"> icon within the workspace sidebar nav to reveal the Input/Output tests pane.

Click on the <img src="https://cms.repl.it/assets/input-output-tests-create-test.png" alt="create test button" style="width: 100px; margin: 0; display: inline-block; vertical-align: middle;"> button to reveal a form with the following fields:

<img src="https://cms.repl.it/assets/input-output-tests-create.png" alt="create test form" style="width:400px">

+ `Test name` - This is the name of the test, which is for you and your students to identify it. 
+ `Input` (optional) - This is where you put in the input for your test. 
+ `Expected output` - This is the output which the program is expected to have.
+ `Type` (default: `match`) - This is how we represent how we compare the actual output of the script with the expected output.
    + `match` - The test passes if the expected output is in (or equal to) the actual output.  The JavaScript equivalent is `actualOutput.includes(expectedOutput)`. 
    + `exact` - The test passes if the expected output is equal to the actual output. (though, we allow a trailing newline). The equivalent to this in JavaScript is `expectedOutput === actualOutput || expectedOutput + '\n' === actualOutput`.
    + `regex` - The test passes if the test matches the expectedOutput compiled as a regex. This is equivalent to `actualOutput.match(expectedOutput)`. 

If you don't want to be lenient of an extra newline and have a truly exact match with the expectedOutput and actualOutput, you can use the `regex` with a `^` at the start and `$` at the end. Keep in mind though, that you'll have to escape other regex characters.

Tests cases can be added, edited, and deleted at any time - even after the project has been published. This added flexibility allows you to get started with testing right away. 

If a test fails, you can view the results by clicking <img src="https://cms.repl.it/assets/input-output-tests-results-btn.png" alt="results button" style="width: 70px; margin: 0; display: inline-block; vertical-align: middle;"> that appear on each test case:

<img src="https://cms.repl.it/assets/input-output-tests-failed.png" 
alt="input output test failed" style="width:400px">


## What if I want to add tests to a pre-existing project?

All changes applied to Input/Output tests within a project will be applied to the submissions automatically. Students will not need to refork to the original project to use updated test cases from their instructors. 

## Migrating from Repl.it Classroom

Input/Ouput tests created within Repl.it Classroom assignments can now be migrated to Teams for Education using the [Classroom Migration Tool](https://repl.it/classroom-migration). 

If you migrated your Classroom since 12/11/2020, you'll see your input/output tests in your new Team. If you migrated your Classroom before then, you'll be able to migrate your Classroom again.

## Giving Feedback Goes a Long Way

Teachers continue to express their enthusiasm for multiplayer Repls, annotations, and group projects. We will continue to build on these new platform features to provide a seamless collaborative experience for project based learning. 

Are you dreaming of Repl.it features to make you a superhero in your classroom? We want to hear about it! Contact [Derrick McMillen](mailto:derrick@repl.it) directly via email. You can also leave feedback for us [via Canny](https://repl.it/feedback/p/teams-for-education-autograder-inputoutput-tests).

![replbot](https://repl.art/multi2.png)

Learn more about *Teams for Education* in our [documentation](https://docs.repl.it/Teams/Projects).
