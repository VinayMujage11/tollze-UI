import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditUsersComp = () => {
    const { userId } = useParams();
    const nav = useNavigate();

    const [userData, setUserData] = useState({
        userId: '',
        fullName: '',
        email: '',
        contact_Number: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const inputChangeHandler = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/GetUser/${userId}`)
            .then((res) => {
                setUserData(res.data);
            })
            .catch((error) => console.error("Error fetching user data:", error));
    }, [userId]);

    const validate = () => {
        const errors = {};
        if (!userData.fullName.trim()) errors.fullName = 'Full Name is required';
        else if (userData.fullName.length < 3) errors.fullName = 'Full Name should be at least 3 characters long';

        if (!userData.email.trim()) errors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) errors.email = 'Invalid email format';

        if (!userData.contact_Number.trim()) errors.contact_Number = 'Contact Number is required';
        else if (!/^\d{10}$/.test(userData.contact_Number)) errors.contact_Number = 'Contact Number must be exactly 10 digits';

        if (!userData.password.trim()) errors.password = 'Password is required';

        return errors;
    };

    const addData = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        axios.put(`http://localhost:8080/UpdateUser/${userId}`, userData)
            .then(() => {
                window.alert("User Updated Successfully");
                nav("/Users");
            })
            .catch((error) => console.error("Error updating user data:", error));
    };

    return (
        <div>
            <h2>Edit User:</h2>
            <form onSubmit={addData}>
                <label>Enter Full Name:</label>
                <input type='text' name="fullName" onChange={inputChangeHandler} value={userData.fullName} />
                {errors.fullName && <div style={{ color: 'red' }}>{errors.fullName}</div>}
                <br /><br />
                <label>Enter Contact Number:</label>
                <input type='text' name="contact_Number" onChange={inputChangeHandler} value={userData.contact_Number} />
                {errors.contact_Number && <div style={{ color: 'red' }}>{errors.contact_Number}</div>}
                <br /><br />
                <label>Enter Email:</label>
                <input type='text' name="email" onChange={inputChangeHandler} value={userData.email} />
                {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                <br /><br />
                <label>Enter Password:</label>
                <input type='text' name="password" onChange={inputChangeHandler} value={userData.password} />
                {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                <br /><br />
                <button type='submit' className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
    );
};

export default EditUsersComp;
