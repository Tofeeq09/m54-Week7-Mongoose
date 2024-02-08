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
  message;
  return;
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
    res
      .status(400)
      .send({ message: "Error fetching books", error: error.message });
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
    res
      .status(400)
      .send({ message: "Error adding book", error: error.message });
    return;
  }
});
// To use the insertMany method, pass an array of book objects as the argument.
// To use the create method, pass a single book object as the argument.
// https://mongoosejs.com/docs/api/model.html#model_Model.insertMany
// https://mongoosejs.com/docs/api/model.html#model_Model.create

// DELETE "/books" endpoint. This endpoint is used to delete all books from the database.
app.delete("/books", async (req, res) => {
  try {
    const result = await Book.deleteMany({});
    res.status(200).send({ message: `${result.deletedCount} books deleted` });
  } catch (error) {
    console.log("Error deleting books: ", error);
    res
      .status(500)
      .send({ message: "Error deleting books", error: error.message });
  }
});

// GET "/books/author" endpoint. This endpoint is used to fetch all authors from the database.
app.get("/books/author", async (req, res) => {
  try {
    const authors = await Book.distinct("author");

    if (authors.length === 0) {
      res.status(404).send({ message: "No authors found" });
      return;
    }

    res.status(200).send(authors);
  } catch (error) {
    console.log("Error getting authors: ", error);
    res
      .status(500)
      .send({ message: "Error getting authors", error: error.message });
  }
});

// GET "/books/author/:author" endpoint. This endpoint is used to fetch books from the database by their author.
app.get("/books/genre", async (req, res) => {
  try {
    const genres = await Book.distinct("genre");

    if (genres.length === 0) {
      res.status(404).send({ message: "No genres found" });
      return;
    }

    res.status(200).send(genres);
  } catch (error) {
    console.log("Error getting genres: ", error);
    res
      .status(500)
      .send({ message: "Error getting genres", error: error.message });
  }
});

// GET "/books/:id" endpoint. This endpoint is used to fetch a single book from the database by its id.
app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(404).send({ message: "No book found with this id" });
      return;
    }

    res.status(200).send(book);
  } catch (error) {
    console.log("Error getting book: ", error);
    res
      .status(500)
      .send({ message: "Error getting book", error: error.message });
  }
});

// PUT "/books/:id" endpoint. This endpoint is used to update a book in the database by its id.
app.put("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      res.status(404).send({ message: "Book not found" });
      return;
    }

    res.status(200).send(await logTypeOfResult(updatedBook));
  } catch (error) {
    console.log("Error updating book: ", error);
    res
      .status(500)
      .send({ message: "Error updating book", error: error.message });
  }
});

// DELETE "/books/:id" endpoint. This endpoint is used to delete a book from the database by its id.
app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      res.status(404).send({ message: "No book found with this id" });
      return;
    }

    res.status(200).send({ message: "Book deleted" });
  } catch (error) {
    console.log("Error deleting book: ", error);
    res
      .status(500)
      .send({ message: "Error deleting book", error: error.message });
  }
});

// GET "/books/:id" endpoint. This endpoint is used to fetch a single book from the database by its id.
app.get("/books/title/:title", async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    if (!book) {
      res.status(404).send({ message: "Book not found" });
      return;
    }
    res.status(200).send(book);
  } catch (error) {
    console.log("Error retrieving book: ", error);
    res
      .status(500)
      .send({ message: "Error retrieving book", error: error.message });
  }
});

// PUT "/books/title/:title" endpoint. This endpoint is used to update a book in the database by its title.
app.put("/books/title/:title", async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title: req.params.title }, // conditions
      req.body, // update
      { new: true } // options
    );

    if (!updatedBook) {
      res.status(404).send({ message: "Book not found" });
      return;
    }

    res.status(200).send(await logTypeOfResult(updatedBook));
  } catch (error) {
    console.log("Error updating book: ", error);
    res
      .status(500)
      .send({ message: "Error updating book", error: error.message });
  }
});

