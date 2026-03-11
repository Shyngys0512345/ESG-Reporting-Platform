import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Send, 
  Leaf, 
  Users, 
  Shield,
  CheckCircle,
  Circle
} from 'lucide-react';

type Step = 'setup' | 'environmental' | 'social' | 'governance' | 'review';

export function ReportWizard() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('setup');
  const [company, setCompany] = useState('TechCorp Inc.');
  const [period, setPeriod] = useState('Q1 2026');

  const steps: { id: Step; label: string; icon: any; color: string }[] = [
    { id: 'setup', label: 'Setup', icon: Circle, color: 'text-gray-600' },
    { id: 'environmental', label: 'Environmental', icon: Leaf, color: 'text-green-600' },
    { id: 'social', label: 'Social', icon: Users, color: 'text-orange-600' },
    { id: 'governance', label: 'Governance', icon: Shield, color: 'text-blue-600' },
    { id: 'review', label: 'Review', icon: CheckCircle, color: 'text-purple-600' },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const goNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const goBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const saveDraft = () => {
    alert('Draft saved successfully!');
  };

  const submitReport = () => {
    alert('Report submitted successfully!');
    navigate('/respondent/reports');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">ESG Report Wizard</h1>
            <p className="text-sm text-gray-600">{company} • {period}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={saveDraft}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            <button
              onClick={() => navigate('/respondent/dashboard')}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = index < currentStepIndex;

              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                        isActive
                          ? 'bg-blue-50 border-blue-600'
                          : isCompleted
                          ? 'bg-green-50 border-green-600'
                          : 'bg-gray-50 border-gray-300'
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isActive
                            ? 'text-blue-600'
                            : isCompleted
                            ? 'text-green-600'
                            : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <p
                      className={`text-sm font-medium mt-2 ${
                        isActive ? 'text-gray-900' : 'text-gray-500'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-4 ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {/* Setup Step */}
          {currentStep === 'setup' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Setup</h2>
              <p className="text-gray-600 mb-8">Select the company and reporting period</p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company
                  </label>
                  <select
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>TechCorp Inc.</option>
                    <option>Other Company</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reporting Period
                  </label>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Q1 2026</option>
                    <option>Q4 2025</option>
                    <option>Q3 2025</option>
                  </select>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> Once submitted, this report cannot be edited. You can save
                    drafts at any time during the process.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Environmental Step */}
          {currentStep === 'environmental' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Environmental</h2>
                  <p className="text-gray-600">Questions about environmental impact and sustainability</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Question 1 */}
                <div>
                  <label className="block font-medium text-gray-900 mb-3">
                    1. What percentage of your energy comes from renewable sources?
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Enter percentage (0-100)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-2">Weight: 10 points</p>
                </div>

                {/* Question 2 */}
                <div>
                  <label className="block font-medium text-gray-900 mb-3">
                    2. Does your organization have a formal environmental policy?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="env_policy" className="mr-3" />
                      <span>Yes, fully implemented and reviewed annually</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="env_policy" className="mr-3" />
                      <span>Yes, but not regularly reviewed</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="env_policy" className="mr-3" />
                      <span>In development</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="env_policy" className="mr-3" />
                      <span>No</span>
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Weight: 8 points</p>
                </div>

                {/* Question 3 */}
                <div>
                  <label className="block font-medium text-gray-900 mb-3">
                    3. Rate your waste management practices (1-5)
                  </label>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <label
                        key={num}
                        className="flex-1 flex flex-col items-center p-4 border-2 border-gray-300 rounded-lg hover:border-green-500 cursor-pointer"
                      >
                        <input type="radio" name="waste_mgmt" className="mb-2" />
                        <span className="text-2xl font-bold text-gray-900">{num}</span>
                        <span className="text-xs text-gray-600 text-center mt-1">
                          {num === 1 ? 'Poor' : num === 5 ? 'Excellent' : ''}
                        </span>
                      </label>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Weight: 7 points</p>
                </div>
              </div>
            </div>
          )}

          {/* Social Step */}
          {currentStep === 'social' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Social</h2>
                  <p className="text-gray-600">Questions about social responsibility and employee welfare</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block font-medium text-gray-900 mb-3">
                    1. Does your organization have a diversity and inclusion policy?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="di_policy" className="mr-3" />
                      <span>Yes, with measurable targets and regular reporting</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="di_policy" className="mr-3" />
                      <span>Yes, but without specific targets</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="di_policy" className="mr-3" />
                      <span>In development</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="di_policy" className="mr-3" />
                      <span>No</span>
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Weight: 9 points</p>
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-3">
                    2. What percentage of your workforce receives regular training and development?
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Enter percentage (0-100)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-2">Weight: 8 points</p>
                </div>
              </div>
            </div>
          )}

          {/* Governance Step */}
          {currentStep === 'governance' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Governance</h2>
                  <p className="text-gray-600">Questions about corporate governance and ethics</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block font-medium text-gray-900 mb-3">
                    1. What percentage of your board members are independent?
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Enter percentage (0-100)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-2">Weight: 10 points</p>
                </div>

                <div>
                  <label className="block font-medium text-gray-900 mb-3">
                    2. Does your organization have a code of ethics and conduct?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="code_ethics" className="mr-3" />
                      <span>Yes, regularly reviewed and enforced</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="code_ethics" className="mr-3" />
                      <span>Yes, but not regularly reviewed</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="code_ethics" className="mr-3" />
                      <span>In development</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input type="radio" name="code_ethics" className="mr-3" />
                      <span>No</span>
                    </label>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Weight: 9 points</p>
                </div>
              </div>
            </div>
          )}

          {/* Review Step */}
          {currentStep === 'review' && (
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h2>
              <p className="text-gray-600 mb-8">Review your answers before final submission</p>

              <div className="space-y-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-900 mb-2">Environmental Score</h3>
                  <p className="text-3xl font-bold text-green-600">85/100</p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                  <h3 className="font-semibold text-orange-900 mb-2">Social Score</h3>
                  <p className="text-3xl font-bold text-orange-600">88/100</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Governance Score</h3>
                  <p className="text-3xl font-bold text-blue-600">89/100</p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-900 mb-2">Overall ESG Score</h3>
                  <p className="text-4xl font-bold text-purple-600">87/100</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Warning:</strong> Once submitted, this report will be locked and cannot be
                  edited. Please review all your answers carefully.
                </p>
              </div>

              <button
                onClick={submitReport}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-lg"
              >
                <Send className="w-5 h-5" />
                Submit Report
              </button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={goBack}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>

            {currentStepIndex < steps.length - 1 && (
              <button
                onClick={goNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
