import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Publishform from './components/Publishform';
import Picklocation from './pages/Picklocation';
import Home from './pages/Home'
import SearchPage from './pages/SearchPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publishform" element={<Publishform />} />
        <Route path="/picklocation" element={<Picklocation />} />
        <Route path="/searchpage" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
