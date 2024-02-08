// Dependencies
const { Router } = require("express");
const bookRouter = Router();

// Imports
const Book = require("./model");
const {
  addBook,
  getAllOrSomeBooks,
  deleteAllBooks,
  //////////////////////1//////////////////////
  getBookById,
  updateBookById,
  deleteBookById,
  //////////////////////2//////////////////////
  getAllTitles,
  UpdateAllFieldsByTitle,
  //////////////////////3//////////////////////
  getAllAuthors,
  getAllBooksFromAuthor,
  updateAuthorNameForAllBooks,
  deleteAllBooksByAuthor,
  //////////////////////4//////////////////////
  getAllGenres,
  getAllBooksFromGenre,
  updateGenreForAllBooks,
  deleteAllBooksByGenre,
} = require("./controller");

// POST "/books" endpoint. This endpoint is used to add new books to the database.
// -POST - adds a book to the database // - TASK 1
bookRouter.post("/", addBook);

// GET "/books" endpoint. This endpoint is used to fetch books from the database.
// -GET - gets all books from the database // TASK 2
bookRouter.get("/", getAllOrSomeBooks);

// DELETE "/books" endpoint. This endpoint is used to delete all books from the database.
bookRouter.delete("/", deleteAllBooks);

//////////////////////1//////////////////////

// GET "/books/:id" endpoint. This endpoint is used to fetch a single book from the database by its id.
bookRouter.get("/:id", getBookById);

// PUT "/books/:id" endpoint. This endpoint is used to update a book in the database by its id.
bookRouter.put("/:id", updateBookById);

// DELETE "/books/:id" endpoint. This endpoint is used to delete a book from the database by its id.
bookRouter.delete("/:id", deleteBookById);

//////////////////////2//////////////////////

// GET "/books/title" endpoint. This endpoint is used to fetch all unique title from the database.
bookRouter.get("/title", getAllTitles);

// PUT "/books/title/:title" endpoint. This endpoint is used to update a book in the database by its title.
bookRouter.put("/title/:title", UpdateAllFieldsByTitle);

//////////////////////3//////////////////////

// GET "/books/author" endpoint. This endpoint is used to fetch all unique authors from the database.
bookRouter.get("/author", getAllAuthors);

// GET "/books/author/:author" endpoint. This endpoint is used to fetch books from the database by their author.
bookRouter.get("/author/:author", getAllBooksFromAuthor);

// PUT "/books/author/:author" endpoint. This endpoint is used to update books in the database by their author.
bookRouter.put("/author/:author", updateAuthorNameForAllBooks);

// DELETE "/books/author/:author" endpoint. This endpoint is used to delete books from the database by their author.
bookRouter.delete("/author/:author", deleteAllBooksByAuthor);

//////////////////////4//////////////////////

// GET "/books/genre" endpoint. This endpoint is used to fetch all unique genres from the database.
bookRouter.get("/genre", getAllGenres);

// GET "/books/genre/:genre" endpoint. This endpoint is used to fetch books from the database by their genre.
bookRouter.get("/genre/:genre", getAllBooksFromGenre);

// PUT "/books/genre/:genre" endpoint. This endpoint is used to update books in the database by their genre.
bookRouter.put("/genre/:genre", updateGenreForAllBooks);

// DELETE "/books/genre/:genre" endpoint. This endpoint is used to delete books from the database by their genre.
bookRouter.delete("/genre/:genre", deleteAllBooksByGenre);

module.exports = bookRouter;
