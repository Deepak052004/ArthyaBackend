const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true }, // Cash, UPI, etc.
  source: { type: String, default: "extension" },
  timestamp: { type: Date, default: Date.now }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
