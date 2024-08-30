// Demo.jsx
import React, { useState } from 'react';
import './Demo.css'; // Optional: For any additional styling

const Demo = () => {
  const [userNumber, setUserNumber] = useState('');
  const [message, setMessage] = useState('');

  const generateNumber = async () => {
    try {
      const response = await fetch('http://localhost:6020/generate-number');
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Error generating number:', error);
    }
  };

  const verifyNumber = async () => {
    try {
      const response = await fetch('http://localhost:6020/verify-number', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number: userNumber }),
      });
      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Incorrect number');
      console.error('Error verifying number:', error);
    }
  };

  return (
    <div className="demo-container">
      <button onClick={generateNumber}>Generate Number</button>
      <input
        type="text"
        value={userNumber}
        onChange={(e) => setUserNumber(e.target.value)}
        placeholder="Enter the number"
      />
      <button onClick={verifyNumber}>Verify Number</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Demo;
