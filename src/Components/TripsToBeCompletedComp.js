import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TripsToBeCompletedComp = () => {
  const nav = useNavigate();
  
  const currentUser = JSON.parse(localStorage.getItem('token'));
  const userId = currentUser.userId;
  
  const [TollCompleteData,setTollCompleteData] = useState([]);

  useEffect(()=>{
      fetchData();
  },[]);

  const fetchData = async ()=>{
     await axios.get(`http://localhost:8080/FutureTrips/${userId}`).then((res)=>{
          //console.log(userId);
          //localStorage.setItem('token3',JSON.stringify(res.data));
          setTollCompleteData(res.data);
      }).catch((error)=>{})
  }

  return (
    <div>
            <h2>Future Outings</h2>

            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Sr.No</th><th>Toll Booking Id</th><th>Source</th><th>Destination</th>
                        <th>Distance</th><th>DOJ</th><th>DOBK</th><th>VehicleNumber</th><th>Amount</th><th>Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    TollCompleteData.length > 0  &&   TollCompleteData.map((val,index)=>{
                            return <tr>
                                <td>{index+1}</td>
                                <td>{val.tollBookId}</td>
                                <td>{val.source}</td>
                                <td>{val.destination}</td>
                                <td>{val.distanceInKM}</td>
                                <td>{val.journeydate}</td>
                                <td>{val.dateOfbooking}</td>
                                <td>{val.vehicleNumber}</td>
                                <td>{val.amountToBePaid}</td>
                                <td>{val.paymentStatus}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
};

export default TripsToBeCompletedComp;