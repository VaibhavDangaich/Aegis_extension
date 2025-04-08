const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
  url: String,
  result: String,
});

module.exports = mongoose.model('Analysis', analysisSchema);
