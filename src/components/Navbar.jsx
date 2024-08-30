import React from 'react';
import './Navbar.css';
import { FaSearch, FaUser } from 'react-icons/fa';
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Navigate, useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const publishridebtn =()=>{
    navigate('/publishform')
  }
  function sbtn(){
    navigate('/searchpage')
  }
  return (
    <nav className="navbar">
      <div className="navbar-logo">
       <a href="/"> <img src="https://afgjobs.org/uploads/company-logo/17064519392000-COMPANY-LOGO.jpg" alt="Logo" /></a>
      </div>
      <div className="navbar-items">
        <Button color="" className="navbar-search" onClick={sbtn}>
          <img src="https://www.svgrepo.com/show/165238/search.svg" className='searchicon'  alt="" /> search
        </Button>
        <Button color="primary" className="navbar-button" onClick={publishridebtn}>Publish Ride</Button>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} className="navbar-user-dropdown" >
          <DropdownToggle className="navbar-user-icon">
            <img src="https://www.svgrepo.com/show/165196/user.svg" className='usericon' alt="" />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>My Rides</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Help</DropdownItem>
            <DropdownItem>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default Navbar;
