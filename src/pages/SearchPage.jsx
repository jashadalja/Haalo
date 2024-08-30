import React from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import './SearchPage.css'
const SearchPage = () => {
  return (
    <div>
      <div className='nav'><Navbar/></div>
      <div className='snav'><Searchbar/></div>
    </div>
  )
}

export default SearchPage
