import express from 'express';
import cors from 'cors';
import axios from 'axios';


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const options = {
      method: 'POST',
      url: 'https://cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com/v1/chat/completions',
      headers: {
        'x-rapidapi-key': '76927071ecmshaf14e43307e4345p1facd0jsn98489a5127ca', // Use environment variable for the API key
        'x-rapidapi-host': 'cheapest-gpt-4-turbo-gpt-4-vision-chatgpt-openai-ai-api.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: {
        messages: [
          {
            role: 'user',
            content: prompt, // Use the prompt from the request body
          },
        ],
        model: 'gpt-4o', // Change this to the appropriate model if needed
        max_tokens: 700,
        temperature: 0.9,
      },
    };

    const response = await axios(options);

    res.status(200).send({
      bot: response.data.choices[0].message.content // Adjust based on the API response structure
    });

  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).send('Error communicating with the API');
  }
});

const PORT = process.env.PORT || 5000; // Use environment variable for the port
app.listen(PORT, () => console.log(`AI server started on http://localhost:${PORT}`));

export default  app