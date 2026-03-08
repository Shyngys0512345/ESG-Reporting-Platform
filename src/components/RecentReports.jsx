import React from 'react';

const RecentReports = ({ reports, isLoading, error }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'submitted': return 'bg-green-100 text-green-700';
      case 'in progress': return 'bg-blue-100 text-blue-700';
      case 'draft': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (isLoading) return <div className="p-8 text-center text-gray-500">Загрузка отчетов...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Ошибка загрузки данных.</div>;
  if (!reports?.length) return <div className="p-8 text-center text-gray-500">Нет доступных отчетов.</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-400 text-xs uppercase border-b">
            <th className="pb-4">Company</th>
            <th className="pb-4">Status</th>
            <th className="pb-4">Date</th>
            <th className="pb-4">ESG Score</th>
            <th className="pb-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="border-b last:border-none text-sm hover:bg-gray-50 transition-colors">
              <td className="py-4 font-medium text-gray-900">{report.company}</td>
              <td className="py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(report.status)}`}>
                  {report.status}
                </span>
              </td>
              <td className="py-4 text-gray-600">{report.date}</td>
              <td className="py-4 font-bold text-gray-900">{report.score ? `${report.score}/100` : '—'}</td>
              <td className="py-4 text-blue-600 hover:text-blue-800 cursor-pointer font-medium">
                View Details
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentReports;