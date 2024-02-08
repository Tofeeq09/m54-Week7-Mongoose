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
  author: { type: String, required: true },
  genre: { type: String, required: true },
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
    // The find method is a part of Mongoose's API for models. It finds documents in the database that match the provided condition.
    // req.query contains the query string parameters that were sent with the request.
    // If no query parameters are provided, an empty object ({}) is passed as the condition, which matches all documents in the collection.
    // The exec method returns a Promise that resolves to the found documents.
    const books = await Book.find(req.query).exec();

    // If the find operation is successful, send a 200 OK status code and the found books in the response.
    // The 200 status code indicates that the request has succeeded.
    // The response body contains the array of found books.
    res.status(200).send(books);
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error fetching books: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error fetching books", error: error.message });
  }
});
// To use query parameters, add them to the end of the URL as key-value pairs.
// The key is the parameter you want to search by (e.g., 'author', 'title', 'genre'),
// and the value is what you want to search for.
// For example, to search for books by a specific author, use '/books?author=AuthorName'.
// If no query parameters are provided, all books will be returned.
// More information about the find method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#Model.find()

// POST "/books" endpoint. This endpoint is used to add new books to the database.
app.post("/books", async (req, res) => {
  try {
    // Check if the request body is an array.
    if (Array.isArray(req.body)) {
      // If the request body is an array of books, use the insertMany method to add all of them to the database.
      // The insertMany method is a part of Mongoose's API for models. It inserts multiple documents into the database.
      // req.body contains the body of the request. In this case, it should be an array of book objects.
      const newBooks = await Book.insertMany(req.body);

      // Send a 201 Created status code and the newly created books in the response.
      // The 201 status code indicates that the request has been fulfilled and has resulted in one or more new resources being created.
      // The books are sent in the response as the body of the message.
      res.status(201).send(newBooks);
      return;
    }

    // If the request body is a single book object, use the create method to add it to the database.
    // The create method is a part of Mongoose's API for models. It creates a new document in the database.
    // req.body contains the body of the request. In this case, it should be a book object.
    const newBooks = await Book.create(req.body);

    // Send a 201 Created status code and the newly created book in the response.
    // The 201 status code indicates that the request has been fulfilled and has resulted in a new resource being created.
    // The book is sent in the response as the body of the message.
    res.status(201).send(newBooks);
    return;
  } catch (error) {
    // If there's an error, log it to the console.
    console.log("Error adding book: ", error);

    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message includes the message property of the error object, which provides more information about what went wrong.
    res
      .status(500)
      .send({ message: "Error adding book", error: error.message });
    return;
  }
});
// To use the insertMany method, pass an array of book objects as the argument.
// To use the create method, pass a single book object as the argument.
// More information about the insertMany and create methods can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.insertMany
// https://mongoosejs.com/docs/api/model.html#model_Model.create
// To use the insertMany method, pass an array of book objects as the argument.
// To use the create method, pass a single book object as the argument.
// More information about the insertMany and create methods can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.insertMany
// https://mongoosejs.com/docs/api/model.html#model_Model.create

// DELETE "/books" endpoint. This endpoint is used to delete all books from the database.
app.delete("/books", async (req, res) => {
  try {
    // The deleteMany method is a part of Mongoose's API for models. It deletes documents from the database that match the provided condition.
    // In this case, an empty object ({}) is passed as the condition, which matches all documents in the 'books' collection.
    // This method returns a Promise that resolves to an object containing the result of the delete operation.
    const result = await Book.deleteMany({});

    // If the delete operation is successful, send a 200 OK status code and a message indicating the number of deleted books in the response.
    // The 200 status code indicates that the request has succeeded.
    // The 'deletedCount' property of the result object indicates the number of deleted documents.
    // This information is included in the response so that the client knows how many books were deleted.
    res.status(200).send({ message: `${result.deletedCount} books deleted` });
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error deleting books: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error deleting books", error: error.message });
  }
});
// More information about the deleteMany method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany

// GET "/books/author" endpoint. This endpoint is used to fetch all unique authors from the database.
app.get("/books/author", async (req, res) => {
  try {
    // The distinct method is a part of Mongoose's API for models. It finds all distinct values of a specific field in the collection.
    // In this case, it finds all distinct authors in the 'books' collection.
    // This method returns a Promise that resolves to an array of the distinct values.
    const authors = await Book.distinct("author");

    // If no authors are found (i.e., the authors array is empty), send a 404 Not Found status code and a message in the response.
    // The 404 status code indicates that the server can't find the requested resource.
    // In this case, it means that there are no authors in the database.
    if (authors.length === 0) {
      res.status(404).send({
        message: "No authors found",
      });
      return;
    }

    // If authors are found, send a 200 OK status code and the authors in the response.
    // The 200 status code indicates that the request has succeeded.
    // The response body contains the array of authors.
    res.status(200).send(authors);
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error getting authors: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error getting authors", error: error.message });
  }
});
// To use the distinct method, pass the field name as the argument.
// More information about the distinct method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.distinct

