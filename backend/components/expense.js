// Import the 'express' module for creating a web server
const express = require("express");

// Import the 'database' module, assumed to handle database interactions
const database = require("./database");

// Create an instance of the Express Router
const router = express.Router();

// Route for handling POST requests to add an expense
router.post("/add-expense", (req, res) => {
  // Destructure values from the request body
  const { amountSpent, expenseDescription, expenseCategory, expenseDate } =
    req.body;

  // SQL query to insert expense data into the database
  const insertQuery = `
    INSERT INTO expense_table (amountSpent, expenseDescription, expenseCategory, expenseDate)
    VALUES (?, ?, ?, ?)
  `;

  // Call the 'query' function from the 'database' module to execute the query
  database.query(
    insertQuery,
    [amountSpent, expenseDescription, expenseCategory, expenseDate],
    (err, result) => {
      if (err) {
        // If there's an error, log it and send a 500 internal server error response
        console.error("Error adding expense:", err);
        res.status(500).send("Error adding expense");
      } else {
        // If successful, log success message and send a 200 OK response
        console.log("Expense added successfully");
        res.status(200).send("Expense added successfully");
      }
    }
  );
});

// Route for handling GET requests to fetch all expenses
router.get("/get-expenses", (req, res) => {
  // SQL query to select all expenses from the database
  const selectQuery = `
      SELECT * FROM expense_table
    `;

  // Call the 'query' function from the 'database' module to execute the query
  database.query(selectQuery, (err, result) => {
    if (err) {
      // If there's an error, log it and send a 500 internal server error response with a JSON payload
      console.error("Error fetching expenses:", err);
      res
        .status(500)
        .json({ success: false, error: "Error fetching expenses" });
    } else {
      // If successful, send a 200 OK response with the query result as JSON
      res.status(200).json(result);
    }
  });
});

// Route for handling DELETE requests to delete an expense by ID
router.delete("/delete-expense/:id", (req, res) => {
  // Extract the expense ID from the request parameters
  const expenseId = req.params.id;

  // SQL query to delete an expense from the database by ID
  const deleteQuery = `
      DELETE FROM expense_table
      WHERE id = ?
    `;

  // Call the 'query' function from the 'database' module to execute the query
  database.query(deleteQuery, [expenseId], (err, result) => {
    if (err) {
      // If there's an error, log it and send a 500 internal server error response with a JSON payload
      console.error("Error deleting expense:", err);
      res.status(500).json({ success: false, error: "Error deleting expense" });
    } else {
      // If successful, log success message and send a 200 OK response with a JSON payload
      console.log("Expense deleted successfully");
      res.status(200).json({ success: true });
    }
  });
});

// Export the router for use in other modules
module.exports = router;
