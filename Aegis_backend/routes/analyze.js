const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const { policyText } = req.body;

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [{ parts: [{ text: `Analyze this privacy policy and identify data risks: ${policyText}` }] }],
      },
      { params: { key: process.env.GEMINI_API_KEY } }
    );

    const result = response.data.candidates[0].content.parts[0].text;
    res.json({ result });
  } catch (err) {
    res.status(500).json({ error: 'Analysis failed' });
  }
});

module.exports = router;
