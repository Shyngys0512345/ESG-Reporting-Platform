import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';
import { ScoreCard } from '../../components/ui/ScoreCard';
import { 
  FileText, 
  Plus, 
  TrendingUp, 
  Clock, 
  Lightbulb,
  ArrowUpRight,
  Calendar
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const radarData = [
  { category: 'Energy Efficiency', current: 85, industry: 78 },
  { category: 'Waste Management', current: 78, industry: 72 },
  { category: 'Water Usage', current: 82, industry: 75 },
  { category: 'Emissions', current: 88, industry: 80 },
  { category: 'Biodiversity', current: 75, industry: 70 },
];

const trendData = [
  { period: 'Q1 2025', environmental: 75, social: 80, governance: 82 },
  { period: 'Q2 2025', environmental: 78, social: 82, governance: 84 },
  { period: 'Q3 2025', environmental: 80, social: 83, governance: 85 },
  { period: 'Q4 2025', environmental: 82, social: 85, governance: 86 },
  { period: 'Q1 2026', environmental: 85, social: 88, governance: 89 },
];

const recommendations = [
  {
    id: 1,
    title: 'Increase Renewable Energy Usage',
    priority: 'high',
    category: 'Environmental',
    description: 'Consider transitioning to 100% renewable energy sources to improve your environmental score.',
  },
  {
    id: 2,
    title: 'Enhance Employee Training Programs',
    priority: 'medium',
    category: 'Social',
    description: 'Implement comprehensive diversity and inclusion training for all employees.',
  },
  {
    id: 3,
    title: 'Strengthen Board Independence',
    priority: 'medium',
    category: 'Governance',
    description: 'Increase the proportion of independent directors on your board to 50% or higher.',
  },
];

export function RespondentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const priorityColors = {
    high: 'bg-red-100 text-red-700 border-red-200',
    medium: 'bg-orange-100 text-orange-700 border-orange-200',
    low: 'bg-blue-100 text-blue-700 border-blue-200',
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, {user?.name} • {user?.companyName}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => navigate('/respondent/report/new')}
          className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-6 hover:shadow-lg transition-shadow text-left"
        >
          <Plus className="w-8 h-8 mb-3" />
          <h3 className="text-lg font-semibold mb-1">Start New Report</h3>
          <p className="text-blue-100 text-sm">Create a new ESG assessment</p>
        </button>

        <button
          onClick={() => navigate('/respondent/reports')}
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow text-left"
        >
          <FileText className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">My Reports</h3>
          <p className="text-gray-600 text-sm">View and manage reports</p>
        </button>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
          <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Latest Score</h3>
          <p className="text-3xl font-bold text-green-600">87/100</p>
        </div>
      </div>

      {/* Current ESG Scores */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Current ESG Performance</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScoreCard
            title="Environmental"
            score={85}
            maxScore={100}
            category="environmental"
            subtitle="Q1 2026"
          />
          <ScoreCard
            title="Social"
            score={88}
            maxScore={100}
            category="social"
            subtitle="Q1 2026"
          />
          <ScoreCard
            title="Governance"
            score={89}
            maxScore={100}
            category="governance"
            subtitle="Q1 2026"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Radar Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Performance vs Industry Average
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e5e7eb" />
              {/* Recharts typings aren't fully compatible with React 19; suppress error */}
              {/* @ts-ignore TS2786 */}
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar
                name="Your Company"
                dataKey="current"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.5}
              />
              <Radar
                name="Industry Avg"
                dataKey="industry"
                stroke="#9ca3af"
                fill="#9ca3af"
                fillOpacity={0.3}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">ESG Score Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="period" stroke="#666" tick={{ fontSize: 11 }} />
              <YAxis domain={[60, 100]} stroke="#666" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="environmental"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: '#10b981' }}
              />
              <Line
                type="monotone"
                dataKey="social"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ fill: '#f97316' }}
              />
              <Line
                type="monotone"
                dataKey="governance"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-900">AI-Generated Recommendations</h2>
          </div>
          <span className="text-sm text-gray-500">Based on your latest report</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div key={rec.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors[rec.priority as keyof typeof priorityColors]}`}>
                  {rec.priority.toUpperCase()} PRIORITY
                </span>
                <span className="text-xs font-medium text-gray-500">{rec.category}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{rec.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{rec.description}</p>
              <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                Learn more
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Q1 2026 Report Submitted</p>
              <p className="text-sm text-gray-600">March 2, 2026</p>
            </div>
            <span className="text-sm font-medium text-green-600">Score: 87/100</span>
          </div>
          <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
            <Clock className="w-5 h-5 text-orange-600" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">Q4 2025 Draft Saved</p>
              <p className="text-sm text-gray-600">December 28, 2025</p>
            </div>
            <span className="text-sm text-gray-500">In Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}