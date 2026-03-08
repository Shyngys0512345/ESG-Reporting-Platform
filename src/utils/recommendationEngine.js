// src/utils/recommendationEngine.js

export const getRecommendations = (answers, questionnaireTemplate) => {
  const recommendations = [];

  questionnaireTemplate.forEach((q) => {
    const answer = answers[q.id];
    
    // Если ответ "no" (для boolean) или низкий показатель (для number)
    if (q.type === 'boolean' && answer === 'no') {
      recommendations.push(`Рекомендуем внедрить политику по направлению: ${q.category}.`);
    }
    
    if (q.type === 'number' && Number(answer) < 50) {
      recommendations.push(`Показатель "${q.question}" ниже среднего. Рекомендуем оптимизировать процессы.`);
    }
  });

  return recommendations;
};