const express = require('express');
const router = express.Router();
const Analysis = require('../models/Analysis');

router.post('/', async (req, res) => {
  const { url, result } = req.body;

  try {
    const analysis = new Analysis({ url, result });
    await analysis.save(); // 🔥 this creates the DB & collection
    res.json({ success: true, analysis });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Failed to save analysis' });
  }
});

module.exports = router;
