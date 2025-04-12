const express = require('express');
const router = express.Router();
const Analysis = require('../models/Analysis');
const analyzeWithGemini = require('../utils/gemini');
const extractTextFromUrl = require('../utils/extractTextFromUrl');

router.post('/', async (req, res) => {
  const { content, url } = req.body;

  try {
    let finalContent = content;

    if (!content && url) {
      finalContent = await extractTextFromUrl(url);
      console.log("✅ Extracted content:", finalContent.substring(0, 200) + "..."); // Log the first 200 chars
    }

    if (!finalContent) {
      return res.status(400).json({ success: false, error: "Content is required" });
    }

    const result = await analyzeWithGemini(finalContent);

    const analysis = new Analysis({
      url: url || "Direct Content",
      content: finalContent,
      result
    });

    await analysis.save();
    res.json({ success: true, analysis });
  } catch (error) {
    console.error("❌ Gemini Analysis Error:", error.message);
    res.status(500).json({ success: false, error: "Gemini analysis failed" });
  }
});

module.exports = router;
