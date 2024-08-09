import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddUserComp = () => {
    const nav = useNavigate();
    const [userData,setUserData] = useState({
      fullName:'',
      email:'',
      contact_Number:'',
      password:''  
    });

const inputChangeHandler = (event)=>{
     setUserData({...userData,[event.target.name]:event.target.value})
}
const addUserData = (event)=>{
    event.preventDefault();
    axios.post("http://localhost:8080/AddUser",userData).then(()=>{
        window.alert("User Added Successfully");
        nav("/LoginPage");
    }).catch((error)=>{})
}
    return (
        <div>
            
            <form onSubmit={addUserData}>
                <lable>Enter User Name:</lable>
                <input type='text' name="fullName" onChange={inputChangeHandler} value={userData.fullName} /> <br/><br/>
                <lable>Enter Email:</lable>
                <input type='text' name="email" onChange={inputChangeHandler} value={userData.email} /> <br/><br/>
                <lable>Enter Contact Number:</lable>
                <input type='text' name="contact_Number" onChange={inputChangeHandler} value={userData.contact_Number} /> <br/><br/>
                <lable>Enter Password:</lable>
                <input type='text' name="password" onChange={inputChangeHandler} value={userData.password} /> <br/><br/>
               <button type='submit' className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
    )
}

export default AddUserComp
