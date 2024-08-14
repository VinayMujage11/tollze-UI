import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentAccountComp = () => {
    const nav = useNavigate();
    const [paymentDetails, setPaymentDetails] = useState({
        contact_Number: '',
        userId: '',
        accountNumber: '',
        bankName: '',
        accountHolderName: '',
        ifscCode: '',
        branchName: '',
        upiId: '',
        credit_Card_Number: '',
        credit_Pin: '',
        debit_Card_Number: '',
        debit_pin: '',
        tollzeWallet: '',
    });

    const [amount, setAmount] = useState('');
    const [formToShow, setFormToShow] = useState(''); // State to control which form is shown

    const currentUser = JSON.parse(localStorage.getItem('token'));
    paymentDetails.userId = currentUser.userId;
    paymentDetails.contact_Number = currentUser.contact_Number;

    const inputChangeHandler = (event) => {
        setPaymentDetails({ ...paymentDetails, [event.target.name]: event.target.value });
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/GetPaymentMode/${currentUser.userId}`)
            .then((res) => {
                setPaymentDetails(res.data);
            })
            .catch((error) => {
                console.error("Error fetching payment details:", error);
            });
    }, [currentUser.userId]);

    const addNetBankingData = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8080/AddNetBankingData", paymentDetails);
            // nav('/paymentModes');
        } catch (error) {
            console.error("Error adding net banking data:", error);
        }
    };

    const addAmount = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:8080/AddAmount/${amount}`, paymentDetails);
            // nav('/paymentModes');
        } catch (error) {
            console.error("Error adding amount:", error);
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => setFormToShow('netBanking')} className='btn btn-primary mt-2'>Add Net Banking Details</button>{'  '}
                <button onClick={() => setFormToShow('creditCard')} className='btn btn-primary mt-2'>Add Credit Card Details</button>{'  '}
                <button onClick={() => setFormToShow('debitCard')} className='btn btn-primary mt-2'>Add Debit Card Details</button>{'  '}
                <button onClick={() => setFormToShow('upi')} className='btn btn-primary mt-2'>Add UPI ID</button>{'  '}
                <button onClick={() => setFormToShow('tollzeWallet')} className='btn btn-primary mt-2'>Tollz-E Wallet</button>{'  '}
            </div>

            
            <div style={{ display: formToShow === 'netBanking' ? 'block' : 'none' }}>
                <h2>Add Net Banking Details:</h2>
                <form onSubmit={addNetBankingData}>
                    <label>Account Holder Name:</label>
                    <input type='text' name="accountHolderName" onChange={inputChangeHandler} value={paymentDetails.accountHolderName} />
                    <label>Bank Name:</label>
                    <input type='text' name="bankName" onChange={inputChangeHandler} value={paymentDetails.bankName} />
                    <label>Account Number:</label>
                    <input type='text' name="accountNumber" onChange={inputChangeHandler} value={paymentDetails.accountNumber} />
                    <label>IFSC Code:</label>
                    <input type='text' name="ifscCode" onChange={inputChangeHandler} value={paymentDetails.ifscCode} />
                    <label>Branch Name:</label>
                    <input type='text' name="branchName" onChange={inputChangeHandler} value={paymentDetails.branchName} />
                    <button type='submit' className='btn btn-primary mt-2'>Submit</button>
                </form>
            </div>

            <div style={{ display: formToShow === 'creditCard' ? 'block' : 'none' }}>
                <h2>Add Credit Card Details:</h2>
                <form onSubmit={addNetBankingData}>
                    <label>Credit Card Number:</label>
                    <input type='text' name="credit_Card_Number" onChange={inputChangeHandler} value={paymentDetails.credit_Card_Number} />
                    <label>Credit Pin:</label>
                    <input type='password' name="credit_Pin" onChange={inputChangeHandler} value={paymentDetails.credit_Pin} />
                    <button type='submit' className='btn btn-primary mt-2'>Submit</button>
                </form>
            </div>

            <div style={{ display: formToShow === 'debitCard' ? 'block' : 'none' }}>
                <h2>Add Debit Card Details:</h2>
                <form onSubmit={addNetBankingData}>
                    <label>Debit Card Number:</label>
                    <input type='text' name="debit_Card_Number" onChange={inputChangeHandler} value={paymentDetails.debit_Card_Number} />
                    <label>Debit Pin:</label>
                    <input type='password' name="debit_pin" onChange={inputChangeHandler} value={paymentDetails.debit_pin} />
                    <button type='submit' className='btn btn-primary mt-2'>Submit</button>
                </form>
            </div>

            <div style={{ display: formToShow === 'upi' ? 'block' : 'none' }}>
                <h2>Add UPI ID:</h2>
                <form onSubmit={addNetBankingData}>
                    <label>UPI ID:</label>
                    <input type='text' name="upiId" onChange={inputChangeHandler} value={paymentDetails.upiId} />
                    <label>UPI Pin:</label>
                    <input type='password' />
                    <button type='submit' className='btn btn-primary mt-2'>Submit</button>
                </form>
            </div>

            <div style={{ display: formToShow === 'tollzeWallet' ? 'block' : 'none' }}>
                <h2>Tollz-E Wallet:</h2>
                <form onSubmit={addAmount}>
                    <label>Enter Amount To Add:</label>
                    <input type='text' value={amount} onChange={handleAmountChange} />
                    <button type='submit' className='btn btn-primary mt-2'>Add Amount</button>
                </form>
            </div>
        </div>
    );
};

export default PaymentAccountComp;
