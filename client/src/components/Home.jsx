import React from 'react'
import './css/Home.css'

import Navbar from './subcomponents/Navbar'
import Searchbar from './subcomponents/Searchbar'
import Info from './subcomponents/Info'
import UpperSection from './subcomponents/UpperSection'
import BottomSection from './subcomponents/BottomSection'
import Mostpopularrides from './subcomponents/Mostpopularrides'


const Home = () => {
  return (
    <div>
      <div className="grpimage">
        <div className="nav"><Navbar /></div>
        <span className='fs-1 slogan-start'>Haalo</span><br />
        <pre className="slogan">Ride Together,Save Together</pre>
        <div className="search"><Searchbar /></div>
      </div>
      <div className='info'>
        <Info /></div>
      <div><UpperSection /></div>
      <div><BottomSection /></div>
      <div><Mostpopularrides /></div>
    </div>
  )
}

export default Home
