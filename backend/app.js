// Import the 'express' module for creating a web server
const express = require("express");

// Import the 'body-parser' module for parsing incoming request bodies
const bodyParser = require("body-parser");

// Import the 'user' module from the './components' directory
const user = require("./components/user");

// Import the 'expenseRouter' module from the './components' directory
const expenseRouter = require("./components/expense");

// Import the 'paymentRoutes' module from the './components' directory
const paymentRoutes = require("./components/paymentRoutes");

// Load environment variables from a .env file
require("dotenv").config();

// Create an instance of the Express application
const app = express();

// Use 'bodyParser' middleware to parse JSON request bodies
app.use(bodyParser.json());

// Mount the 'expenseRouter' at the "/api" route
app.use("/api", expenseRouter);

// Mount the 'paymentRoutes' at the root route
app.use("/", paymentRoutes);

// Route for handling POST requests to sign up a new user
app.post("/signup", async (req, res) => {
  try {
    // Destructure user details from the request body
    const { name, email, password } = req.body;

    // Call the 'signup' function from the 'user' module with user details
    const signupResult = await user.signup({ name, email, password });

    // Check if there's an error in the signup result and respond accordingly
    if (signupResult.error) {
      res.status(400).json({ error: signupResult.error });
    } else {
      res.status(201).json({ message: "Signup successful!" });
    }
  } catch (error) {
    // Log and handle errors, sending a 500 Internal Server Error response with a JSON payload
    console.error("Error handling signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for handling POST requests to log in an existing user
app.post("/login", async (req, res) => {
  try {
    // Destructure user credentials from the request body
    const { email, password } = req.body;

    // Call the 'login' function from the 'user' module with user credentials
    const loginResult = await user.login({ email, password });

    // Check if there's an error in the login result and respond accordingly
    if (loginResult.error) {
      res.status(401).json({ error: loginResult.error });
    } else {
      res.status(200).json({ message: "Login successful!" });
    }
  } catch (error) {
    // Log and handle errors, sending a 500 Internal Server Error response with a JSON payload
    console.error("Error handling login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define the port for the server to listen on, using the provided PORT or defaulting to 3001
const PORT = process.env.PORT || 3001;

// Start the server and log the listening URL to the console
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
