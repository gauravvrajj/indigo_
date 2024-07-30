// models/Notification.js

const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notification_id: String,
  flight_id: String,
  message: String,
  timestamp: Date,
  method: String,
  recipient: String,
});

module.exports = mongoose.model('Notification', notificationSchema);
