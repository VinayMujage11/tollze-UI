import React, { useState,useEffect } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

const AdminTollHistoryComp = () => {
    const [tollBookDatas,setTollBookDatas] = useState([]);
    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = ()=>{
        axios.get("http://localhost:8080/GetTollBookDatas").then((res)=>{
            console.log(res.data);
            setTollBookDatas(res.data);
        }).catch((error)=>{})
    }

    
    const deleteRecord = (tollBookId)=>{
        if(window.confirm(`Are you sure to delete Toll with id :${tollBookId}`)){
            axios.delete(`http://localhost:8080/DeleteToll/${tollBookId}`).then(()=>{
                window.alert(" Deleted Successfully");
                fetchData();
              }).catch((error)=>{})
        }
      
    }

  return (
    <div>
            <h2>Toll History</h2>

            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Sr.No</th><th>Toll Booking Id</th><th>User-Id</th><th>Source</th><th>Destination</th>
                        <th>DOJ</th><th>DOBK</th><th>VehicleNumber</th><th>Amount</th><th>Payment Status</th>
                        <th>Edit</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    tollBookDatas.length > 0  &&   tollBookDatas.map((val,index)=>{
                            return <tr>
                                <td>{index+1}</td>
                                <td>{val.tollBookId}</td>
                                <td>{val.userId}</td>
                                <td>{val.source}</td>
                                <td>{val.destination}</td>
                                {/* <td>{val.distanceInKM}</td> */}
                                <td>{val.journeydate}</td>
                                <td>{val.dateOfbooking}</td>
                                <td>{val.vehicleNumber}</td>
                                <td>{val.amountToBePaid}</td>
                                <td>{val.paymentStatus}</td>
                                <td>
                                    <Link to={`/EditTollHistory/${val.tollBookId}`} className='btn btn-outline-success btn-sm'>
                                     <EditIcon></EditIcon>
                                    </Link>
                                </td>
                                <td> |
                                    <button type='button' onClick={()=>deleteRecord(val.tollBookId)} className='btn btn-outline-danger btn-sm'>
                                        <DeleteOutlineIcon></DeleteOutlineIcon>
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
};

export default AdminTollHistoryComp;