// GET "/books/genre" endpoint. This endpoint is used to fetch all unique genres from the database.
app.get("/books/genre", async (req, res) => {
  try {
    // The distinct method is a part of Mongoose's API for models. It finds all distinct values of a specific field in the collection.
    // In this case, it finds all distinct genres in the 'books' collection.
    // This method returns a Promise that resolves to an array of the distinct values.
    const genres = await Book.distinct("genre");

    // If no genres are found (i.e., the genres array is empty), send a 404 Not Found status code and a message in the response.
    // The 404 status code indicates that the server can't find the requested resource.
    // In this case, it means that there are no genres in the database.
    if (genres.length === 0) {
      res.status(404).send({
        message: "No genres found",
      });
      return;
    }

    // If genres are found, send a 200 OK status code and the genres in the response.
    // The 200 status code indicates that the request has succeeded.
    // The response body contains the array of genres.
    res.status(200).send(genres);
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error getting genres: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error getting genres", error: error.message });
  }
});
// To use the distinct method, pass the field name as the argument.
// More information about the distinct method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.distinct

// GET "/books/:id" endpoint. This endpoint is used to fetch a single book from the database by its id.
app.get("/books/:id", async (req, res) => {
  try {
    // The findById method is a part of Mongoose's API for models. It finds a document by its id.
    // The id is passed as a parameter in the URL and accessed through req.params.id.
    // This method returns a Promise that resolves to the document if found, null otherwise.
    const book = await Book.findById(req.params.id);

    // If no book is found (i.e., the book object is null), send a 404 Not Found status code and a message in the response.
    // The 404 status code indicates that the server can't find the requested resource.
    // In this case, it means that there's no book with the given id in the database.
    if (!book) {
      res.status(404).send({
        message: "No book found with this id",
      });
      return;
    }

    // If a book is found, send a 200 OK status code and the book in the response.
    // The 200 status code indicates that the request has succeeded.
    // The response body contains the book.
    res.status(200).send(book);
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error getting book: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error getting book", error: error.message });
  }
});
// More information about the findById method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.findById

// PUT "/books/:id" endpoint. This endpoint is used to update a book in the database by its id.
app.put("/books/:id", async (req, res) => {
  try {
    // The findOneAndUpdate method is a part of Mongoose's API for models. It finds a document by its id and updates it.
    // The id is passed as a parameter in the URL and accessed through req.params.id.
    // The updated fields are passed in the request body.
    // This method returns a Promise that resolves to the updated document if found, null otherwise.
    // The { new: true } option ensures that the updated book is returned.
    const updatedBook = await Book.findOneAndUpdate(
      { _id: req.params.id }, // Find the book by its id.
      req.body, // Update the book with the data in the request body.
      { new: true } // Return the updated book.
    );

    // If no book is found (i.e., the updatedBook object is null), send a 404 Not Found status code and a message in the response.
    // The 404 status code indicates that the server can't find the requested resource.
    // In this case, it means that there's no book with the given id in the database.
    if (!updatedBook) {
      res.status(404).send({
        message: "No book found with this id",
      });
      return;
    }

    // If a book is found and updated, send a 200 OK status code and the updated book in the response.
    // The 200 status code indicates that the request has succeeded.
    // The response body contains the updated book.
    res.status(200).send(updatedBook);
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error updating book: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error updating book", error: error.message });
  }
});
// To use the findOneAndUpdate method, pass three arguments:
// 1. The conditions to find the book by its id.
// 2. The fields to update based on the data in the request body.
// 3. Options, where { new: true } ensures that the method returns the document as it was after update was applied.
// More information about the findOneAndUpdate method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate

