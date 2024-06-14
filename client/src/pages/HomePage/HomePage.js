import React from 'react';
import { useNavigate } from 'react-router-dom'; // Thay thế useHistory bằng useNavigate
import './HomePage.css'; // CSS module for styling

const HomePage = () => {
  const navigate = useNavigate(); // Sử dụng hook useNavigate thay vì useHistory

  const handleLogin = () => {
    navigate('/login'); // Thay thế history.push bằng navigate
  };

  const handleAdminLogin = () => {
    navigate('/admin-login'); // Thay thế history.push bằng navigate
  };

  return (
    <div className="home-container">
      <h1 className="home-title">On-meeting</h1>
      <h3 className="home-subtitle">Connect and collaborate every where</h3>
      <div className="button-container">
        <button className="login-button" onClick={handleLogin}>Login</button>
        <button className="admin-button" onClick={handleAdminLogin}>Login as admin</button>
      </div>
    </div>
  );
};

export default HomePage;
