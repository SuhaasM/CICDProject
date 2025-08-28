require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // Use port 3001 for the backend

// Middleware
app.use(cors()); // Allow requests from our frontend
app.use(express.json()); // Allow us to parse JSON in request bodies

// A simple test route to make sure the server is working
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});