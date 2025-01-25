import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function PositionsTable({ positions, currentPrices }) {
  const calculateProfit = (position) => {
    const currentPrice = currentPrices[position.securityId]?.bid || position.purchasePrice;
    return ((currentPrice - position.purchasePrice) / position.purchasePrice * 100).toFixed(2);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-700">
            <th className="p-3 text-left text-gray-200">Purchase Date</th>
            <th className="p-3 text-left text-gray-200">Metal</th>
            <th className="p-3 text-left text-gray-200">Quantity</th>
            <th className="p-3 text-left text-gray-200">Purchase Price</th>
            <th className="p-3 text-left text-gray-200">Current Price</th>
            <th className="p-3 text-left text-gray-200">Profit</th>
            <th className="p-3 text-left text-gray-200">Trend</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position, index) => {
            const profit = calculateProfit(position);
            const currentPrice = currentPrices[position.securityId]?.bid || position.purchasePrice;
            const trend = currentPrice > position.purchasePrice ? 'up' : 'down';
            
            return (
              <tr key={index} className={`border-t border-gray-700 ${
                position.metal === "Gold" ? "bg-yellow-900/20" : "bg-gray-800"
              }`}>
                <td className="p-3 text-gray-300">{position.date}</td>
                <td className="p-3 text-gray-300">{position.metal} ({position.location})</td>
                <td className="p-3 text-gray-300">{position.quantity} kg</td>
                <td className="p-3 text-gray-300">{position.purchasePrice}€</td>
                <td className="p-3 text-gray-300">{currentPrice}€</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded ${
                    profit >= 5 ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'
                  }`}>
                    {profit}%
                  </span>
                </td>
                <td className="p-3 text-gray-300">
                  {trend === 'up' ? 
                    <TrendingUp className="text-green-500" size={20} /> : 
                    <TrendingDown className="text-red-500" size={20} />
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
