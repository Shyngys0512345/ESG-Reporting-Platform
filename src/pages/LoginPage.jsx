import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Имитация API-запроса
    console.log("Логин с:", email, password);
    
    // В реальности здесь будет вызов esgService.login(email, password)
    // Сейчас просто сохраняем "токен" для теста
    localStorage.setItem('token', 'fake-jwt-token');
    
    // Перенаправляем на дашборд
    navigate('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-soft w-96 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign in to ESG Platform</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border border-gray-200 rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            className="w-full p-2 border border-gray-200 rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;