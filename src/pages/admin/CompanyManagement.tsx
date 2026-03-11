import React, { useState } from 'react';
import { Building2, Search, Plus, MapPin, Briefcase, Edit, Trash2 } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  organizationType: string;
  region: string;
  industry: string;
  employeeCount: string;
  activeReports: number;
  avgScore: number | null;
}

const mockCompanies: Company[] = [
  {
    id: 'c1',
    name: 'TechCorp Inc.',
    organizationType: 'Public Corporation',
    region: 'North America',
    industry: 'Technology',
    employeeCount: '1000-5000',
    activeReports: 5,
    avgScore: 87,
  },
  {
    id: 'c2',
    name: 'Green Energy Ltd.',
    organizationType: 'Private Limited',
    region: 'Europe',
    industry: 'Renewable Energy',
    employeeCount: '500-1000',
    activeReports: 3,
    avgScore: 92,
  },
  {
    id: 'c3',
    name: 'Finance Group',
    organizationType: 'Public Corporation',
    region: 'Asia Pacific',
    industry: 'Financial Services',
    employeeCount: '5000+',
    activeReports: 8,
    avgScore: 85,
  },
  {
    id: 'c4',
    name: 'Manufacturing Co.',
    organizationType: 'Private Limited',
    region: 'Europe',
    industry: 'Manufacturing',
    employeeCount: '1000-5000',
    activeReports: 2,
    avgScore: 78,
  },
];

export function CompanyManagement() {
  const [companies] = useState<Company[]>(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterIndustry, setFilterIndustry] = useState('all');

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = filterIndustry === 'all' || company.industry === filterIndustry;
    return matchesSearch && matchesIndustry;
  });

  const industries = Array.from(new Set(companies.map(c => c.industry)));

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Management</h1>
        <p className="text-gray-600">Manage registered companies and their information</p>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Industries</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Total Companies</p>
          <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200">
          <p className="text-sm text-green-600 mb-1">Active Reports</p>
          <p className="text-2xl font-bold text-green-700">
            {companies.reduce((sum, c) => sum + c.activeReports, 0)}
          </p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <p className="text-sm text-blue-600 mb-1">Avg ESG Score</p>
          <p className="text-2xl font-bold text-blue-700">
            {(companies.reduce((sum, c) => sum + (c.avgScore || 0), 0) / companies.filter(c => c.avgScore).length).toFixed(1)}
          </p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <p className="text-sm text-orange-600 mb-1">Industries</p>
          <p className="text-2xl font-bold text-orange-700">{industries.length}</p>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{company.name}</h3>
                  <p className="text-sm text-gray-500">{company.organizationType}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span>{company.industry}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{company.region}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 className="w-4 h-4" />
                <span>{company.employeeCount} employees</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div>
                <p className="text-xs text-gray-500">Active Reports</p>
                <p className="text-lg font-semibold text-gray-900">{company.activeReports}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Avg ESG Score</p>
                <p className="text-lg font-semibold text-gray-900">
                  {company.avgScore ? `${company.avgScore}/100` : '—'}
                </p>
              </div>
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
