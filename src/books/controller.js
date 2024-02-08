const Book = require("./model"); // Import the Book model from the model.js file.

const addBook = async (req, res) => {
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
    res.status(500).send({ message: "Error adding book", error: error });
    return;
  }
};
// To use the insertMany method, pass an array of book objects as the argument.
// To use the create method, pass a single book object as the argument.
// More information about the insertMany and create methods can be found in the Mongoose documentation:
// https://mongoosejs.com/docs/api/model.html#model_Model.insertMany
// https://mongoosejs.com/docs/api/model.html#model_Model.create

module.exports = {
  addBook: addBook,
};
