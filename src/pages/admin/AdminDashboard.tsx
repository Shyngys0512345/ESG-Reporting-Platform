import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { StatCard } from '../../components/ui/StatCard';
import { ScoreCard } from '../../components/ui/ScoreCard';
import { 
  Users, 
  Building2, 
  FileText, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

const monthlyData = [
  { month: 'Jan', reports: 12, score: 72 },
  { month: 'Feb', reports: 15, score: 75 },
  { month: 'Mar', reports: 18, score: 78 },
  { month: 'Apr', reports: 22, score: 81 },
  { month: 'May', reports: 20, score: 83 },
  { month: 'Jun', reports: 25, score: 85 },
];

const recentReports = [
  { id: 1, company: 'TechCorp Inc.', status: 'submitted', date: '2026-03-02', score: 87 },
  { id: 2, company: 'Green Energy Ltd.', status: 'in_progress', date: '2026-03-01', score: null },
  { id: 3, company: 'Finance Group', status: 'submitted', date: '2026-02-28', score: 92 },
  { id: 4, company: 'Manufacturing Co.', status: 'draft', date: '2026-02-27', score: null },
  { id: 5, company: 'Retail Chain', status: 'submitted', date: '2026-02-25', score: 78 },
];

export function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Administrator Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.name}. Here's your platform overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value="156"
          icon={Users}
          trend={{ value: '+12%', isPositive: true }}
          color="blue"
        />
        <StatCard
          title="Active Companies"
          value="42"
          icon={Building2}
          trend={{ value: '+5', isPositive: true }}
          color="green"
        />
        <StatCard
          title="Total Reports"
          value="328"
          icon={FileText}
          trend={{ value: '+18%', isPositive: true }}
          color="orange"
        />
        <StatCard
          title="Avg ESG Score"
          value="84.2"
          icon={TrendingUp}
          trend={{ value: '+3.2', isPositive: true }}
          color="gray"
        />
      </div>

      {/* ESG Scores Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ScoreCard
          title="Environmental"
          score={82}
          maxScore={100}
          category="environmental"
          subtitle="Platform Average"
        />
        <ScoreCard
          title="Social"
          score={85}
          maxScore={100}
          category="social"
          subtitle="Platform Average"
        />
        <ScoreCard
          title="Governance"
          score={86}
          maxScore={100}
          category="governance"
          subtitle="Platform Average"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Reports */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Reports</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Bar dataKey="reports" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Score Trends */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Average ESG Score Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" domain={[60, 100]} />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Reports Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ESG Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building2 className="w-5 h-5 text-gray-400 mr-3" />
                      <span className="font-medium text-gray-900">{report.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                      report.status === 'submitted' 
                        ? 'bg-green-100 text-green-700' 
                        : report.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {report.status === 'submitted' && <CheckCircle className="w-3 h-3" />}
                      {report.status === 'in_progress' && <Clock className="w-3 h-3" />}
                      {report.status === 'draft' && <AlertCircle className="w-3 h-3" />}
                      {report.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {report.score ? (
                      <span className="font-semibold text-gray-900">{report.score}/100</span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