// DELETE "/books/:id" endpoint. This endpoint is used to delete a book from the database by its id.
app.delete("/books/:id", async (req, res) => {
  try {
    // The findByIdAndDelete method is a part of Mongoose's API for models. It finds a document by its id and deletes it.
    // The id is passed as a parameter in the URL and accessed through req.params.id.
    // This method returns a Promise that resolves to the deleted document if found, null otherwise.
    const book = await Book.findByIdAndDelete(req.params.id);

    // If no book is found (i.e., the book object is null), send a 404 Not Found status code and a message in the response.
    // The 404 status code indicates that the server can't find the requested resource.
    // In this case, it means that there's no book with the given id in the database.
    if (!book) {
      res.status(404).send({
        message: "No book found with this id",
      });
      return;
    }

    // If a book is found and deleted, send a 200 OK status code, a message, and the deleted book in the response.
    // The 200 status code indicates that the request has succeeded.
    // The response body contains a message and the deleted book.
    res.status(200).send({ message: "Book deleted", book: book });
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error deleting book: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error deleting book", error: error.message });
  }
});
// To use the findByIdAndDelete method, pass the id as the argument.
// More information about the findByIdAndDelete method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.findByIdAndDelete

// GET "/books/author/:author" endpoint. This endpoint is used to fetch books from the database by their author.
app.get("/books/author/:author", async (req, res) => {
  try {
    // The find method is a part of Mongoose's API for models. It retrieves documents that match the conditions.
    // The author is passed as a parameter in the URL and accessed through req.params.author.
    // This method returns a Promise that resolves to an array of documents that match the conditions.
    const books = await Book.find({ author: req.params.author });

    // If no books are found (i.e., the books array is empty), send a 404 Not Found status code and a message in the response.
    // The 404 status code indicates that the server can't find the requested resource.
    // In this case, it means that there's no book with the given author in the database.
    if (!books || books.length === 0) {
      res.status(404).send({
        message: "No books found from this author",
      });
      return;
    }

    // If books are found, send a 200 OK status code and the books in the response.
    // The 200 status code indicates that the request has succeeded.
    // The response body contains the array of books.
    res.status(200).send(books);
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error retrieving books: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error retrieving books", error: error.message });
  }
});
// To use the find method, pass the query parameters as the argument.
// More information about the find method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.find

// PUT "/books/title/:title" endpoint. This endpoint is used to update a book in the database by its title.
app.put("/books/title/:title", async (req, res) => {
  try {
    // The findOneAndUpdate method is a part of Mongoose's API for models. It finds a document that matches the conditions and updates it.
    // The title is passed as a parameter in the URL and accessed through req.params.title.
    // The updated fields are passed in the request body and accessed through req.body.
    // The new: true option in the options argument makes the method return the updated document.
    // If the document is not found, this method returns null.
    // This method returns a Promise that resolves to the updated document or null.
    const updatedBook = await Book.findOneAndUpdate(
      { title: req.params.title }, // conditions
      req.body, // update
      { new: true } // options
    );

    // If the book is not found (i.e., updatedBook is null), send a 404 Not Found status code and a message in the response.
    // The 404 status code indicates that the server can't find the requested resource.
    // In this case, it means that there's no book with the given title in the database.
    if (!updatedBook) {
      res.status(404).send({ message: "Book not found" });
      return;
    }

    // If the book is found and updated successfully, send a 200 OK status code and the updated book in the response.
    // The 200 status code indicates that the request has succeeded.
    // The response body contains the updated book.
    res.status(200).send(updatedBook);
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error updating book: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error updating book", error: error.message });
  }
});
// To use the findOneAndUpdate method, pass three arguments:
// 1. The conditions to find the book by its title.
// 2. The fields to update based on the data in the request body.
// 3. Options, where { new: true } ensures that the method returns the document as it was after update was applied.
// More information about the findOneAndUpdate method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndUpdate

// GET "/books/author/:author" endpoint. This endpoint is used to fetch books from the database by their author.
app.get("/books/author/:author", async (req, res) => {
  try {
    // The find method is a part of Mongoose's API for models. It retrieves documents that match the conditions.
    // The author is passed as a parameter in the URL and accessed through req.params.author.
    // This method returns a Promise that resolves to an array of documents that match the conditions.
    const books = await Book.find({ author: req.params.author });

    // If no books are found (i.e., the books array is empty), send a 404 Not Found status code and a message in the response.
    // The 404 status code indicates that the server can't find the requested resource.
    // In this case, it means that there's no book with the given author in the database.
    if (!books || books.length === 0) {
      res.status(404).send({
        message: "No books found from this author",
      });
      return;
    }

    // If books are found, send a 200 OK status code and the books in the response.
    // The 200 status code indicates that the request has succeeded.
    // The response body contains the array of books.
    res.status(200).send(books);
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error retrieving books: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error retrieving books", error: error.message });
  }
});
// To use the findOneAndDelete method, pass the conditions to find the book by its title as the argument.
// More information about the findOneAndDelete method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.findOneAndDelete

