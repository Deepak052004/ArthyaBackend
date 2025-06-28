const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add Expense
router.post('/', async (req, res) => {
   try {
    const expense = new Expense(req.body);
    const saved = await expense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Expenses by userId
router.get('/:userId', async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
