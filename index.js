const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const expenseRoutes = require('./routes/expenses');
const subscriptionRoutes = require('./routes/subscriptions');  // ✅ Make sure this line is here

app.use('/api/expenses', expenseRoutes);
app.use('/api/subscriptions', subscriptionRoutes);  // ✅ And this line

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
