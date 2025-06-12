const express = require('express');
const router = express.Router();
const Reward = require('../models/Reward');

// Get all rewards
router.get('/', async (req, res) => {
    try {
        const rewards = await Reward.find();
        res.json(rewards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one reward
router.get('/:id', async (req, res) => {
    try {
        const reward = await Reward.findById(req.params.id);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        res.json(reward);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create reward
router.post('/', async (req, res) => {
    const reward = new Reward({
        name: req.body.name,
        description: req.body.description,
        pointsRequired: req.body.pointsRequired,
        discount: req.body.discount,
        isActive: req.body.isActive || true
    });

    try {
        const newReward = await reward.save();
        res.status(201).json(newReward);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update reward
router.patch('/:id', async (req, res) => {
    try {
        const reward = await Reward.findById(req.params.id);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }

        if (req.body.name) reward.name = req.body.name;
        if (req.body.description) reward.description = req.body.description;
        if (req.body.pointsRequired) reward.pointsRequired = req.body.pointsRequired;
        if (req.body.discount) reward.discount = req.body.discount;
        if (req.body.isActive !== undefined) reward.isActive = req.body.isActive;

        const updatedReward = await reward.save();
        res.json(updatedReward);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete reward
router.delete('/:id', async (req, res) => {
    try {
        const reward = await Reward.findById(req.params.id);
        if (!reward) {
            return res.status(404).json({ message: 'Reward not found' });
        }
        await reward.remove();
        res.json({ message: 'Reward deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; 