const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { conversation, username, meetingDetails } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nehapalsdett@gmail.com",
      pass: "ltca ryqp rtus evcb",
    },
  });

  let mailOptions = {
    from: "nehapalsdett@gmail.com",
    to: "palneha671@gmail.com",
    subject: `Meeting Scheduled by ${username}`,
    text: `Here are the meeting details:\n${meetingDetails}\n\nConversation:\n${conversation.join(
      "\n"
    )}`,
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
