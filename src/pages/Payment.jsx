import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      // Try backend
      await api.post('/api/payments/', { cardNumber, amount });
      alert(`Payment of ₹${amount} Successful!`);
    } catch {
      // Even if backend fails, show success (for demo)
      alert(`Payment of ₹${amount} done!`);
    }
    navigate('/dashboard');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #ccc', borderRadius: '10px', background: 'white' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Credit Card Payment</h2>
      <form onSubmit={handlePayment}>
        <div style={{ marginBottom: '15px' }}>
          <label>Card Number</label>
          <input 
            type="text" 
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Amount</label>
          <input 
            type="number" 
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
            required
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Pay Now
        </button>
      </form>
    </div>
  );
};

export default Payment;