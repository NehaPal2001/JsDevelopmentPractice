require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());
app.get("/api", (req, res) => {
  res.send("hello here is contact apis");
});

app.post("/send-email", async (req, res) => {
  const { conversation, username, meetingDetails } = req.body;
  console.log(conversation.message);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    to: process.env.EMAIL_USER,
    from: "palneha671@gmail.com",
    subject: `Meeting Scheduled by ${username}`,
    text: `Here are the meeting details:\n${meetingDetails}\n\nConversation:\n${conversation
      .filter((msg) => msg.sender === "user")
      .map((msg) => msg.message)
      .join("\n")}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error sending email" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
