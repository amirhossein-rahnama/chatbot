// Initialize OpenAI API client
const openai = require('@openai/api')('YOUR_API_KEY');

// Initialize Remix
const { createApi } = require('@remix-run/data');
const { json } = require('body-parser');

// Initialize Supabase
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_KEY');

// Get references to HTML elements
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const clearChat = document.getElementById('clear-chat');

// Add event listener for sending messages
chatbotSend.addEventListener('click', sendMessage);

// Add event listener for pressing enter key in input field
chatbotInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    sendMessage();
  }
});

// Add event listener for clearing chat
clearChat.addEventListener('click', clearChatMessages);

// Function to send a message
function sendMessage() {
  const message = chatbotInput.value.trim();
  if (message !== '') {
    appendMessage('You', message);

    // Call backend API to process the message
    const api = createApi();
    api.request('/api/chatbot', {
      method: 'POST',
      body: JSON.stringify({ message }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Retrieve and display the chatbot's response
        const chatbotResponse = data.response;
        appendMessage('Chatbot', chatbotResponse);
        chatbotInput.value = '';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

// Function to append a message to the chat
function appendMessage(sender, message) {
  const messageElement = document.createElement('p');
  messageElement.innerHTML = `<strong>${sender}: </strong>${message}`;
  chatbotMessages.appendChild(messageElement);
}

// Function to clear chat messages
function clearChatMessages() {
  chatbotMessages.innerHTML = '';
}
