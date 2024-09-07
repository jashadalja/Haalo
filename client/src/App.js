import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Example from './components/Example';
import NotFound from './components/NotFound';
import SelectLocation from './components/SelectLocation';


import Publishform from './components/subcomponents/Publishform';
import Picklocation from './components/Picklocation';
import SearchPage from './components/SearchPage'


import { AuthContext } from "./helpers/AuthContext";


function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    username: "",
    email: "",
    phoneno: "",
  });

  useEffect(() => {
    axios.get("http://localhost:4020/auth/auth", {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }).then((response) => {
      if (response.data.error) {
        setAuthState({ ...authState, status: false });
      } else {
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          usertype: response.data.usertype,
          whatsappnumber: response.data.whatsappnumber,
          status: true,
        });
      }
    });
  }, []);

  const navigate = useNavigate(); // Use navigate here

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, status: false });
    navigate('/login'); // Use navigate to redirect
    window.location.reload(); // Optionally reload the page
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      {/* <div className='d-flex'>
        <Link to='' className='me-5'>home</Link>
        <Link to='login' className='me-5'>login</Link>
        <Link to='signup' className='me-5'>signup</Link>
        <button onClick={()=>logout()}>Logout</button>
      </div> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/selectlocation" element={<SelectLocation />} />
        <Route path="/example" element={<Example />} />

        <Route path="/publishform" element={<Publishform />} />
        <Route path="/picklocation" element={<Picklocation />} />
        <Route path="/searchpage" element={<SearchPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
{/* <Route path="/" element={<Home />} />
<Route path="/publishform" element={<Publishform />} />
<Route path="/picklocation" element={<Picklocation />} />
<Route path="/searchpage" element={<SearchPage />} /> */}

// import Publishform from './components/Publishform';
// import Picklocation from './pages/Picklocation';
// import Home from './pages/Home'
// import SearchPage from './pages/SearchPage'
