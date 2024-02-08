// Dependencies
require("dotenv").config();
const express = require("express");

// Imports
const connection = require("./db/connection");
const bookRouter = require("./books/routes");

// Create an Express application
const app = express();

// Middleware
app.use(express.json());

// Call the 'connection' function
connection();

app.use("/books", bookRouter);

// The app.listen method starts the server and makes it listen for incoming requests on the specified port.
app.listen(5003, () => {
  // Log a message to the console to indicate that the server is running.
  console.log("Server is running on port 5003");
});
