import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditAdminsComp = () => {
    const { adminId } = useParams();
    const nav = useNavigate();

    const [adminData, setAdminData] = useState({
        adminId: '',
        password: '',
        fullName: '',
        email: '',
        role: '',
        userName: '',
        uniqueIdentityType: '',
        uniqueIdentityNumber: '',
    });

    const [errors, setErrors] = useState({});

    const inputChangeHandler = (event) => {
        setAdminData({ ...adminData, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/GetAdmin/${adminId}`)
            .then((res) => {
                setAdminData(res.data);
            })
            .catch((error) => console.error("Error fetching admin data:", error));
    }, [adminId]);

    const validate = () => {
        const errors = {};
        if (!adminData.fullName.trim()) errors.fullName = 'Full Name is required';
        else if (adminData.fullName.length < 3) errors.fullName = 'Full Name should be at least 3 characters long';

        if (!adminData.email.trim()) errors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminData.email)) errors.email = 'Invalid email format';

        if (!adminData.password.trim()) errors.password = 'Password is required';
        else if (adminData.password.length < 6) errors.password = 'Password should be at least 6 characters long';

        if (!adminData.role.trim()) errors.role = 'Role is required';

        if (!adminData.uniqueIdentityType.trim()) errors.uniqueIdentityType = 'Unique Identity Type is required';

        if (!adminData.uniqueIdentityNumber.trim()) errors.uniqueIdentityNumber = 'Unique Identity Number is required';
        else if (!/^\d+$/.test(adminData.uniqueIdentityNumber)) errors.uniqueIdentityNumber = 'Unique Identity Number must be numeric';

        return errors;
    };

    const addData = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        axios.put(`http://localhost:8080/UpdateAdmin/${adminId}`, adminData)
            .then(() => {
                window.alert("Admin Updated Successfully");
                nav("/Admins");
            })
            .catch((error) => console.error("Error updating admin data:", error));
    };

    return (
        <div>
            <h2>Edit Admin:</h2>
            <form onSubmit={addData}>
                <label>Admin-Id:</label>
                <input type='text' name="adminId" value={adminData.adminId} readOnly />
                <br /><br />
                <label>Admin-UserName:</label>
                <input type='text' name="userName" value={adminData.userName} readOnly />
                <br /><br />
                <label>Enter Full Name Of Admin:</label>
                <input type='text' name="fullName" onChange={inputChangeHandler} value={adminData.fullName} />
                {errors.fullName && <div style={{ color: 'red' }}>{errors.fullName}</div>}
                <br /><br />
                <label>Enter Email Of Admin:</label>
                <input type='text' name="email" onChange={inputChangeHandler} value={adminData.email} />
                {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
                <br /><br />
                <label>Enter Password For Admin:</label>
                <input type='text' name="password" onChange={inputChangeHandler} value={adminData.password} />
                {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
                <br /><br />
                <label>Enter Admin's Role:</label>
                <input type='text' name="role" onChange={inputChangeHandler} value={adminData.role} />
                {errors.role && <div style={{ color: 'red' }}>{errors.role}</div>}
                <br /><br />
                <label>Enter Unique Identity Type:</label>
                <input type='text' name="uniqueIdentityType" onChange={inputChangeHandler} value={adminData.uniqueIdentityType} />
                {errors.uniqueIdentityType && <div style={{ color: 'red' }}>{errors.uniqueIdentityType}</div>}
                <br /><br />
                <label>Enter Unique Identity Number:</label>
                <input type='text' name="uniqueIdentityNumber" onChange={inputChangeHandler} value={adminData.uniqueIdentityNumber} />
                {errors.uniqueIdentityNumber && <div style={{ color: 'red' }}>{errors.uniqueIdentityNumber}</div>}
                <br /><br />
                <button type='submit' className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
    );
};

export default EditAdminsComp;
