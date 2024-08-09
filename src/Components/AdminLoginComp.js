import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginComp = () => {
  const nav = useNavigate();
  
  const [loginData,setloginData] = useState({
    adminId:'',
    password:'',  
  });

  const [responseString,setResponseString]=useState();

  const inputChangeHandler = (event)=>{
    setloginData({...loginData,[event.target.name]:event.target.value})
  }
   

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8080/AdminLogin",loginData).then((res)=>{
      setResponseString(res.data);
      localStorage.setItem('token4',JSON.stringify(res.data));
      if(responseString===""){
        window.alert("Login Unsuccessful");
        window.location.reload();      
      }
      if(typeof responseString==='object' && responseString!==null){
        window.alert("Login successful");
        nav("/AdminDashBoard");
      }
    }).catch((error)=>{})


    // if(responseString==="Successful"){
    //   window.alert("Login successful");
    //   nav("/DashBoard");
    // }
    // if(responseString==="Incorrect Password"){
    //   window.location.reload();      
    //   //nav("/LoginPage");
    // }
    // if(responseString==="User Not Found"){
    //   window.alert("User Not Found");
    // }

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Admin ID:</label>
          <input
            type="text"
            name="adminId"
            value={loginData.adminId}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            name="password"
            onChange={inputChangeHandler}
            value={loginData.password}
          />
        </div>
        <div>
        <button type="submit" className='btn btn-primary btn-sm'>Login</button>
        </div>
        {/* <div id='error'>
          <p><strong>{responseString}</strong></p>
        </div> */}
      </form>
    </div>
  );
};

export default AdminLoginComp;