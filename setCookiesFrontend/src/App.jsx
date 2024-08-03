import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from '../src/components/HomePage';
import TrackingTable from '../src/components/TrackingTable';
import LoginPage from '../src/components/LoginPage'; // Assuming you have a login page
import Navbar from './components/Navbar';

const isAuthenticated = () => {
  return localStorage.getItem('isAdmin') === 'true';
};

const App = () => {
  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/track"
          element={isAuthenticated() ? <TrackingTable /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
