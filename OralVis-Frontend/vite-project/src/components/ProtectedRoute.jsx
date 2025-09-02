import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // User is not logged in
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedUser = jwtDecode(token);
    
    if (!allowedRoles.includes(decodedUser.role)) {
      // User's role is not allowed for this route
      return <Navigate to="/login" replace />;
    }
    
    // If token is valid and role is allowed, render the component
    return children;
  } catch (error) { // Add (error) here
    // It's a good idea to log the error for debugging
    console.error("Invalid token:", error);
    
    // If token is invalid or expired
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;