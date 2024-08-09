import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

const UsersComp = () => {
    
const [users,setUsers] = useState([]);
    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = ()=>{
        axios.get("http://localhost:8080/GetUsers").then((res)=>{
            console.log(res.data);
            setUsers(res.data);
        }).catch((error)=>{})
    }

    
    const deleteRecord = (userId)=>{
        if(window.confirm(`Are you sure to delete product with id :${userId}`)){
            axios.delete(`http://localhost:8080/DeleteUser/${userId}`).then(()=>{
                window.alert("User Deleted Successfully");
                fetchData();
              }).catch((error)=>{})
        }
      
    }
    return (
        <div>
            <h2>Users :</h2>
            
            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Sr.No</th><th>User ID</th><th>Full Name</th><th>Contact</th>
                        <th>Email</th><th>Password</th><th>Edit</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    users.length > 0  &&   users.map((val,index)=>{
                            return <tr>
                                <td>{index+1}</td>
                                <td>{val.userId}</td>
                                <td>{val.fullName}</td>
                                <td>{val.contact_Number}</td>
                                <td>{val.email}</td>
                                <td>{val.password}</td>
                                <td>
                                    <Link to={`/EditUser/${val.userId}`} className='btn btn-outline-success btn-sm'>
                                     <EditIcon></EditIcon>
                                    </Link>
                                </td>
                                <td> |
                                    <button type='button' onClick={()=>deleteRecord(val.userId)} className='btn btn-outline-danger btn-sm'>
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
}

export default UsersComp;
