import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', reports: 12, score: 72 },
  { name: 'Feb', reports: 15, score: 75 },
  { name: 'Mar', reports: 18, score: 78 },
  { name: 'Apr', reports: 22, score: 81 },
  { name: 'May', reports: 20, score: 83 },
  { name: 'Jun', reports: 26, score: 85 },
];

export const MonthlyReportsChart = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-lg font-semibold mb-4">Monthly Reports</h2>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="reports" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const ESGScoreTrendChart = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <h2 className="text-lg font-semibold mb-4">Average ESG Score Trend</h2>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[60, 100]} />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);