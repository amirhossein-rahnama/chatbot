// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Create a new instance of express app
const app = express();

// Configure app to use cors and bodyParser middleware
app.use(cors());
app.use(bodyParser.json());

// Define API endpoints
app.get('/', (req, res) => {
  res.send('Welcome to the Chatbot API!');
});

app.post('/api/chatbot', (req, res) => {
  // Handle incoming chatbot requests
});

// Start the server and listen on a specific port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
