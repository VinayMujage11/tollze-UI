import { Link } from 'react-router-dom'
import React from 'react';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import HistoryIcon from '@mui/icons-material/History';
import PendingIcon from '@mui/icons-material/Pending';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import { useNavigate } from 'react-router-dom';

const DashBoardComp = () => {
  const nav = useNavigate();
  const handlesubmit = () =>{
    localStorage.clear();
    nav('/LoginPage');
  }
  
    return (
      <div>

        
          <h1>Welcome to Tollz-E</h1>
          <Link to="/TollBook" className='btn btn-primary btn-sm'><BookOnlineIcon></BookOnlineIcon>Book Toll</Link>{'   '}
          <Link to="/TollHistory" className='btn btn-primary btn-sm'><HistoryIcon></HistoryIcon>Toll History</Link>{'   '}
          <Link to="/FutureTrips" className='btn btn-primary btn-sm'><PendingIcon></PendingIcon>Trips to be Completed</Link>{'   '}
          <Link to="/Vehicles" className='btn btn-primary btn-sm'><DirectionsCarFilledIcon></DirectionsCarFilledIcon>Add Vehicle</Link>{'   '}
          <button onClick={handlesubmit} className='btn btn-primary btn-sm'><AccountCircleIcon></AccountCircleIcon>Logout</button>

        
      </div>


    )
}

export default DashBoardComp;