import React from 'react';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      label: 'Total Projects',
      value: '247',
      change: '+12%',
      trend: 'up',
      icon: Building2,
      color: 'bg-blue-500'
    },
    {
      label: 'Active Users',
      value: '1,432',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      label: 'Monthly Revenue',
      value: '₹24L',
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-amber-500'
    },
    {
      label: 'Conversion Rate',
      value: '4.8%',
      change: '-2%',
      trend: 'down',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'project_added',
      description: 'New project "Sobha Royal Pavilion" added by Sobha Limited',
      timestamp: '2 minutes ago',
      severity: 'success' as const
    },
    {
      id: '2',
      type: 'user_registration',
      description: 'Premium user registration: Rajesh Kumar',
      timestamp: '15 minutes ago',
      severity: 'info' as const
    },
    {
      id: '3',
      type: 'document_verified',
      description: 'RERA certificate verified for Sobha Royal Pavilion',
      timestamp: '1 hour ago',
      severity: 'success' as const
    },
    {
      id: '4',
      type: 'inquiry_received',
      description: 'Premium inquiry received for Godrej Aqua (₹2.5Cr budget)',
      timestamp: '2 hours ago',
      severity: 'warning' as const
    }
  ];

  const featureModules = [
    {
      name: 'Investment Transparency',
      completion: 85,
      status: 'in_progress' as const,
      subModules: 4,
      completedSubModules: 3
    },
    {
      name: 'Social Status & Exclusivity',
      completion: 92,
      status: 'testing' as const,
      subModules: 5,
      completedSubModules: 5
    },
    {
      name: 'Premium Service',
      completion: 78,
      status: 'in_progress' as const,
      subModules: 6,
      completedSubModules: 4
    },
    {
      name: 'Builder Credibility',
      completion: 95,
      status: 'completed' as const,
      subModules: 4,
      completedSubModules: 4
    },
    {
      name: 'Lifestyle Matching',
      completion: 60,
      status: 'in_progress' as const,
      subModules: 3,
      completedSubModules: 2
    },
    {
      name: 'Enhanced UX',
      completion: 88,
      status: 'testing' as const,
      subModules: 7,
      completedSubModules: 6
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'testing': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'testing': return Eye;
      case 'in_progress': return Clock;
      default: return AlertTriangle;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-amber-100 text-amber-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-600 mt-1">Monitor platform performance and manage operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
            Export Report
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-slate-800 to-amber-500 text-white rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all">
            System Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ml-1 ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-slate-500 text-sm ml-1">vs last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Implementation Status */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Feature Implementation Status</h2>
            <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
              View Details
            </button>
          </div>

          <div className="space-y-4">
            {featureModules.map((module) => {
              const StatusIcon = getStatusIcon(module.status);
              return (
                <div key={module.name} className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <StatusIcon className="w-5 h-5 text-slate-600" />
                      <h3 className="font-semibold text-slate-800">{module.name}</h3>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                      {module.status.replace('_', ' ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">
                      {module.completedSubModules}/{module.subModules} modules completed
                    </span>
                    <span className="text-sm font-medium text-slate-800">{module.completion}%</span>
                  </div>
                  
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-slate-800 to-amber-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${module.completion}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Recent Activities</h2>
            <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.severity === 'success' ? 'bg-green-500' :
                  activity.severity === 'warning' ? 'bg-amber-500' :
                  activity.severity === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-slate-800 text-sm">{activity.description}</p>
                  <p className="text-slate-500 text-xs mt-1">{activity.timestamp}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(activity.severity)}`}>
                  {activity.type.replace('_', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all text-center">
            <Building2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">Add New Project</p>
          </button>
          <button className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all text-center">
            <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">Manage Users</p>
          </button>
          <button className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all text-center">
            <Activity className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">View Analytics</p>
          </button>
          <button className="p-4 border-2 border-dashed border-slate-300 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all text-center">
            <CheckCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-600">Verify Documents</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;