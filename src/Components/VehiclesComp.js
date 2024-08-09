import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const VehiclesComp = () => {
    //const nav = useNavigate();
    const [vehicleData,setVehicleData] = useState({
      userId:'',
      vehicleType:'',
      vehicleNumber:'',
      vehicleRegistrationNumber:'',
      vehicleModel:'',
        
    });

    const currentUser = JSON.parse(localStorage.getItem('token'));
    vehicleData.userId =  currentUser.userId;


    const inputChangeHandler = (event)=>{
     setVehicleData({...vehicleData,[event.target.name]:event.target.value})
     //vehicleData.userId = currentUser.userId;
    }

    const addVehicleData = (event)=>{
    event.preventDefault();
    axios.post("http://localhost:8080/AddVehicle",vehicleData).then(()=>{
        window.alert("Vehicle Added Successfully");
        //nav("/Login");
    }).catch((error)=>{})
    }

    const [AddedVehiclesData,setAddedVehiclesData] = useState([]);

  useEffect(()=>{
      fetchData();
  },[addVehicleData]);

  const fetchData = async ()=>{
     await axios.get(`http://localhost:8080/AddedVehicle/${vehicleData.userId}`).then((res)=>{
          //console.log(userId);
          //localStorage.setItem('token3',JSON.stringify(res.data));
          setAddedVehiclesData(res.data);
      }).catch((error)=>{})
  }


    return (
        <div>
        <div>
            
            <form onSubmit={addVehicleData}>
                {/* <lable>User-Id:</lable>
                <input type='text' name="userId"  value={vehicleData.userId} readOnly/> <br/><br/> */}
                <lable>Enter Vehicle Type:</lable>
                <input type='text' name="vehicleType" onChange={inputChangeHandler} value={vehicleData.vehicleType} /> <br/><br/>
                <lable>Enter Vehicle Number:</lable>
                <input type='text' name="vehicleNumber" onChange={inputChangeHandler} value={vehicleData.vehicleNumber} /> <br/><br/>
                <lable>Enter Vehicle Registration Number:</lable>
                <input type='text' name="vehicleRegistrationNumber" onChange={inputChangeHandler} value={vehicleData.vehicleRegistrationNumber} /> <br/><br/>
                <lable>Enter Vehicle Model:</lable>
                <input type='text' name="vehicleModel" onChange={inputChangeHandler} value={vehicleData.vehicleModel} /> <br/><br/>
               <button type='submit' className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
        <hr></hr>
        <div>
            <h2>Your Vehicles :</h2>

            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Sr.No</th><th>Vehicle Type</th><th>Vehicle Number</th><th>Vehicle Registration Number</th>
                        <th>Vehicle Model</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    AddedVehiclesData.length > 0  &&   AddedVehiclesData.map((val,index)=>{
                            return <tr>
                                <td>{index+1}</td>
                                <td>{val.vehicleType}</td>
                                <td>{val.vehicleNumber}</td>
                                <td>{val.vehicleRegistrationNumber}</td>
                                <td>{val.vehicleModel}</td>
                                {/* <td>{val.journeydate}</td>
                                <td>{val.dateOfbooking}</td>
                                <td>{val.vehicleNumber}</td>
                                <td>{val.amountToBePaid}</td>
                                <td>{val.paymentStatus}</td> */}
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        </div>

    )
}

export default VehiclesComp;
