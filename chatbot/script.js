const chatWindow = document.getElementById("chat-window");
let conversation = [];

const typingDuration = 1000;

const responses = {
  "What is your name?": "My name is Sia from SDET, nice to meet you!",
  "Schedule a meeting": "Please select a date and time for the meeting.",
  "What services do you provide?":
    "We provide various testing services such as automation testing, performance testing, and security testing.",
  "Can you share some reviews from clients?":
    "Our clients love the efficiency and accuracy of our services! John says: 'The best testing team we've worked with.'",
};

function handleUserInput(prompt) {
  addMessage("user", prompt);
  setTimeout(() => {
    if (prompt === "Schedule a meeting") {
      document.getElementById("prompt-buttons").style.display = "none";
      document.getElementById("schedule-meeting").classList.remove("hidden");
    } else {
      addMessage("bot", responses[prompt]);
    }
  }, typingDuration);
}

function addMessage(sender, message) {
  const messageElement = document.createElement("div");
  messageElement.className = `${sender}-message`;
  if (sender === "bot") {
    messageElement.textContent = "Typing...";
    messageElement.classList.add("typing");
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    setTimeout(() => {
      messageElement.textContent = message;
      messageElement.classList.remove("typing");
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, typingDuration);
  } else {
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  conversation.push(message);
}

window.onload = function () {
  setTimeout(() => {
    addMessage(
      "bot",
      "Hello, I am SDET Automated Assistance. How can I help you?"
    );
  }, typingDuration);
};

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
      addMessage("bot", "An error occurred while sending the email.");
    }

    document.getElementById("schedule-meeting").classList.add("hidden");
    document.getElementById("prompt-buttons").style.display = "flex";
  } else {
    alert("Please select both date and time.");
  }
}
