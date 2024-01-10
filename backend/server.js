const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database"); // Import the database module
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add Expense endpoint
app.post("/api/add-expense", (req, res) => {
  const { amountSpent, expenseDescription, expenseCategory } = req.body;

  const query =
    "INSERT INTO expenses (amount_spent, description, category) VALUES (?, ?, ?)";
  db.query(
    query,
    [amountSpent, expenseDescription, expenseCategory],
    (err, results) => {
      if (err) {
        console.error("Error inserting data into MySQL:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      console.log("Data inserted into MySQL:", results);
      res.status(200).json({ success: true });
    }
  );
});

// Signup endpoint
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("MySQL error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    } else if (results.length > 0) {
      res.status(409).json({ message: "User already exists" });
    } else {
      // User does not exist, insert into the database
      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        (err) => {
          if (err) {
            console.error("MySQL error:", err);
            res.status(500).json({ message: "Internal Server Error" });
          } else {
            res.status(201).json({ message: "User created successfully" });
          }
        }
      );
    }
  });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists and password matches
  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error("MySQL error:", err);
        res.status(500).json({ message: "Internal Server Error" });
      } else if (results.length > 0) {
        res.status(200).json({ message: "Login successful" });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
