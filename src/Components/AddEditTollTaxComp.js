import axios from 'axios';
import React, { useState,useEffect } from 'react'
import EditRoadTwoToneIcon from '@mui/icons-material/EditRoadTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { useNavigate } from 'react-router-dom';

const AddEditTollTaxComp = () => {
    //const nav = useNavigate();
    const [tollTaxData,setTolltaxData] = useState({
      vehicleType:'',
      vehicleSubType:'',
      tollTaxPerKM:'',
        
    });



    const inputChangeHandler = (event)=>{
        setTolltaxData({...tollTaxData,[event.target.name]:event.target.value})
    }

    const addTollTaxData = (event)=>{
    event.preventDefault();
    axios.post("http://localhost:8080/AddTollTax",tollTaxData).then(()=>{
        window.alert("Toll Tax Added Successfully");
        //nav("/Login");
    }).catch((error)=>{})
    }

    const [AddedTollTaxData,setAddedTollTaxData] = useState([]);

  useEffect(()=>{
      fetchData();
  },[addTollTaxData]);

  const fetchData = async ()=>{
     await axios.get(`http://localhost:8080/GetTollTax`).then((res)=>{
          //console.log(userId);
          //localStorage.setItem('token3',JSON.stringify(res.data));
          setAddedTollTaxData(res.data);
      }).catch((error)=>{})
  }

  const deleteRecord = (vehicleType)=>{
    if(window.confirm(`Are you sure to delete product with id :${vehicleType}`)){
        axios.delete(`http://localhost:8080/DeleteTollTaxData/${vehicleType}`).then(()=>{
            window.alert(" delete successfully");
            fetchData();
          }).catch((error)=>{})
    }
  
    }



    return (
        <div>
        <div>
            
            <form onSubmit={addTollTaxData}>
                {/* <lable>User-Id:</lable>
                <input type='text' name="userId"  value={vehicleData.userId} readOnly/> <br/><br/> */}
                <lable>Enter Vehicle Type:</lable>
                <input type='text' name="vehicleType" onChange={inputChangeHandler} value={tollTaxData.vehicleType} /> <br/><br/>
                <lable>Enter Vehicle Sub-Type:</lable>
                <input type='text' name="vehicleSubType" onChange={inputChangeHandler} value={tollTaxData.vehicleSubType} /> <br/><br/>
                <lable>Enter Toll Tax Per KM:</lable>
                <input type='text' name="tollTaxPerKM" onChange={inputChangeHandler} value={tollTaxData.tollTaxPerKM} /> <br/><br/>
               <button type='submit' className='btn btn-primary mt-2'>Submit</button>
            </form>
        </div>
        <hr></hr>
        <div>
            <h2>Toll Taxes As Per Vehicles :</h2>

            <table className='table table-hover table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Sr.No</th><th>Vehicle Type</th><th>Vehicle Sub-Type</th><th>Toll Tax Per KM (in Rupees)</th>
                        <th>Edit</th><th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    AddedTollTaxData.length > 0  &&   AddedTollTaxData.map((val,index)=>{
                            return <tr>
                                <td>{index+1}</td>
                                <td>{val.vehicleType}</td>
                                <td>{val.vehicleSubType}</td>
                                <td>{val.tollTaxPerKM}</td>
                                <td><EditRoadTwoToneIcon></EditRoadTwoToneIcon></td>
                                <td><button type='button' onClick={()=>deleteRecord(val.vehicleType)} className='btn btn-outline-danger btn-sm'>
                                        <DeleteForeverTwoToneIcon></DeleteForeverTwoToneIcon>
                                    </button></td>
                                {/* <td>{val.journeydate}</td>
                                <td>{val.dateOfbooking}</td>
                                <td>{val.vehicleNumber}</td>
                                <td>{val.amountToBePaid}</td>
                                <td>{val.paymentStatus}</td> */}
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
        </div>

    )
}

export default AddEditTollTaxComp;
