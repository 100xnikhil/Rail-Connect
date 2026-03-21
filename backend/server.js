const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./db/pool');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/trains', trainRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy and running.', status: 'OK' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  db.query('SELECT NOW()').then(res => {
    console.log('✅ Database connected beautifully:', res.rows[0].now);
  }).catch(err => {
    console.error('❌ Database connection failed:', err.message);
  });
});
