import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [cards, setCards] = useState([]);
  const [balance, setBalance] = useState(50000);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await api.get('/api/cards/');
        
        if (response.data && response.data.length > 0) {
          setCards(response.data);
        } else {
          // Dummy data if API returns empty
          setCards([
            { id: 1, masked: '**** **** **** 1234', holder: 'Niranjana S', expiry: '12/28', type: 'Visa' },
            { id: 2, masked: '**** **** **** 5678', holder: 'Niranjana S', expiry: '10/27', type: 'Mastercard' },
          ]);
        }
      } catch (error) {
        console.log('Backend not connected, using dummy data');
        // Dummy data if backend is down
        setCards([
          { id: 1, masked: '**** **** **** 1234', holder: 'Niranjana S', expiry: '12/28', type: 'Visa' },
          { id: 2, masked: '**** **** **** 5678', holder: 'Niranjana S', expiry: '10/27', type: 'Mastercard' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={{ padding: '24px', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Header */}
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>My Dashboard</h1>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>Manage your credit cards</p>

        {/* Balance Card */}
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '30px', borderRadius: '15px', marginBottom: '24px' }}>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>Total Available Balance</p>
          <h1 style={{ fontSize: '42px', fontWeight: 'bold', margin: '10px 0' }}>
            Balance: ₹{balance.toLocaleString('en-IN')}
          </h1>
          <p style={{ fontSize: '14px', opacity: 0.9 }}>Across {cards.length} cards</p>
        </div>

        {/* Cards Grid */}
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>My Cards</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          {cards.map((card) => (
            <div 
              key={card.id} 
              style={{ 
                background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)', 
                color: 'white', 
                padding: '24px', 
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 10px', borderRadius: '4px', fontSize: '12px' }}>
                  {card.type || 'Visa'}
                </span>
                <span style={{ fontSize: '12px', opacity: 0.8 }}>{card.expiry}</span>
              </div>
              
              <p style={{ fontSize: '20px', letterSpacing: '2px', marginBottom: '20px', fontFamily: 'monospace' }}>
                {card.masked}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <p style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase' }}>Card Holder</p>
                  <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{card.holder}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '10px', opacity: 0.7, textTransform: 'uppercase' }}>Expiry</p>
                  <p style={{ fontSize: '14px' }}>{card.expiry}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cards.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '40px', padding: '40px', background: 'white', borderRadius: '12px' }}>
            <p>No cards yet. Add a card!</p>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => navigate('/add-card')} 
            style={{ padding: '12px 24px', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            + Add New Card
          </button>
          <button 
            onClick={() => navigate('/payment')} 
            style={{ padding: '12px 24px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
}