import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Проверяем наличие токена в localStorage
  const isAuthenticated = !!localStorage.getItem('token');

  // Если токена нет, перенаправляем на страницу логина
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Если токен есть, отдаем содержимое страницы
  return children;
};

export default ProtectedRoute;