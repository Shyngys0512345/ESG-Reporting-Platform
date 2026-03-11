import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Building2, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Report {
  id: string;
  company: string;
  companyId: string;
  period: string;
  submittedBy: string;
  submittedDate: string;
  status: 'draft' | 'in_progress' | 'submitted' | 'locked';
  eScore: number;
  sScore: number;
  gScore: number;
  totalScore: number;
}

const mockReports: Report[] = [
  {
    id: 'r1',
    company: 'TechCorp Inc.',
    companyId: 'c1',
    period: 'Q1 2026',
    submittedBy: 'John Respondent',
    submittedDate: '2026-03-02',
    status: 'submitted',
    eScore: 85,
    sScore: 88,
    gScore: 89,
    totalScore: 87,
  },
  {
    id: 'r2',
    company: 'Green Energy Ltd.',
    companyId: 'c2',
    period: 'Q1 2026',
    submittedBy: 'Sarah Martinez',
    submittedDate: '2026-03-01',
    status: 'submitted',
    eScore: 95,
    sScore: 90,
    gScore: 91,
    totalScore: 92,
  },
  {
    id: 'r3',
    company: 'Finance Group',
    companyId: 'c3',
    period: 'Q1 2026',
    submittedBy: 'Alex Johnson',
    submittedDate: '2026-02-28',
    status: 'locked',
    eScore: 82,
    sScore: 87,
    gScore: 86,
    totalScore: 85,
  },
  {
    id: 'r4',
    company: 'Manufacturing Co.',
    companyId: 'c4',
    period: 'Q4 2025',
    submittedBy: 'Mike Chen',
    submittedDate: '2026-02-15',
    status: 'submitted',
    eScore: 75,
    sScore: 78,
    gScore: 81,
    totalScore: 78,
  },
];

export function AdminReports() {
  const [reports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'submitted':
        return { icon: CheckCircle, bg: 'bg-green-100', text: 'text-green-700', label: 'Submitted' };
      case 'in_progress':
        return { icon: Clock, bg: 'bg-blue-100', text: 'text-blue-700', label: 'In Progress' };
      case 'draft':
        return { icon: AlertCircle, bg: 'bg-gray-100', text: 'text-gray-700', label: 'Draft' };
      case 'locked':
        return { icon: CheckCircle, bg: 'bg-purple-100', text: 'text-purple-700', label: 'Locked' };
      default:
        return { icon: AlertCircle, bg: 'bg-gray-100', text: 'text-gray-700', label: status };
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Reports</h1>
        <p className="text-gray-600">View and manage all ESG reports across the platform</p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by company or respondent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="in_progress">In Progress</option>
            <option value="submitted">Submitted</option>
            <option value="locked">Locked</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Reports</p>
          <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-600 mb-1">Submitted</p>
          <p className="text-2xl font-bold text-green-700">
            {reports.filter(r => r.status === 'submitted' || r.status === 'locked').length}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-600 mb-1">In Progress</p>
          <p className="text-2xl font-bold text-blue-700">
            {reports.filter(r => r.status === 'in_progress').length}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Drafts</p>
          <p className="text-2xl font-bold text-gray-700">
            {reports.filter(r => r.status === 'draft').length}
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
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
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
              {filteredReports.map((report) => {
                const statusBadge = getStatusBadge(report.status);
                const StatusIcon = statusBadge.icon;

                return (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{report.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {report.period}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {report.submittedBy}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusBadge.label}
                      </span>
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
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
