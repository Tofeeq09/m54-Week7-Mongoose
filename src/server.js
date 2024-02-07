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
// HTTP verbs are used to perform database operations.
// Read - GET
// Create - POST
// Update - PUT
// Delete - DELETE

// The HTTP response status codes are the messages that are returned by the server.
// HTTP response status codes: 200, 201, 400, 401, 403, 404, 500, etc.
// The HTTP response status code 200 OK indicates that the request has succeeded.
// The HTTP response status code 201 Created indicates that the request has succeeded and has led to the creation of a resource.
// The HTTP response status code 400 Bad Request indicates that the server cannot or will not process the request due to an apparent client error.
// The HTTP response status code 401 Unauthorized indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.
// The HTTP response status code 403 Forbidden indicates that the server understood the request, but refuses to authorize it.
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
// The express.json() middleware is used to parse incoming request bodies in a middleware before the handlers, available under the req.body property.

// The HTTP request methods are the actions that are performed on the server.
// HTTP request methods: GET, POST, PUT, DELETE
// The HTTP GET method is used to request data from a specified resource.
// The HTTP POST method is used to send data to a server to create a new resource.
// The HTTP PUT method is used to send data to a server to update a resource.
// The HTTP DELETE method is used to request that a specified resource be removed.

const jwt = require("jsonwebtoken");
const secret = "your-secret-key";

const users = [
  { username: "admin", password: "admin", role: "admin" },
  { username: "user", password: "user", role: "user" },
];

// The routes that are used to add, update, and delete books from booksArray need protection from unauthorized access.
// This is because anyone can send a request to these routes and modify the booksArray.
// To protect these routes, you can use authentication and authorization.
// Authentication is the process of verifying the identity of a user.
// Authorization is the process of determining what a user is allowed to do.
// You can use authentication to verify the identity of the user who is making the request, and authorization to determine if the user is allowed to perform the requested action.
// JSON Web Tokens (JWT) can be used for authentication and authorization.
// JWT is a standard for securely transmitting information between parties as a JSON object.
// JWTs are commonly used for authentication and authorization in web applications.
// The jsonwebtoken library can be used to generate and verify JWTs in your Express.js application.
// Middleware functions can be used to protect routes from unauthorized access.
// Middleware functions have access to the request object (req), the response object (res), and the next function in the application's request-response cycle.
// They can be used to perform tasks such as authentication, authorization, logging, error handling, and more.
// Middleware functions can protect routes by checking if the user is authenticated and authorized before allowing access to the route handler function.
// If the user is not authenticated or authorized, a response with a 401 Unauthorized status code and an error message can be sent.
// If the user is authenticated and authorized, the next function can be called to allow access to the route handler function.
// This way, routes can be protected from unauthorized access and ensure that only authenticated and authorized users can perform the requested actions.
// Here's are two examples of how middleware functions can be used to protect routes in an Express.js application:

///////////////////////////////////
//// JWT (JSON Web Tokens) can be used for the middleware function to authenticate and authorize users.
const authenticateUser = (req, res, next) => {
  // Middleware function that takes three parameters: the request object (req), the response object (res), and the next function (next).
  // The next function is a callback function that is called to pass control to the next middleware function in the application's request-response cycle.
  // The next function is used to pass control to the next middleware function in the application's request-response cycle.
  // If the next function is not called, the request will be left hanging and the client will not receive a response.

  const token = req.headers.authorization;
  // The req.headers.authorization property is used to access the Authorization header of the HTTP request.
  // The Authorization header is used to send credentials (such as a JWT) to access protected routes.
  // The token is extracted from the Authorization header and stored in the token variable.

  if (!token) {
    // If the token is missing, send a response with a 401 Unauthorized status code and an error message.
    res.status(401).send({ message: "Unauthorized" }); // The 401 status code tells the client that the request has not been applied because it lacks valid authentication credentials for the target resource.
    // The message is sent to the client and can be used to display an error message to the user.
    // The error is sent to the client and can be used to display the specific error message to the user.
    // After calling the res.send() function, the route handler function is done and no more code will be executed.
    return;
    // The return statement is used to stop the execution of the route handler function after sending the response.
  }

  // The try...catch statement is used to handle errors in the code.
  try {
    // The try block is used to enclose the code that might throw an error.
    const user = jwt.verify(token, secret); // The parameter is the token, which is used to verify the authenticity of a JWT.
    // The jwt.verify() function is used to verify the authenticity of a JWT.
    // The first parameter is the token, which is the JWT to verify.
    // The second parameter is the secret key, which is used to verify the signature of the token.
    req.user = user; // The req.user property is used to store the user object.
    next(); // The next function is called to pass control to the next middleware function in the application's request-response cycle.
  } catch (error) {
    // The catch block is used to handle errors that occur in the try block.
    res.status(401).send({ message: "Unauthorized" }); // The 401 status code tells the client that the request has not been applied because it lacks valid authentication credentials for the target resource.
    // The message is sent to the client and can be used to display an error message to the user.
    // The error is sent to the client and can be used to display the specific error message to the user.
    // After calling the res.send() function, the route handler function is done and no more code will be executed.

    return;
    // The return statement is used to stop the execution of the route handler function after sending the response.
  }
};

