import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import './css/Login.css';
import carImage from './images/car-image.jpg'

const Login = () => {

  const navigate = useNavigate(); // Use navigate here
  const { setAuthState } = useContext(AuthContext);

  const [userIdentifier, setUserIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const login = (e) => {
    e.preventDefault();
    axios.post("http://localhost:4020/auth/login", {
      userIdentifier: userIdentifier,
      password: password
    }).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          id: response.data.id,
          username: response.data.username,
          email: response.data.email,
          phoneno: response.data.phone_no
        });
        navigate('/');
      }
    })
  }

  return (
    <div className="login-container d-flex">
      <div className="login-left">
        <img src={carImage} alt="Characters" style={{borderRadius:"12px"}}/>
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={(e) => { login(e) }}>
          <h2>Welcome back!</h2>
          <p>Please enter your details</p>

          <label>Email or Phone Number or Username</label>
          <input
            type="text"
            placeholder="Enter Email or Phone Number or Username"
            value={userIdentifier}
            onChange={(e) => { setUserIdentifier(e.target.value) }}
          />

          <label>Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
            />
            <span
              className="show-password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <i className="fa-solid fa-eye-slash"></i> : <i className="fa-solid fa-eye"></i> }
            </span>
          </div>

          <div className="login-options d-flex">
            <label className='d-flex'>
              <div className='mx-2'><input type="checkbox" className='mt-1' /></div>
              <div>Remember Me</div>
            </label>
            <a href="#" className='forgotpasslink'>Forgot password?</a>
          </div>

          <button type="submit" className="login-btn">Log In</button>
          <button type="button" className="google-login-btn">
            <i className="fa-brands fa-google mx-3"></i> Log in with Google
          </button>

          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
