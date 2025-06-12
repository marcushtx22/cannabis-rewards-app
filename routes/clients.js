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
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET api/clients/:id
// @desc    Get client by ID
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PATCH api/clients/:id
// @desc    Update a client
router.patch('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    if (req.body.firstName) client.firstName = req.body.firstName;
    if (req.body.lastName) client.lastName = req.body.lastName;
    if (req.body.email) client.email = req.body.email;
    if (req.body.phone) client.phone = req.body.phone;
    if (req.body.dateOfBirth) client.dateOfBirth = req.body.dateOfBirth;
    if (req.body.idVerification) client.idVerification = req.body.idVerification;

    const updatedClient = await client.save();
    res.json(updatedClient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE api/clients/:id
// @desc    Delete a client
router.delete('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    await client.remove();
    res.json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 