myreddit

A simple reddit clone
This is a sample portfolio application using the following technologies:

 * React
 * NodeJS
 * Typescript
 * Express
 * Jest
 * Bcrypt
 * MySQL database backend

To create the database:
    cd server
    npm run init-db

-- Server Setup

To compile the server code
    npm update
    npm install
    npx tsc

To run unit tests:
    npm run test

To run the server manually:
    npm start

To *debug* (set breakpoints, etc) the application in VSCode:
    For client debugging, open a terminal and start the server with
        * cd client
        * npm start

    Next, go to the "Run and Debug" and select one of the dropdown options:
        * "Debug React App"
        * "Debug Express Server"
        * "Debug Full Stack" for both