///////////////////////////////////
//// Login and Password can be used for the middleware function to authenticate and authorize users.

// const authenticateUser = (req, res, next) => {
//   const { username, password } = req.body;
//   const user = users.find(
//     (user) => user.username === username && user.password === password
//   );
//   if (!user) {
//     res.status(401).send({ message: "Unauthorized" });
//     return; // The return statement is used to stop the execution of the route handler function after sending the response.
//   }
//   req.user = user;
//   next();
// };

// The authenticateUser middleware function is used to verify the identity of the user making the request.
// If the user is not authenticated, the middleware function sends a response with a 401 Unauthorized status code and an error message.
// If the user is authenticated, the middleware function calls the next function to allow access to the route handler function.
// The authorizeUser middleware function is used to determine if the user is allowed to perform the requested action.
// If the user is not authorized, the middleware function sends a response with a 403 Forbidden status code and an error message.
// If the user is authorized, the middleware function calls the next function to allow access to the route handler function.
// The route handler functions for adding, updating, and deleting books are protected by the authenticateUser and authorizeUser middleware functions.
// This ensures that only authenticated and authorized users can access these routes and modify the booksArray.

// The middleware functions authenticateUser and authorizeUser are used to protect the routes for adding, updating, and deleting books.
// If the user is not authenticated or authorized, the middleware functions send a response with the appropriate status code and error message.
// If the user is authenticated and authorized, the middleware functions call the next function to allow access to the route handler function.
// This way, the routes for adding, updating, and deleting books are protected from unauthorized access.

