import React from 'react';
import './css/BottomSection.css';
import i2 from '../images/s6.svg';
import { useNavigate } from 'react-router-dom';

const BottomSection = () => {
  const navigate=useNavigate()
  function orbtn(){
    navigate('/publishform')
  }
  return (
    <div className="bottomSection">
      <div className="bottom-text">
        <h2>Driving in your car soon?</h2>
        <p>Drivers, great news: your good habits are being rewarded! Benefit from the Carpool Bonus by carpooling. See eligibility conditions.</p>
        <button className='bsbtn' onClick={orbtn}>Offer a ride</button>
      </div>
        <img src={i2} alt="" className="image" />
    </div>
  );
};

export default BottomSection;
