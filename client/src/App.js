// src/App.js

import React, { useEffect } from 'react';
import FlightStatus from './components/FlightStatus';
import { requestFirebaseNotificationPermission, onMessageListener } from './firebase';

const App = () => {
  useEffect(() => {
    // Request permission for notifications
    requestFirebaseNotificationPermission()
      .then((token) => {
        console.log('Firebase token:', token);
      })
      .catch((err) => {
        console.error('Error getting permission:', err);
      });

    // Listen for messages
    onMessageListener().then((payload) => {
      alert(`Notification received: ${payload.notification.body}`);
    });
  }, []);

  return (
    <div className="App">
      <FlightStatus />
    </div>
  );
};

export default App;
