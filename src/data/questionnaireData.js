// src/data/questionnaireData.js
export const questionnaireTemplate = [
  {
    id: 'e1',
    category: 'Environment',
    question: 'Каков объем выбросов парниковых газов (Scope 1) за отчетный период?',
    type: 'number', // тип ввода
    weight: 0.4,    // весовой коэффициент для расчета балла
  },
  {
    id: 's1',
    category: 'Social',
    question: 'Имеется ли в компании политика охраны труда?',
    type: 'boolean',
    weight: 0.3,
  },
  {
    id: 'g1',
    category: 'Governance',
    question: 'Есть ли в составе совета директоров независимые директора?',
    type: 'boolean',
    weight: 0.3,
  }
];