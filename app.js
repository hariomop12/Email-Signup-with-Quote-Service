const express = require("express");
const userRouter = require("./routes/userRoutes");
require("dotenv").config();
require("./cron/sendQuotes"); // Start the cron job
const pool = require("./config/db"); // Import the database pool

const app = express();

app.use(express.json());

// Check for DB connection
const checkDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log(`✅ Connected to the database on thread ${client.processID} 🚀`);
    client.release(); // ✅ Release the connection
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
  }
};

checkDbConnection();

// Route
app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;