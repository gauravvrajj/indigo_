// routes/flightRoutes.js

const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');

// Get all flights
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update flight status
router.put('/:flightId', async (req, res) => {
  try {
    const { flightId } = req.params;
    const updates = req.body;
    const updatedFlight = await Flight.findOneAndUpdate(
      { flight_id: flightId },
      updates,
      { new: true }
    );
    res.json(updatedFlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
