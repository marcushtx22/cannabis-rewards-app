const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const Customer = require('../models/Customer');

// Get all purchases
router.get('/', async (req, res) => {
    try {
        const purchases = await Purchase.find()
            .populate('customer', 'firstName lastName email')
            .sort({ purchaseDate: -1 });
        res.json(purchases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get customer's purchases
router.get('/customer/:customerId', async (req, res) => {
    try {
        const purchases = await Purchase.find({ customer: req.params.customerId })
            .populate('customer', 'firstName lastName email')
            .sort({ purchaseDate: -1 });
        res.json(purchases);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new purchase
router.post('/', async (req, res) => {
    try {
        const customer = await Customer.findById(req.body.customer);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        const purchase = new Purchase({
            customer: req.body.customer,
            items: req.body.items,
            subtotal: req.body.subtotal,
            tax: req.body.tax,
            total: req.body.total,
            pointsEarned: req.body.pointsEarned,
            pointsRedeemed: req.body.pointsRedeemed || 0,
            paymentMethod: req.body.paymentMethod
        });

        // Update customer's rewards points and total spent
        customer.rewardsPoints += purchase.pointsEarned - purchase.pointsRedeemed;
        customer.totalSpent += purchase.total;
        customer.lastPurchaseDate = purchase.purchaseDate;

        // Update membership tier based on total spent
        if (customer.totalSpent >= 5000) {
            customer.membershipTier = 'Platinum';
        } else if (customer.totalSpent >= 2500) {
            customer.membershipTier = 'Gold';
        } else if (customer.totalSpent >= 1000) {
            customer.membershipTier = 'Silver';
        }

        await customer.save();
        const newPurchase = await purchase.save();
        res.status(201).json(newPurchase);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get single purchase
router.get('/:id', async (req, res) => {
    try {
        const purchase = await Purchase.findById(req.params.id)
            .populate('customer', 'firstName lastName email');
        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }
        res.json(purchase);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 