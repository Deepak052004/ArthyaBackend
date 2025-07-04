// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Explicit CORS setup for localhost frontend (and preflight support)


//app.use(cors(corsOptions));
//app.options('*', cors(corsOptions)); // Handle preflight requests
const corsOptions = {
  origin: ['http://localhost:5173', 'https://arthya-webmerged.onrender.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
const expenseRoutes = require('./routes/expenses');
const subscriptionRoutes = require('./routes/subscriptions');
const transactionRoutes = require('./routes/transactions');

app.use('/api/expenses', expenseRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/transactions', transactionRoutes);

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
