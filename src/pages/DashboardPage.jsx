import React from 'react';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import RecentReports from '../components/RecentReports';
import { MonthlyReportsChart, ESGScoreTrendChart } from '../components/DashboardCharts';
import { dashboardStats } from '../data/mockData';

const DashboardPage = () => {
  // Проверка на случай, если данные еще не загрузились
  const data = dashboardStats; 

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Administrator Dashboard</h1>
      
      {/* Статистика */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Users" value={data.totalUsers} change="+12%" />
        <StatCard title="Active Companies" value={data.activeCompanies} change="+5" />
        <StatCard title="Total Reports" value={data.totalReports} change="+18%" />
        <StatCard title="Avg ESG Score" value={data.avgESGScore} change="+3.2" />
      </div>

      {/* Графики */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <MonthlyReportsChart />
        <ESGScoreTrendChart />
      </div>

      {/* Таблица */}
      <RecentReports />
    </>
  );
};

export default DashboardPage;