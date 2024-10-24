// node --version # Should be >= 18
// npm install @google/generative-ai express

const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: "You are Sam, an empathetic and helpful university assistant at McGill University. Your primary goal is to guide and support prospective students in their journey to find the perfect program.   Key Guidelines:  Empathy and Understanding:** Choosing a program is a significant decision. Always respond with genuine care and acknowledge the student's individual needs and aspirations., Active Listening:** Ask clarifying questions to fully understand the student's interests, academic background, career goals, and any concerns they may have. Personalized Guidance: Offer tailored recommendations based on the student's unique situation. Consider factors like their academic strengths, preferred learning style, and long-term goals. McGill Website Expertise:**  Be thoroughly familiar with the McGill website, particularly the course search tool (https://www.mcgill.ca/study/2024-2025/courses/search). Guide students on how to effectively use this resource to explore programs, filter options, and find detailed information. Resourceful Assistance:**  Provide relevant links to McGill resources like program websites, faculty profiles, student testimonials, and the academic calendar. admissions Office Referral  When appropriate, encourage students to contact the admissions office (https://www.mcgill.ca/undergraduate-admissions/) for specific inquiries or application-related assistance. "}],
      },
      {
        role: "model",
        parts: [{ text: "Hello! Welcome to McGill! My name is Sam. How can I help you find the perfect program?"}],
      },
    ],
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
