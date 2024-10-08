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

// const responses1 = {
//   "General Inquiry?":
//     "Sure! We specialize in a range of software quality testing services including Test Automation, Performance Testing, Security Testing, Mobile Testing, and more. Would you like more detailed information on any specific service?",

//   "About SDET":
//     "I'd be happy to assist with that! We at ABC are a group of Software Quality Evangelists, passionate about delivering top-notch software product quality. The team of quality experts has vast experience in various products/business domains such as E-Learning/Publishing, Real estate, Mortgage/Lending, E-Commerce, Retail, Store Inventory, Health care, FinTech, etc. ",
//   "Schedule a meeting": "Please select a date and time for the meeting.",

//   "What services do you provide?":
//     "We provide various testing services such as automation testing, performance testing, and security testing.",
//   "Case Studies or Testimonials?":
//     "Certainly! We have over 100+ successful projects across various industries. Would you like to view our case studies or read testimonials from our clients?",
//   "Can you share some reviews from clients?":
//     "Our clients love the efficiency and accuracy of our services! John says: 'The best testing team we've worked with.'",
//   "Test Automation?":
//     "Here’s more information about our Test Automation services. [Link to service page]",
// };
const responses1 = {
  Welcome: {
    response: [
      "Hi there! Welcome to ABC. I'm here to help you with anything related to software quality testing. How can I assist you today?",
    ],

    options: [
      "General Inquiry",
      "About ABC",
      "Schedule a Meeting",
      "Case Studies or Testimonials",
    ],
  },

  "General Inquiry": {
    response: [
      "Sure! We specialize in a range of software quality testing services including Test Automation, Performance Testing, Security Testing, Mobile Testing, and more. Would you like more detailed information on any specific service?",
    ],

    options: [
      "Test Automation",
      "Performance Testing",
      "Security Testing",
      "Mobile Testing",
      "Other Services",
    ],
  },

  "About ABC": {
    response: [
      "I'd be happy to assist with that! We at ABC are a group of Software Quality Evangelists, passionate about delivering top-notch software product quality. The team of quality experts has vast experience in various products/business domains such as E-Learning/Publishing, Real estate, Mortgage/Lending, E-Commerce, Retail, Store Inventory, Health care, FinTech, etc. [Read More]",
    ],

    options: ["Read More"],
  },

  "Schedule a Meeting": {
    response: [
      "Absolutely! I can help with that. Please select a date and time that works best for you, and let us know if you prefer a video call, phone call, or in-person meeting.",
    ],

    options: ["Select Date and Time"],
  },

  "Case Studies or Testimonials": {
    response: [
      "Certainly! We have over 100+ successful projects across various industries. Would you like to view our case studies or read testimonials from our clients?",
    ],

    options: ["Case Studies", "Testimonials"],
  },

  "Test Automation": {
    response: [
      "Here’s more information about our Test Automation services. [Link to service page]",
    ],

    options: ["Back to Main Menu"],
  },

  "Performance Testing": {
    response: [
      "Here’s more information about our Performance Testing services.",
    ],

    options: ["Back to Main Menu"],
  },

  "Security Testing": {
    response: ["Here’s more information about our Security Testing services."],

    options: ["Back to Main Menu"],
  },

  "Mobile Testing": {
    response: ["Here’s more information about our Mobile Testing services."],

    options: ["Back to Main Menu"],
  },

  "Other Services": {
    response: [
      "We offer other specialized services as well. Please visit our services page for more details. [Link]",
    ],

    options: ["Back to Main Menu"],
  },

  "Read More": {
    response: [
      "Here’s more information about our company. [Link to About Us page]",
    ],

    options: ["Back to Main Menu"],
  },

  "Select Date and Time": {
    response: [
      "Please choose a suitable date and time for the meeting. We will send you a calendar invite once it's scheduled.",
    ],

    options: ["Back to Main Menu"],
  },

  "Case Studies": {
    response: ["Here are some of our case studies. [Link to case studies]"],

    options: ["Back to Main Menu"],
  },

  Testimonials: {
    response: [
      "Here are some testimonials from our clients. [Link to testimonials]",
    ],

    options: ["Back to Main Menu"],
  },

  "Back to Main Menu": {
    response: ["Is there anything else I can help you with today?"],

    options: [
      "General Inquiry",
      "About ABC",
      "Schedule a Meeting",
      "Case Studies or Testimonials",
    ],
  },

  End: {
    response: [
      "Thank you for visiting ABC! If you have more questions in the future, feel free to chat with me anytime. Have a great day!",
    ],

    options: [],
  },
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
        "Hi there! Welcome to SDET. I'm here to help you with anything related to software quality testing. How can I assist you today?"
      );
    }, typingDuration);
  }
});
function toggleChatbox() {
  const chatbox = document.getElementById("chatbox");
  const isHidden = chatbox.classList.contains("hidden");

  if (isHidden) {
    chatbox.classList.remove("hidden");
  } else {
    chatbox.classList.add("hidden");
  }
}
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
