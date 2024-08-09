import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const AddEditAdminsComp = () => {
    //const nav = useNavigate();
    const [adminData,setAdminData] = useState({
        // adminId:'',
        // password: '',
        fullName:'',
        email:'',
        role:'',
        // userName:'',
        uniqueIdentityType:'',
        uniqueIdentityNumber:'',
        
    });

    const currentAdmin = JSON.parse(localStorage.getItem('token4'));
    adminData.adminId =  currentAdmin.adminId;


    const inputChangeHandler = (event)=>{
     setAdminData({...adminData,[event.target.name]:event.target.value})
     //vehicleData.userId = currentUser.userId;
    }

    const addAdminData = (event)=>{
    event.preventDefault();
    axios.post("http://localhost:8080/AddAdmin",adminData).then(()=>{
        window.alert("Admin Added Successfully");
        //nav("/Login");
    }).catch((error)=>{})
    }

    const [AddedAdminsData,setAddedAdminsData] = useState([]);

  useEffect(()=>{
      fetchData();
  },[addAdminData]);

  const fetchData = async ()=>{
     await axios.get(`http://localhost:8080/GetAdmins`).then((res)=>{
          //console.log(userId);
          //localStorage.setItem('token3',JSON.stringify(res.data));
          setAddedAdminsData(res.data);
      }).catch((error)=>{})
  }

  const deleteRecord = (adminId)=>{
    if(window.confirm(`Are you sure to delete product with id :${adminId}`)){
        axios.delete(`http://localhost:8080/DeleteAdmin/${adminId}`).then(()=>{
            window.alert("Admin Deleted Successfully");
            fetchData();
          }).catch((error)=>{})
    }
  
}


    return (
        <div>
        <div>
            
            <form onSubmit={addAdminData}>
                {/* <lable>User-Id:</lable>
                <input type='text' name="userId"  value={vehicleData.userId} readOnly/> <br/><br/> */}
                <lable>Enter Full Name Of Admin:</lable>
                <input type='text' name="fullName" onChange={inputChangeHandler} value={adminData.fullName} /> <br/><br/>
                <lable>Enter Email Of Admin :</lable>
                <input type='text' name="email" onChange={inputChangeHandler} value={adminData.email} /> <br/><br/>
                {/* <lable>Enter Password For Admin:</lable>
                <input type='text' name="password" onChange={inputChangeHandler} value={adminData.password} /> <br/><br/> */}
                <lable>Enter Admin's Role:</lable>
                <input type='text' name="role" onChange={inputChangeHandler} value={adminData.role} /> <br/><br/>
                <lable>Enter Unique Identity Type:</lable>
                <input type='text' name="uniqueIdentityType" onChange={inputChangeHandler} value={adminData.uniqueIdentityType} /> <br/><br/>
                <lable>Enter Unique Identity Number:</lable>
                <input type='text' name="uniqueIdentityNumber" onChange={inputChangeHandler} value={adminData.uniqueIdentityNumber} /> <br/><br/>
                
               <button type='submit' className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
        <hr></hr>
        <div>
            <h2>Admins :</h2>

            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Sr.No</th><th>Admin ID </th><th>Admin UserName</th><th>Full Name</th>
                        <th>Email</th><th>Password</th><th>Unique Identity Type</th><th>Unique Identity Number</th><th>Role</th><th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    AddedAdminsData.length > 0  &&   AddedAdminsData.map((val,index)=>{
                            return <tr>
                                <td>{index+1}</td>
                                <td>{val.adminId}</td>
                                <td>{val.userName}</td>
                                <td>{val.fullName}</td>
                                <td>{val.email}</td>
                                <td>{val.password}</td>
                                <td>{val.uniqueIdentityType}</td>
                                <td>{val.uniqueIdentityNumber}</td>
                                <td>{val.role}</td>
                                <td>
                                    <Link to={`/EditAdmin/${val.adminId}`} className='btn btn-outline-success btn-sm'>
                                     <EditIcon></EditIcon>
                                    </Link>
                                </td>
                                <td> |
                                    <button type='button' onClick={()=>deleteRecord(val.adminId)} className='btn btn-outline-danger btn-sm'>
                                        <DeleteOutlineIcon></DeleteOutlineIcon>
                                    </button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        </div>

    )
}

export default AddEditAdminsComp;
