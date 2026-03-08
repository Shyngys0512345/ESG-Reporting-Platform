import React from 'react';

const StatCard = ({ title, value, change }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <p className="text-gray-500 text-sm uppercase">{title}</p>
      <div className="flex items-end justify-between mt-2">
        <h3 className="text-3xl font-bold">{value}</h3>
        <span className="text-green-500 text-sm font-medium">{change}</span>
      </div>
    </div>
  );
};

export default StatCard;