import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginComp = () => {
  const nav = useNavigate();
  
  const [loginData,setloginData] = useState({
    email:'',
    password:'',  
  });

  const [responseString,setResponseString]=useState();

  const inputChangeHandler = (event)=>{
    setloginData({...loginData,[event.target.name]:event.target.value})
  }
   

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8080/Login",loginData).then((res)=>{
      setResponseString(res.data);
      localStorage.setItem('token',JSON.stringify(res.data));
      //nav('/DashBoard');
    if(responseString===""){
      window.alert("Login Unsuccessful");
      window.location.reload();      
      //nav("/LoginPage");
    }
    if(typeof responseString==='object' && responseString!==null){
      window.alert("Login successful");
      nav("/DashBoard");
    }
    
    }).catch((error)=>{})


    
    // if(responseString==="User Not Found"){
    //   window.alert("User Not Found");
    // }

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={loginData.email}
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

export default LoginComp;