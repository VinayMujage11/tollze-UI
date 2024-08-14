import { Link } from 'react-router-dom';
import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const DashBoardComp = () => {
  return (
    <div >
      <h2>Welcome to Tollz-E</h2>
      <div className="row">
        <div className="container" id='login'>
          <Link to="/LoginPage" className="btn btn-primary btn-sm">
            <LoginIcon /> Login
          </Link>
        </div>
        <div className="container">
          {/* <img src="register-image.jpg" alt="Register Image" /> */}
          <Link to="/RegisterPage" className="btn btn-primary btn-sm">
            <HowToRegIcon /> Register
          </Link>
        </div>
        <div className="container">
          {/* <img src="admin-image.jpg" alt="Admin Image" /> */}
          <Link to="/AdminLogin" className="btn btn-primary btn-sm">
            <AdminPanelSettingsIcon /> Admin
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashBoardComp;