import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
const EditAdminsComp = () => {
   
    const {adminId} = useParams();
    const nav = useNavigate();

    const [adminData,setAdminData] = useState({
        adminId:'',
        password: '',
        fullName:'',
        email:'',
        role:'',
        userName:'',
        uniqueIdentityType:'',
        uniqueIdentityNumber:'',
      });

      const inputChangeHandler = (event)=>{
        setAdminData({...adminData,[event.target.name]:event.target.value})
      }

    useEffect(()=>{
      axios.get(`http://localhost:8080/GetAdmin/${adminId}`).then((res)=>{
        setAdminData(res.data);
      }).catch((error)=>{})
    },[]);

const addData = (event)=>{
    event.preventDefault();
    axios.put(`http://localhost:8080/UpdateAdmin/${adminId}`,adminData).then(()=>{
        window.alert("Admin Updated Successfully");
        nav("/Admins");
    }).catch((error)=>{})
}
    return (
        <div>
            <h2>Edit Admin : </h2>
            <form onSubmit={addData}>
                <lable>Admin-Id:</lable>
                <input type='text' name="userId"  value={adminData.adminId} readOnly/> <br/><br/>
                <lable>Admin-UserName:</lable>
                <input type='text' name="userName"  value={adminData.userName} readOnly/> <br/><br/>
                <lable>Enter Full Name Of Admin:</lable>
                <input type='text' name="fullName" onChange={inputChangeHandler} value={adminData.fullName} /> <br/><br/>
                <lable>Enter Email Of Admin :</lable>
                <input type='text' name="email" onChange={inputChangeHandler} value={adminData.email} /> <br/><br/>
                <lable>Enter Password For Admin:</lable>
                <input type='text' name="password" onChange={inputChangeHandler} value={adminData.password} /> <br/><br/>
                <lable>Enter Admin's Role:</lable>
                <input type='text' name="role" onChange={inputChangeHandler} value={adminData.role} /> <br/><br/>
                <lable>Enter Unique Identity Type:</lable>
                <input type='text' name="uniqueIdentityType" onChange={inputChangeHandler} value={adminData.uniqueIdentityType} /> <br/><br/>
                <lable>Enter Unique Identity Number:</lable>
                <input type='text' name="uniqueIdentityNumber" onChange={inputChangeHandler} value={adminData.uniqueIdentityNumber} /> <br/><br/>
                
               <button type='submit' className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
    )
}

export default EditAdminsComp;
