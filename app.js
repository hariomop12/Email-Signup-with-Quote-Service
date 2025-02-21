const express = require("express");
const userRouter = require("./routes/userRoutes");
require("dotenv").config();
const pool = require("./config/db");

const app = express();

app.use(express.json());

// Check for DB connection
const checkDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log(`✅ Connected to the database on thread ${client.processID} 🚀`);
    client.release();
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
  }
};

checkDbConnection();

// Route
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the User API");
});

// Only start the server if this file is run directly
if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;