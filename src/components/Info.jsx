import React from 'react';
import './Info.css';
import deal from '../assets/images/deal.svg'

const Info = () => {
  return (
    <div className='info'>
    <ul className="features-list">
      <li className="feature-item">
        <div className="feature-icon">
          <img src='https://www.svgrepo.com/show/279443/coins-money.svg' role="img" aria-hidden="true" className="icon-svg"/>
          
          
        </div>
        <p className="feature-title">Your pick of rides at low prices</p>
        <p className="feature-description">No matter where you're going, by bus or carpool, find the perfect ride from our wide range of destinations and routes at low prices.</p>
      </li>
      <li className="feature-item">
        <div className="feature-icon">
        <img src={deal} role="img" aria-hidden="true" className="icon-svg"/>

        </div>
        <p className="feature-title">Trust who you travel with</p>
        <p className="feature-description">We take the time to get to know each of our members and bus partners. We check reviews, profiles, and IDs, so you know who you’re travelling with and can book your ride at ease on our secure platform.</p>
      </li>
      <li className="feature-item">
        <div className="feature-icon">
        <img src='https://www.svgrepo.com/show/422018/energy-forecast-lightning.svg' role="img" aria-hidden="true" className="icon-svg"/>

        </div>
        <p className="feature-title">Scroll, click, tap and go!</p>
        <p className="feature-description">Booking a ride has never been easier! Thanks to our simple app powered by great technology, you can book a ride close to you in just minutes.</p>
      </li>
    </ul></div>
  );
};

export default Info;
