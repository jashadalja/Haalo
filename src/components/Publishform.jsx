import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Publishform.css';

const Publishform = () => {
  const [leavingFrom, setLeavingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [vehicleType, setVehicleType] = useState('');
  const [otherVehicle, setOtherVehicle] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const getMaxPassengers = () => {
    switch (vehicleType) {
      case 'bike':
        return 1;
      case 'car':
        return 3;
      case 'other':
        return 10;
      default:
        return 1;
    }
  };

  const handleVehicleTypeChange = (e) => {
    setVehicleType(e.target.value);
    setPassengers(1); // Reset passengers to 1 when vehicle type changes
  };

  const incrementPassengers = () => {
    if (passengers < getMaxPassengers()) {
      setPassengers(passengers + 1);
    }
  };

  const decrementPassengers = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    }
  };

  const handleSubmit = () => {
    const formData = {
      leavingFrom,
      goingTo,
      passengers,
      vehicleType: vehicleType === 'other' ? otherVehicle : vehicleType,
    };

    console.log(formData); // For debugging purposes, log the data to the console

    // Store formData in local storage (or pass it to the next page)
    localStorage.setItem('rideDetails', JSON.stringify(formData));

    // Redirect to Picklocation page
    navigate('/picklocation');
  };

  return (
    <div className="publish-form">
      <div className="input-fieldpf">
        <label htmlFor="leaving-from">Leaving from:</label>
        <input
          type="text"
          id="leaving-from"
          value={leavingFrom}
          onChange={(e) => setLeavingFrom(e.target.value)}
          placeholder="Enter departure location"
        />
      </div>
      <div className="input-fieldpf">
        <label htmlFor="going-to">Going to:</label>
        <input
          type="text"
          id="going-to"
          value={goingTo}
          onChange={(e) => setGoingTo(e.target.value)}
          placeholder="Enter destination"
        />
      </div>
      <div className="input-fieldpf">
        <label htmlFor="vehicle-type">Vehicle type:</label>
        <select
          id="vehicle-type"
          value={vehicleType}
          onChange={handleVehicleTypeChange}
        >
          <option value="">Select vehicle type</option>
          <option value="bike">Bike</option>
          <option value="car">Car</option>
          <option value="other">Other (Please specify)</option>
        </select>
      </div>
      {vehicleType === 'other' && (
        <div className="input-fieldpf">
          <label htmlFor="other-vehicle">Specify vehicle type:</label>
          <input
            type="text"
            id="other-vehicle"
            value={otherVehicle}
            onChange={(e) => setOtherVehicle(e.target.value)}
            placeholder="Enter vehicle type"
          />
        </div>
      )}
      <div className="input-fieldpf passenger-field">
        <label htmlFor="passengers">Number of passengers:</label>
        <div className="passenger-counter">
          <button type="button" onClick={decrementPassengers} className="counter-btn">-</button>
          <input
            type="text"
            id="passengers"
            value={passengers}
            readOnly
          />
          <button type="button" onClick={incrementPassengers} className="counter-btn">+</button>
        </div>
      </div>
      <div className="savings">
        <p>Save up to <span className="currency">₹1,180</span> on your first ride.</p>
      </div>
      <button className="publish-ride-btn" onClick={handleSubmit}>Publish a ride</button>
    </div>
  );
};

export default Publishform;