// GET "/books/author/:author" endpoint. This endpoint is used to fetch books from the database by their author.
app.get("/books/author/:author", async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.author });
    if (!books || books.length === 0) {
      // If no books are found, send a 404 Not Found status code and a message in the response.
      // The 404 status code indicates that the server cannot find the requested resource.
      res.status(404).send({
        message: "No books found from this author",
      });
      return;
    }
    res.status(200).send(books);
  } catch (error) {
    // If there's an error, log it to the console.
    console.log("Error retrieving books: ", error);

    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message includes the message property of the error object, which provides more information about what went wrong.
    res
      .status(500)
      .send({ message: "Error retrieving books", error: error.message });
  }
});
// To use the find method, pass the query parameters as the argument.
// More information about the find method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.find

// PUT "/books/author/:author" endpoint. This endpoint is used to update books in the database by their author.
app.put("/books/author/:author", async (req, res) => {
  try {
    // The countDocuments method is a part of Mongoose's API for models. It counts the number of documents that match the conditions.
    // The author is passed as a parameter in the URL and accessed through req.params.author.
    // This method returns a Promise that resolves to the count of documents that match the conditions.
    const count = await Book.countDocuments({ author: req.params.author });

    // If no books are found (i.e., the count is 0), send a 404 Not Found status code and a message in the response.
    // The 404 status code indicates that the server can't find the requested resource.
    // In this case, it means that there's no book with the given author in the database.
    if (count === 0) {
      res.status(404).send({
        message: "No books found from this author",
      });
      return;
    }

    // The updateMany method is a part of Mongoose's API for models. It updates documents that match the conditions.
    // The author is passed as a parameter in the URL and accessed through req.params.author.
    // The new author is passed in the request body and accessed through req.body.author.
    // The new: true option in the options argument makes the method return the updated documents.
    // This method returns a Promise that resolves to the result of the update operation.
    await Book.updateMany(
      { author: req.params.author }, // conditions
      { author: req.body.author }, // update
      { new: true } // options
    );

    // If books are found and updated, send a 200 OK status code and a message in the response.
    // The 200 status code indicates that the request has succeeded.
    // The response body contains a message that includes the count of updated books.
    res.status(200).send({ message: `${count} books updated` });
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error updating books: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error updating books", error: error.message });
  }
});
// To use the updateMany method, pass three arguments:
// 1. The conditions to find the books by their author.
// 2. The fields to update based on the data in the request body.
// 3. Options, where { new: true } ensures that the method returns the document as it was after update was applied.
// More information about the updateMany method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.updateMany

// DELETE "/books/author/:author" endpoint. This endpoint is used to delete books from the database by their author.
app.delete("/books/author/:author", async (req, res) => {
  try {
    // The countDocuments method is a part of Mongoose's API for models. It counts the number of documents that match the conditions.
    // The author is passed as a parameter in the URL and accessed through req.params.author.
    // This method returns a Promise that resolves to the count of documents that match the conditions.
    const count = await Book.countDocuments({ author: req.params.author });

    // If no books are found (i.e., the count is 0), send a 404 Not Found status code and a message in the response.
    // The 404 status code indicates that the server can't find the requested resource.
    // In this case, it means that there's no book with the given author in the database.
    if (count === 0) {
      res.status(404).send({
        message: "No books found from this author",
      });
      return;
    }

    // The deleteMany method is a part of Mongoose's API for models. It deletes documents that match the conditions.
    // The author is passed as a parameter in the URL and accessed through req.params.author.
    // This method returns a Promise that resolves to the result of the delete operation.
    await Book.deleteMany({ author: req.params.author });

    // If books are found and deleted, send a 200 OK status code and a message in the response.
    // The 200 status code indicates that the request has succeeded.
    // The response body contains a message that includes the count of deleted books.
    res.status(200).send({ message: `${count} books deleted` });
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error deleting books: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error deleting books", error: error.message });
  }
});
// To use the deleteMany method, pass the conditions to find the books by their author as the argument.
// More information about the deleteMany method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany

