import axios from 'axios';
import React, { useState, useEffect } from 'react';
import EditRoadTwoToneIcon from '@mui/icons-material/EditRoadTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { useNavigate } from 'react-router-dom';

const AddEditTollTaxComp = () => {
    const [tollTaxData, setTollTaxData] = useState({
        vehicleType: '',
        vehicleSubType: '',
        tollTaxPerKM: '',
    });

    const [addedTollTaxData, setAddedTollTaxData] = useState([]);
    const [showTable, setShowTable] = useState(true);
    const [errors, setErrors] = useState({});

    const inputChangeHandler = (event) => {
        setTollTaxData({ ...tollTaxData, [event.target.name]: event.target.value });
    };

    const validate = () => {
        const errors = {};
        if (!tollTaxData.vehicleType) errors.vehicleType = 'Vehicle Type is required';
        if (!tollTaxData.vehicleSubType) errors.vehicleSubType = 'Vehicle Sub-Type is required';
        if (!tollTaxData.tollTaxPerKM) errors.tollTaxPerKM = 'Toll Tax Per KM is required';
        return errors;
    };

    const addTollTaxData = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        axios.post("http://localhost:8080/AddTollTax", tollTaxData).then(() => {
            window.alert("Toll Tax Added Successfully");
            fetchData();
        }).catch((error) => console.error("Error adding toll tax:", error));
    };

    const fetchData = async () => {
        await axios.get('http://localhost:8080/GetTollTax').then((res) => {
            setAddedTollTaxData(res.data);
        }).catch((error) => console.error("Error fetching toll tax data:", error));
    };

    const deleteRecord = (vehicleType) => {
        if (window.confirm(`Are you sure to delete toll tax for vehicle type: ${vehicleType}`)) {
            axios.delete(`http://localhost:8080/DeleteTollTaxData/${vehicleType}`).then(() => {
                window.alert("Delete successful");
                fetchData();
            }).catch((error) => console.error("Error deleting toll tax data:", error));
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
            <form onSubmit={addTollTaxData}>
                <label>Enter Vehicle Type:</label>
                <input type='text' name="vehicleType" onChange={inputChangeHandler} value={tollTaxData.vehicleType} />
                {errors.vehicleType && <div style={{ color: 'red' }}>{errors.vehicleType}</div>}
                <br /><br />
                <label>Enter Vehicle Sub-Type:</label>
                <input type='text' name="vehicleSubType" onChange={inputChangeHandler} value={tollTaxData.vehicleSubType} />
                {errors.vehicleSubType && <div style={{ color: 'red' }}>{errors.vehicleSubType}</div>}
                <br /><br />
                <label>Enter Toll Tax Per KM:</label>
                <input type='text' name="tollTaxPerKM" onChange={inputChangeHandler} value={tollTaxData.tollTaxPerKM} />
                {errors.tollTaxPerKM && <div style={{ color: 'red' }}>{errors.tollTaxPerKM}</div>}
                <br /><br />
                <button type='submit' className='btn btn-primary mt-2'>Submit</button>
            </form>

            <button onClick={toggleTableVisibility} className='btn btn-secondary mt-2'>
                {showTable ? 'Hide Table' : 'Show Table'}
            </button>

            {showTable && (
                <div>
                    <hr />
                    <h2>Toll Taxes As Per Vehicles :</h2>
                    <table className='table table-hover table-striped table-bordered'>
                        <thead>
                            <tr>
                                <th>Sr.No</th>
                                <th>Vehicle Type</th>
                                <th>Vehicle Sub-Type</th>
                                <th>Toll Tax Per KM (in Rupees)</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {addedTollTaxData.length > 0 && addedTollTaxData.map((val, index) => (
                                <tr key={val.vehicleType}>
                                    <td>{index + 1}</td>
                                    <td>{val.vehicleType}</td>
                                    <td>{val.vehicleSubType}</td>
                                    <td>{val.tollTaxPerKM}</td>
                                    <td>
                                        <button
                                            type='button'
                                            onClick={() => deleteRecord(val.vehicleType)}
                                            className='btn btn-outline-danger btn-sm'
                                        >
                                            <DeleteForeverTwoToneIcon />
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

export default AddEditTollTaxComp;
