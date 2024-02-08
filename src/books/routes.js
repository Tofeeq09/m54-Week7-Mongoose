const { Router } = require("express");
const bookRouter = Router();

const Book = require("./model");

const { addBook } = require("./controller");

// POST "/books" endpoint. This endpoint is used to add new books to the database.
bookRouter.post("/books", addBook);

module.exports = bookRouter;