// DELETE "/books/title/:title" endpoint. This endpoint is used to delete a book from the database by its title.
app.delete("/books/title/:title", async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });

    if (!book) {
      res.status(404).send({ message: "No book found with this title" });
      return;
    }

    await Book.deleteOne({ title: req.params.title });

    res.status(200).send({ message: "Book deleted" });
  } catch (error) {
    console.log("Error deleting book: ", error);
    res
      .status(500)
      .send({ message: "Error deleting book", error: error.message });
  }
});

// GET "/books/author/:author" endpoint. This endpoint is used to fetch books from the database by their author.
app.get("/books/author/:author", async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.author });
    if (!books || books.length === 0) {
      res.status(404).send({ message: "No books found from this author" });
      return;
    }
    res.status(200).send(books);
  } catch (error) {
    console.log("Error retrieving books: ", error);
    res
      .status(500)
      .send({ message: "Error retrieving books", error: error.message });
  }
});

// PUT "/books/author/:author" endpoint. This endpoint is used to update books in the database by their author.
app.put("/books/author/:author", async (req, res) => {
  try {
    const count = await Book.countDocuments({ author: req.params.author });

    if (count === 0) {
      res.status(404).send({ message: "No books found from this author" });
      return;
    }

    await Book.updateMany(
      { author: req.params.author }, // conditions
      { $set: { author: req.body.author, genre: req.body.genre } } // https://www.mongodb.com/docs/manual/reference/operator/update/set/
    );

    res.status(200).send({ message: `${count} books updated` });
  } catch (error) {
    console.log("Error updating books: ", error);
    res
      .status(500)
      .send({ message: "Error updating books", error: error.message });
  }
});

// DELETE "/books/author/:author" endpoint. This endpoint is used to delete books from the database by their author.
app.delete("/books/author/:author", async (req, res) => {
  try {
    const count = await Book.countDocuments({ author: req.params.author });

    if (count === 0) {
      res.status(404).send({ message: "No books found from this author" });
      return;
    }

    await Book.deleteMany({ author: req.params.author });

    res.status(200).send({ message: `${count} books deleted` });
  } catch (error) {
    console.log("Error deleting books: ", error);
    res
      .status(500)
      .send({ message: "Error deleting books", error: error.message });
  }
});

// GET "/books/genre/:genre" endpoint. This endpoint is used to fetch books from the database by their genre.
app.get("/books/genre/:genre", async (req, res) => {
  try {
    const books = await Book.find({ genre: req.params.genre });
    if (!books || books.length === 0) {
      res.status(404).send({ message: "No books found for this genre" });
      return;
    }
    res.status(200).send(books);
  } catch (error) {
    console.log("Error retrieving books: ", error);
    res
      .status(500)
      .send({ message: "Error retrieving books", error: error.message });
  }
});

// PUT "/books/genre/:genre" endpoint. This endpoint is used to update books in the database by their genre.
app.put("/books/genre/:genre", async (req, res) => {
  try {
    const count = await Book.countDocuments({ genre: req.params.genre });

    if (count === 0) {
      res.status(404).send({ message: "No books found for this genre" });
      return;
    }

    await Book.updateMany(
      { genre: req.params.genre }, // conditions
      { $set: { genre: req.body.genre } }
    );

    res.status(200).send({ message: `${count} books updated` });
  } catch (error) {
    console.log("Error updating books: ", error);
    res
      .status(500)
      .send({ message: "Error updating books", error: error.message });
  }
});

// DELETE "/books/genre/:genre" endpoint. This endpoint is used to delete books from the database by their genre.
app.delete("/books/genre/:genre", async (req, res) => {
  try {
    const count = await Book.countDocuments({ genre: req.params.genre });

    if (count === 0) {
      res.status(404).send({ message: "No books found for this genre" });
      return;
    }

    await Book.deleteMany({ genre: req.params.genre });

    res.status(200).send({ message: `${count} books deleted` });
  } catch (error) {
    console.log("Error deleting books: ", error);
    res
      .status(500)
      .send({ message: "Error deleting books", error: error.message });
  }
});

app.listen(5003, () => {
  console.log("Server is running on port 5003");
});
// The app.listen method starts the server and makes it listen for incoming requests on the specified port.

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
