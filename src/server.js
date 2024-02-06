const express = require("express");

const app = express();

// app.get("/health", (req, res) => {
//   res.send("healthy");
// });

app.post("/RideOrDie/contact.html", (req, res) => {
  // Handle the POST request here
  // For example, you might parse the request body and save the data

  // Then, send a response back to the client

  res.send("Thank you for your submission!");
});

app.use("/RideOrDie", express.static("rod"));

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});

// The database is the repository where data is stored and managed.

// **Database operations** are the actions that are performed on the database.
// Create - POST
// Read - GET
// Update - PATCH
// Destroy - DELETE
