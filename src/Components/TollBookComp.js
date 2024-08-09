import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const TollBookComp = () => {
    const nav = useNavigate();
    const [tollBookData,settollBookData] = useState({
        userId:'',
        source :'',
		destination :'',
		dateofjourney:'',
		// timeofjourney:'',
		vehicleType:'',
		vehicleNumber:'',
		vehicleLicenseNumber:'',
		paymentMode:''  
    });

    const currentUser = JSON.parse(localStorage.getItem('token'));
    tollBookData.userId =  currentUser.userId;

const inputChangeHandler = (event)=>{
     settollBookData({...tollBookData,[event.target.name]:event.target.value})
}

const [vehicleTypes,setVehicleTypes] = useState([]);
    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = ()=>{
        axios.get("http://localhost:8080/GetVehicleTypes").then((res)=>{
            console.log(res.data);
            setVehicleTypes(res.data);
        }).catch((error)=>{})
    }

    const vehicles = vehicleTypes.map(item => item.vehicleType);

const addTollBookData = async (event)=>{
    event.preventDefault();
    // axios.post("http://localhost:8080/BookToll",tollBookData).then(()=>{
    //     nav("/Payment");
    // }).catch((error)=>{})

    await axios.post("http://localhost:8080/BookToll",tollBookData).then((res)=>{
        //setResponseString(res.data);
        localStorage.setItem('token2',JSON.stringify(res.data));
        nav('/Payment');
      }).catch((error)=>{})
}
    return (
        <div>
            <h2>Book Toll</h2>
            <form onSubmit={addTollBookData}>
                <lable>User-Id:</lable>
                <input type='text' name="userId"  value={tollBookData.userId} readOnly/> <br/><br/>
                <lable>Source:</lable>
                <input type='text' name="source" onChange={inputChangeHandler} value={tollBookData.source} /> <br/><br/>
                <lable>Destination:</lable>
                <input type='text' name="destination" onChange={inputChangeHandler} value={tollBookData.destination} /> <br/><br/>
                <lable>Date Of Journey:</lable>
                <input type='date' name="dateofjourney" onChange={inputChangeHandler} value={tollBookData.dateofjourney} /> <br/><br/>
                {/* <lable>Time Of Journey:</lable>
                <input type='text' name="timeofjourney" onChange={inputChangeHandler} value={tollBookData.timeofjourney} /> <br/><br/> */}
                {/* <lable >Vehicle Type:</lable>
                <input type='text' name="vehicleType" onChange={inputChangeHandler} value={tollBookData.vehicleType} /> <br/><br/> */}
                <select id="dropdown" name="vehicleType" value={tollBookData.vehicleType} onChange={inputChangeHandler} >
                    <option  value = "">Select an Option</option>
                    {vehicleTypes.length > 0  && vehicleTypes.map((val,index)=>(
                        <option key={index+1} value={val.vehicleType}>{val.vehicleType}</option>
                    )
                    )}
                </select>

                <br/><br/>
                <lable>Vehicle Number:</lable>
                <input type='text' name="vehicleNumber" onChange={inputChangeHandler} value={tollBookData.vehicleNumber} /> <br/><br/>
                <lable>vehicle Registration Number:</lable>
                <input type='text' name="vehicleLicenseNumber" onChange={inputChangeHandler} value={tollBookData.vehicleLicenseNumber} /> <br/><br/>
                <lable>Payment Mode:</lable>
                <input type='text' name="paymentMode" onChange={inputChangeHandler} value={tollBookData.paymentMode} /> <br/><br/>
               <button type='submit' className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
    )
}

export default TollBookComp
