import React from 'react';
import { Edit2, Ban, Trash2, Search } from 'lucide-react';
import { PageHeader } from '../components/PageHeader';

const users = [
  { name: 'Admin User', email: 'admin@esg.com', role: 'administrator', status: 'active', login: '2026-03-04' },
  { name: 'John Respondent', email: 'respondent@company.com', role: 'respondent', status: 'active', login: '2026-03-03' },
  { name: 'Mike Johnson', email: 'mike@finance.com', role: 'respondent', status: 'blocked', login: '2026-02-15' },
];

const UserManagementPage = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PageHeader title="User Management" description="Manage user accounts, roles, and permissions" />
      
      {/* Панель поиска и добавления */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          <input className="w-full pl-10 p-2 border rounded-lg" placeholder="Search users by name or email..." />
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">+ Add User</button>
      </div>

      {/* Таблица */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-400 uppercase">User</th>
              <th className="p-4 text-xs font-bold text-gray-400 uppercase">Role</th>
              <th className="p-4 text-xs font-bold text-gray-400 uppercase">Status</th>
              <th className="p-4 text-xs font-bold text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-4">
                  <div className="font-semibold text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="p-4 capitalize">{user.role}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button className="p-1 text-gray-500 hover:text-blue-600"><Edit2 size={16}/></button>
                  <button className="p-1 text-gray-500 hover:text-orange-600"><Ban size={16}/></button>
                  <button className="p-1 text-gray-500 hover:text-red-600"><Trash2 size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementPage;