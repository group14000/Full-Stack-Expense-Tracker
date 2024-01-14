const express = require("express");
const bodyParser = require("body-parser");
const user = require("./components/user");
const expenseRouter = require("./components/expense");
const paymentRoutes = require("./components/paymentRoutes");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use("/api", expenseRouter);
app.use("/", paymentRoutes);

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const signupResult = await user.signup({ name, email, password });

    if (signupResult.error) {
      res.status(400).json({ error: signupResult.error });
    } else {
      res.status(201).json({ message: "Signup successful!" });
    }
  } catch (error) {
    console.error("Error handling signup:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const loginResult = await user.login({ email, password });

    if (loginResult.error) {
      res.status(401).json({ error: loginResult.error });
    } else {
      res.status(200).json({ message: "Login successful!" });
    }
  } catch (error) {
    console.error("Error handling login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
