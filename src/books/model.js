// Dependencies
const mongoose = require("mongoose"); // Import the mongoose package

// Define a Mongoose schema for a book. A schema represents the structure of a document in MongoDB,
const bookSchema = new mongoose.Schema({
  // 'title' field is of type String, it is required and it must be unique across all documents.
  // This means that every book must have a title and no two books can have the same title.
  title: { type: String, required: true, unique: true },

  // 'author' field is of type String and it is required. This means that every book must have an author.
  author: { type: String, required: true },

  // 'genre' field is of type String and it is required. This means that every book must have a genre.
  genre: { type: String, required: true },
});

// Create a Mongoose model named 'Book' using the book schema
const Book = mongoose.model("Book", bookSchema);

// Export the Book model
module.exports = Book;
