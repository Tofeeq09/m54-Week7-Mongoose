// External Dependencies - From third-party packages.
const { Router } = require("express");

// Router Instance - Create a new instance of an Express router.
const bookRouter = Router();

// Internal Module Imports - From files within the project.
const Book = require("./model"); // From the model.js file
const {
  ///Controller Functions from controller.js///
  addBook,
  getAllOrSpecificBooks,
  deleteAllBooks,
  /////////////////////////////////////////////
  getAllTitles,
  getBookByTitle,
  UpdateAllFieldsByTitle,
  deleteBookByTitle,
  /////////////////////////////////////////////
  getAllAuthors,
  getAllBooksFromAuthor,
  updateAuthorNameForAllBooks,
  deleteAllBooksByAuthor,
  /////////////////////////////////////////////
  getAllGenres,
  getAllBooksFromGenre,
  updateGenreForAllBooks,
  deleteAllBooksByGenre,
  /////////////////////////////////////////////
  getBookById,
  updateBookById,
  deleteBookById,
  /////////////////////////////////////////////
} = require("./controller");

// Routes
/////////////////////////////////////////////
// POST "/books" endpoint. This endpoint is used to add new books to the database.
bookRouter.post("/", addBook);
// GET "/books" endpoint. This endpoint is used to fetch all books or specific books by using query parameters.
bookRouter.get("/", getAllOrSpecificBooks);
// DELETE "/books" endpoint. This endpoint is used to delete all books from the database.
bookRouter.delete("/", deleteAllBooks);
/////////////////////////////////////////////
// GET "/books/title" endpoint. This endpoint is used to fetch all unique title from the database.
bookRouter.get("/title", getAllTitles);
// GET "/books/title/:title" endpoint. This endpoint is used to fetch books from the database by their title.
bookRouter.get("/title/:title", getBookByTitle);
// PUT "/books/title/:title" endpoint. This endpoint is used to dynamically update all book fields by its title.
bookRouter.put("/title/:title", UpdateAllFieldsByTitle);
// DELETE "/books/title/:title" endpoint. This endpoint is used to delete a book from the database by its title.
bookRouter.delete("/title/:title", deleteBookByTitle);
/////////////////////////////////////////////
// GET "/books/author" endpoint. This endpoint is used to fetch all unique authors from the database.
bookRouter.get("/author", getAllAuthors);
// GET "/books/author/:author" endpoint. This endpoint is used to fetch books from the database by their author.
bookRouter.get("/author/:author", getAllBooksFromAuthor);
// PUT "/books/author/:author" endpoint. This endpoint is used to update books in the database by their author.
bookRouter.put("/author/:author", updateAuthorNameForAllBooks);
// DELETE "/books/author/:author" endpoint. This endpoint is used to delete books from the database by their author.
bookRouter.delete("/author/:author", deleteAllBooksByAuthor);
/////////////////////////////////////////////
// GET "/books/genre" endpoint. This endpoint is used to fetch all unique genres from the database.
bookRouter.get("/genre", getAllGenres);
// GET "/books/genre/:genre" endpoint. This endpoint is used to fetch books from the database by their genre.
bookRouter.get("/genre/:genre", getAllBooksFromGenre);
// PUT "/books/genre/:genre" endpoint. This endpoint is used to update books in the database by their genre.
bookRouter.put("/genre/:genre", updateGenreForAllBooks);
// DELETE "/books/genre/:genre" endpoint. This endpoint is used to delete books from the database by their genre.
bookRouter.delete("/genre/:genre", deleteAllBooksByGenre);
/////////////////////////////////////////////
// GET "/books/:id" endpoint. This endpoint is used to fetch a single book from the database by its id.
bookRouter.get("/:id", getBookById);
// PUT "/books/:id" endpoint. This endpoint is used to update a book in the database by its id.
bookRouter.put("/:id", updateBookById);
// DELETE "/books/:id" endpoint. This endpoint is used to delete a book from the database by its id.
bookRouter.delete("/:id", deleteBookById);
/////////////////////////////////////////////

// Export the bookRouter object so it can be imported and used in server.js.
module.exports = bookRouter;
