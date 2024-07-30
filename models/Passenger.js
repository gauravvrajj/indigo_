// Passenger model
const mongoose = require('mongoose');
const passengerSchema = new mongoose.Schema({
    passenger_id: String,
    flight_id: String,
    email: String,
    phone_number: String,
    notification_method: String, // SMS, Email, App
    device_token: String, // For app notifications
  });
  
  module.exports = mongoose.model('Passenger', passengerSchema);
  