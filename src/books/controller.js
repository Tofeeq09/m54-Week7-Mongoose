const Book = require("./model"); // Import the Book model from the model.js file.

const addBook = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const newBooks = await Book.insertMany(req.body);
      res.status(201).send(newBooks);
      return;
    }
    const newBooks = await Book.create(req.body);
    res.status(201).send(newBooks);
    return;
  } catch (error) {
    console.log("Error adding book: ", error);
    res.status(500).send({ message: "Error adding book", error: error });
    return;
  }
};

const getAllOrSpecificBooks = async (req, res) => {
  try {
    const books = await Book.find(req.query).exec();
    res.status(200).send(books);
  } catch (error) {
    console.log("Error fetching books: ", error);
    res
      .status(500)
      .send({ message: "Error fetching books", error: error.message });
  }
};

const deleteAllBooks = async (req, res) => {
  try {
    const result = await Book.deleteMany({});
    if (result.deletedCount === 0) {
      res.status(404).send({ message: "No books found" });
      return;
    }
    res.status(200).send({ message: `${result.deletedCount} books deleted` });
  } catch (error) {
    console.log("Error deleting books: ", error);
    res
      .status(500)
      .send({ message: "Error deleting books", error: error.message });
  }
};

const getAllTitles = async (req, res) => {
  try {
    const titles = await Book.distinct("title");
    if (titles.length === 0) {
      res.status(404).send({
        message: "No authors found",
      });
      return;
    }
    res.status(200).send(titles);
  } catch (error) {
    console.log("Error getting titles: ", error);
    res
      .status(500)
      .send({ message: "Error getting titles", error: error.message });
  }
};

const getBookByTitle = async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    if (!book) {
      res.status(404).send({ message: "Book not found" });
      return;
    }
    res.status(200).send(book);
  } catch (error) {
    console.log("Error getting book: ", error);
    res
      .status(500)
      .send({ message: "Error getting book", error: error.message });
  }
};

const UpdateAllFieldsByTitle = async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title: req.params.title },
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      res.status(404).send({ message: "Book not found" });
      return;
    }
    res.status(200).send(updatedBook);
  } catch (error) {
    console.log("Error updating book: ", error);
    res
      .status(500)
      .send({ message: "Error updating book", error: error.message });
  }
};

const deleteBookByTitle = async (req, res) => {
  try {
    const deletedBook = await Book.findOneAndDelete({
      title: req.params.title,
    });
    if (!deletedBook) {
      res.status(404).send({ message: "Book not found" });
      return;
    }
    res.status(200).send({ message: "Book successfully deleted" });
  } catch (error) {
    console.log("Error deleting book: ", error);
    res
      .status(500)
      .send({ message: "Error deleting book", error: error.message });
  }
};

const getAllAuthors = async (req, res) => {
  try {
    const authors = await Book.distinct("author");
    if (authors.length === 0) {
      res.status(404).send({
        message: "No authors found",
      });
      return;
    }
    res.status(200).send(authors);
  } catch (error) {
    console.log("Error getting authors: ", error);
    res
      .status(500)
      .send({ message: "Error getting authors", error: error.message });
  }
};

const getAllBooksFromAuthor = async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.author });
    if (!books || books.length === 0) {
      res.status(404).send({
        message: "No books found from this author",
      });
      return;
    }
    res.status(200).send(books);
  } catch (error) {
    console.log("Error retrieving books: ", error);
    res
      .status(500)
      .send({ message: "Error retrieving books", error: error.message });
  }
};

const updateAuthorNameForAllBooks = async (req, res) => {
  try {
    const result = await Book.updateMany(
      { author: req.params.author },
      { author: req.body.author }
    );
    if (result.modifiedCount === undefined || result.modifiedCount === 0) {
      res.status(404).send({ message: "No books found from this author" });
      return;
    }
    res.status(200).send({ message: `${result.modifiedCount} books updated` });
  } catch (error) {
    console.log("Error updating books: ", error);
    res
      .status(500)
      .send({ message: "Error updating books", error: error.message });
  }
};

const deleteAllBooksByAuthor = async (req, res) => {
  try {
    const result = await Book.deleteMany({ author: req.params.author });
    if (result.deletedCount === undefined || result.deletedCount === 0) {
      res.status(404).send({ message: "No books found from this author" });
      return;
    }
    res.status(200).send({ message: `${result.deletedCount} books deleted` });
  } catch (error) {
    console.log("Error deleting books: ", error);
    res
      .status(500)
      .send({ message: "Error deleting books", error: error.message });
  }
};

const getAllGenres = async (req, res) => {
  try {
    const genres = await Book.distinct("genre");
    if (genres.length === 0) {
      res.status(404).send({
        message: "No genres found",
      });
      return;
    }
    res.status(200).send(genres);
  } catch (error) {
    console.log("Error getting genres: ", error);
    res
      .status(500)
      .send({ message: "Error getting genres", error: error.message });
  }
};

const getAllBooksFromGenre = async (req, res) => {
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
};
const updateGenreForAllBooks = async (req, res) => {
  try {
    const result = await Book.updateMany(
      { genre: req.params.genre },
      { genre: req.body.genre }
    );
    if (result.modifiedCount === undefined || result.modifiedCount === 0) {
      res.status(404).send({ message: "No books found from this genre" });
      return;
    }
    res.status(200).send({ message: `${result.modifiedCount} books updated` });
  } catch (error) {
    console.log("Error updating books: ", error);
    res
      .status(500)
      .send({ message: "Error updating books", error: error.message });
  }
};

const deleteAllBooksByGenre = async (req, res) => {
  try {
    const result = await Book.deleteMany({ genre: req.params.genre });
    if (result.deletedCount === undefined || result.deletedCount === 0) {
      res.status(404).send({ message: "No books found for this genre" });
      return;
    }
    res.status(200).send({ message: `${result.deletedCount} books deleted` });
  } catch (error) {
    console.log("Error deleting books: ", error);
    res
      .status(500)
      .send({ message: "Error deleting books", error: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).send({
        message: "No book found with this id",
      });
      return;
    }
    res.status(200).send(book);
  } catch (error) {
    console.log("Error getting book: ", error);
    res
      .status(500)
      .send({ message: "Error getting book", error: error.message });
  }
};

const updateBookById = async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      res.status(404).send({
        message: "No book found with this id",
      });
      return;
    }
    res.status(200).send(updatedBook);
  } catch (error) {
    console.log("Error updating book: ", error);
    res
      .status(500)
      .send({ message: "Error updating book", error: error.message });
  }
};

const deleteBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).send({
        message: "No book found with this id",
      });
      return;
    }
    res.status(200).send({ message: "Book deleted", book: book });
  } catch (error) {
    console.log("Error deleting book: ", error);
    res
      .status(500)
      .send({ message: "Error deleting book", error: error.message });
  }
};

module.exports = {
  addBook,
  getAllOrSpecificBooks,
  deleteAllBooks,
  getAllTitles,
  getBookByTitle,
  UpdateAllFieldsByTitle,
  deleteBookByTitle,
  getAllAuthors,
  getAllBooksFromAuthor,
  updateAuthorNameForAllBooks,
  deleteAllBooksByAuthor,
  getAllGenres,
  getAllBooksFromGenre,
  updateGenreForAllBooks,
  deleteAllBooksByGenre,
  getBookById,
  updateBookById,
  deleteBookById,
};
