import React, { useState, useEffect } from 'react';
import PositionsTable from './components/PositionsTable';
import AddPositionForm from './components/AddPositionForm';

export default function App() {
  const [positions, setPositions] = useState([]);
  const [currentPrices, setCurrentPrices] = useState({});

  useEffect(() => {
    // Load saved positions from localStorage
    const savedPositions = localStorage.getItem('positions');
    if (savedPositions) {
      setPositions(JSON.parse(savedPositions));
    }

    // Set up price refresh interval (every hour)
    const fetchPrices = async () => {
      try {
        const response = await fetch('/.netlify/functions/market-data');
        const data = await response.json();
        setCurrentPrices(data);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 3600000); // 1 hour

    return () => clearInterval(interval);
  }, []);

  const addPosition = (newPosition) => {
    const updatedPositions = [...positions, newPosition];
    setPositions(updatedPositions);
    localStorage.setItem('positions', JSON.stringify(updatedPositions));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-2xl text-white mb-6">BullionVault Position Tracker</h1>
      <div className="space-y-6">
        <AddPositionForm onAdd={addPosition} />
        <PositionsTable 
          positions={positions} 
          currentPrices={currentPrices} 
        />
      </div>
    </div>
  );
}
