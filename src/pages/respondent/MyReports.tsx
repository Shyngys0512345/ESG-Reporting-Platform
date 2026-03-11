import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { FileText, Download, Edit, Eye, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Report {
  id: string;
  period: string;
  status: 'draft' | 'in_progress' | 'submitted' | 'locked';
  lastModified: string;
  eScore?: number;
  sScore?: number;
  gScore?: number;
  totalScore?: number;
}

const mockReports: Report[] = [
  {
    id: 'r1',
    period: 'Q1 2026',
    status: 'submitted',
    lastModified: '2026-03-02',
    eScore: 85,
    sScore: 88,
    gScore: 89,
    totalScore: 87,
  },
  {
    id: 'r2',
    period: 'Q4 2025',
    status: 'locked',
    lastModified: '2025-12-31',
    eScore: 82,
    sScore: 85,
    gScore: 86,
    totalScore: 84,
  },
  {
    id: 'r3',
    period: 'Q3 2025',
    status: 'draft',
    lastModified: '2025-09-15',
  },
];

export function MyReports() {
  const [reports] = useState<Report[]>(mockReports);
  const navigate = useNavigate();

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

  const handleExport = (reportId: string) => {
    alert('Exporting report as DOCX... (Demo: Export functionality would generate an editable Word document)');
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reports</h1>
        <p className="text-gray-600">View and manage your ESG reports</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
          <p className="text-sm text-blue-600 mb-1">Latest Score</p>
          <p className="text-2xl font-bold text-blue-700">
            {reports.find(r => r.totalScore)?.totalScore}/100
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Drafts</p>
          <p className="text-2xl font-bold text-gray-700">
            {reports.filter(r => r.status === 'draft' || r.status === 'in_progress').length}
          </p>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const statusBadge = getStatusBadge(report.status);
          const StatusIcon = statusBadge.icon;
          const canEdit = report.status === 'draft' || report.status === 'in_progress';
          const canExport = report.status === 'submitted' || report.status === 'locked';

          return (
            <div key={report.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusBadge.label}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{report.period}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Modified {report.lastModified}</span>
                </div>
              </div>

              {/* Scores */}
              {report.totalScore && (
                <div className="p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">ESG Scores</span>
                    <span className="text-2xl font-bold text-gray-900">{report.totalScore}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">E</p>
                      <p className="text-lg font-bold text-green-600">{report.eScore}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">S</p>
                      <p className="text-lg font-bold text-orange-600">{report.sScore}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600 mb-1">G</p>
                      <p className="text-lg font-bold text-blue-600">{report.gScore}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  {canEdit && (
                    <button
                      onClick={() => navigate(`/respondent/report/${report.id}/edit`)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                  )}
                  {canExport && (
                    <>
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleExport(report.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Download className="w-4 h-4" />
                        Export
                      </button>
                    </>
                  )}
                  {!canEdit && !canExport && (
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Add New Report Card */}
        <button
          onClick={() => navigate('/respondent/report/new')}
          className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-dashed border-blue-300 rounded-xl p-6 hover:border-blue-500 transition-colors min-h-[300px] flex flex-col items-center justify-center text-center"
        >
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Create New Report</h3>
          <p className="text-sm text-gray-600">Start a new ESG assessment</p>
        </button>
      </div>

      {/* Export Info */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Export Information</h3>
        <p className="text-sm text-blue-800">
          Reports can be exported as editable Word documents (.DOCX) or text files. PDF export is not
          available in accordance with platform policy. All exports are logged for security.
        </p>
      </div>
    </div>
  );
}