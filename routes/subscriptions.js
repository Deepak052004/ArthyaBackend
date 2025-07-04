const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// ✅ Add a new subscription
router.post('/', async (req, res) => {
  try {
    const subscription = new Subscription(req.body);
    const saved = await subscription.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get subscriptions by userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const subscriptions = await Subscription.find({ userId });
    res.json(subscriptions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
