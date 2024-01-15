// Import the 'bcrypt' module for password hashing
const bcrypt = require("bcrypt");

// Import the 'database' module, assumed to handle database interactions
const database = require("./database");

// Asynchronous function to check if an email already exists in the database
const isEmailExists = async (email) => {
  try {
    // Execute a query to select users with the specified email
    const result = await database.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    // Return true if any user with the email exists, otherwise false
    return result.length > 0;
  } catch (error) {
    // Log and rethrow an error if there's an issue checking email existence
    console.error("Error checking if email exists:", error);
    throw new Error("Internal Server Error");
  }
};

// Asynchronous function to handle user signup
const signup = async ({ name, email, password }) => {
  try {
    // Check if the provided email already exists in the database
    const emailExists = await isEmailExists(email);

    // If email exists, return an error
    if (emailExists) {
      return { error: "User with this email already exists" };
    }

    // Hash the provided password with a salt factor of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user data into the 'users' table in the database
    await database.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    // Log success message and return an empty object
    console.log("User inserted successfully");
    return {};
  } catch (error) {
    // Log and rethrow an error if there's an issue processing the signup
    console.error("Error processing signup:", error);
    throw new Error("Internal Server Error");
  }
};

// Asynchronous function to handle user login
const login = async ({ email, password }) => {
  try {
    // Select user data from the 'users' table based on the provided email
    const user = await database.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    // If no user is found with the provided email, return an error
    if (user.length === 0) {
      return { error: "User not found" };
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user[0].password);

    // If passwords don't match, return an error
    if (!passwordMatch) {
      return { error: "Incorrect password" };
    }

    // Log success message and return an empty object
    console.log("User logged in successfully");
    return {};
  } catch (error) {
    // Log and rethrow an error if there's an issue processing the login
    console.error("Error processing login:", error);
    throw new Error("Internal Server Error");
  }
};

// Export the 'signup' and 'login' functions for use in other modules
module.exports = {
  signup,
  login,
};
