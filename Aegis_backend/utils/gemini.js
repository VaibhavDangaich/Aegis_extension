const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyzeWithGemini(url) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `Analyze the privacy policy at this URL: ${url}.
Identify any potential data risks, confusing or misleading language, and data misuse.
Provide a summary in 5-6 lines for the user to understand.`;

  try {
    const result = await model.generateContent([prompt]); // ✅ Use array format
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("❌ Gemini API Error:", err);
    throw err;
  }
}

module.exports = analyzeWithGemini;
