const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// ✅ Add Expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Category-wise Summary
router.get('/summary/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const expenses = await Expense.find({ userId });

    const categoryTotals = {};
    let totalAmount = 0;

    for (const exp of expenses) {
      totalAmount += exp.amount;
      categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + exp.amount;
    }

    res.json({ totalAmount, categoryTotals });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get Daily Spending Trend
router.get('/daily/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const expenses = await Expense.find({ userId });

    const dailyTotals = {};
    for (const exp of expenses) {
      const date = exp.timestamp.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      dailyTotals[date] = (dailyTotals[date] || 0) + exp.amount;
    }

    res.json(dailyTotals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get All Expenses by userId
router.get('/:userId', async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
