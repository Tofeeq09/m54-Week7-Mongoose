const Book = require("../models/Book");

// getAllBooks: This controller uses the find method from Mongoose to get all books from the database. If successful, it sends the books as a response. If an error occurs, it sends a 500 status code along with the error message.
// Controller to get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// addBook: This controller creates a new book using the Book model and the data from the request body. It then tries to save the new book to the database using the save method. If successful, it sends the new book as a response with a 201 status code. If an error
// Controller to add a book
exports.addBook = async (req, res) => {
  const { title, author, genre } = req.body;

  // Validate request body
  if (!title || !author || !genre) {
    return res.status(400).send("Missing required field");
  }
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// updateBook: This controller uses the findOneAndUpdate method from Mongoose to find a book by its title and update it with the data from the request body. If successful, it sends the updated book as a response. If it can't find the book, it sends a 404 status code with a message. If another error occurs, it sends a 500 status code along with the error message.
// Controller to update a book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title: req.params.title },
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Cannot find book" });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// deleteBook: This controller uses the findOne method from Mongoose to find a book by its title and the remove method to delete it. If successful, it sends a message as a response. If it can't find the book, it sends a 404 status code with a message. If another error occurs, it sends a 500 status code along with the error message.
// Controller to delete a book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    if (!book) {
      return res.status(404).json({ message: "Cannot find book" });
    }
    await book.remove();
    res.json({ message: "Deleted book" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
