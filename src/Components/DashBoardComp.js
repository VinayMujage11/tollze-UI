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

        
        <div className="row">
          <div className="container" id='booktoll'>
          <Link to="/TollBook" className='btn btn-primary btn-sm'><BookOnlineIcon></BookOnlineIcon>Book Toll</Link>
          </div>
          <div className="container" id='TollHistory'>
          <Link to="/TollHistory" className='btn btn-primary btn-sm'><HistoryIcon></HistoryIcon>Toll History</Link>
          </div>
          <div className="container" id='futureoutings'>
          <Link to="/FutureTrips" className='btn btn-primary btn-sm'><PendingIcon></PendingIcon>Future Outings</Link>
          </div>
          <div className="container" id='Addvehicle'>
          <Link to="/Vehicles" className='btn btn-primary btn-sm'><DirectionsCarFilledIcon></DirectionsCarFilledIcon>Add Vehicle</Link>
          </div>
          <div className="container" id='paymentmode'>
          <Link to="/paymentModes" className='btn btn-primary btn-sm'>Add Payment Mode</Link>
          </div>
          <div className="container" id='logout'>
          <button onClick={handlesubmit} className='btn btn-primary btn-sm'><AccountCircleIcon></AccountCircleIcon>Logout</button>
          </div>
          

        </div>
      </div>


    )
}

export default DashBoardComp;