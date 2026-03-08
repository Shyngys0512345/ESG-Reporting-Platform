// src/utils/scoreCalculator.js

/**
 * Рассчитывает итоговый ESG балл
 * @param {Object} answers - ответы вида { 'e1': 80, 's1': true, ... }
 * @param {Array} template - массив объектов вопросов с весами
 */
export const calculateESGScore = (answers, template) => {
  let totalScore = 0;
  let totalWeight = 0;

  template.forEach((q) => {
    const answer = answers[q.id];
    
    // Если ответа нет, пропускаем
    if (answer === undefined) return;

    // Логика расчета для разных типов ответов
    let questionScore = 0;
    if (q.type === 'number') {
      // Предположим, что числовой ввод — это процент от максимума
      questionScore = Math.min(Number(answer), 100);
    } else if (q.type === 'boolean') {
      questionScore = answer === 'yes' ? 100 : 0;
    }

    totalScore += questionScore * q.weight;
    totalWeight += q.weight;
  });

  // Возвращаем средневзвешенный балл
  return totalWeight > 0 ? (totalScore / totalWeight).toFixed(1) : 0;
};