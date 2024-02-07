const mongoose = require("mongoose");
const express = require("express");
const { log } = require("console");
require("dotenv").config();

const app = express();

// HTTP response status codes: 200, 201, 400, 401, 403, 404, 500, etc.
// The HTTP response status code 200 OK indicates that the request has succeeded.
// The HTTP response status code 201 Created indicates that the request has succeeded and has led to the creation of a resource.
// The HTTP response status code 400 Bad Request indicates that the server cannot or will not process the request due to an apparent client error.
// The HTTP response status code 401 Unauthorized indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.
// The HTTP response status code 403 Forbidden indicates that the server understood the request, but refuses to authorize it.
// The HTTP response status code 404 Not Found indicates that the server cannot find the requested resource.
// The HTTP response status code 500 Internal Server Error indicates that the server has encountered a situation it doesn't know how to handle.

app.use(express.json());

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1); // Exit process with failure
  }
};
connection();

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String },
  genre: { type: String },
});

const Book = mongoose.model("Book", bookSchema);

const logTypeOfResult = async (result) => {
  const message = `Typeof result: ${typeof result} - result: ${JSON.stringify(
    result
  )}`;
  console.log(message);
  return message;
};

// GET "/books" endpoint. This endpoint is used to fetch books from the database.
app.get("/books", async (req, res) => {
  try {
    // Use the find method to search the database for books that match the query parameters.
    // If no query parameters are provided, all books will be returned.
    const books = await Book.find(req.query).exec();
    // Send a 200 OK status code and the found books in the response.
    res.status(200).send(books);
  } catch (error) {
    console.log("Error fetching books: ", error);
    // If there's an error, send a 400 Bad Request status code and an error message in the response.
    res.status(400).send({ message: "Error fetching books" });
  }
});
// To use query parameters, add them to the end of the URL as key-value pairs.
// The key is the parameter you want to search by (e.g., 'author', 'title', 'genre'),
// and the value is what you want to search for.
// For example, to search for books by a specific author, use '/books?author=AuthorName'.
// If no query parameters are provided, all books will be returned.
// https://mongoosejs.com/docs/api/model.html#Model.find()

// POST "/books" endpoint. This endpoint is used to add new books to the database.
app.post("/books", async (req, res) => {
  try {
    // Check if the request body is an array.
    if (Array.isArray(req.body)) {
      console.log("Using insertMany method");
      // If the request body is an array of books, use the insertMany method to add all of them to the database.
      const newBooks = await Book.insertMany(req.body);
      // Send a 201 Created status code and the newly created books in the response.
      res.status(201).send(newBooks);
      return;
    }
    console.log("Using create method");
    // If the request body is a single book object, use the create method to add it to the database.
    const newBooks = await Book.create(req.body);
    // Send a 201 Created status code and the newly created book in the response.
    res.status(201).send(newBooks);
    return;
  } catch (error) {
    console.log("Error adding book: ", error);
    // If there's an error, send a 400 Bad Request status code and an error message in the response.
    res.status(400).send({ message: "Error adding book" });
    return;
  }
});
// To use the insertMany method, pass an array of book objects as the argument.
// To use the create method, pass a single book object as the argument.
// https://mongoosejs.com/docs/api/model.html#model_Model.insertMany
// https://mongoosejs.com/docs/api/model.html#model_Model.create

app.put("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title: req.body.title }, // conditions
      { author: req.body.author }, // update
      { new: true } // options
    );

    if (!updatedBook) {
      return res.status(404).send({ message: "Book not found" });
    }

    res.status(200).send(await logTypeOfResult(updatedBook));
  } catch (error) {
    console.log("Error updating book: ", error);
    res.status(500).send({ message: "Error updating book" });
  }
});

app.delete("/books", (req, res) => {});

app.listen(5002, () => {
  console.log("Server is running on port 5002");
});

// const jwt = require("jsonwebtoken");
// const secret = "secret-key";

// const users = [
//   { username: "admin", password: "admin", role: "admin" },
//   { username: "user", password: "user", role: "user" },
// ];

// const authenticateUser = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return;
//   }
//   try {
//     const user = jwt.verify(token, secret);
//     req.user = user;
//     next();
//   } catch (error) {
//     return;
//   }
// };

// const authorizeUser = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     res.status(403).send({ message: "Forbidden" });
//     return;
//   }
//   next();
// };
