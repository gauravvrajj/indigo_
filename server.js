// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const flightRoutes = require('./routes/flightRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const cors = require('cors');
const Passenger= require('./models/Passenger');
const Flight= require('./models/Flight');
const Notification= require('./models/Notification');
const app = express();
const twilio = require('twilio');

// Firebase Admin Initialization
const serviceAccount = require('./firebaseserviceAccount.json');
const twilioClient = twilio(,);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Middleware
app.use(bodyParser.json());
app.use(cors()); 
app.use('/api/flights', flightRoutes);
app.use('/api/notifications', notificationRoutes);

// Send notifications to delayed flights
async function sendNotifications() {
  try {
    const delayedFlights = await Flight.find({ status: 'Delayed' });

    for (const flight of delayedFlights) {
      const message = `Your flight ${flight.flight_id} is delayed. New departure time: ${flight.scheduled_departure}.`;

      // Fetch passengers subscribed to this flight
      const passengers = await Passenger.find({ flight_id: flight.flight_id });

      for (const passenger of passengers) {
        if (passenger.notification_method === 'SMS') {
          // Send SMS
          await twilioClient.messages.create({
            body: message,
            from: '+16592342354',
            to: passenger.phone_number,
          });
        } 
         else if (passenger.notification_method === 'App') {
          // Send App Notification
          const messagePayload = {
            notification: {
              title: 'Flight Delay Notification',
              body: message,
            },
            token: passenger.device_token,
          };

          await admin.messaging().send(messagePayload);
        }

        // Log notification
        const notification = new Notification({
          notification_id: new mongoose.Types.ObjectId().toString(),
          flight_id: flight.flight_id,
          message,
          timestamp: new Date(),
          method: passenger.notification_method,
          recipient: passenger.notification_method === 'SMS' ? passenger.phone_number : passenger.email,
        });

        await notification.save();
      }
    }

    console.log('Notifications sent successfully.');
  } catch (error) {
    console.error('Error sending notifications:', error);
  }
}




// MongoDB Connection
mongoose.connect(, {      //here database connection string will be added (i have removed it)
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  sendNotifications();
  console.log(`Server running on port ${PORT}`);
});
