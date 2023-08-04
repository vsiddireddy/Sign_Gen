require('dotenv').config();
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Function to read system content from a text file
function readSystemContentFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return content.trim(); // Trim any extra whitespace
  } catch (error) {
    console.error('Error reading system content file:', error);
    return '';
  }
}

// Specify the path to the system content file
const systemContentFilePath = 'system_content.txt';

// Read the system content from the file
const systemContent = readSystemContentFromFile(systemContentFilePath);

// Configure OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(express.static(path.join(__dirname, '')));

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  // Function to send a message to the chatbot
  async function sendMessage(message) {
    try {
      // Add the user's message to the conversation history
      const userString = 'User';
      const timestampString = new Date().toISOString();
      const content = `${timestampString} - (${userString}, user): ${message}`;
      conversationHistory.push({ role: 'user', content });
      console.log(content);

      // Make the API call
      const gptResponse = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemContent },
          ...conversationHistory,
        ],
      });

      // Get the assistant's response
      const responseContent = gptResponse.data.choices[0].message.content;

      // Add the assistant's response to the conversation history
      conversationHistory.push({ role: 'assistant', content: responseContent });

      // Print the assistant's response
      console.log('Chatbot:', responseContent);

      // Return the assistant's response
      return responseContent;
    } catch (error) {
      console.error('Error:', error.message);
      return '';
    }
  }

  // Conversation history
  const conversationHistory = [];

  // Send user message and get assistant response
  const assistantReply = await sendMessage(userMessage);

  res.json({ reply: assistantReply });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
