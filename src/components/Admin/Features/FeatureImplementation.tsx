import React, { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Eye, 
  Users, 
  Calendar,
  BarChart3,
  TrendingUp,
  Shield,
  Award,
  Heart,
  Smartphone,
  ChevronRight,
  Play,
  Pause,
  Settings
} from 'lucide-react';
import { FeatureModule } from '../../../types/admin';

const FeatureImplementation: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<FeatureModule | null>(null);
  const [showModal, setShowModal] = useState(false);

  const featureModules: FeatureModule[] = [
    {
      id: '1',
      name: 'Investment Transparency Module',
      description: 'ROI Calculator, Market Trends, and Capital Growth Projections',
      completionPercentage: 85,
      status: 'in_progress',
      subModules: [
        {
          id: '1-1',
          name: 'ROI Calculator',
          description: 'Interactive calculator with property price, rental income, maintenance costs',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team A',
          estimatedHours: 40,
          actualHours: 38
        },
        {
          id: '1-2',
          name: 'Market Trend Indicators',
          description: 'Real-time data integration from property market APIs',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team B',
          estimatedHours: 60,
          actualHours: 65
        },
        {
          id: '1-3',
          name: 'Capital Growth Projections',
          description: 'Interactive charts showing 5, 10, and 15-year forecasts',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team A',
          estimatedHours: 50,
          actualHours: 48
        },
        {
          id: '1-4',
          name: 'Admin Controls',
          description: 'Backend interface to update market data and calculation parameters',
          status: 'in_progress',
          completionPercentage: 70,
          assignedTo: 'Dev Team C',
          estimatedHours: 35,
          actualHours: 25
        }
      ],
      assignedTo: ['Dev Team A', 'Dev Team B', 'Dev Team C'],
      startDate: '2024-01-01',
      expectedCompletion: '2024-02-15',
      dependencies: ['Database Schema', 'API Integration']
    },
    {
      id: '2',
      name: 'Social Status & Exclusivity Module',
      description: 'Celebrity Neighbors, VIP Access, and Quality Scoring',
      completionPercentage: 92,
      status: 'testing',
      subModules: [
        {
          id: '2-1',
          name: 'Celebrity Neighbor Database',
          description: 'Privacy controls and verification badges system',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team D',
          estimatedHours: 45,
          actualHours: 42
        },
        {
          id: '2-2',
          name: 'Exclusive Access Properties',
          description: 'VIP-only visibility settings and access controls',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team E',
          estimatedHours: 35,
          actualHours: 38
        },
        {
          id: '2-3',
          name: 'Quality Score System',
          description: 'Third-party integration APIs and manual override options',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team F',
          estimatedHours: 55,
          actualHours: 52
        },
        {
          id: '2-4',
          name: 'VIP User Management',
          description: 'Admin interface to manage VIP user lists',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team D',
          estimatedHours: 30,
          actualHours: 28
        },
        {
          id: '2-5',
          name: 'Exclusive Property Assignment',
          description: 'System to assign exclusive properties to VIP users',
          status: 'in_progress',
          completionPercentage: 80,
          assignedTo: 'Dev Team E',
          estimatedHours: 25,
          actualHours: 20
        }
      ],
      assignedTo: ['Dev Team D', 'Dev Team E', 'Dev Team F'],
      startDate: '2024-01-15',
      expectedCompletion: '2024-02-28',
      dependencies: ['User Management System', 'Property Database']
    },
    {
      id: '3',
      name: 'Personalized Premium Service Module',
      description: 'Relationship Managers, Site Visits, and Concierge Services',
      completionPercentage: 78,
      status: 'in_progress',
      subModules: [
        {
          id: '3-1',
          name: 'RM Assignment System',
          description: 'Workload distribution and assignment algorithm',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team G',
          estimatedHours: 50,
          actualHours: 48
        },
        {
          id: '3-2',
          name: 'Site Visit Scheduling',
          description: 'Calendar integration with availability management',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team H',
          estimatedHours: 40,
          actualHours: 45
        },
        {
          id: '3-3',
          name: 'Concierge Services',
          description: 'Request tracking with service provider integration',
          status: 'in_progress',
          completionPercentage: 85,
          assignedTo: 'Dev Team I',
          estimatedHours: 60,
          actualHours: 50
        },
        {
          id: '3-4',
          name: 'Communication Logs',
          description: 'Performance metrics and communication tracking',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team G',
          estimatedHours: 35,
          actualHours: 32
        },
        {
          id: '3-5',
          name: 'Performance Dashboard',
          description: 'RM performance metrics and analytics',
          status: 'in_progress',
          completionPercentage: 60,
          assignedTo: 'Dev Team H',
          estimatedHours: 45,
          actualHours: 30
        },
        {
          id: '3-6',
          name: 'Client Feedback System',
          description: 'Feedback collection and analysis system',
          status: 'not_started',
          completionPercentage: 0,
          assignedTo: 'Dev Team I',
          estimatedHours: 30,
          actualHours: 0
        }
      ],
      assignedTo: ['Dev Team G', 'Dev Team H', 'Dev Team I'],
      startDate: '2024-02-01',
      expectedCompletion: '2024-03-15',
      dependencies: ['User Authentication', 'Calendar Integration']
    },
    {
      id: '4',
      name: 'Builder Credibility & Trust Module',
      description: 'Credibility Scoring, Delivery Tracking, and Certifications',
      completionPercentage: 95,
      status: 'completed',
      subModules: [
        {
          id: '4-1',
          name: 'Credibility Scoring Algorithm',
          description: 'Builder profile management with 0-100 scale scoring',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team J',
          estimatedHours: 55,
          actualHours: 52
        },
        {
          id: '4-2',
          name: 'Delivery Tracking System',
          description: 'Project milestone updates and timeline management',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team K',
          estimatedHours: 45,
          actualHours: 43
        },
        {
          id: '4-3',
          name: 'Awards & Certifications',
          description: 'Upload and verification system for builder credentials',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team L',
          estimatedHours: 35,
          actualHours: 38
        },
        {
          id: '4-4',
          name: 'Construction Progress Tracking',
          description: 'Photo uploads and timeline management system',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team J',
          estimatedHours: 40,
          actualHours: 37
        }
      ],
      assignedTo: ['Dev Team J', 'Dev Team K', 'Dev Team L'],
      startDate: '2024-01-01',
      expectedCompletion: '2024-02-01',
      actualCompletion: '2024-01-28',
      dependencies: ['Builder Database', 'File Upload System']
    },
    {
      id: '5',
      name: 'Lifestyle Matching Module',
      description: 'Premium Amenities, Investment Types, and Recommendation Engine',
      completionPercentage: 60,
      status: 'in_progress',
      subModules: [
        {
          id: '5-1',
          name: 'Premium Amenities Database',
          description: 'Categorization and filtering system for luxury amenities',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team M',
          estimatedHours: 30,
          actualHours: 28
        },
        {
          id: '5-2',
          name: 'Investment Type Classification',
          description: 'Residential/commercial classification system',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team N',
          estimatedHours: 25,
          actualHours: 27
        },
        {
          id: '5-3',
          name: 'Recommendation Engine',
          description: 'Income-based matching with user financial profiles',
          status: 'in_progress',
          completionPercentage: 40,
          assignedTo: 'Dev Team O',
          estimatedHours: 70,
          actualHours: 35
        }
      ],
      assignedTo: ['Dev Team M', 'Dev Team N', 'Dev Team O'],
      startDate: '2024-02-15',
      expectedCompletion: '2024-03-30',
      dependencies: ['User Profile System', 'Machine Learning Framework']
    },
    {
      id: '6',
      name: 'Enhanced User Experience Module',
      description: 'Virtual Tours, Floor Plans, Legal Documents, and WhatsApp Integration',
      completionPercentage: 88,
      status: 'testing',
      subModules: [
        {
          id: '6-1',
          name: 'Virtual Tours Management',
          description: '360° content upload and management capabilities',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team P',
          estimatedHours: 50,
          actualHours: 48
        },
        {
          id: '6-2',
          name: 'Floor Plan Repository',
          description: 'Version control and access permissions system',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team Q',
          estimatedHours: 35,
          actualHours: 38
        },
        {
          id: '6-3',
          name: 'Legal Document Repository',
          description: 'RERA integration and document verification',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team R',
          estimatedHours: 45,
          actualHours: 42
        },
        {
          id: '6-4',
          name: 'WhatsApp Business API',
          description: 'Integration with automated RM assignment',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team S',
          estimatedHours: 40,
          actualHours: 43
        },
        {
          id: '6-5',
          name: 'Mobile App Integration',
          description: 'Native mobile app features and optimization',
          status: 'in_progress',
          completionPercentage: 75,
          assignedTo: 'Dev Team T',
          estimatedHours: 60,
          actualHours: 45
        },
        {
          id: '6-6',
          name: 'Performance Optimization',
          description: 'Loading speed and user experience improvements',
          status: 'in_progress',
          completionPercentage: 80,
          assignedTo: 'Dev Team P',
          estimatedHours: 35,
          actualHours: 28
        },
        {
          id: '6-7',
          name: 'Analytics Integration',
          description: 'User behavior tracking and analytics dashboard',
          status: 'completed',
          completionPercentage: 100,
          assignedTo: 'Dev Team Q',
          estimatedHours: 30,
          actualHours: 32
        }
      ],
      assignedTo: ['Dev Team P', 'Dev Team Q', 'Dev Team R', 'Dev Team S', 'Dev Team T'],
      startDate: '2024-01-20',
      expectedCompletion: '2024-03-10',
      dependencies: ['File Storage System', 'Third-party API Integrations']
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'testing': return <Eye className="w-5 h-5 text-blue-500" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-amber-500" />;
      case 'not_started': return <AlertTriangle className="w-5 h-5 text-slate-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'testing': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-amber-100 text-amber-800';
      case 'not_started': return 'bg-slate-100 text-slate-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getModuleIcon = (moduleName: string) => {
    if (moduleName.includes('Investment')) return TrendingUp;
    if (moduleName.includes('Social')) return Award;
    if (moduleName.includes('Premium')) return Heart;
    if (moduleName.includes('Builder')) return Shield;
    if (moduleName.includes('Lifestyle')) return Users;
    if (moduleName.includes('Experience')) return Smartphone;
    return Settings;
  };

  const overallProgress = Math.round(
    featureModules.reduce((sum, module) => sum + module.completionPercentage, 0) / featureModules.length
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Feature Implementation Status</h1>
          <p className="text-slate-600 mt-1">Track progress of all premium feature modules</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-800">{overallProgress}%</p>
            <p className="text-sm text-slate-600">Overall Progress</p>
          </div>
          <div className="w-16 h-16 relative">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray={`${overallProgress}, 100`}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Feature Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {featureModules.map((module) => {
          const ModuleIcon = getModuleIcon(module.name);
          return (
            <div key={module.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <ModuleIcon className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{module.name}</h3>
                    <p className="text-sm text-slate-600">{module.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(module.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                    {module.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Progress</span>
                  <span className="text-sm font-medium text-slate-800">{module.completionPercentage}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-slate-800 to-amber-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${module.completionPercentage}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-2xl font-bold text-slate-800">{module.subModules.length}</p>
                  <p className="text-xs text-slate-600">Total Modules</p>
                </div>
                <div className="text-center p-3 bg-slate-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {module.subModules.filter(sub => sub.status === 'completed').length}
                  </p>
                  <p className="text-xs text-slate-600">Completed</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Due: {module.expectedCompletion}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{module.assignedTo.length} teams</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedModule(module);
                  setShowModal(true);
                }}
                className="w-full flex items-center justify-center space-x-2 bg-slate-100 text-slate-700 py-2 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <span>View Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Module Details Modal */}
      {showModal && selectedModule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">{selectedModule.name}</h2>
                <p className="text-slate-600">{selectedModule.description}</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <AlertTriangle className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6">
              {/* Module Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-3xl font-bold text-slate-800">{selectedModule.completionPercentage}%</p>
                  <p className="text-sm text-slate-600">Overall Progress</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">
                    {selectedModule.subModules.filter(sub => sub.status === 'completed').length}
                  </p>
                  <p className="text-sm text-slate-600">Completed</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <p className="text-3xl font-bold text-amber-600">
                    {selectedModule.subModules.filter(sub => sub.status === 'in_progress').length}
                  </p>
                  <p className="text-sm text-slate-600">In Progress</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600">
                    {selectedModule.subModules.filter(sub => sub.status === 'not_started').length}
                  </p>
                  <p className="text-sm text-slate-600">Not Started</p>
                </div>
              </div>

              {/* Sub-modules */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Sub-modules</h3>
                <div className="space-y-4">
                  {selectedModule.subModules.map((subModule) => (
                    <div key={subModule.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(subModule.status)}
                          <div>
                            <h4 className="font-semibold text-slate-800">{subModule.name}</h4>
                            <p className="text-sm text-slate-600">{subModule.description}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subModule.status)}`}>
                          {subModule.status.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-slate-600">Assigned To</p>
                          <p className="font-medium text-slate-800">{subModule.assignedTo}</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Estimated Hours</p>
                          <p className="font-medium text-slate-800">{subModule.estimatedHours}h</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600">Actual Hours</p>
                          <p className="font-medium text-slate-800">{subModule.actualHours || 0}h</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-slate-600">Progress</span>
                        <span className="text-sm font-medium text-slate-800">{subModule.completionPercentage}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-slate-800 to-amber-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${subModule.completionPercentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline and Dependencies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Timeline</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Start Date:</span>
                      <span className="font-medium text-slate-800">{selectedModule.startDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Expected Completion:</span>
                      <span className="font-medium text-slate-800">{selectedModule.expectedCompletion}</span>
                    </div>
                    {selectedModule.actualCompletion && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600">Actual Completion:</span>
                        <span className="font-medium text-green-600">{selectedModule.actualCompletion}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Dependencies</h3>
                  <div className="space-y-2">
                    {selectedModule.dependencies.map((dependency, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-slate-700">{dependency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200 mt-8">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors flex items-center space-x-2">
                  <Play className="w-4 h-4" />
                  <span>Start Testing</span>
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-slate-800 to-amber-500 text-white rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <span>Configure Module</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureImplementation;