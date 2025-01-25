import React, { useState } from 'react';

export default function AddPositionForm({ onAdd }) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    metal: 'Gold',
    location: 'London',
    quantity: '',
    purchasePrice: '',
    securityId: 'AUXLN' // Default for Gold London
  });

  const handleChange = (e) => {
    let securityId = formData.securityId;
    
    // Update securityId based on metal and location
    if (e.target.name === 'metal' || e.target.name === 'location') {
      const metal = e.target.name === 'metal' ? e.target.value : formData.metal;
      const location = e.target.name === 'location' ? e.target.value : formData.location;
      
      securityId = metal === 'Gold' ? 'AUXLN' : 
                   metal === 'Silver' ? 'AGXLN' : 'PTXLN';
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      securityId
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      ...formData,
      quantity: '',
      purchasePrice: ''
    });
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl text-white mb-4">Add New Position</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-300 mb-2">Purchase Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Metal</label>
            <select
              name="metal"
              value={formData.metal}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            >
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Platinum">Platinum</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            >
              <option value="London">London</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Quantity (kg)</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              step="0.001"
              min="0"
              className="w-full bg-gray-700 text-white p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Purchase Price (€)</label>
            <input
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
              min="0"
              className="w-full bg-gray-700 text-white p-2 rounded"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Position
        </button>
      </form>
    </div>
  );
}
