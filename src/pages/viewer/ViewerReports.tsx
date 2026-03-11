import React, { useState } from 'react';
import { Search, Building2, Calendar, Eye } from 'lucide-react';

interface Report {
  id: string;
  company: string;
  period: string;
  submittedDate: string;
  eScore: number;
  sScore: number;
  gScore: number;
  totalScore: number;
  industry: string;
  region: string;
}

const mockReports: Report[] = [
  {
    id: 'r1',
    company: 'TechCorp Inc.',
    period: 'Q1 2026',
    submittedDate: '2026-03-02',
    eScore: 85,
    sScore: 88,
    gScore: 89,
    totalScore: 87,
    industry: 'Technology',
    region: 'North America',
  },
  {
    id: 'r2',
    company: 'Green Energy Ltd.',
    period: 'Q1 2026',
    submittedDate: '2026-03-01',
    eScore: 95,
    sScore: 90,
    gScore: 91,
    totalScore: 92,
    industry: 'Renewable Energy',
    region: 'Europe',
  },
  {
    id: 'r3',
    company: 'Finance Group',
    period: 'Q1 2026',
    submittedDate: '2026-02-28',
    eScore: 82,
    sScore: 87,
    gScore: 86,
    totalScore: 85,
    industry: 'Financial Services',
    region: 'Asia Pacific',
  },
  {
    id: 'r4',
    company: 'Manufacturing Co.',
    period: 'Q4 2025',
    submittedDate: '2026-02-15',
    eScore: 75,
    sScore: 78,
    gScore: 81,
    totalScore: 78,
    industry: 'Manufacturing',
    region: 'Europe',
  },
  {
    id: 'r5',
    company: 'Retail Chain',
    period: 'Q4 2025',
    submittedDate: '2026-02-10',
    eScore: 78,
    sScore: 80,
    gScore: 79,
    totalScore: 79,
    industry: 'Retail',
    region: 'North America',
  },
];

export function ViewerReports() {
  const [reports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || report.industry === industryFilter;
    const matchesRegion = regionFilter === 'all' || report.region === regionFilter;
    return matchesSearch && matchesIndustry && matchesRegion;
  });

  const industries = Array.from(new Set(reports.map(r => r.industry)));
  const regions = Array.from(new Set(reports.map(r => r.region)));

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Reports</h1>
        <p className="text-gray-600">Browse and view ESG reports (Read-only access)</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by company name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>

          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Reports</p>
          <p className="text-2xl font-bold text-gray-900">{filteredReports.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-600 mb-1">Avg E Score</p>
          <p className="text-2xl font-bold text-green-700">
            {(filteredReports.reduce((sum, r) => sum + r.eScore, 0) / filteredReports.length).toFixed(1)}
          </p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <p className="text-sm text-orange-600 mb-1">Avg S Score</p>
          <p className="text-2xl font-bold text-orange-700">
            {(filteredReports.reduce((sum, r) => sum + r.sScore, 0) / filteredReports.length).toFixed(1)}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-600 mb-1">Avg G Score</p>
          <p className="text-2xl font-bold text-blue-700">
            {(filteredReports.reduce((sum, r) => sum + r.gScore, 0) / filteredReports.length).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ESG Scores (E/S/G)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-gray-400" />
                      <span className="font-medium text-gray-900">{report.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {report.industry}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {report.region}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {report.period}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-600 font-medium">{report.eScore}</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-orange-600 font-medium">{report.sScore}</span>
                      <span className="text-gray-400">/</span>
                      <span className="text-blue-600 font-medium">{report.gScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-lg font-bold ${getScoreColor(report.totalScore)}`}>
                      {report.totalScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Read-Only Notice */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <h3 className="font-semibold text-yellow-900 mb-2">Viewer Access</h3>
        <p className="text-sm text-yellow-800">
          You are viewing reports in read-only mode. Export and download functions are restricted.
          Contact your administrator for additional access permissions.
        </p>
      </div>
    </div>
  );
}
