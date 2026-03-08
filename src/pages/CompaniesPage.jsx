import React from 'react';
import { PageHeader } from '../components/PageHeader';
import CompanyCard from '../components/CompanyCard';

const companiesData = [
  { name: 'TechCorp Inc.', type: 'Public Corporation', location: 'North America', employees: '1000-5000', score: 87 },
  { name: 'Green Energy Ltd.', type: 'Private Limited', location: 'Europe', employees: '500-1000', score: 92 },
  // ... добавьте остальные объекты
];

const CompaniesPage = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <PageHeader title="Company Management" description="Manage registered companies and their information" />
      
      {/* Сетка карточек */}
      <div className="grid grid-cols-2 gap-6">
        {companiesData.map((company, index) => (
          <CompanyCard key={index} company={company} />
        ))}
      </div>
    </div>
  );
};

export default CompaniesPage;