// consumers/flightStatusConsumer.js

const connectRabbitMQ = require('../utils/messaging');
const Flight = require('../models/Flight');

connectRabbitMQ('flight_status_updates', async (msg) => {
  try {
    const { flight_id, status, actual_departure, actual_arrival } = msg;
    await Flight.findOneAndUpdate(
      { flight_id },
      { status, actual_departure, actual_arrival },
      { new: true }
    );
    console.log(`Updated flight ${flight_id} with status: ${status}`);
  } catch (error) {
    console.error('Failed to update flight status:', error);
  }
});
