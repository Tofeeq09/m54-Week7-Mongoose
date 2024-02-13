const { Router } = require("express");

const bookRouter = Router();

const {
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
} = require("./controller");

bookRouter.post("/", addBook);
bookRouter.get("/", getAllOrSpecificBooks);
bookRouter.delete("/", deleteAllBooks);
bookRouter.get("/title", getAllTitles);
bookRouter.get("/title/:title", getBookByTitle);
bookRouter.put("/title/:title", UpdateAllFieldsByTitle);
bookRouter.delete("/title/:title", deleteBookByTitle);
bookRouter.get("/author", getAllAuthors);
bookRouter.get("/author/:author", getAllBooksFromAuthor);
bookRouter.put("/author/:author", updateAuthorNameForAllBooks);
bookRouter.delete("/author/:author", deleteAllBooksByAuthor);
bookRouter.get("/genre", getAllGenres);
bookRouter.get("/genre/:genre", getAllBooksFromGenre);
bookRouter.put("/genre/:genre", updateGenreForAllBooks);
bookRouter.delete("/genre/:genre", deleteAllBooksByGenre);
bookRouter.get("/:id", getBookById);
bookRouter.put("/:id", updateBookById);
bookRouter.delete("/:id", deleteBookById);

module.exports = bookRouter;
