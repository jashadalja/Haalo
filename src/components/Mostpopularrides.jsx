import React from 'react';
import './Mostpopularrides.css'; 

const PopularRides = () => {
  return (
    <div className="containermpr">
      <h2 className="heading">Most Popular Rides At Haalo</h2>
      <div className="card-wrapper">
        <div className="card">
          <span>Ahmedabad → Gandhinagar</span>
          <span className="arrow"></span>
        </div>
        <div className="card">
          <span>Ahmedabad → Udaipur</span>
          <span className="arrow"></span>
        </div>
        <div className="card">
          <span>Ahmedabad → Ahmedabad</span>
          <span className="arrow"></span>
        </div>
      </div>
      <div className="link">
        <a href="#">See our most popular rides</a>
      </div>
    </div>
  );
};

export default PopularRides;
