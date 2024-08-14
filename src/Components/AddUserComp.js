import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddUserComp = () => {
    const nav = useNavigate();
    const [userData, setUserData] = useState({
        fullName: '',
        email: '',
        contact_Number: '',
        password: '',
        confirmPassword: '' // For confirm password validation
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        contact_Number: '',
        password: '',
        confirmPassword: '' // For confirm password validation
    });

    const inputChangeHandler = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
        // Clear errors for the changed field
        setErrors({ ...errors, [event.target.name]: '' });
    };

    const validateForm = () => {
        let isValid = true;
        let errorMessages = { fullName: '', email: '', contact_Number: '', password: '', confirmPassword: '' };

        // Validate fullName
        if (!userData.fullName.trim()) {
            errorMessages.fullName = 'Full Name is required';
            isValid = false;
        }

        // Validate email
        if (!userData.email.trim()) {
            errorMessages.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            errorMessages.email = 'Email is invalid';
            isValid = false;
        }

        // Validate contact_Number
        if (!userData.contact_Number.trim()) {
            errorMessages.contact_Number = 'Contact Number is required';
            isValid = false;
        } else if (!/^\d{10}$/.test(userData.contact_Number)) {
            errorMessages.contact_Number = 'Contact Number must be exactly 10 digits';
            isValid = false;
        }

        // Validate password
        if (!userData.password.trim()) {
            errorMessages.password = 'Password is required';
            isValid = false;
        }

        // Validate confirmPassword
        if (!userData.confirmPassword.trim()) {
            errorMessages.confirmPassword = 'Confirm Password is required';
            isValid = false;
        } else if (userData.password !== userData.confirmPassword) {
            errorMessages.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        setErrors(errorMessages);
        return isValid;
    };

    const addUserData = (event) => {
        event.preventDefault();
        if (validateForm()) {
            const { confirmPassword, ...userDataToSend } = userData; // Exclude confirmPassword from the data to send
            axios.post("http://localhost:8080/AddUser", userDataToSend)
                .then(() => {
                    window.alert("User Added Successfully");
                    nav("/LoginPage");
                })
                .catch((error) => {
                    console.error("Error adding user:", error);
                });
        }
    };

    return (
        <div>
            <form onSubmit={addUserData}>
                <label>Enter Full Name:</label>
                <input type='text' name="fullName" onChange={inputChangeHandler} value={userData.fullName} />
                {errors.fullName && <div className="error">{errors.fullName}</div>}
                <br /><br />

                <label>Enter Email:</label>
                <input type='text' name="email" onChange={inputChangeHandler} value={userData.email} />
                {errors.email && <div className="error">{errors.email}</div>}
                <br /><br />

                <label>Enter Contact Number:</label>
                <input type='text' name="contact_Number" onChange={inputChangeHandler} value={userData.contact_Number} />
                {errors.contact_Number && <div className="error">{errors.contact_Number}</div>}
                <br /><br />

                <label>Enter Password:</label>
                <input type='password' name="password" onChange={inputChangeHandler} value={userData.password} />
                {errors.password && <div className="error">{errors.password}</div>}
                <br /><br />

                <label>Confirm Password:</label>
                <input type='password' name="confirmPassword" onChange={inputChangeHandler} value={userData.confirmPassword} />
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                <br /><br />

                <button type='submit' className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
    );
};

export default AddUserComp;
