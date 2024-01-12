const bcrypt = require("bcrypt");
const database = require("./database");

const isEmailExists = async (email) => {
  try {
    const result = await database.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return result.length > 0;
  } catch (error) {
    console.error("Error checking if email exists:", error);
    throw new Error("Internal Server Error");
  }
};

const signup = async ({ name, email, password }) => {
  try {
    const emailExists = await isEmailExists(email);

    if (emailExists) {
      return { error: "User with this email already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await database.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    console.log("User inserted successfully");
    return {};
  } catch (error) {
    console.error("Error processing signup:", error);
    throw new Error("Internal Server Error");
  }
};

const login = async ({ email, password }) => {
  try {
    const user = await database.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (user.length === 0) {
      return { error: "User not found" };
    }

    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (!passwordMatch) {
      return { error: "Incorrect password" };
    }

    console.log("User logged in successfully");
    return {};
  } catch (error) {
    console.error("Error processing login:", error);
    throw new Error("Internal Server Error");
  }
};

module.exports = {
  signup,
  login,
};
