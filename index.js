const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'https://arthya.vercel.app'
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
//app.options('*', cors(corsOptions)); // ✅ Handle preflight requests

app.use(express.json());

// ✅ Routes
const expenseRoutes = require('./routes/expenses');
const subscriptionRoutes = require('./routes/subscriptions');
const transactionRoutes = require('./routes/transactions');

app.use('/api/expenses', expenseRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/transactions', transactionRoutes);

// ✅ MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
