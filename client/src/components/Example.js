import React, { useState } from 'react';
import './css/Login.css'; // External CSS
import carImage from './images/car-image.jpg'
import axios from 'axios'

const Example = () => {

  const sendEmail = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:6020/send-email", {
        recipient_email: "jaybadgujar84@gmail.com",
        otp_code: 3215,
      });
      console.log(response);
    } catch (error) {
      alert("Error sending email");
      // console.error(error);
    }
  };

  return (
    <div>
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
};

export default Example;
