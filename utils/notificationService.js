// utils/notificationService.js

const admin = require('firebase-admin');

const sendPushNotification = async (recipient, message) => {
  const payload = {
    notification: {
      title: 'Flight Update',
      body: message,
    },
  };

  try {
    await admin.messaging().sendToDevice(recipient, payload);
    console.log('Notification sent successfully');
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

module.exports = sendPushNotification;
