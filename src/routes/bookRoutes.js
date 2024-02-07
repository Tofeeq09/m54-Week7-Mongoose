const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// A GET route at the path '/' to get all books. This will use the getAllBooks function from our book controller.
// Route to get all books
router.get("/", bookController.getAllBooks);

// A POST route at the path '/' to add a new book. This will use the addBook function from our book controller.
// Route to add a book
router.post("/", bookController.addBook);

// A PUT route at the path '/:title' to update a book. This will use the updateBook function from our book controller. The ':title' in the path is a route parameter, which allows us to pass the title of the book we want to update in the URL.
// Route to update a book
router.put("/:title", bookController.updateBook);

// A DELETE route at the path '/:title' to delete a book. This will use the deleteBook function from our book controller. The ':title' in the path is a route parameter, which allows us to pass the title of the book we want to delete in the URL.
// Route to delete a book
router.delete("/:title", bookController.deleteBook);

// Export the router
module.exports = router;
