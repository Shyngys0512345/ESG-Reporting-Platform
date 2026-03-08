// src/services/api.js
import axios from 'axios';

// Базовый клиент с настройками вашего API
const apiClient = axios.create({
  baseURL: 'https://api.your-esg-platform.com/v1', // Сюда коллеги вставят свой адрес
  headers: {
    'Content-Type': 'application/json',
  },
});

export const reportService = {
  // Получение списка отчетов
  getAll: () => apiClient.get('/reports'),
  
  // Отправка нового отчета
  submit: (data) => apiClient.post('/reports/submit', data),
};