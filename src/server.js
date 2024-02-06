const express = require("express");

const app = express();

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});

// The database is the repository where data is stored and managed.

// **Database operations** are the actions that are performed on the database.
// Create - POST
// Read - GET
// Update - PATCH
// Destroy - DELETE
