const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  pointsEarned: {
    type: Number,
    required: true
  },
  products: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  transactionDate: {
    type: Date,
    default: Date.now
  },
  verificationCode: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  }
});

module.exports = mongoose.model('Transaction', transactionSchema); 