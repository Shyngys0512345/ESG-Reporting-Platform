import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
// Импортируем страницы (заглушки или готовые файлы)
import DashboardPage from './pages/DashboardPage';
import UserManagement from './pages/UserManagement';
import CompaniesPage from './pages/CompaniesPage';
import QuestionnairesPage from './pages/QuestionnairesPage';
import AllReportsPage from './pages/AllReportsPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Публичный маршрут */}
        <Route path="/login" element={<LoginPage />} />

        {/* Защищенные маршруты (внутренняя часть приложения) */}
        <Route path="/*" element={
          <ProtectedRoute>
            <div className="flex bg-gray-50 min-h-screen">
              <Sidebar />
              <main className="flex-1 p-8">
                <Routes>
                  <Route path="/" element={<DashboardPage />} />
                  <Route path="/users" element={<UserManagement />} />
                  <Route path="/companies" element={<CompaniesPage />} />
                  <Route path="/questionnaires" element={<QuestionnairesPage />} />
                  <Route path="/reports" element={<AllReportsPage />} />
                  {/* Редирект на дашборд, если путь не найден */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;