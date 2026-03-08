import React, { useState } from 'react';
import { questionnaireTemplate } from '../data/questionnaireData';

const QuestionnaireForm = () => {
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Валидация: проверяем, все ли вопросы заполнены
    if (Object.keys(answers).length < questionnaireTemplate.length) {
      setError('Пожалуйста, ответьте на все вопросы перед отправкой.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Имитация API запроса
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Отчет успешно отправлен:', answers);
      alert('Ваш отчет был успешно принят!');
    } catch (err) {
      setError('Произошла ошибка при отправке. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">ESG Assessment</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      {questionnaireTemplate.map((q) => (
        <div key={q.id} className="mb-8">
          <label className="block mb-3 font-semibold text-gray-800">
            {q.question}
            <span className="text-red-500 ml-1">*</span>
          </label>
          {q.type === 'number' ? (
            <input 
              type="number"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Введите значение..."
              onChange={(e) => handleInputChange(q.id, e.target.value)}
            />
          ) : (
            <select 
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onChange={(e) => handleInputChange(q.id, e.target.value)}
            >
              <option value="">Выберите ответ</option>
              <option value="yes">Да</option>
              <option value="no">Нет</option>
            </select>
          )}
        </div>
      ))}

      <button 
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 px-6 rounded-lg font-bold text-white transition-colors ${
          isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isSubmitting ? 'Sending...' : 'Submit Final Report'}
      </button>
    </form>
  );
};

export default QuestionnaireForm;