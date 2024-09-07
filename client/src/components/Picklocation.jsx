import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './css/Picklocation.css'; // Import CSS file for custom styles

// Component for handling map events
const MapComponent = ({ setPickup, setDropoff }) => {
  useMapEvents({
    click(event) {
      const { lat, lng } = event.latlng;
      console.log('Map click:', lat, lng); // Debugging line
      if (!setDropoff) {
        setPickup([lat, lng]);
      } else {
        setDropoff([lat, lng]);
      }
    },
    mousemove(event) {
      const { lat, lng } = event.latlng;
      console.log('Mouse move:', lat, lng); // Debugging line
      if (!setDropoff) {
        setPickup([lat, lng]);
      } else {
        setDropoff([lat, lng]);
      }
    }
  });

  return null;
};

const Picklocation = () => {
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);

  // Update input fields based on state changes
  useEffect(() => {
    if (pickup && !dropoff) {
      document.getElementById('pickupInput').value = `Pickup: (${pickup[0].toFixed(6)}, ${pickup[1].toFixed(6)})`;
    }
  }, [pickup]);

  useEffect(() => {
    if (dropoff) {
      document.getElementById('dropoffInput').value = `Dropoff: (${dropoff[0].toFixed(6)}, ${dropoff[1].toFixed(6)})`;
    }
  }, [dropoff]);

  useEffect(() => {
    if (pickup && dropoff && (pickup[0] === dropoff[0] && pickup[1] === dropoff[1])) {
      alert('Please select a valid place.');
      setDropoff(null); // Reset dropoff if invalid
    }
  }, [pickup, dropoff]);

  return (
    <div className="container">
      <div className="inputs">
        <input
          id="pickupInput"
          type="text"
          readOnly
          placeholder="Pickup Location"
        />
        <input
          id="dropoffInput"
          type="text"
          readOnly
          placeholder="Dropoff Location"
        />
      </div>
      <div className="map">
        <MapContainer center={[23.0225, 72.5714]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <MapComponent setPickup={pickup === null ? setPickup : null} setDropoff={dropoff === null ? setDropoff : null} />
          {pickup && <Marker position={pickup} />}
          {dropoff && <Marker position={dropoff} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default Picklocation;
