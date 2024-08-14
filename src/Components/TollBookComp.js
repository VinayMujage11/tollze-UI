import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TollBookComp = () => {
    const nav = useNavigate();
    const [tollBookData, settollBookData] = useState({
        userId: '',
        source: '',
        destination: '',
        dateofjourney: '',
        vehicleType: '',
        vehicleNumber: '',
        vehicleRegistrationNumber: '',
        paymentMode: ''
    });

    const [sources, setSources] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [vehicleNumbers, setVehicleNumbers] = useState([]);
    const [filteredVehicleNumbers, setFilteredVehicleNumbers] = useState([]);
    const [errors, setErrors] = useState({});

    const currentUser = JSON.parse(localStorage.getItem('token'));
    tollBookData.userId = currentUser.userId;

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (tollBookData.vehicleNumber && vehicleNumbers.length > 0) {
            const selectedVehicle = vehicleNumbers.find(v => v.vehicleNumber === tollBookData.vehicleNumber);
            if (selectedVehicle) {
                settollBookData(prevData => ({
                    ...prevData,
                    vehicleRegistrationNumber: selectedVehicle.vehicleRegistrationNumber || ''
                }));
            } else {
                settollBookData(prevData => ({
                    ...prevData,
                    vehicleRegistrationNumber: ''
                }));
            }
        }
    }, [tollBookData.vehicleNumber, vehicleNumbers]);

    useEffect(() => {
        if (tollBookData.vehicleType) {
            const filtered = vehicleNumbers.filter(v => v.vehicleType === tollBookData.vehicleType);
            setFilteredVehicleNumbers(filtered);
        } else {
            setFilteredVehicleNumbers(vehicleNumbers);
        }
    }, [tollBookData.vehicleType, vehicleNumbers]);

    const fetchData = async () => {
        try {
            const vehicleTypesResponse = await axios.get("http://localhost:8080/GetVehicleTypes");
            setVehicleTypes(vehicleTypesResponse.data);

            const vehicleNumbersResponse = await axios.get(`http://localhost:8080/AddedVehicle/${tollBookData.userId}`);
            setVehicleNumbers(vehicleNumbersResponse.data);

            const sourcesResponse = await axios.get("http://localhost:8080/GetSourcesAndDestination");
            setSources(sourcesResponse.data);

            console.log("Fetched Vehicle Types:", vehicleTypesResponse.data);
            console.log("Fetched Vehicle Numbers:", vehicleNumbersResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!tollBookData.source) newErrors.source = "Source is required";
        if (!tollBookData.destination) newErrors.destination = "Destination is required";
        if (!tollBookData.dateofjourney) newErrors.dateofjourney = "Date of journey is required";
        if (!tollBookData.vehicleType) newErrors.vehicleType = "Vehicle type is required";
        if (!tollBookData.vehicleNumber) newErrors.vehicleNumber = "Vehicle number is required";
        if (!tollBookData.vehicleRegistrationNumber) newErrors.vehicleRegistrationNumber = "Vehicle registration number is required";
        if (!tollBookData.paymentMode) newErrors.paymentMode = "Payment mode is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const addTollBookData = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const res = await axios.post("http://localhost:8080/BookToll", tollBookData);
                localStorage.setItem('token2', JSON.stringify(res.data));
                nav('/Payment');
            } catch (error) {
                console.error("Error booking toll:", error);
            }
        }
    };

    const inputChangeHandler = (event) => {
        settollBookData({ ...tollBookData, [event.target.name]: event.target.value });
    };

    return (
        <div>
            <h2>Book Toll</h2>
            <form onSubmit={addTollBookData}>
                <label>User-Id:</label>
                <input type='text' name="userId" value={tollBookData.userId} readOnly />
                
                <label>Source:</label>
                <select id="dropdown" name="source" value={tollBookData.source} onChange={inputChangeHandler}>
                    <option value="">Select an Option</option>
                    {sources.length > 0 && sources.map((val, index) => (
                        <option key={index + 1} value={val.source}>{val.source}</option>
                    ))}
                </select>
                {/* <input type='text' name="source" onChange={inputChangeHandler} value={tollBookData.source} /> */}
                {errors.source && <p className="error">{errors.source}</p>}
                
                <label>Destination:</label>
                <select id="dropdown" name="destination" value={tollBookData.destination} onChange={inputChangeHandler}>
                    <option value="">Select an Option</option>
                    {sources.length > 0 && sources.map((val, index) => (
                        <option key={index + 1} value={val.destination}>{val.destination}</option>
                    ))}
                </select>
                {/* <input type='text' name="destination" onChange={inputChangeHandler} value={tollBookData.destination} /> */}
                {errors.destination && <p className="error">{errors.destination}</p>}
                
                <label>Date Of Journey:</label>
                <input type='date' name="dateofjourney" onChange={inputChangeHandler} value={tollBookData.dateofjourney} />
                {errors.dateofjourney && <p className="error">{errors.dateofjourney}</p>}
                
                <label>Vehicle Type:</label>
                <select id="dropdown" name="vehicleType" value={tollBookData.vehicleType} onChange={inputChangeHandler}>
                    <option value="">Select an Option</option>
                    {vehicleTypes.length > 0 && vehicleTypes.map((val, index) => (
                        <option key={index + 1} value={val.vehicleType}>{val.vehicleType}</option>
                    ))}
                </select>
                {errors.vehicleType && <p className="error">{errors.vehicleType}</p>}
                
                <label>Vehicle Number:</label>
                <select id="dropdown" name="vehicleNumber" value={tollBookData.vehicleNumber} onChange={inputChangeHandler}>
                    <option value="">Select an Option</option>
                    {filteredVehicleNumbers.length > 0 && filteredVehicleNumbers.map((val, index) => (
                        <option key={index + 1} value={val.vehicleNumber}>{val.vehicleNumber}</option>
                    ))}
                </select>
                {errors.vehicleNumber && <p className="error">{errors.vehicleNumber}</p>}
                
                <label>Vehicle Registration Number:</label>
                <input type='text' name="vehicleRegistrationNumber" value={tollBookData.vehicleRegistrationNumber} readOnly />
                {errors.vehicleRegistrationNumber && <p className="error">{errors.vehicleRegistrationNumber}</p>}
                
                <label>Payment Mode:</label>
                <select id="dropdown" name="paymentMode" value={tollBookData.paymentMode} onChange={inputChangeHandler}>
                    <option value="">Select an Option</option>
                    <option value="Credit/DebitCard">Credit/Debit Card</option>
                    <option value="NetBanking">Net Banking</option>
                    <option value="DigitalWalletUPI">Digital Wallet (UPI)</option>
                    <option value="Tollz-EWallet">Tollz-E Wallet</option>
                </select>
                {/* <input type='text' name="paymentMode" onChange={inputChangeHandler} value={tollBookData.paymentMode} /> */}
                {errors.paymentMode && <p className="error">{errors.paymentMode}</p>}
                
                <button type='submit' className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
    );
};

export default TollBookComp;
