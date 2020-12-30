# Sorting Algorithm Visualizer

- [SortingAlgorithmVisualizer](#Sorting Algorithm Visualizer)
  - [Installation](#Deployment)
  - [Deployment](#deployment)
  - [Font-end](#front-end)
    - [Technologies Used](#technologies-used)
    - [Dependencies](#dependencies)
  - [Back-end](#back-end)
    - [Technologies Used](#technologies-used-1)
    - [Dependencies](#dependencies-1)
    - [Authentication](#authentication)
    - [Routes Available](#routes-available)

## Installation

Information and instructions on setting up a development environment can be found in the [wiki](https://github.com/SEI-39/developerverse/wiki/Development-Environment)

## Deployment

Deployed: https://tmurphy-sorting-algorithms.netlify.app/

For information on Netlify deployment see the Wiki @ [Netlify](https://github.com/SEI-39/developerverse/wiki/Deployed-via-Netlify)

For Heroku deployment see the Wiki @ [Heroku](https://github.com/SEI-39/developerverse/wiki/Deploying-via-Heroku)

## Front-end

### Technologies Used

- [JavaScript](https://www.javascript.com/)
- [NodeJS](https://nodejs.org/en/)
- [Netlify](https://www.netlify.com/) - A free website hosting service

### Dependencies

- [ReactJS](https://reactjs.org/) - A client-side JavaScript library for building interfaces
- [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
- [React-Router](https://www.npmjs.com/package/react-router) - A package providing dynamic routing functionality for web apps
- [React-Router-Dom](https://www.npmjs.com/package/react-router-dom) - A package containing the DOM bindings for react-router

## Back-end 

### Technologies Used

- [Python](https://www.python.org/)
- [Heroku](https://www.heroku.com/) - to host a deployed version of the API remote
- [PostgreSQL](https://www.postgresql.org/) - An open source SQL database

### Dependencies

- [Django](https://www.djangoproject.com/) - A high level Python Web Framework
- [Django Rest Framework](https://www.django-rest-framework.org/) - A Django extension for building APIs

### Authentication

In order to authenticate, you need to create an account or log in with an email and password on the route `users/create`

Once created, you will recieve a token as a response

Add that token to your request headers in this format:

| **Key** | **Value** |
| ------- | --------- |
| Authorization | token *your token here* |

And you will have full access to the API!

### Routes Available

The following routes are available

| **Route name**  | **URL**                 | **HTTP Verb** | **Description**                                                         |
| --------------- | ----------------------- | ------------- | ----------------------------------------------------------------------- |
| Index*          | /{resource}             | GET           | Display a list of all Project or Comment                                |
| Show ID*        | /{resource}/{:id}       | GET           | Display a specific Project or Comment based on their ID                 |
| Create*         | /{resource}/create      | POST          | Add new Project or Comment to the database, returns the newly created entry |
| Edit By Id*     | /{resource}/{:id}       | PATCH         | Update a particular Game or Review, returns the new entry               |
| Delete By Id*   | /{resource}/{:id}       | DELETE        | Delete a particular Game or Review                                      |
| Login           | /users/login            | POST          | Logs in with a username and password, returns an authentication token   |
| Create          | /users/create           | POST          | Creates a user and returns an authentication token                      |

Routes marked with `*` need authentication to be accessed