const authorizeUser = (req, res, next) => {
  // Middleware function that takes three parameters: the request object (req), the response object (res), and the next function (next).
  // The next function is a callback function that is called to pass control to the next middleware function in the application's request-response cycle.
  // The next function is used to pass control to the next middleware function in the application's request-response cycle.
  // If the next function is not called, the request will be left hanging and the client will not receive a response.

  // If the user is not authorized, the middleware function sends a response with a 403 Forbidden status code and an error message.
  if (req.user.role !== "admin") {
    // If the req.user.role property is not equal to "admin", send a 403 Forbidden status code and an error message
    // If the req.user.role property is not equal to "admin", send a 403 Forbidden status code and an error message
    // The req.user.role property is used to check if the user is an admin.
    res.status(403).send({ message: "Forbidden" }); // The 403 status code tells the client that the server understood the request, but refuses to authorize it.
    // The message is sent to the client and can be used to display an error message to the user.
    // The error is sent to the client and can be used to display the specific error message to the user.
    // After calling the res.send() function, the route handler function is done and no more code will be executed.
    return;
    // The return statement is used to stop the execution of the route handler function after sending the response.
  }
  next();
  // The next function is called to pass control to the next middleware function in the application's request-response cycle.
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define a route handler for POST requests to "/login"

app.post("/books/login", (req, res) => {
  // The app.post() function is used to define a route handler for POST requests.
  // The first parameter is the URL path, and the second parameter is the route handler function.
  // The second parameter is the route handler function.
  // The route handler function takes two parameters: the request object (req) and the response object (res).

  // Extract the username and password from the request body
  // This is done using JavaScript destructuring assignment.
  const { username, password } = req.body;
  // The request body often contains the data you want to send to the server.

  // Validate the request body
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  // The find() method returns the value of the first element in the provided array that satisfies the provided testing function.
  // The testing function is used to check if the username and password match the user object in the users array.

  if (!user) {
    // If the user is not found, send a 401 Unauthorized status code and an error message
    res.status(401).send({
      // The 401 status code tells the client that the request has not been applied because it lacks valid authentication credentials for the target resource.
      message: "Unauthorized",
      // The message is sent to the client and can be used to display an error message to the user.
      // The error is sent to the client and can be used to display the specific error message to the user.
      // After calling the res.send() function, the route handler function is done and no more code will be executed.
    });
    return;
    // The return statement is used to stop the execution of the route handler function after sending the response.
  }
  // If the validation passes, continue with the next steps.

  const token = jwt.sign({ username: user.username, role: user.role }, secret);
  // The jwt.sign() function is used to generate a JWT.
  // The first parameter is the payload, which is an object containing the data you want to encode in the token.
  // The second parameter is the secret key, which is used to sign the token and verify its authenticity.
  // The jwt.sign() function returns a JWT as a string.
  // The message can be used to display a success message to the user.
  // This JWT can be sent to the client and used to authenticate and authorize the user.
  // The client can send the JWT in the Authorization header of the HTTP request to access protected routes.
  // The server can verify the JWT using the jwt.verify() function to authenticate and authorize the user.
  // The jwt.verify() function returns the payload of the JWT if the token is valid, and throws an error if the token is invalid.
  // The secret key is used to sign the token and verify its authenticity.
  // It should be kept secret and never shared with anyone.

  res.send({ token });
  // Use the res.send() function to send a response to the client.
  // The res.send() function sends a response of various types. Here, it is sending an object as a JSON response.
  // This object contains a message and the JWT.
  // The JWT is sent to the client and can be used to authenticate and authorize the user.
  // The message is sent to the client and can be used to display a success message to the user.
  // After calling the res.send() function, the route handler function is done and no more code will be executed.
});
// This route handler responds to POST requests for the "/login" URL path.
// When a POST request is made to this URL, the server either sends a JWT (if the username and password are valid)

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define a route handler for GET requests to "/books/getAllBooks"

app.get("/books/getAllBooks", authenticateUser, (req, res) => {
  // The app.get() function is used to define a route handler for GET requests.
  // The first parameter is the URL path, and the second parameter is the route handler function.
  // The second parameter is a middleware function that is used to authenticate and authorize the user.
  // The third parameter is the route handler function.
  // The route handler function takes two parameters: the request object (req) and the response object (res).
  // GET is used to request data from a specified resource.

  // The request object (req) represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
  // The response object (res) represents the HTTP response that an Express app sends when it gets an HTTP request.

  // Use the res.send() function to send a response to the client.
  // The res.send() function sends a response of various types. Here, it is sending an object as a JSON response.
  // This object contains a message and the current state of the booksArray array.
  res.send({ message: "success", books: booksArray });
  // The message is sent to the client and can be used to display a success message to the user.
  // The booksArray is sent to the client and can be used to display the current state of the booksArray array.
  // After calling the res.send() function, the route handler function is done and no more code will be executed.
});
// This route handler responds to GET requests for the "/books/getAllBooks" URL path.
// When a GET request is made to this URL, the server responds with the current state of the booksArray array.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define a route handler for POST requests to "/books/addBook"

app.post("/books/addBook", authenticateUser, authorizeUser, (req, res) => {
  //app.post("/books/addBook", authenticateUser, authorizeUser, (req, res) => {
  // app.post() is a method provided by Express.js to handle HTTP POST requests.
  // The first parameter is the URL path, and the second parameter is the route handler function.
  // The second parameter is a middleware function that is used to authenticate and authorize the user.
  // The third parameter is a middleware function that is used to authenticate and authorize the user.
  // The forth parameter is the route handler function.
  // The route handler function takes two parameters: the request object (req) and the response object (res).
  // POST is used to send data to a server to create a new resource.

  // The request object (req) represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
  // The response object (res) represents the HTTP response that an Express app sends when it gets an HTTP request.

  // Log the request body to the console
  // The request body often contains the data you want to send to the server.
  console.log("request:", req.body);

  // Extract the title, author, and genre from the request body
  // This is done using JavaScript destructuring assignment.
  const { title, author, genre } = req.body;

  // Validate the request body
  // It's important to validate input to ensure that your program has the correct data types and values.
  if (
    // If the title, author, or genre is not a string, send a 400 Bad Request status code and an error message
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof genre !== "string"
  ) {
    // If the validation fails, send a 400 Bad Request status code and an error message.
    // The 400 status code tells the client that the request was malformed.
    res.status(400).send({
      // The 400 status code tells the client that the request was malformed.
      message: "failure",
      error:
        "Invalid request body. Expected format: { title: string, author: string, genre: string }",
      // The message is sent to the client and can be used to display an error message to the user.
      // The error is sent to the client and can be used to display the specific error message to the user.
      // After calling the res.send() function, the route handler function is done and no more code will be executed.
    });
    return;
    // The return statement is used to stop the execution of the route handler function after sending the response.
  }
  // If the validation passes, continue with the next steps.

  // Use the Array.prototype.some() method to check if a book with the same title already exists in booksArray
  // The some() method tests whether at least one element in the array passes the test implemented by the provided function.
  const bookExists = booksArray.some((book) => book.title === title);

  // If a book with the same title exists, send a response with the status code 400 (Bad Request) and an error message
  if (bookExists) {
    // If the bookExists is true, send a 400 Bad Request status code and an error message
    res.status(400).send({
      // The 400 status code tells the client that the request was malformed.
      message: "failure",
      error: "Book with the same title already exists",
      // The message is sent to the client and can be used to display an error message to the user.
      // The error is sent to the client and can be used to display the specific error message to the user.
      // After calling the res.send() function, the route handler function is done and no more code will be executed.
    });
    return;
    // The return statement is used to stop the execution of the route handler function after sending the response.
  }
  // If no book with the same title exists, continue with the next steps.

  // If no book with the same title exists, add the new book to booksArray
  // The push() method adds new book's title, author, and genre to the booksArray array.
  booksArray.push({ title, author, genre });

  // Log the updated state of booksArray to the console
  console.log("booksArray:", booksArray);

  // Send a response with the status code 201 (Created), a success message, and the new book
  res
    .status(201) // The 201 status code tells the client that the request has been fulfilled and has resulted in one or more new resources being created.
    .send({ message: "success", newBook: booksArray[booksArray.length - 1] });
  // The message is sent to the client and can be used to display a success message to the user.
  // The new book is the last book in the booksArray, so its index is booksArray.length - 1.
  // After calling the res.send() function, the route handler function is done and no more code will be executed.
});
// This route handler responds to POST requests for the "/books/addBook" URL path.
// When a POST request is made to this URL, the server either adds a new book to booksArray (if no book with the same title exists)
// or sends an error message (if a book with the same title exists).

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define a route handler for PUT requests to "/books/updateBook"

app.put("/books/updateBook", authenticateUser, authorizeUser, (req, res) => {
  // The app.put() function is used to define a route handler for PUT requests.
  // The first parameter is the URL path, and the second parameter is the route handler function.
  // The second parameter is a middleware function that is used to authenticate and authorize the user.
  // The third parameter is a middleware function that is used to authenticate and authorize the user.
  // The forth parameter is the route handler function.
  // The route handler function takes two parameters: the request object (req) and the response object (res).
  // PUT is used to send data to a server to update a resource.

  // The request object (req) represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
  // The response object (res) represents the HTTP response that an Express app sends when it gets an HTTP request.

  // Log the request body to the console
  // The request body often contains the data you want to send to the server.
  console.log("request:", req.body);

  // Extract the title, author, genre, and index from the request body
  // This is done using JavaScript destructuring assignment.
  const { title, author, genre, index } = req.body;

  // Validate the request body
  // It's important to validate input to ensure that your program has the correct data types and values.
  if (
    // If the title, author, genre, or index is not a string or number, send a 400 Bad Request status code and an error message
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof genre !== "string" ||
    typeof index !== "number"
  ) {
    res.status(400).send({
      // The 400 status code tells the client that the request was malformed.
      message: "failure",
      error:
        "Invalid request body. Expected format: { title: string, author: string, genre: string, index: number }",
      // The message is sent to the client and can be used to display an error message to the user.
      // The error is sent to the client and can be used to display the specific error message to the user.
      // After calling the res.send() function, the route handler function is done and no more code will be executed.
    });
    return;
    // The return statement is used to stop the execution of the route handler function after sending the response.
  }
  // If the validation passes, continue with the next steps.

  // Check if the index is valid (greater than or equal to 0 and less than the length of booksArray)
  if (index < 0 || index >= booksArray.length) {
    // If the index is out of range, send a 400 Bad Request status code and an error message
    res.status(400).send({
      // The 400 status code tells the client that the request was malformed.
      message: "failure",
      error:
        "Invalid index. Index should be between 0 and " +
        (booksArray.length - 1),
      // The message is sent to the client and can be used to display an error message to the user.
      // The error is sent to the client and can be used to display the specific error message to the user.
      // After calling the res.send() function, the route handler function is done and no more code will be executed.
    });
    return;
    // The return statement is used to stop the execution of the route handler function after sending the response.
  }
  // If the index is valid, continue with the next steps.

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

  // Log the updated state of booksArray to the console
  console.log("booksArray:", booksArray);

  // Send a response with a status code of 200 (OK), a success message, and the updated book
  res.send({ message: "success", updatedBook: booksArray[index] });
  // The message is sent to the client and can be used to display a success message to the user.
  // The updated book is the book at the specified index in the booksArray.
  // After calling the res.send() function, the route handler function is done and no more code will be executed.
});
// This route handler responds to PUT requests for the "/books/updateBook" URL path.
// When a PUT request is made to this URL, the server either updates a book in booksArray (if the index is valid)
// or sends an error message (if the index is invalid).

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define a route handler for DELETE requests to "/books/deleteBook"

app.delete("/books/deleteBook", authenticateUser, authorizeUser, (req, res) => {
  // The app.delete() function is used to define a route handler for DELETE requests.
  // The first parameter is the URL path, and the second parameter is the route handler function.
  // The second parameter is a middleware function that is used to authenticate and authorize the user.
  // The third parameter is a middleware function that is used to authenticate and authorize the user.
  // The forth parameter is the route handler function.
  // The route handler function takes two parameters: the request object (req) and the response object (res).
  // DELETE is used to request that a specified resource be removed.

  // The request object (req) represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on.
  // The response object (res) represents the HTTP response that an Express app sends when it gets an HTTP request.

  // Log the request body to the console
  // The request body often contains the data you want to send to the server.
  console.log("request:", req.body);

  // Extract the title from the request body
  // This is done using JavaScript destructuring assignment.
  const { title } = req.body;

  // Validate the request body
  // It's important to validate input to ensure that your program has the correct data types and values.
  if (typeof title !== "string") {
    // If the title is not a string, send a 400 Bad Request status code and an error message
    res.status(400).send({
      // The 400 status code tells the client that the request was malformed.
      message: "failure",
      error: "Invalid request body. Expected format: { title: string }",
      // The message is sent to the client and can be used to display an error message to the user.
      // The error is sent to the client and can be used to display the specific error message to the user.
      // After calling the res.send() function, the route handler function is done and no more code will be executed.
    });
    return;
    // The return statement is used to stop the execution of the route handler function after sending the response.
  }
  // If the validation passes, continue with the next steps.

  // Use the Array.prototype.findIndex() method to find the index of the book with the given title in booksArray
  // The findIndex() method returns the index of the first element in the array that satisfies the provided testing function
  // If no elements satisfy the testing function, it returns -1
  const index = booksArray.findIndex((book) => book.title === title);

  // If no book with the given title is found, send a 400 Bad Request status code and an error message
  if (index === -1) {
    // If the index is -1, send a 400 Bad Request status code and an error message
    res.status(400).send({
      // The 400 status code tells the client that the request was malformed.
      message: "failure",
      error: "No book with the given title was found",
      // The message is sent to the client and can be used to display an error message to the user.
      // The error is sent to the client and can be used to display the specific error message to the user.
      // After calling the res.send() function, the route handler function is done and no more code will be executed.
    });
    return;
    // The return statement is used to stop the execution of the route handler function after sending the response.
  }
  // If a book with the given title is found, continue with the next steps.

  // Use the Array.prototype.splice() method to remove the book at the found index from booksArray
  // The splice() method changes the contents of an array by removing or replacing existing elements
  // Here, it removes 1 element at the found index
  const deletedBook = booksArray.splice(index, 1);

  // Log the updated state of booksArray to the console
  console.log("booksArray:", booksArray);

  // Send a response with a status code of 200 (OK), a success message, and the deleted book
  res.send({ message: "success", deletedBook: deletedBook[0] });
  // The message is sent to the client and can be used to display a success message to the user.
  // The deleted book is the book that was removed from the booksArray.
  // After calling the res.send() function, the route handler function is done and no more code will be executed.
});
// This handles the DELETE request for the "/deleteBook" URL path
// When a DELETE request is made to this URL, the server either deletes a book from booksArray (if a book with the given title is found)
// or sends an error message (if no book with the given title is found).

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(5001, () => {
  console.log("Server is running on port 5001"); // The callback function is called when the server starts.
});
// The app.listen() function is used to start the server on the specified port.
// The app.listen() function takes two arguments: the port number and a callback function.
// The callback function is called when the server starts.
