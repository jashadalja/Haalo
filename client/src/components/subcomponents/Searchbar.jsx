import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './css/Searchbar.css';
import s1 from '../images/s1.svg';
import s3 from '../images/s3.svg';
import s4 from '../images/s4.svg';
import s2 from '../images/s2.svg';

// Function to fetch suggestions from Nominatim
const fetchSuggestions = async (value) => {
  if (value.length === 0) return [];

  const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}&countrycodes=IN&limit=5`);
  const data = await response.json();
  
  return data.map(place => ({
    title: place.display_name,
    lat: place.lat,
    lon: place.lon
  }));
};

const Searchbar = () => {
  const [leavingFrom, setLeavingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [startDate, setStartDate] = useState(null); // State for date picker

  const onSuggestionsFetchRequested = async ({ value }) => {
    const fetchedSuggestions = await fetchSuggestions(value);
    setSuggestions(fetchedSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.title;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.title}
    </div>
  );

  // Get today's date in the format yyyy-mm-dd
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="floating-bar">
      <div className="input-container">
        <div className="icon"><img src={s1} height="25px" alt="" /></div>
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: "Leaving from",
            value: leavingFrom,
            onChange: (event, { newValue }) => setLeavingFrom(newValue)
          }}
        />
      </div>
      <div className="input-container">
        <div className="icon"><img src={s3} height="27px" alt="" /></div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: "Going to",
            value: goingTo,
            onChange: (event, { newValue }) => setGoingTo(newValue)
          }}
        />
      </div>
      <div className="input-container">
        <div className="icon">
          <img src={s2} height="26px" alt="" />
        </div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          minDate={new Date(today)} // Set minimum date to today
          placeholderText="Select a date"
          className="input-field3"
          dateFormat="yyyy/MM/dd"
          
        />
      </div>
      <div className="input-container">
        <div className="icon"><img src={s4} height="23px" alt="" /></div>
        <input type="number" placeholder="No of passengers" className="input-field4" />
      </div>
      <button className="search-button">Search</button>
    </div>
  );
};

export default Searchbar;
