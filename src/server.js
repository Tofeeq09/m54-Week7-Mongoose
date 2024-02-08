// Dependencies from the package.json file
require("dotenv").config();
const express = require("express");

// Imports from other files
const connection = require("./db/connection"); // From the connection.js file
const bookRouter = require("./books/routes"); // From the routes.js file

// Create an Express application
const app = express();

// Middleware to parse the request body as JSON
app.use(express.json());

// Call the 'connection' function imported from the connection.js file
connection();

// Mount the bookRouter on the "/books" path
app.use("/books", bookRouter);

// Starts the server and makes it listen for incoming requests on the specified port
app.listen(5003, () => {
  // Log a message to the console to indicate that the server is running.
  console.log("Server is running on port 5003");
});
