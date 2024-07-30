// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  // here firebase api key etc. have to be added
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Function to request permission for notifications
export const requestFirebaseNotificationPermission = () => {
  return new Promise((resolve, reject) => {
    getToken(messaging, { vapidKey: '' }) // firebase vapidKey has to be added
      .then((currentToken) => {
        if (currentToken) {
          console.log('Current token:', currentToken);
          resolve(currentToken);
        } else {
          console.log('No registration token available. Request permission to generate one.');
          reject('No registration token available');
        }
      })
      .catch((err) => {
        console.error('An error occurred while retrieving token:', err);
        reject(err);
      });
  });
};

// Function to handle incoming messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      resolve(payload);
    });
  });
