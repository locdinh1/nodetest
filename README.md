#A Node Test

This is a Node JS test which displays a form, validates user inputs and save data into MongoDB. 

## Approach

This test has been written in TDD using MVC structure. 

I have taken following steps to build this project: 

1. Setup the skeleton ie: folder structure, server.js, routes etc...

2. config.js provides database details for test and dev environment, this is to save us from cleaning database each time running test. 

3. routes.js to handle requests and trigger appropriate actions. In this case we only have GET & POST to root folder. 

4. server.js does all the bootstrap actions ie: include dependencies, switch database connections, setup view engine, setup public folder, configure middleware and point to routes  

5. I wrote the shell for userFormController.js, userFormModel.js so they can be called in the tests

6. Created 2 test files in "tests" folder
    - getCountryListTest.js (To test the function that fetch country list from external end point)
    - userDataFormTest.js (To test validations on the form)

7. Ran "npm test", all test cases in these 2 files failed because I haven't written any code for business logics. 

8. I created 3 files in the "views" folder to handle 3 screens: the main form, thank you page and 404 page. These pages use the templates provided in GOV repository which makes they look on brand with other GOV services. I used EJS as the template engine. 

9. I started writting code to make the test pass: 
    - userFormController.js mainly does 3 things: display 404 page, display the form, validate and add user records. 
    - userFormModel.js creates database scheme and save the record. 
    - utils.js acts as a helper class which has common functions which could be used multiple time accross the whole project. 


------------------------------------


## Prerequisites
 
- [body-parser] - To handle POST request
- [chai] - TDD assertion library
- [chai-http] - Test http request
- [ejs] - Template engine
- [express] - Main framework
- [express-validator] - To validate user inputs
- [helmet] - To set HTTP header for security
- [mocha] - Test framework
- [mongoose] - To help with MongoDB interaction
- [request] - To assist with http calls

## Project Setup 
Assume you already have NodeJS and MongoDB installed. 

Please download or clone this project to your development folder, CD into this project folder then run


```
$ npm install

```

## Start project

Now all dependencies have been installed, to start project please enter: 

```
$ npm start

```

Then go to your browser, type in localhost:2000. You should see the service up and running. 


## Test project

To run test, please enter the following command: 

```
$ npm test

```
