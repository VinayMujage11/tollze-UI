import { Link } from 'react-router-dom'
import React from 'react';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import HistoryIcon from '@mui/icons-material/History';
import PendingIcon from '@mui/icons-material/Pending';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const PaymentComp = () => {
  const nav = useNavigate();

  // const [paymentData,setPaymentData] = useState({
  //   source:'',
  //   destination:'',
  //   distanceInKm:'',
  //   amountTobePaid:'',  
  // });

  const currentUser = JSON.parse(localStorage.getItem('token2'));
    // paymentData.source =  currentUser.source;
    // paymentData.destination = currentUser.destination;
    // currentUser.distanceInKm = 347;
    // currentUser.amountTobePaid = 1200;
  
  const updateTollBookData = (event) =>{
    event.preventDefault();
    axios.put(`http://localhost:8080/updateToll/${currentUser.tollBookId}`,currentUser).then((res)=>{
          
            window.alert("Toll Booked Successfully");
            localStorage.removeItem('token2');

            nav("/Dashboard");
        }).catch((error)=>{})
       
  }

//   useEffect(()=>{
//     axios.get(`http://localhost:8888/products/${id}`).then((res)=>{
//       // console.log(res.data);
//       setProductData(res.data);
//     }).catch((error)=>{})
//   },[]);

//   // put request
// const addData = (event)=>{
//   event.preventDefault();
//   axios.put(`http://localhost:8888/products/${id}`,productData).then(()=>{
//       window.alert("Product Updated Successfully");
//       nav("/maindash/productdash");
//   }).catch((error)=>{})
// }

    return (
        <div>
        <h2>Book Toll</h2>
        <form onSubmit={updateTollBookData}>
            <lable>Source:</lable>
            <strong>{currentUser.source}</strong><br/><br/>
            <lable>Destination:</lable>
            <strong>{currentUser.destination}</strong><br/><br/>
            <lable>distanceInKm:</lable>
            <strong>{currentUser.distanceInKM}</strong><br/><br/>
            <lable>amountTobePaid:</lable>
            <strong>{currentUser.amountToBePaid}</strong><br/><br/>
            {/* <input type='text' name="userId"  value={tollBookData.userId} readOnly/> <br/><br/> */}
           <button type='submit' className='btn btn-primary mt-2'>Submit</button>
        </form>
    </div>


    )
}

export default PaymentComp;