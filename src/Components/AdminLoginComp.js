import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginComp = () => {
  const nav = useNavigate();

  const [loginData, setLoginData] = useState({
    adminId: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    adminId: '',
    password: '',
  });

  const [responseString, setResponseString] = useState();

  const inputChangeHandler = (event) => {
    setLoginData({ ...loginData, [event.target.name]: event.target.value });
    // Clear error for the specific field
    setErrors({ ...errors, [event.target.name]: '' });
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessages = { adminId: '', password: '' };

    // Validate adminId
    if (!loginData.adminId.trim()) {
      errorMessages.adminId = 'Admin ID is required';
      isValid = false;
    }

    // Validate password
    if (!loginData.password.trim()) {
      errorMessages.password = 'Password is required';
      isValid = false;
    }

    setErrors(errorMessages);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await axios.post("http://localhost:8080/AdminLogin", loginData).then((res) => {
        setResponseString(res.data);
        localStorage.setItem('token4', JSON.stringify(res.data));
        if (res.data === "") {
          window.alert("Login Unsuccessful");
          window.location.reload();
        } else if (typeof res.data === 'object' && res.data !== null) {
          window.alert("Login successful");
          nav("/AdminDashBoard");
        }
      }).catch((error) => {
        console.error("Login error:", error);
        window.alert("An error occurred while logging in.");
      });
    }
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
          {errors.adminId && <div className="error">{errors.adminId}</div>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={inputChangeHandler}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div>
          <button type="submit" className='btn btn-primary btn-sm'>Login</button>
        </div>
      </form>
    </div>
  );
};

export default AdminLoginComp;