// GET "/books/genre/:genre" endpoint. This endpoint is used to fetch books from the database by their genre.
app.get("/books/genre/:genre", async (req, res) => {
  try {
    // The find method is a part of Mongoose's API for models. It retrieves documents that match the conditions.
    // The genre is passed as a parameter in the URL and accessed through req.params.genre.
    // This method returns a Promise that resolves to an array of documents that match the conditions.
    const books = await Book.find({ genre: req.params.genre });

    // If no books are found (i.e., the books array is empty), send a 404 Not Found status code and a message in the response.
    // The 404 status code indicates that the server can't find the requested resource.
    // In this case, it means that there's no book with the given genre in the database.
    if (!books || books.length === 0) {
      res.status(404).send({ message: "No books found for this genre" });
      return;
    }

    // If books are found, send a 200 OK status code and the books in the response.
    // The 200 status code indicates that the request has succeeded.
    // The response body contains the array of books.
    res.status(200).send(books);
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error retrieving books: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error retrieving books", error: error.message });
  }
});
// To use the find method, pass the query parameters as the argument.
// More information about the find method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.find

// PUT "/books/genre/:genre" endpoint. This endpoint is used to update books in the database by their genre.
app.put("/books/genre/:genre", async (req, res) => {
  try {
    // The countDocuments method is a part of Mongoose's API for models. It counts the number of documents that match the conditions.
    // The genre is passed as a parameter in the URL and accessed through req.params.genre.
    // This method returns a Promise that resolves to the count of documents that match the conditions.
    const count = await Book.countDocuments({ genre: req.params.genre });

    // If no books are found (i.e., the count is 0), send a 404 Not Found status code and a message in the response.
    // The 404 status code indicates that the server can't find the requested resource.
    // In this case, it means that there's no book with the given genre in the database.
    if (count === 0) {
      res.status(404).send({ message: "No books found for this genre" });
      return;
    }

    // The updateMany method is a part of Mongoose's API for models. It updates documents that match the conditions.
    // The genre is passed as a parameter in the URL and accessed through req.params.genre.
    // The new genre is passed in the request body and accessed through req.body.genre.
    // The { new: true } option ensures that the method returns the document as it was after the update was applied.
    // This method returns a Promise that resolves to the result of the update operation.
    await Book.updateMany(
      { genre: req.params.genre }, // conditions
      { genre: req.body.genre }, // update
      { new: true } // options
    );

    // If books are found and updated, send a 200 OK status code and a message in the response.
    // The 200 status code indicates that the request has succeeded.
    // The response body contains a message that includes the count of updated books.
    res.status(200).send({ message: `${count} books updated` });
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error updating books: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error updating books", error: error.message });
  }
});
// To use the updateMany method, pass three arguments:
// 1. The conditions to find the books by their genre.
// 2. The fields to update based on the data in the request body.
// 3. Options, where { new: true } ensures that the method returns the document as it was after update was applied.
// More information about the updateMany method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.updateMany

// DELETE "/books/genre/:genre" endpoint. This endpoint is used to delete books from the database by their genre.
app.delete("/books/genre/:genre", async (req, res) => {
  try {
    // The countDocuments method is a part of Mongoose's API for models. It counts the number of documents that match the conditions.
    // The genre is passed as a parameter in the URL and accessed through req.params.genre.
    // This method returns a Promise that resolves to the count of documents that match the conditions.
    const count = await Book.countDocuments({ genre: req.params.genre });

    // If no books are found (i.e., the count is 0), send a 404 Not Found status code and a message in the response.
    // The 404 status code indicates that the server can't find the requested resource.
    // In this case, it means that there's no book with the given genre in the database.
    if (count === 0) {
      res.status(404).send({ message: "No books found for this genre" });
      return;
    }

    // The deleteMany method is a part of Mongoose's API for models. It deletes documents that match the conditions.
    // The genre is passed as a parameter in the URL and accessed through req.params.genre.
    // This method returns a Promise that resolves to the result of the deletion operation.
    await Book.deleteMany({ genre: req.params.genre });

    // If books are found and deleted, send a 200 OK status code and a message in the response.
    // The 200 status code indicates that the request has succeeded.
    // The response body contains a message that includes the count of deleted books.
    res.status(200).send({ message: `${count} books deleted` });
  } catch (error) {
    // If there's an error, log it to the console.
    // This could be a database error or a network error, for example.
    console.log("Error deleting books: ", error);

    // Send a 500 Internal Server Error status code and an error message in the response.
    // The 500 status code indicates that the server has encountered a situation it doesn't know how to handle.
    // The error message provides more information about what went wrong.
    // This could be useful for debugging the error.
    res
      .status(500)
      .send({ message: "Error deleting books", error: error.message });
  }
});
// To use the deleteMany method, pass the conditions to find the books by their genre as the argument.
// More information about the deleteMany method can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.deleteMany

// The app.listen method starts the server and makes it listen for incoming requests on the specified port.
app.listen(5003, () => {
  // Log a message to the console to indicate that the server is running.
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
