import { Link } from 'react-router-dom'
import React from 'react';
import IsoTwoToneIcon from '@mui/icons-material/IsoTwoTone';
import HistoryIcon from '@mui/icons-material/History';
import PendingIcon from '@mui/icons-material/Pending';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import GroupIcon from '@mui/icons-material/Group';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate } from 'react-router-dom';

const AdminDashBoardComp = () => {
  const nav = useNavigate();
  const handlesubmit = () =>{
    localStorage.clear();
    nav('/AdminLogin');
  }

  const currentAdmin = JSON.parse(localStorage.getItem('token4'));
    const role =  currentAdmin.role;

  
    return (
      <div>

        
          <h1>Welcome to Tollz-E</h1>
          <Link to="/AddEditToll" className='btn btn-primary btn-sm'><IsoTwoToneIcon></IsoTwoToneIcon>Add Or Edit Toll Tax</Link>{'   '}
          <Link to="/Users" className='btn btn-primary btn-sm'><GroupIcon/>Users</Link>{'   '}
          {role === 'Master' && (
          <Link to="/Admins" className='btn btn-primary btn-sm'><AdminPanelSettingsIcon></AdminPanelSettingsIcon>Admins</Link>
          )}{'   '}
          <Link to="/AdminsTollHistory" className='btn btn-primary btn-sm'><DirectionsCarFilledIcon></DirectionsCarFilledIcon>Edit Toll History</Link>{'   '}
          <button onClick={handlesubmit} className='btn btn-primary btn-sm'><AccountCircleIcon></AccountCircleIcon>Logout</button>

        
      </div>


    )
}

export default AdminDashBoardComp;