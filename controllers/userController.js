const pool = require("../config/db");
const transporter = require("../config/mailer");
const validator = require("validator");

const signup = async (req, res) => {
  const { email } = req.body;
  if(!validator.isEmail(email)){
    return res.status(400).json({ error: "Invalid email address" });
  }
  try {
    // check email already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Save user to the database
    const result = await pool.query(
      "INSERT INTO users (email) VALUES ($1) RETURNING *",
      [email]
    );

    // Send confirmation email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Signup Successfully",
      text: "Welcome to Quote App, you will receive daily quotes from us",
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Confirmation email sent successfully");
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError.message);
      return res
        .status(500)
        .json({ error: "Failed to send confirmation email" });
    }

    res
      .status(201)
      .json({ message: "User created successfully", user: result.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error🐽" });
  }
};

module.exports = { signup };
