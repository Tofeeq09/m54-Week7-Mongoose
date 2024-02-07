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

// If you put the title in the body, it will return the book with that title
// If req.body is empty, it will return all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send(books);
  } catch (error) {
    console.log("Error getting books: ", error);
    res.status(500).send({ message: "Error getting books" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const newBooks = await Book.insertMany(req.body);
    res.status(201).send(newBooks);
  } catch (error) {
    res.status(400).send({ message: "Error adding book" });
    console.log("Error adding book: ", error);
  }
});

app.put("/books", async (req, res) => {
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

app.listen(5001, () => {
  console.log("Server is running on port 5001");
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
