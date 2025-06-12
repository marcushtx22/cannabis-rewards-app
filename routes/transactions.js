const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Client = require('../models/Client');

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find()
            .populate('client', 'name email')
            .populate('reward', 'name pointsRequired');
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one transaction
router.get('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id)
            .populate('client', 'name email')
            .populate('reward', 'name pointsRequired');
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create transaction
router.post('/', async (req, res) => {
    const transaction = new Transaction({
        client: req.body.clientId,
        reward: req.body.rewardId,
        points: req.body.points,
        type: req.body.type, // 'earn' or 'redeem'
        status: req.body.status || 'pending'
    });

    try {
        const newTransaction = await transaction.save();
        
        // Update client points
        const client = await Client.findById(req.body.clientId);
        if (client) {
            if (req.body.type === 'earn') {
                client.points += req.body.points;
            } else if (req.body.type === 'redeem') {
                client.points -= req.body.points;
            }
            await client.save();
        }

        res.status(201).json(newTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update transaction
router.patch('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (req.body.status) transaction.status = req.body.status;
        if (req.body.points) transaction.points = req.body.points;

        const updatedTransaction = await transaction.save();
        res.json(updatedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete transaction
router.delete('/:id', async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        await transaction.remove();
        res.json({ message: 'Transaction deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 