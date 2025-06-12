const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Client = require('../models/Client');

// @route   POST api/clients
// @desc    Register a new client
router.post('/', [
  check('firstName', 'First name is required').not().isEmpty(),
  check('lastName', 'Last name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('phone', 'Phone number is required').not().isEmpty(),
  check('dateOfBirth', 'Date of birth is required').not().isEmpty(),
  check('idVerification', 'ID verification is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { firstName, lastName, email, phone, dateOfBirth, idVerification } = req.body;

  try {
    let client = await Client.findOne({ email });
    if (client) {
      return res.status(400).json({ msg: 'Client already exists' });
    }

    client = new Client({
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      idVerification
    });

    await client.save();
    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/clients
// @desc    Get all clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().select('-idVerification');
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/clients/:id
// @desc    Get client by ID
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id).select('-idVerification');
    if (!client) {
      return res.status(404).json({ msg: 'Client not found' });
    }
    res.json(client);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Client not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router; 