import React, { useState } from 'react';
import axios from 'axios';
import './css/signup.css';
import carImage from './images/car-image.jpg';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  const navigate = useNavigate(); // Use navigate here

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [email, setEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [gender, setGender] = useState("")


  const [showPasswordFields, setShowPasswordFields] = useState(false)
  const [showOtpFields, setShowOtpFields] = useState(true)

  const [otp, setOtp] = useState("1")
  const [genratedOtp, setGenratedOtp] = useState("2")

  const submit = (e) => {
    e.preventDefault()

    if (genratedOtp == otp) {
      axios.post("http://localhost:4020/auth/signup", {
        userName: userName,
        password: password,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender
      }).then((response) => {
        if (response.data == 'SUCCESS') {
          navigate('/'); // Use navigate to redirect
        }
      })
    } else {
      alert("it will not sign up without verifing with otp")
    }

  }

  const sendOtp = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://127.0.0.1:6020/send-email", {
        recipient_email: email,
      });
      setGenratedOtp(response.data.OTP);
    } catch (error) {
      alert("Error sending email");
      console.error(error);
    }
  }

  const verifyOtp = (e) => {
    e.preventDefault()
    if (genratedOtp == otp) {
      setShowPasswordFields(true)
      setShowOtpFields(false)
    } else {
      alert("Wrong OTP...")
    }
  }
  return (
    <div className="signup-wrapper">
      <div className="signup-image-section">
        <img src={carImage} alt="Characters" style={{ borderRadius: "12px" }} />
      </div>
      <div className="signup-form-section">
        <form className="signup-form" onSubmit={(e) => { submit(e) }}>
          <h2>Create Account</h2>
          <p>Please enter your details</p>

          <div className="form-row">
            <div className="form-field">
              <TextField
                required
                autoFocus
                id="outlined-basic"
                label="Username"
                variant="outlined"
                style={{ width: "100%" }}
                onChange={(e) => { setUserName(e.target.value) }}
              />
            </div>
            <div className="form-field">
              <TextField
                required
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                style={{ width: "100%" }}
                onChange={(e) => { setPhoneNumber(e.target.value) }}
              />
            </div>
            <div className="form-field">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Gender"
                  style={{ width: "100%", height: "45px" }}
                  onChange={(e) => { setGender(e.target.value) }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <TextField
                required
                id="outlined-basic"
                label="Email"
                variant="outlined"
                style={{ width: "100%" }}
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </div>

            {showPasswordFields &&
              <>
                <div className="form-field">
                  <TextField
                    required
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    style={{ width: "100%" }}
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
                </div>
                <div className="form-field">
                  <TextField
                    required
                    id="outlined-basic"
                    label="Confirm Password"
                    variant="outlined"
                    style={{ width: "100%" }}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                  />
                </div>
              </>
            }
            {showOtpFields &&
              <>
                <button className='btn btn-sm btn-dark' onClick={(e) => { sendOtp(e) }}>Get OTP</button>
                <div className="form-field">
                  <TextField
                    id="outlined-basic"
                    label="OTP"
                    variant="outlined"
                    onChange={(e) => { setOtp(e.target.value) }}
                  />
                </div>
                <button className='btn btn-sm btn-dark' onClick={(e) => { verifyOtp(e) }}>Verify OTP</button>
              </>
            }
          </div>
          <button type="submit" className="signup-button">Sign Up</button>

          <p className="signup-login-link">
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;