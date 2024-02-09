// External Dependencies - From third-party packages.
require("dotenv").config();
const express = require("express");

// Internal Module Imports - From files within the project.
const connection = require("./db/connection"); // From the connection.js file
const bookRouter = require("./books/routes"); // From the routes.js file

// Express Application - Create an instance of an Express application.
const app = express();

// Middleware - To parse the request body as JSON.
app.use(express.json());

// Database Connection - Call the 'connection' function imported from connection.js.
connection();

// Routes - Mount the bookRouter on the "/books" path.
app.use("/books", bookRouter);

// Starts the server and makes it listen for incoming requests on the specified port.
app.listen(5003, () => {
  // Log a message to the console to indicate that the server is running.
  console.log("Server is running on port 5003");
});
