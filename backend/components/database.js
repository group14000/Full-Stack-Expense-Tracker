// Import the 'mysql2' module for interacting with MySQL databases
const mysql = require("mysql2");

// Import the 'dotenv' module to load environment variables from a file
require("dotenv").config();

// Create a MySQL connection pool with configuration from environment variables
const pool = mysql.createPool({
  host: process.env.DB_HOST, // MySQL server host
  user: process.env.DB_USER, // MySQL username
  password: process.env.DB_PASSWORD, // MySQL password
  database: process.env.DB_DATABASE, // MySQL database name
  waitForConnections: true, // Whether the pool should wait for a connection to become available if the limit is reached
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // Maximum number of connection requests the pool will queue before returning an error
});

// Function to execute a MySQL query and return a promise
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    // Execute the MySQL query using the connection pool
    pool.execute(sql, values, (error, results) => {
      if (error) {
        // If there's an error, reject the promise with the error
        reject(error);
      } else {
        // If successful, resolve the promise with the query results
        resolve(results);
      }
    });
  });
};

// Export the 'query' function for use in other modules
module.exports = {
  query,
};
