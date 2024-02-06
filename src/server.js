// Code: Express.js server
const express = require("express");
// The require() function is used to load and cache JavaScript modules.
// The express module is a third-party module that is used to create web servers in Node.js.

// The require("express") statement is used to import the Express.js module into your file.
// This statement returns a function, which we're storing in the variable express.
// When you call express(), it creates a new instance of an Express application.
// This instance is an object that has methods for setting up and controlling the behavior of an Express server.
// We're storing this instance in the variable app.

// So, app is related to require("express") and express() in the following way:
// 1. require("express") imports the Express.js module and gives you a function for creating new Express applications.
// 2. express() calls this function and creates a new Express application.
// 3. app is the variable where we store this new Express application.

// app is an object because the express() function returns an object.
// This object has methods for configuring the server, such as app.get(), app.post(), app.use(), and many others.
// These methods are used to set up routes, middleware, and other server behavior.

// app is an object because it's the most suitable data structure for representing an Express application.

// The express() function is a top-level function exported by the express module.
const app = express();
// The express() function is used to create an Express application.
// The app object is used to configure and start the Express application.

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const booksArray = [];
// The booksArray array is used to store the books in memory.

app.use(express.json());
// The .json() method is used to parse incoming request bodies in a middleware before the handlers, available under the req.body property.

