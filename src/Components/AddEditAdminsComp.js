import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const AddEditAdminsComp = () => {
    const [adminData, setAdminData] = useState({
        fullName: '',
        email: '',
        role: '',
        uniqueIdentityType: '',
        uniqueIdentityNumber: '',
    });

    const [addedAdminsData, setAddedAdminsData] = useState([]);
    const [showTable, setShowTable] = useState(true);
    const [errors, setErrors] = useState({});

    const currentAdmin = JSON.parse(localStorage.getItem('token4'));
    adminData.adminId = currentAdmin?.adminId || '';

    const inputChangeHandler = (event) => {
        setAdminData({ ...adminData, [event.target.name]: event.target.value });
    };

    const validate = () => {
        const errors = {};
        if (!adminData.fullName.trim()) errors.fullName = 'Full Name is required';
        else if (adminData.fullName.length < 3) errors.fullName = 'Full Name should be at least 3 characters long';

        if (!adminData.email.trim()) errors.email = 'Email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminData.email)) errors.email = 'Invalid email format';

        if (!adminData.role.trim()) errors.role = 'Role is required';
        if (!adminData.uniqueIdentityType.trim()) errors.uniqueIdentityType = 'Unique Identity Type is required';
        if (!adminData.uniqueIdentityNumber.trim()) errors.uniqueIdentityNumber = 'Unique Identity Number is required';

        return errors;
    };

    const addAdminData = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        axios.post("http://localhost:8080/AddAdmin", adminData)
            .then(() => {
                window.alert("Admin Added Successfully");
                fetchData();
            })
            .catch((error) => console.error("Error adding admin:", error));
    };

    const fetchData = async () => {
        await axios.get('http://localhost:8080/GetAdmins')
            .then((res) => {
                setAddedAdminsData(res.data);
            })
            .catch((error) => console.error("Error fetching admin data:", error));
    };

    const deleteRecord = (adminId) => {
        if (window.confirm(`Are you sure to delete admin with ID: ${adminId}`)) {
            axios.delete(`http://localhost:8080/DeleteAdmin/${adminId}`)
                .then(() => {
                    window.alert("Admin Deleted Successfully");
                    fetchData();
                })
                .catch((error) => console.error("Error deleting admin data:", error));
        }
    };

    const toggleTableVisibility = () => {
        setShowTable(!showTable);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <form onSubmit={addAdminData}>
                <label>Enter Full Name Of Admin:</label>
                <input type='text' name="fullName" onChange={inputChangeHandler} value={adminData.fullName} />
                {errors.fullName && <div style={{ color: 'red' }}>{errors.fullName}</div>}
                <br /><br />
                <label>Enter Email Of Admin:</label>
                <input type='text' name="email" onChange={inputChangeHandler} value={adminData.email} />
                {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
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

            <button onClick={toggleTableVisibility} className='btn btn-secondary mt-2'>
                {showTable ? 'Hide Table' : 'Show Table'}
            </button>

            {showTable && (
                <div>
                    <hr />
                    <h2>Admins :</h2>
                    <table className='table table-hover table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Admin ID</th>
                                <th>Admin UserName</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Unique Identity Type</th>
                                <th>Unique Identity Number</th>
                                <th>Role</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addedAdminsData.length > 0 && addedAdminsData.map((val, index) => (
                                <tr key={val.adminId}>
                                    <td>{index + 1}</td>
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
                                            <EditIcon />
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            type='button'
                                            onClick={() => deleteRecord(val.adminId)}
                                            className='btn btn-outline-danger btn-sm'
                                        >
                                            <DeleteOutlineIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AddEditAdminsComp;
