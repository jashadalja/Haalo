import React from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import './SearchPage.css'
import { Car, User, Clock, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';


const SearchPage = () => {

  const [sortBy, setSortBy] = useState('Earliest departure');

  const sortOptions = [
    'Earliest departure',
    'Lowest price',
    'Close to departure point',
    'Close to arrival point',
    'Shortest ride'
  ];

  const rides = [
    {
      id: '1ax2WQBkT766tgA4iSp6zQOIQCeCbgRjKyzj3hhm0DwQ',
      departureTime: '18:50',
      duration: '2h30',
      departureLocation: 'Sonipat',
      arrivalTime: '21:20',
      arrivalLocation: 'Bir Dandrala',
      departureDistance: 27, // km from departure
      arrivalDistance: 17, // km from arrival
    },
    {
      id: 2,
      from: 'Gurugram',
      to: 'Jaipur',
      departureTime: '20:00',
      arrivalTime: '23:40',
      duration: '3h40',
      price: 530,
      driver: 'Tanuj',
      instantBooking: true
    }
  ];
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);


  return (
    <div>
      <div className='nav'><Navbar /></div>
      <div className='snav'><Searchbar /></div>

      <div className="mainbox">
        <section>
          <h3 className="filter-heading">
            <span className="filter-label">Sort by</span>
          </h3>
          <ul aria-label="Sort by" role="radiogroup">
            <li>
              <label htmlFor="departure" className="filter-option">
                <input id="departure" type="radio" aria-label="Earliest departure" name="sort" value="departure_datetime:asc" />
                <span className="filter-option-content">
                  <span className="filter-option-icon">

                  </span>
                  <span className="filter-option-text">Earliest departure</span>
                  <img src="https://th.bing.com/th/id/OIP.kuWFPYhj9u6hz8lQ6HlmngHaHa?rs=1&pid=ImgDetMain" alt="Earliest departure" className="filter-option-image" />
                </span>
              </label>
            </li>
            <li>
              <label htmlFor="price" className="filter-option">
                <input id="price" type="radio" aria-label="Lowest price" name="sort" value="price:asc" />
                <span className="filter-option-content">
                  <span className="filter-option-icon">

                  </span>
                  <span className="filter-option-text">Lowest price</span>
                  <img src="https://thumbs.dreamstime.com/b/rupee-flat-icon-sign-vector-paper-money-symbol-isolated-white-background-business-graphic-illustration-234169819.jpg" alt="Lowest price" className="filter-option-image" />
                </span>
              </label>
            </li>
            <li>
              <label htmlFor="proximity" className="filter-option">
                <input id="proximity" type="radio" aria-label="Close to departure point" name="sort" value="distance_to_departure:asc" defaultChecked />
                <span className="filter-option-content">
                  <span className="filter-option-icon">

                  </span>
                  <span className="filter-option-text">Close to departure point</span>
                  <img src="https://cdn.blablacar.com/search/images/spa/filters/sort_by_proximity.svg" alt="Close to departure point" className="filter-option-image" />
                </span>
              </label>
            </li>
            <li>
              <label htmlFor="arrival" className="filter-option">
                <input id="arrival" type="radio" aria-label="Close to arrival point" name="sort" value="distance_to_arrival:asc" />
                <span className="filter-option-content">
                  <span className="filter-option-icon">

                  </span>
                  <span className="filter-option-text">Close to arrival point</span>
                  <img src="https://cdn.blablacar.com/search/images/spa/filters/sort_by_proximity.svg" alt="Close to arrival point" className="filter-option-image" />
                </span>
              </label>
            </li>
            <li>
              <label htmlFor="duration" className="filter-option">
                <input id="duration" type="radio" aria-label="Shortest ride" name="sort" value="duration:asc" />
                <span className="filter-option-content">
                  <span className="filter-option-icon">

                  </span>
                  <span className="filter-option-text">Shortest ride</span>
                  <img src="https://th.bing.com/th/id/OIP.8wThFkCCCP-W66dS0EBANwHaHa?w=1920&h=1920&rs=1&pid=ImgDetMain" alt="Shortest ride" className="filter-option-image" />
                </span>
              </label>
            </li>
          </ul>
        </section>
        <div className="search-page">
          {rides.map((ride) => (
            <div key={ride.id} className="ride-card">
              <div className="ride-details">
                <div className="time-location">
                  <div className="departure-info">
                    <p className="time">{ride.departureTime || 'N/A'}</p>
                    <p className="location">{ride.departureLocation || 'Unknown'}</p>
                  </div>

                  <div className="duration-info">
                    <hr />
                    <p className="duration">{ride.duration || 'N/A'}</p>
                    <hr />
                  </div>
                  <div className="arrival-info">
                    <p className="time">{ride.arrivalTime || 'N/A'}</p>
                    <p className="location">{ride.arrivalLocation || 'Unknown'}</p>
                  </div>
                </div>


              </div>

              <div className="price">
                ₹{ride.price ? ride.price.toFixed(2) : 'N/A'}

              </div>

              <div className="driver-info">
                {ride.driver ? (
                  <>
                    <img className="driver-avatar" src="https://th.bing.com/th/id/OIP.audMX4ZGbvT2_GJTx2c4GgHaHw?rs=1&pid=ImgDetMain" alt="Driver Avatar" />
                    <p className="driver-name">{ride.driver.name || 'Jash Adalja'}</p>
                    <p className="driver-rating">⭐ {ride.driver.rating || 'No Rating'}</p>
                  </>
                ) : (
                  <p className="driver-name">Driver info not available</p>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>

  )
}

export default SearchPage
