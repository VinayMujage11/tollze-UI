import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
const EditTollHistoryComp = () => {
   
    const {tollBookId} = useParams();
    const nav = useNavigate();

    const [tollBookData,settollBookData] = useState({
    tollCount:'',
    tollBookId:'',
	userId:'',
	source:'',
	destination:'',
	journeydate:'',
	vehicleType:'',
	vehicleNumber:'',
    vehicleLicenseNumber:'',
    paymentMode:'',
	amountToBePaid:'',
	paymentStatus:'',
    dateOfbooking:'',
	dateOfExpiry:'',
	distanceInKM:'',
  
    });
      const inputChangeHandler = (event)=>{
        settollBookData({...tollBookData,[event.target.name]:event.target.value})
      }

    useEffect(()=>{
      axios.get(`http://localhost:8080/GetTollBookData/${tollBookId}`).then((res)=>{
        settollBookData(res.data);
      }).catch((error)=>{})
    },[]);

const addData = (event)=>{
    event.preventDefault();
    axios.put(`http://localhost:8080/UpdateTollBookData/${tollBookId}`,tollBookData).then(()=>{
        window.alert(" Updated Successfully");
        nav("/AdminsTollHistory");
    }).catch((error)=>{})
}
    return (
        <div>
            <h2>Edit Toll : </h2>
            <form onSubmit={addData}>
                <lable>Toll Booking Id:</lable>
                <input type='text' name="tollBookId"  value={tollBookData.tollBookId} readOnly/> <br/><br/>
                <lable>User-Id:</lable>
                <input type='text' name="userId"  value={tollBookData.userId} readOnly/> <br/><br/>
                <lable>Source:</lable>
                <input type='text' name="source" onChange={inputChangeHandler} value={tollBookData.source} /> <br/><br/>
                <lable>Destination:</lable>
                <input type='text' name="destination" onChange={inputChangeHandler} value={tollBookData.destination} /> <br/><br/>
                <lable>Distance In KM:</lable>
                <input type='text' name="distanceInKM" onChange={inputChangeHandler} value={tollBookData.distanceInKM} /> <br/><br/>
                <lable>Date Of Journey:</lable>
                <input type='date' name="dateofjourney" onChange={inputChangeHandler} value={tollBookData.dateofjourney} /> <br/><br/>
                <lable>Date Of Booking:</lable>
                <input type='date' name="dateOfbooking" onChange={inputChangeHandler} value={tollBookData.dateOfbooking} /> <br/><br/>
                <lable>Date Of Expiry:</lable>
                <input type='date' name="dateOfExpiry" onChange={inputChangeHandler} value={tollBookData.dateOfExpiry} /> <br/><br/>
                <lable >Vehicle Type:</lable>
                <input type='text' name="vehicleType" onChange={inputChangeHandler} value={tollBookData.vehicleType} /> <br/><br/>
                <lable>Vehicle Number:</lable>
                <input type='text' name="vehicleNumber" onChange={inputChangeHandler} value={tollBookData.vehicleNumber} /> <br/><br/>
                <lable>vehicle Registration Number:</lable>
                <input type='text' name="vehicleLicenseNumber" onChange={inputChangeHandler} value={tollBookData.vehicleLicenseNumber} /> <br/><br/>
                <lable>Payment Mode:</lable>
                <input type='text' name="paymentMode" onChange={inputChangeHandler} value={tollBookData.paymentMode} /> <br/><br/>
                <lable>Amount:</lable>
                <input type='text' name="amountToBePaid" onChange={inputChangeHandler} value={tollBookData.amountToBePaid} /> <br/><br/>
                <lable>Payment Status:</lable>
                <input type='text' name="paymentStatus" onChange={inputChangeHandler} value={tollBookData.paymentStatus} /> <br/><br/>
                
               <button type='submit' className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
    )
}

export default EditTollHistoryComp;
