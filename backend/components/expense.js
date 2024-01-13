const express = require("express");
const database = require("./database");

const router = express.Router();

router.post("/add-expense", (req, res) => {
  const { amountSpent, expenseDescription, expenseCategory, expenseDate } =
    req.body;

  const insertQuery = `
    INSERT INTO expense_table (amountSpent, expenseDescription, expenseCategory, expenseDate)
    VALUES (?, ?, ?, ?)
  `;

  database.query(
    insertQuery,
    [amountSpent, expenseDescription, expenseCategory, expenseDate],
    (err, result) => {
      if (err) {
        console.error("Error adding expense:", err);
        res.status(500).send("Error adding expense");
      } else {
        console.log("Expense added successfully");
        res.status(200).send("Expense added successfully");
      }
    }
  );
});

// Get all expenses
router.get("/get-expenses", (req, res) => {
  const selectQuery = `
      SELECT * FROM expense_table
    `;

  database.query(selectQuery, (err, result) => {
    if (err) {
      console.error("Error fetching expenses:", err);
      res
        .status(500)
        .json({ success: false, error: "Error fetching expenses" });
    } else {
      res.status(200).json(result);
    }
  });
});

// Delete expense by ID
router.delete("/delete-expense/:id", (req, res) => {
  const expenseId = req.params.id;

  const deleteQuery = `
      DELETE FROM expense_table
      WHERE id = ?
    `;

  database.query(deleteQuery, [expenseId], (err, result) => {
    if (err) {
      console.error("Error deleting expense:", err);
      res.status(500).json({ success: false, error: "Error deleting expense" });
    } else {
      console.log("Expense deleted successfully");
      res.status(200).json({ success: true });
    }
  });
});

module.exports = router;
