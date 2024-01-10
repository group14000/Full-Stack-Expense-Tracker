const express = require("express");
const bodyParser = require("body-parser");
const db = require("./databse"); // Import the database module

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
      db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password], (err) => {
        if (err) {
          console.error("MySQL error:", err);
          res.status(500).json({ message: "Internal Server Error" });
        } else {
          res.status(201).json({ message: "User created successfully" });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