// The HTTP request methods are the actions that are performed on the server.
// HTTP request methods: GET, POST, PUT, DELETE

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define a route handler for GET requests to "/books/getAllBooks"
app.get("/books/getAllBooks", (req, res) => {
  // The app.get() function is used to define a route handler for GET requests.
  // The first parameter is the URL path, and the second parameter is the route handler function.
  // The route handler function takes two parameters: the request object (req) and the response object (res).

  // The request object (req) represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
  // The response object (res) represents the HTTP response that an Express app sends when it gets an HTTP request.

  // Use the res.send() function to send a response to the client.
  // The res.send() function sends a response of various types. Here, it is sending an object as a JSON response.
  // This object contains a message and the current state of the booksArray array.
  res.send({ message: "success", books: booksArray });

  // After calling the res.send() function, the route handler function is done and no more code will be executed.
});
// This route handler responds to GET requests for the "/books/getAllBooks" URL path.
// When a GET request is made to this URL, the server responds with the current state of the booksArray array.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define a route handler for POST requests to "/books/addBook"
app.post("/books/addBook", (req, res) => {
  // app.post() is a method provided by Express.js to handle HTTP POST requests.
  // POST is used to send data to a server to create a new resource.

  // Log the request body to the console
  // The request body often contains the data you want to send to the server.
  console.log("request:", req.body);

  // Extract the title, author, and genre from the request body
  // This is done using JavaScript destructuring assignment.
  const { title, author, genre } = req.body;

  // Validate the request body
  // It's important to validate input to ensure that your program has the correct data types and values.
  if (
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof genre !== "string"
  ) {
    // If the validation fails, send a 400 Bad Request status code and an error message.
    // The 400 status code tells the client that the request was malformed.
    res.status(400).send({
      message: "failure",
      error:
        "Invalid request body. Expected format: { title: string, author: string, genre: string }",
    });
    return;
  }

  // Use the Array.prototype.some() method to check if a book with the same title already exists in booksArray
  // The some() method tests whether at least one element in the array passes the test implemented by the provided function.
  const bookExists = booksArray.some((book) => book.title === title);

  // If a book with the same title exists, send a response with the status code 400 (Bad Request) and an error message
  if (bookExists) {
    // The 400 status code tells the client that the request was malformed.
    res.status(400).send({
      message: "failure",
      error: "Book with the same title already exists",
    });
    return;
  }

  // If no book with the same title exists, add the new book to booksArray
  // The push() method adds new items to the end of an array, and returns the new length.
  booksArray.push({ title, author, genre });

  // Log the updated state of booksArray to the console
  console.log("booksArray:", booksArray);

  // Send a response with the status code 201 (Created), a success message, and the new book
  // The 201 status code tells the client that the request has been fulfilled and has resulted in one or more new resources being created.
  res
    .status(201)
    .send({ message: "success", newBook: booksArray[booksArray.length - 1] });
});
// This route handler responds to POST requests for the "/books/addBook" URL path.
// When a POST request is made to this URL, the server either adds a new book to booksArray (if no book with the same title exists)
// or sends an error message (if a book with the same title exists).

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define a route handler for PUT requests to "/books/updateBook"
app.put("/books/updateBook", (req, res) => {
  // The app.put() function is used to define a route handler for PUT requests.
  // The first parameter is the URL path, and the second parameter is the route handler function.
  // The route handler function takes two parameters: the request object (req) and the response object (res).

  // The request object (req) represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.

  // The response object (res) represents the HTTP response that an Express app sends when it gets an HTTP request.

  // Log the request body to the console
  console.log("request:", req.body);

  // Extract the title, author, genre, and index from the request body
  const { title, author, genre, index } = req.body;

  // If the title, author, genre, or index is not a string or number, or if the index is out of range, send a 400 Bad Request status code and an error message
  if (
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof genre !== "string" ||
    typeof index !== "number"
  ) {
    res.status(400).send({
      message: "failure",
      error:
        "Invalid request body. Expected format: { title: string, author: string, genre: string, index: number }",
    });
    return;
  }

  // Check if the index is valid (greater than or equal to 0 and less than the length of booksArray)
  if (index < 0 || index >= booksArray.length) {
    res.status(400).send({
      message: "failure",
      error:
        "Invalid index. Index should be between 0 and " +
        (booksArray.length - 1),
    });
    return;
  }

  // Update the book at the specified index in booksArray
  booksArray[index] = { ...booksArray[index], title, author, genre };
  // The spread operator is used to create a new object with the updated properties
  // The updated properties are title, author, and genre

  // 1. booksArray[index] accesses the book object at the specified index in the booksArray.
  // 2. { ...booksArray[index] } creates a new object that is a copy of the book object.
  // The ... is the spread operator, which copies all properties from the book object into the new object.
  // 3. { ...booksArray[index], title, author, genre } adds the title, author, and genre properties to the new object,
  // overwriting the corresponding properties if they already exist in the copied book object.
  // 4. booksArray[index] = ... assigns the new object back to the specified index in the booksArray,
  // effectively updating the book at that index.

  // So, this line is equivalent to the following code:
  // let book = booksArray[index]; // Get the book at the specified index
  // book.title = title; // Update the title
  // book.author = author; // Update the author
  // book.genre = genre; // Update the genre
  // booksArray[index] = book; // Assign the updated book back to the array

  console.log("booksArray:", booksArray);

  // Send a response with a status code of 200 (OK), a success message, and the updated book
  res.send({ message: "success", updatedBook: booksArray[index] });
});
// This route handler responds to PUT requests for the "/books/updateBook" URL path.
// When a PUT request is made to this URL, the server either updates a book in booksArray (if the index is valid)
// or sends an error message (if the index is invalid).

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.delete("/books/deleteBook", (req, res) => {
  // Log the request body to the console
  console.log("request:", req.body);

  // Extract the title from the request body
  const { title } = req.body;

  // Validate the request body
  // If the title is not a string, send a 400 Bad Request status code and an error message
  if (typeof title !== "string") {
    res.status(400).send({
      message: "failure",
      error: "Invalid request body. Expected format: { title: string }",
    });
    return;
  }

  // Use the Array.prototype.findIndex() method to find the index of the book with the given title in booksArray
  // The findIndex() method returns the index of the first element in the array that satisfies the provided testing function
  // If no elements satisfy the testing function, it returns -1
  const index = booksArray.findIndex((book) => book.title === title);

  // If no book with the given title is found, send a 400 Bad Request status code and an error message
  if (index === -1) {
    res.status(400).send({
      message: "failure",
      error: "No book with the given title was found",
    });
    return;
  }

  // Use the Array.prototype.splice() method to remove the book at the found index from booksArray
  // The splice() method changes the contents of an array by removing or replacing existing elements
  // Here, it removes 1 element at the found index
  const deletedBook = booksArray.splice(index, 1);

  // Log the updated state of booksArray to the console
  console.log("booksArray:", booksArray);

  // Send a response with a status code of 200 (OK), a success message, and the deleted book
  res.send({ message: "success", deletedBook: deletedBook[0] });
});
// This handles the DELETE request for the "/deleteBook" URL path
// When a DELETE request is made to this URL, the server either deletes a book from booksArray (if a book with the given title is found)
// or sends an error message (if no book with the given title is found).

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
// The app.listen() function is used to start the server on the specified port.
// The app.listen() function takes two arguments: the port number and a callback function.
// The callback function is called when the server starts.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// The routs that are used to add, update and delete books from booksArray need protection from unauthorized access.
// This is because anyone can send a request to these routes and modify the booksArray.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
