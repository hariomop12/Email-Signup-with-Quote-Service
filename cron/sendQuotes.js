// Cron Job for sending quotes every 6 hours
const cron = require("node-cron");
const pool = require("../config/db");
const transporter = require("../config/mailer");

const sendQuotes = async () => {
  try {
    // Fetch all users
    const users = await pool.query("SELECT * FROM users");
    // Fetch random quote
    const quotes = await pool.query(
      "SELECT * FROM quotes ORDER BY RANDOM() LIMIT 1"
    );

    // Send email to each user
    users.rows.forEach(async (user) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Your Daily Motivational Quote", // Email subject
        text: `Dear User,

Here is your daily quote:

"${quotes.rows[0].quotes}"

Best regards,
Your Quote App
`, // Plain text body
        html: `<p>Dear User,</p>
                 <p>Here is your daily quote:</p>
                 <blockquote>${quotes.rows[0].quotes}</blockquote>
                 <p>Best regards,<br>Your Quote App</p>`, // HTML body (optional)
      };
      await transporter.sendMail(mailOptions);
    });
  } catch (error) {
    console.error(error.message);
    // Remove res.error(500).send as res is not defined in this context
  }
};

// Schedule the cron job to run every 6 hours
cron.schedule("* * * * *", sendQuotes);