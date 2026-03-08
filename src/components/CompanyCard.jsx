import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

const CompanyCard = ({ company }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="bg-blue-50 p-3 rounded-lg text-blue-600 font-bold">🏢</div>
      <div className="flex gap-2">
        <button className="text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
        <button className="text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
      </div>
    </div>
    
    <h3 className="font-bold text-lg">{company.name}</h3>
    <p className="text-sm text-gray-500 mb-4">{company.type}</p>
    
    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
      <div>📍 {company.location}</div>
      <div>👥 {company.employees}</div>
    </div>
    
    <div className="flex justify-between items-center border-t pt-4">
      <span className="text-xs text-gray-400">Avg ESG Score: <span className="font-bold text-gray-900">{company.score}/100</span></span>
      <button className="text-blue-600 text-sm font-semibold hover:underline">View Details</button>
    </div>
  </div>
);

export default CompanyCard;