# Authenticated-Api-Server

## Author: Davee Sok

## Overview

An Express/Node.js based server using a custom “authentication” module that is designed to handle user registration and sign in using Basic, Bearer, or OAuth along with a custom “authorization” module that will grant/deny users access to the server based on their role or permissions level. It can dynamically perform CRUD operations to a MongoDB database and power multiple different frontend applications, using the REST standard.

## Links and Resources

- [CI/CD](https://github.com/davee-401-advanced-javascript/authenticated-api-server/actions) (GitHub Actions)
- [Back-End Server URL](https://davee-auth-api-server.herokuapp.com/)

## Technical Requirements

The application will be created with the following overall architecture and methodologies

1. Node.js
2. ES6 Classes and best practices
3. ExpressJS Web Server, built modularly

   - Middleware for handling 404 and 500 conditions
   - Middleware for handling the dynamic loading of the correct data model as specified in the route
     - Inspect the route, looking for the model name
     - require() the correct module model (i.e. if the model is categories, require('src/models/categories/categories-model.js'))
   - Use a single router (v1.js) to handle the ReST methods for CRUD for any model
   - express.params middleware

4. Persistence using a Mongo Database (NoSQL)
5. Mongoose Schemas (data models) to define and model data
6. Mongoose Model “wrapper” class to serve as the API between the express server and the data models themselves
7. Test Driven Development, using Jest
   - Tests will be runnable locally
   - Tests will auto-execute (CI) in your repo using GitHub actions
   - Tests will use a 3rd party library called supergoose to:
     - “mock” the mongo running database
     - “mock” the running Express server
8. Deployment to Heroku

## Getting Started

- Make sure MongoDB is installed locally
- Clone down this repo
- Install Dependencies: `npm install`
- Create an .env file and add the following:

```javascript
PORT=3000
MONGODB_URI=mongodb://localhost:27017/authenticated-api-server
SECRET= << Pick a secret word. This is to authenticate a token with your front end application>
CLIENT_ID= get this from github
CLIENT_SECRET= get this from github
STATE= pick anything you want
TOKEN_SERVER=https://github.com/login/oauth/access_token
REDIRECT_URI=http://localhost:3000/oauth
REMOTE_API=https://api.github.com/user
```

- Run `nodemon index.js`

## How to use this server:

The following routes are available:

```JavaScript
/signup
/signin

api/v1/categories
api/v1/products
api/v1/todo

api/v2/categories
api/v2/products
api/v2/todo
```

## Tests

- In the terminal enter: `npm test`
