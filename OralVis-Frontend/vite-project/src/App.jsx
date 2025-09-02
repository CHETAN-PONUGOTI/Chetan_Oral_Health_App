import React from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import LoginPage from './components/LoginPage';
import TechnicianDashboard from './components/TechnicianDashboard';
import DentistDashboard from './components/DentistDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import logo from './images/logo.jpg'
function App() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  let user = null;
  if (token) {
    user = jwtDecode(token);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <header style={{ padding: '1rem', background: '#39c9aaff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100vw' }}>
        <div className='logo-container'>
          <img src={logo} alt="main-logo" className="logo-img" />
          <h1 className="main-head">OralVis Healthcare</h1>
        </div>
        {user && (
          <div>
            <span className='mode-name'>Welcome, {user.email} ({user.role})</span>
            <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Logout</button>
          </div>
        )}
      </header>

      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route 
            path="/technician" 
            element={
              <ProtectedRoute allowedRoles={['Technician']}>
                <TechnicianDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dentist" 
            element={
              <ProtectedRoute allowedRoles={['Dentist']}>
                <DentistDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Redirect root path to the correct dashboard or login */}
          
          <Route
            path="/" 
            element={
              !user ? <Navigate to="/login" /> : 
              user.role === 'Technician' ? <Navigate to="/technician" /> : 
              <Navigate to="/dentist" />
            } 
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;