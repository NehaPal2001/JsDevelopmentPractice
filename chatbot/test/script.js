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
    const lastBotMessage = storedConversation
      .reverse()
      .find((message) => message.sender === "bot");

    if (lastBotMessage) {
      const responseKey = Object.keys(responses).find((key) =>
        responses[key].response.includes(lastBotMessage.message)
      );

      if (responseKey) {
        updatePromptButtons(responses[responseKey].options);
      }
    }

    document.getElementById("prompt-buttons").style.display = "flex";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  loadConversation();
  const lastBotMessage =
    conversation.length > 0 ? conversation[0].message : null;

  if (
    conversation.length === 0 ||
    lastBotMessage ===
      "Your meeting has been scheduled and an email has been sent."
  ) {
    setTimeout(() => {
      addMessage("bot", responses["Welcome"].response[0]);
      updatePromptButtons(responses["Welcome"].options);
      document.getElementById("prompt-buttons").style.display = "flex";
    }, typingDuration);
  }
});

const typingDuration = 1000;

const responses = {
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
    options: ["Back to Main Menu"],
  },

  "Schedule a Meeting": {
    response: [
      "Absolutely! I can help with that. Please select a date and time that works best for you, and let us know if you prefer a video call, phone call, or in-person meeting.",
      "Your meeting has been scheduled and an email has been sent.",
    ],

    options: ["Back to Main Menu"],
  },

  "Case Studies or Testimonials": {
    response: [
      "Certainly! We have over 100+ successful projects across various industries. Would you like to view our case studies or read testimonials from our clients?",
    ],

    options: ["Case Studies", "Testimonials"],
  },

  "Test Automation": {
    response: [
      'Here’s more information about our Test Automation services. <a href="https://sdettech.com/test-automation-development/" target="_blank">Link to automation page</a>',
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
      'We offer other specialized services as well. Please visit our services page for more details. <a href="https://sdettech.com/performance-and-load-testing/" target="_blank">view services</a>',
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
  document.body.style.cursor = "wait";
  addMessage("user", prompt);
  setTimeout(() => {
    const botResponse = responses[prompt] || responses["Welcome"];
    console.log(botResponse);
    botResponse.response.forEach((res) => addMessage("bot", res));
    if (prompt === "Schedule a Meeting") {
      showEmailPhoneInput();
    } else {
      updatePromptButtons(botResponse.options);
    }
    document.body.style.cursor = "default";
  }, typingDuration);
}

function updatePromptButtons(options) {
  const buttonsContainer = document.getElementById("prompt-buttons");
  buttonsContainer.innerHTML = "";

  options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "prompt-btn";
    button.textContent = option;

    if (option === "Schedule a Meeting") {
      button.onclick = () => {
        showEmailPhoneInput();
      };
    } else {
      button.onclick = () => {
        document.querySelectorAll(".prompt-btn").forEach((btn) => {
          btn.disabled = true;
        });

        handleUserInput(option);

        setTimeout(() => {
          document.querySelectorAll(".prompt-btn").forEach((btn) => {
            btn.disabled = false;
          });
        }, typingDuration);
      };
    }

    buttonsContainer.appendChild(button);
  });
}

function showEmailPhoneInput() {
  const emailPhoneDiv = document.getElementById("schedule-email-phone");
  emailPhoneDiv.classList.remove("hidden");
  document.getElementById("prompt-buttons").style.display = "none";

  document.getElementById("user-email").value = "";
  document.getElementById("user-phone").value = "";
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
      messageElement.innerHTML = message; 
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

function toggleChatbox() {
  const chatbox = document.getElementById("chatbox");
  const dialogBox = document.getElementById("dialog-box");
  if (!dialogBox.classList.contains("hidden")) {
    dialogBox.classList.add("hidden");
  }
  if (chatbox.classList.contains("hidden")) {
    chatbox.classList.remove("hidden");
    chatbox.classList.add("open");
  } else {
    chatbox.classList.add("hidden");
    chatbox.classList.remove("open");
  }
}

function confirmEmailPhone() {
  const email = document.getElementById("user-email").value;
  const phone = document.getElementById("user-phone").value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(?:\+?\d{12}|\d{10})$/;

  if (email && phone) {
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert(
        "Please enter a valid mobile number. It should be either 10 digits or start with '+' followed by 12 digits."
      );
      return;
    }

    const scheduleEmailPhone = document.getElementById("schedule-email-phone");
    scheduleEmailPhone.classList.add("hidden");

    const scheduleMeeting = document.getElementById("schedule-meeting-modal");
    scheduleMeeting.classList.remove("hidden");

    addMessage("user", `Email: ${email}`);
    addMessage("user", `Phone Number: ${phone}`);
  } else {
    alert("Please enter both email and phone number.");
  }
}

function openModal() {
  document.getElementById("schedule-email-phone").classList.remove("hidden");
}
function closeEmailPhoneModal(){
  const scheduleEmailPhone = document.getElementById("schedule-email-phone");
  scheduleEmailPhone.classList.add("hidden");
  document.getElementById("prompt-buttons").style.display = "flex";

}

function closeModal() {
  document.getElementById("schedule-meeting-modal").classList.add("hidden");
  document.getElementById("prompt-buttons").style.display = "flex";
}

async function confirmMeeting() {
  const date = document.getElementById("meeting-date").value;
  const time = document.getElementById("meeting-time").value;
  const email = document.getElementById("user-email").value;
  const phone = document.getElementById("user-phone").value;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^(?:\+?\d{12}|\d{10})$/;

  if (date && time) {
    const meetingDateTime = new Date(`${date}T${time}`);

    const now = new Date();

    // Validate that the meeting date and time are in the future
    if (meetingDateTime <= now) {
      alert("Please select a date and time that is in the future.");
      return;
    }

    console.log(date, time, email, phone);

    addMessage(
      "user",
      `I would like to schedule a meeting on ${date} at ${time}`
    );

    const emailData = {
      conversation,
      email,
      phone,
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
      closeModal();
      if (result.success) {
        addMessage(
          "bot",
          "Your meeting has been scheduled and an email has been sent."
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
    closeModal();
    document.getElementById("prompt-buttons").style.display = "flex";
  } else {
    alert("Please select both date and time.");
  }
}
