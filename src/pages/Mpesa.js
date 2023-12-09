import React, { useState } from 'react';
import axios from 'axios';

const PaymentCard = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const handlePayment = async () => {
    try {
      if (phoneNumber) {
        const response = await initiateSTKPush(phoneNumber);
        // Handle the API response
        if (response.success) {
          setPaymentStatus('Payment initiated successfully');
        } else {
          setPaymentStatus('Failed to initiate payment');
        }
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      setPaymentStatus('An error occurred while initiating payment');
    }
  };

  // Function to initiate STK push
  const initiateSTKPush = async (phoneNumber) => {
    try {
      const response = await axios.post(
        'https://api.safaricom.com/payments/v1/processstkpush',
        {
          phoneNumber: phoneNumber, // Replace with actual parameter names
          amount: 100, // Replace with the payment amount
          // Add other required parameters for STK push
        },
        {
          headers: {
            Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with your access token
            'Content-Type': 'application/json',
          },
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <div className="payment-card">
      <input
        type="text"
        value={phoneNumber}
        placeholder="Enter your phone number"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handlePayment}>Pay</button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

export default PaymentCard;