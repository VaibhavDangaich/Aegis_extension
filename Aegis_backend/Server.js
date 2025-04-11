const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const dbConnect = require('./config/database');

// Connect to DB first
dbConnect();

app.use(cors());
app.use(express.json());

// Routes
app.use('/analyze', require('./routes/analyze'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
