const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String },
  renewalDate: { type: Date }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
