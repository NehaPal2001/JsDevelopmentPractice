const chatWindow = document.getElementById("chat-window");
let conversation = [];

function loadConversation() {
  const storedConversation = JSON.parse(
    localStorage.getItem("chatConversation")
  );
  if (storedConversation && storedConversation.length > 0) {
    conversation = storedConversation;
    storedConversation.forEach((message) => {
      addMessage(message.sender, message.message, false, false);
    });
  }
}

const typingDuration = 1000;

const responses1 = {
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
      addMessage("bot", responses1[prompt]);
    }
  }, typingDuration);
}

function addMessage(sender, message, persist = true, typing = true) {
  const messageElement = document.createElement("div");
  messageElement.className = `${sender}-message`;

  if (sender === "bot" && typing) {
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
  if (persist) {
    conversation.push({ sender, message });
    localStorage.setItem("chatConversation", JSON.stringify(conversation));
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadConversation();
  if (conversation.length === 0) {
    setTimeout(() => {
      addMessage(
        "bot",
        "Hello, I am SDET Automated Assistance. How can I help you?"
      );
    }, typingDuration);
  }
});

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
      const response = await fetch(
        "https://js-development-practice.vercel.app/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailData),
        }
      );
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
// https://img.freepik.com/free-psd/cute-3d-robot-waving-hand-cartoon-vector-icon-illustration-people-technology-isolated-flat-vector_138676-10649.jpg?w=740&t=st=1726825907~exp=1726826507~hmac=44b5f145ae4b0a6934c6f852912187de1e3b7d2f0df7087f5d341d0230d423c6

// chatbot image
