import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        email,
        password,
      });

      const { token } = response.data;
      localStorage.setItem('token', token);

      // Decode the token to get the user's role
      const decodedUser = jwtDecode(token);
      
      // Redirect based on role
      if (decodedUser.role === 'Technician') {
        navigate('/technician');
      } else if (decodedUser.role === 'Dentist') {
        navigate('/dentist');
      } else {
        setError('Unknown user role.');
      }
    } catch (err) {
      setError('Invalid email or password.');
      console.error(err);
    }
  };

  return (
    <div className="card form-card">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '8px', border: '2px solid #43d3ecff' }} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', border: '2px solid #43d3ecff' }}/>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;