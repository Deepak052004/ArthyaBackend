const express = require('express');
const router = express.Router();
const axios = require('axios');
const Expense = require('../models/Expense');

// POST /api/transactions/add
router.post('/add', async (req, res) => {
  const { text, financeId } = req.body;

  try {
    // 1. Send text to ML server
    const mlRes = await axios.post('http://127.0.0.1:5001/parse', { text });
    const parsed = mlRes.data;

    if (parsed.error) {
      return res.status(400).json({ error: 'Could not parse the input' });
    }

    // 2. Save to MongoDB
    const expense = new Expense({
      userId: financeId,
      amount: parsed.amount,
      category: parsed.category,
      type: parsed.type || 'UPI',
    });

    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Error in /transactions/add:", err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
