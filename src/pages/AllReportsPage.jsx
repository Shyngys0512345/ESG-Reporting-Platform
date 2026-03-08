import React from 'react';
import { Eye, Download, Filter } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

const reports = [
  { company: 'TechCorp Inc.', period: 'Q1 2026', submittedBy: 'John R.', status: 'submitted', score: 87 },
  { company: 'Green Energy Ltd.', period: 'Q1 2026', submittedBy: 'Sarah M.', status: 'submitted', score: 92 },
  { company: 'Finance Group', period: 'Q1 2026', submittedBy: 'Alex J.', status: 'locked', score: 85 },
];

const AllReportsPage = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PageHeader title="All Reports" description="View and manage all ESG reports across the platform" />
      
      {/* Панель инструментов */}
      <div className="flex justify-between mb-6">
        <input className="border p-2 rounded-lg w-1/3" placeholder="Search by company or respondent..." />
        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-50">
          <Filter size={16} /> More Filters
        </button>
      </div>

      {/* Таблица */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
            <tr>
              <th className="p-4">Company</th>
              <th className="p-4">Period</th>
              <th className="p-4">Status</th>
              <th className="p-4">Score</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {reports.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 font-medium">{r.company}</td>
                <td className="p-4 text-gray-600">{r.period}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">{r.status}</span>
                </td>
                <td className="p-4 font-bold">{r.score}</td>
                <td className="p-4 text-right flex justify-end gap-3">
                  <button className="text-gray-400 hover:text-blue-600"><Eye size={18}/></button>
                  <button className="text-gray-400 hover:text-green-600"><Download size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReportsPage;