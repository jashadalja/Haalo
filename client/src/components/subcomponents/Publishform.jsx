import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Publishform.css';

const Publishform = () => {
  const [leavingFrom, setLeavingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [vehicleType, setVehicleType] = useState('');
  const [otherVehicle, setOtherVehicle] = useState('');
  const [leavingFromSuggestions, setLeavingFromSuggestions] = useState([]);
  const [goingToSuggestions, setGoingToSuggestions] = useState([]);
  const navigate = useNavigate(); 

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
    setPassengers(1); 
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

    console.log(formData); 

    localStorage.setItem('rideDetails', JSON.stringify(formData));

    navigate('/picklocation');
  };

  const fetchSuggestions = async (value, setSuggestions) => {
    if (value.length === 0) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}&countrycodes=IN&limit=5`);
    const data = await response.json();
    
    setSuggestions(data.map(place => place.display_name));
  };

  useEffect(() => {
    fetchSuggestions(leavingFrom, setLeavingFromSuggestions);
  }, [leavingFrom]);

  useEffect(() => {
    fetchSuggestions(goingTo, setGoingToSuggestions);
  }, [goingTo]);

  return (
    <div className="publish-form">
      <div className="input-fieldpf">
        <label htmlFor="leaving-from">Enter City Name Leaving from:</label>
        <input
          type="text"
          id="leaving-from"
          value={leavingFrom}
          onChange={(e) => setLeavingFrom(e.target.value)}
          placeholder="Enter departure location"
        />
        {leavingFromSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {leavingFromSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => setLeavingFrom(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="input-fieldpf">
        <label htmlFor="going-to">Enter City Name</label>
        <input
          type="text"
          id="going-to"
          value={goingTo}
          onChange={(e) => setGoingTo(e.target.value)}
          placeholder="Enter destination"
        />
        {goingToSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {goingToSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => setGoingTo(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
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
