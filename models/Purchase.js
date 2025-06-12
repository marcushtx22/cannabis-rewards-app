const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items: [{
        productName: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: ['Flower', 'Edibles', 'Concentrates', 'Pre-rolls', 'Accessories']
        }
    }],
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    pointsEarned: {
        type: Number,
        required: true
    },
    pointsRedeemed: {
        type: Number,
        default: 0
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['Cash', 'Debit', 'Credit']
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Purchase', purchaseSchema); 