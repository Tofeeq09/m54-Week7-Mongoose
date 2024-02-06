// Code: Express.js server
const express = require("express");
// The require() function is used to load and cache JavaScript modules.

// The express() function is a top-level function exported by the express module.
const app = express();
// The express() function is used to create an Express application.

// The database is the repository where data is stored and managed.

// **Database operations** are the actions that are performed on the database.
// Read - GET
// Create - POST
// Update - PUT
// Delete - DELETE

// The HTTP response status codes are the messages that are returned by the server.
// HTTP response status codes: 200, 201, 400, 404, 500
// The HTTP response status code 200 OK indicates that the request has succeeded.
// The HTTP response status code 201 Created indicates that the request has succeeded and has led to the creation of a resource.
// The HTTP response status code 400 Bad Request indicates that the server cannot or will not process the request due to an apparent client error.
// The HTTP response status code 404 Not Found indicates that the server cannot find the requested resource.
// The HTTP response status code 500 Internal Server Error indicates that the server has encountered a situation it doesn't know how to handle.

// The fetch() function is a built-in JavaScript function that is used to make HTTP requests.
// const response = fetch("https://api.example.com/data"); // GET // Read // Retrieve data
// The fetch() function is used to make a GET request to the server.

const fakeArr = [];

app.use(express.json());
// The .json() method is used to parse incoming request bodies in a middleware before the handlers, available under the req.body property.

// The HTTP request methods are the actions that are performed on the server.
// HTTP request methods: GET, POST, PUT, DELETE

app.get("/getAllBooks", (req, res) => {
  // The app.get() function is used to make a GET request to the server.
  // The req parameter is the request object.
  // The res parameter is the response object.
  res.send({ message: "success", fakeArr: fakeArr });
  // The res.send() function is used to send a response to the client.
  // The res.send() function takes one argument: the data to send to the client.
  // This handles the GET request for the "/example" URL
});
// This handles the GET request for the "/getAllBooks" URL

app.post("/addBook", (req, res) => {
  console.log("request:", req.body);
  // The app.post() function is used to make a POST request to the server.
  // The req parameter is the request object.
  // The res parameter is the response object.
  const { bookName } = req.body;
  // The req.body property is used to access the data sent in the request body.
  // The req.body property is an object that contains key-value pairs of data sent in the request body.
  fakeArr.push(bookName);
  // The push() method is used to add an element to the end of an array.
  console.log("fakeArr:", fakeArr);
  res.send({ message: "success", newBook: fakeArr[fakeArr.length - 1] });
});
// This handles the POST request for the "/addBook" URL

app.put("/updateBook", (req, res) => {
  console.log("request:", req.body);
  // The app.put() function is used to make a PUT request to the server.
  // The req parameter is the request object.
  // The res parameter is the response object.
  const { bookName, index } = req.body;
  // The req.body property is used to access the data sent in the request body.
  // The req.body property is an object that contains key-value pairs of data sent in the request body.
  fakeArr[index] = bookName;
  // The assignment operator (=) is used to assign a value to a variable.
  console.log("fakeArr:", fakeArr);
  res.send({ message: "success", updatedBook: fakeArr[index] });
});
// This handles the PUT request for the "/updateBook" URL

app.delete("/deleteBook", (req, res) => {
  console.log("request:", req.body);
  // The app.delete() function is used to make a DELETE request to the server.
  // The req parameter is the request object.
  // The res parameter is the response object.
  const { index } = req.body;
  // The req.body property is used to access the data sent in the request body.
  // The req.body property is an object that contains key-value pairs of data sent in the request body.
  const deletedBook = fakeArr.splice(index, 1);
  // The splice() method is used to add or remove elements from an array.
  // index is the position at which to start changing the array and 1 is the number of elements to remove.
  console.log("fakeArr:", fakeArr);
  res.send({ message: "success", deletedBook: deletedBook });
});
// This handles the DELETE request for the "/deleteBook" URL

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
// The app.listen() function is used to start the server on the specified port.
// The app.listen() function takes two arguments: the port number and a callback function.
// The callback function is called when the server starts.
