const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    reward: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reward'
    },
    points: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['earn', 'redeem'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema); 