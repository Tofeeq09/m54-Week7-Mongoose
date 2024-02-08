// Dependencies
const mongoose = require("mongoose");

// Define an asynchronous function named 'connection'
const connection = async () => {
  try {
    // Try to connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    // If the connection is successful, log a success message
    console.log("Connected to MongoDB");
  } catch (error) {
    // If there is an error during connection, log the error
    console.error("Error connecting to MongoDB: ", error);
    // Exit the process with a failure status (1)
    process.exit(1);
  }
};

module.exports = connection;
