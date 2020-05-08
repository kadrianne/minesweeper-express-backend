# Modern Minesweeper - Backend

This is the backend API for my Minesweeper game. This API allows the front-end to GET and POST users and scores to the database. 

Frontend respository: https://github.com/kadrianne/modern-minesweeper


## Built With
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).<br>
Frontend: HTML, CSS, JavaScript, React v16.13.1, [Material UI](https://material-ui.com/)<br>
Backend: Node.js v13.8.0, Express.js v4.17.1, Knex.js v0.21.1, Objection.js v2.1.3, PostgreSQL v12.2

## Features

### Authentication

BCrypt is used for hashing login and admin passwords and JWT is used for authentication in order to encode/decode a payloads. Access to get a specific users  API requires authentication for all actions with the exception of admin and guest login.

## Challenges

This was my first time building a Node/Express backend, so creating and managing the file structure was a new experience compared with an already structured backend like Rails. Also, there was a significant learning curve involved with Knex.js functions and what they returned in order to get and display data from the database. 

## Future Implementation
- Deployment to production server
- Add authorization for all routes

## Collaboration

1. Fork and/or clone this repo & the frontend repo - https://github.com/kadrianne/modern-minesweeper
2. Install dependencies: `npm install`
3. Create PostgreSQL database `createdb minesweeper`
4. Run backend server: `node index.js`
5. Migrate database tables: `npx knex migrate:latest`
6. Run frontend server: `npm start`
7. Checkout new branch
   
I have a GitHub project board with a few backlog items here: https://github.com/kadrianne/modern-minesweeper/projects/1<br>
If you'd like to collaborate on this project, please email me: kristine.a.du@gmail.com