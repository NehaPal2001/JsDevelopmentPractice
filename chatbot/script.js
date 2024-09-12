const chatWindow = document.getElementById("chat-window");
let conversation = [];
//typing effect

const responses = {
  "What is your name?": "My name is ChatBot, nice to meet you!",
  "Schedule a meeting": "Please select a date and time for the meeting.",
};

function handleUserInput(prompt) {
  addMessage("user", prompt);
  if (prompt === "Schedule a meeting") {
    document.getElementById("prompt-buttons").style.display = "none";
    document.getElementById("schedule-meeting").classList.remove("hidden");
  } else {
    addMessage("bot", responses[prompt]);
  }
}

function addMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.className = `${sender}-message`;
  messageElement.textContent = `${
    sender === "user" ? "You" : "Bot"
  }: ${message}`;
  chatWindow.appendChild(messageElement);

  conversation.push(`${sender === "user" ? "You" : "Bot"}: ${message}`);

  chatWindow.scrollTop = chatWindow.scrollHeight;
}
// Worked on the email configuration for end user through chatbot
async function confirmMeeting() {
  const date = document.getElementById("meeting-date").value;
  const time = document.getElementById("meeting-time").value;

  if (date && time) {
    addMessage(
      "user",
      `I would like to schedule a meeting on ${date} at ${time}`
    );

    const emailData = {
      conversation,
      username: "User's Name",
      meetingDetails: `Meeting scheduled on ${date} at ${time}`,
    };

    try {
      const response = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });
      console.log(emailData);
      const result = await response.json();
      if (result.success) {
        addMessage(
          "bot",
          "Your meeting has been scheduled and email has been sent."
        );
      } else {
        addMessage(
          "bot",
          "Failed to send email, but the meeting is scheduled."
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      addMessage("bot", "An error occurred while sending the email.");
    }

    document.getElementById("schedule-meeting").classList.add("hidden");
    document.getElementById("prompt-buttons").style.display = "flex";
  } else {
    alert("Please select both date and time.");
  }
}

// Function to send a manual email (used in the "Send Email" button)
// async function sendEmail() {
//   const emailData = {
//     conversation,
//     username: "User's Name",
//   };

//   try {
//     const response = await fetch("http://localhost:3000/send-email", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(emailData),
//     });

//     const result = await response.json();
//     if (result.success) {
//       alert("Email sent successfully!");
//     } else {
//       alert("Failed to send email.");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     alert("Error sending email.");
//   }
// }
