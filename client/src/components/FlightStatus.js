// src/components/FlightStatus.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FlightStatus = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/flights')
      .then((response) => {
        setFlights(response.data);
      })
      .catch((error) => {
        console.error('Error fetching flight data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Flight Status</h1>
      <ul>
        {flights.map((flight) => (
          <li key={flight.flight_id}>
            <strong>{flight.flight_id}</strong> - {flight.status} - Departure
            Gate: {flight.departure_gate} - Arrival Gate: {flight.arrival_gate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightStatus;
