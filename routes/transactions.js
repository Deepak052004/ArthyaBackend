const express = require('express');
const router = express.Router();
const axios = require('axios');

// POST /api/transactions/add
router.post('/add', async (req, res) => {
  const { text } = req.body;

  try {
    const mlResponse = await axios.post('http://localhost:5001/parse', { text });
    res.json(mlResponse.data);
  } catch (err) {
    console.error('ML Parse error:', err.message);
    res.status(500).json({ error: 'Parsing failed' });
  }
});

// ✅ Correct route with param
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({ msg: `Transactions for user ${userId}` });
});

module.exports = router;
