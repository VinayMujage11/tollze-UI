import axios from 'axios';
import React, { useState, useEffect } from 'react';

const VehiclesComp = () => {
    const [vehicleData, setVehicleData] = useState({
        userId: '',
        vehicleType: '',
        vehicleNumber: '',
        vehicleRegistrationNumber: '',
        vehicleModel: '',
    });

    const [errors, setErrors] = useState({
        vehicleNumber: '',
        vehicleRegistrationNumber: '',
        vehicleType: '',
        vehicleModel: '',
    });

    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [AddedVehiclesData, setAddedVehiclesData] = useState([]);
    const [showVehicles, setShowVehicles] = useState(false); // State to control visibility

    const currentUser = JSON.parse(localStorage.getItem('token'));
    vehicleData.userId = currentUser.userId;

    useEffect(() => {
        fetchData();
    }, [vehicleData.userId]);

    const inputChangeHandler = (event) => {
        setVehicleData({ ...vehicleData, [event.target.name]: event.target.value });
    }

    const validateVehicleNumber = (vehicleNumber) => {
        const vehicleNumberRegex = /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/;
        return vehicleNumberRegex.test(vehicleNumber);
    }

    const validateVehicleRegistrationNumber = (registrationNumber) => {
        const registrationNumberRegex = /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/;
        return registrationNumberRegex.test(registrationNumber);
    }

    const validateForm = () => {
        const newErrors = {};
        if (!vehicleData.vehicleType) newErrors.vehicleType = "Vehicle type is required";
        if (!vehicleData.vehicleNumber) newErrors.vehicleNumber = "Vehicle number is required";
        if (!validateVehicleNumber(vehicleData.vehicleNumber)) newErrors.vehicleNumber = "Invalid vehicle number format";
        if (!vehicleData.vehicleRegistrationNumber) newErrors.vehicleRegistrationNumber = "Vehicle registration number is required";
        if (!validateVehicleRegistrationNumber(vehicleData.vehicleRegistrationNumber)) newErrors.vehicleRegistrationNumber = "Invalid vehicle registration number format";
        if (!vehicleData.vehicleModel) newErrors.vehicleModel = "Vehicle model is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addVehicleData = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                await axios.post("http://localhost:8080/AddVehicle", vehicleData);
                window.alert("Vehicle Added Successfully");
                fetchData(); // Refresh the vehicle list
                setVehicleData({
                    userId: currentUser.userId,
                    vehicleType: '',
                    vehicleNumber: '',
                    vehicleRegistrationNumber: '',
                    vehicleModel: '',
                });
            } catch (error) {
                console.error(error);
            }
        }
    }

    const fetchData = async () => {
        try {
            const vehiclesResponse = await axios.get(`http://localhost:8080/AddedVehicle/${vehicleData.userId}`);
            setAddedVehiclesData(vehiclesResponse.data);
        } catch (error) {
            console.error(error);
        }

        try {
            const vehicleTypesResponse = await axios.get("http://localhost:8080/GetVehicleTypes");
            setVehicleTypes(vehicleTypesResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    return (
        <div>
            <div>
                <form onSubmit={addVehicleData}>
                    <label>Vehicle Type:</label>
                    <select id="dropdown" name="vehicleType" value={vehicleData.vehicleType} onChange={inputChangeHandler}>
                        <option value="">Select an Option</option>
                        {vehicleTypes.length > 0 && vehicleTypes.map((val, index) => (
                            <option key={index + 1} value={val.vehicleType}>{val.vehicleType}</option>
                        ))}
                    </select>
                    {errors.vehicleType && <p className="error">{errors.vehicleType}</p>}
                    
                    <label>Vehicle Number:</label>
                    <input type='text' name="vehicleNumber" onChange={inputChangeHandler} value={vehicleData.vehicleNumber} />
                    {errors.vehicleNumber && <p style={{ color: 'red' }}>{errors.vehicleNumber}</p>}
                    
                    <label>Vehicle Registration Number:</label>
                    <input type='text' name="vehicleRegistrationNumber" onChange={inputChangeHandler} value={vehicleData.vehicleRegistrationNumber} />
                    {errors.vehicleRegistrationNumber && <p style={{ color: 'red' }}>{errors.vehicleRegistrationNumber}</p>}
                    
                    <label>Vehicle Model:</label>
                    <input type='text' name="vehicleModel" onChange={inputChangeHandler} value={vehicleData.vehicleModel} />
                    {errors.vehicleModel && <p style={{ color: 'red' }}>{errors.vehicleModel}</p>}
                    
                    <button type='submit' className='btn btn-primary mt-2'>Submit</button>
                </form>
            </div>
            <hr />
            <button onClick={() => setShowVehicles(!showVehicles)} className='btn btn-secondary mt-2'>
                {showVehicles ? 'Hide Added Vehicles' : 'Show Added Vehicles'}
            </button>
            {showVehicles && (
                <div>
                    <h2>Your Vehicles:</h2>
                    <table className='table table-hover table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Sr.No</th><th>Vehicle Type</th><th>Vehicle Number</th><th>Vehicle Registration Number</th>
                                <th>Vehicle Model</th>
                            </tr>
                        </thead>
                        <tbody>
                            {AddedVehiclesData.length > 0 && AddedVehiclesData.map((val, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{val.vehicleType}</td>
                                    <td>{val.vehicleNumber}</td>
                                    <td>{val.vehicleRegistrationNumber}</td>
                                    <td>{val.vehicleModel}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default VehiclesComp;
