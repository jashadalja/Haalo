import React from 'react'
import  Navbar from '../components/Navbar'
import  Searchbar from '../components/Searchbar'
import './Home.css'
import Info from '../components/Info'
import UpperSection from '../components/UpperSection'
import BottomSection from '../components/BottomSection'
import Mostpopularrides from '../components/Mostpopularrides'
import Demo from './Demo'
const Home = () => {
  return (
    <div>
      <div className="grpimage">
      <div className="nav"><Navbar/></div>
       
      <div className="search"><Searchbar/></div>
      </div>
      <div className='info'>
      <Info/></div>
      <div><UpperSection/></div>
      <div><BottomSection/></div>
      <div><Mostpopularrides/></div>
      <Demo/>
    </div>
  )
}

export default Home
