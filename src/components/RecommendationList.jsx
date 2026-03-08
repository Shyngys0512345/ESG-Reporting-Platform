import React from 'react';

const RecommendationList = ({ recommendations }) => {
  if (!recommendations.length) return null;

  return (
    <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
      <h3 className="text-lg font-bold text-blue-900 mb-4">Рекомендации по улучшению</h3>
      <ul className="list-disc list-inside space-y-2 text-blue-800">
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationList;