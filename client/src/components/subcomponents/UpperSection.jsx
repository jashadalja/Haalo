import React from 'react';
import './css/UpperSection.css';
import i1 from '../images/s5.svg';

const UpperSection = () => {
  return (
    <>
    <div className="topSection">
      <img src={i1} alt="" className="image" />
      <div className="top-text">
        <h2>Help us keep you safe from scams</h2>
        <p>At Haalo, we're working hard to make our platform as secure as it can be. 
            But when scams do happen, we want you to know exactly how to avoid and report them. 
            Follow our tips to help us keep you safe.</p>
        <button className='usbtn'>Learn more</button>
      </div>
    </div>
    </>
  );
};

export default UpperSection;
