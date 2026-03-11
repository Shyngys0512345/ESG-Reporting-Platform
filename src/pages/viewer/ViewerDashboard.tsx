import React from 'react';
import { Building2, TrendingUp, Award, AlertTriangle } from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { ScoreCard } from '../../components/ui/ScoreCard';

const scoreDistribution = [
  { name: 'Excellent (90-100)', value: 8, color: '#10b981' },
  { name: 'Good (80-89)', value: 15, color: '#3b82f6' },
  { name: 'Average (70-79)', value: 12, color: '#f97316' },
  { name: 'Below Average (<70)', value: 7, color: '#ef4444' },
];

const industryComparison = [
  { industry: 'Technology', avg: 85, count: 12 },
  { industry: 'Energy', avg: 88, count: 8 },
  { industry: 'Finance', avg: 82, count: 10 },
  { industry: 'Manufacturing', avg: 76, count: 9 },
  { industry: 'Retail', avg: 79, count: 6 },
];

const topCompanies = [
  { name: 'Green Energy Ltd.', score: 92, industry: 'Renewable Energy' },
  { name: 'Tech Innovators', score: 91, industry: 'Technology' },
  { name: 'EcoManufacturing', score: 89, industry: 'Manufacturing' },
  { name: 'TechCorp Inc.', score: 87, industry: 'Technology' },
  { name: 'Finance Group', score: 85, industry: 'Financial Services' },
];

export function ViewerDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Viewer Dashboard</h1>
        <p className="text-gray-600">Comprehensive ESG analytics and insights (Read-only access)</p>
      </div>

      {/* Platform Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Platform Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScoreCard
            title="Platform Avg - Environmental"
            score={82}
            maxScore={100}
            category="environmental"
            subtitle="All companies"
          />
          <ScoreCard
            title="Platform Avg - Social"
            score={85}
            maxScore={100}
            category="social"
            subtitle="All companies"
          />
          <ScoreCard
            title="Platform Avg - Governance"
            score={86}
            maxScore={100}
            category="governance"
            subtitle="All companies"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Score Distribution */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Score Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={scoreDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }: { name?: string; percent?: number }) => `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {scoreDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Industry Comparison */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Industry Average Scores</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={industryComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="industry" stroke="#666" tick={{ fontSize: 11 }} angle={-15} textAnchor="end" height={80} />
              <YAxis domain={[60, 100]} stroke="#666" />
              <Tooltip />
              <Bar dataKey="avg" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Companies */}
      <div className="bg-white rounded-xl border border-gray-200 mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-500" />
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Companies</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {topCompanies.map((company, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <div className="flex items-center gap-3 flex-1">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">{company.name}</p>
                    <p className="text-sm text-gray-600">{company.industry}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{company.score}</p>
                  <p className="text-xs text-gray-500">ESG Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Positive Trend</h3>
              <p className="text-sm text-green-800">
                Platform average ESG score has increased by 5.2% over the past quarter. Renewable energy
                adoption is the primary driver.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-orange-900 mb-2">Area for Improvement</h3>
              <p className="text-sm text-orange-800">
                Social scores show the slowest growth. Companies should focus on diversity, equity, and
                inclusion initiatives.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Read-Only Notice */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-2">Read-Only Access</h3>
        <p className="text-sm text-gray-600">
          As a Viewer, you have read-only access to reports and analytics. You cannot export or download
          reports. To request additional permissions, please contact your administrator.
        </p>
      </div>
    </div>
  );
}