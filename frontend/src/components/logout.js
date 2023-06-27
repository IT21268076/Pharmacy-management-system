import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const [logoutError, setLogoutError] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLogoutError('You are already logged out.');
        return;
      }

      // Send a request to the backend to log out the user
      const response = await axios.post('http://localhost:8080/employee/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Clear the JWT token from local storage
      localStorage.removeItem('token');

      // Redirect to the login page
      navigate('/');
    } catch (error) {
      // Display an error message if the logout request fails
      setLogoutError('Failed to log out. Please try again.');
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      {logoutError && <p>{logoutError}</p>}
    </div>
  );
}

export default LogoutButton;
