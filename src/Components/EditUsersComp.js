import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
const EditUsersComp = () => {
   
    const {userId} = useParams();
    const nav = useNavigate();

    const [userData,setUserData] = useState({
        userId:'',
        fullName:'',
        email:'', 
        contact_Number:'',
        password : '',
      });

      const inputChangeHandler = (event)=>{
        setUserData({...userData,[event.target.name]:event.target.value})
      }

    useEffect(()=>{
      axios.get(`http://localhost:8080/GetUser/${userId}`).then((res)=>{
        setUserData(res.data);
      }).catch((error)=>{})
    },[]);

const addData = (event)=>{
    event.preventDefault();
    axios.put(`http://localhost:8080/UpdateUser/${userId}`,userData).then(()=>{
        window.alert("User Updated Successfully");
        nav("/Users");
    }).catch((error)=>{})
}
    return (
        <div>
            <h2>Edit User : </h2>
            <form onSubmit={addData}>
                <lable>Enter Full Name:</lable>
                <input type='text' name="fullName" onChange={inputChangeHandler} value={userData.fullName} /> <br/><br/>
                <lable>Enter Contact Number:</lable>
                <input type='text' name="contact_Number" onChange={inputChangeHandler} value={userData.contact_Number} /> <br/><br/>
                <lable>Enter Email:</lable>
                <input type='text' name="email" onChange={inputChangeHandler} value={userData.email} /> <br/><br/>
                <lable>Enter Password:</lable>
                <input type='text' name="password" onChange={inputChangeHandler} value={userData.password} /> <br/><br/>
               <button type='submit' className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
    )
}

export default EditUsersComp;
