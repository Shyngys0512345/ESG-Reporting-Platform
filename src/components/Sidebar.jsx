// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'User Management', path: '/users' },
    { name: 'Companies', path: '/companies' },
    { name: 'Questionnaires', path: '/questionnaires' },
    { name: 'All Reports', path: '/reports' },
  ];

  return (
    <nav className="w-64 bg-gray-900 text-white min-h-screen">
      <div className="p-6 font-bold text-xl">ESG Platform</div>
      <div className="flex flex-col gap-2 mt-4">
        <NavLink to="/" className={({isActive}) => `p-4 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
          Dashboard
        </NavLink>
        <NavLink to="/users" className={({isActive}) => `p-4 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
          User Management
        </NavLink>
        <NavLink to="/companies" className={({isActive}) => `p-4 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
          Companies
        </NavLink>
        <NavLink to="/questionnaires" className={({isActive}) => `p-4 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
          Questionnaires
        </NavLink>
        <NavLink to="/reports" className={({isActive}) => `p-4 ${isActive ? 'bg-blue-600' : 'hover:bg-gray-800'}`}>
          All Reports
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;