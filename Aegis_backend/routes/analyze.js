const express = require('express');
const router = express.Router();
const Analysis = require('../models/Analysis');
const analyzeWithGemini = require('../utils/gemini');

router.post('/', async (req, res) => {
  const { url } = req.body;

  try {
    const result = await analyzeWithGemini(url);

    const analysis = new Analysis({ url, result });
    await analysis.save();

    res.json({ success: true, analysis });
  } catch (error) {
    console.error('❌ Gemini Analysis Error:', error?.response?.data || error.message || error);
    res.status(500).json({ success: false, error: 'Gemini analysis failed' });
  }
});

module.exports = router;
