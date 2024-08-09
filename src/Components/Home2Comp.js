import { Link } from 'react-router-dom'
import React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const DashBoardComp = () => {
  
    return (
      <div >

        <form class='glass-login-form'>
          <h2>Welcome to Tollz-E</h2>
          <div>
          <Link to="/LoginPage" className='btn btn-primary btn-sm'><LoginIcon></LoginIcon>Login</Link>
          </div>
          <hr></hr>
          <div>
          <Link to="/RegisterPage" className='btn btn-primary btn-sm'><HowToRegIcon></HowToRegIcon>Register</Link>
          </div>
          <hr></hr>
          <div>
          <Link to="/AdminLogin" className='btn btn-primary btn-sm' ><AdminPanelSettingsIcon></AdminPanelSettingsIcon>Admin</Link>
          </div>
        </form>    
      </div>


    )
}

export default DashBoardComp;