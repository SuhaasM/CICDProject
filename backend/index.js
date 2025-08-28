require('dotenv').config();
const express = require('express');
const cors = require('cors');

// --- NEW: Import your auth routes ---
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// A simple test route to make sure the server is working
app.get('/api', (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// --- NEW: Tell Express to use your auth routes ---
// Any request starting with '/api/auth' will be handled by authRoutes
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});