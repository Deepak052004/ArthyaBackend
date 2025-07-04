const express = require('express');
const router = express.Router();
const Subscription = require('../models/Subscription');

// Add a new subscription
router.post('/', async (req, res) => {
  try {
    const subscription = new Subscription(req.body);
    const saved = await subscription.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
