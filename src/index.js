require("dotenv").config();
const express = require("express");

const connection = require("./db/connection");
const bookRouter = require("./books/routes");

const app = express();

app.use(express.json());

connection();

app.use("/books", bookRouter);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
