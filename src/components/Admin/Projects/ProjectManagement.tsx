import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Eye, 
  Trash2,
  Building2,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Project } from '../../../types';
import { mockProjects } from '../../../data/mockData';

const ProjectManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterBuilder, setFilterBuilder] = useState('all');
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.builderName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesBuilder = filterBuilder === 'all' || project.builderName === filterBuilder;
    return matchesSearch && matchesStatus && matchesBuilder;
  });

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'ongoing': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'upcoming': return <Calendar className="w-4 h-4 text-amber-500" />;
      default: return <XCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const builders = [...new Set(projects.map(p => p.builderName))];

  const stats = [
    {
      label: 'Total Projects',
      value: projects.length,
      icon: Building2,
      color: 'bg-blue-500'
    },
    {
      label: 'Active Projects',
      value: projects.filter(p => p.status === 'ongoing').length,
      icon: Clock,
      color: 'bg-green-500'
    },
    {
      label: 'Featured Projects',
      value: projects.filter(p => p.featured).length,
      icon: Star,
      color: 'bg-amber-500'
    },
    {
      label: 'Total Value',
      value: `₹${Math.round(projects.reduce((sum, p) => sum + p.priceRange.max, 0) / 10000000)}Cr`,
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Project Management</h1>
          <p className="text-slate-600 mt-1">Manage all projects across builders and track performance</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-slate-800 to-amber-500 text-white rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-slate-600 text-sm">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent w-64"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={filterBuilder}
                onChange={(e) => setFilterBuilder(e.target.value)}
                className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Builders</option>
                {builders.map((builder) => (
                  <option key={builder} value={builder}>{builder}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <span>Total: {filteredProjects.length} projects</span>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Project Details</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Builder</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Price Range</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Performance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={project.images[0]}
                        alt={project.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-slate-800">{project.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-slate-500">
                          <span>{project.bedrooms.join(', ')}</span>
                          {project.featured && (
                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-700 font-medium">{project.builderName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-1 text-slate-700">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span>{project.location}, {project.city}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-700">
                      <div className="font-medium">
                        {formatPrice(project.priceRange.min)} - {formatPrice(project.priceRange.max)}
                      </div>
                      <div className="text-sm text-slate-500">
                        {project.sizeRange.min} - {project.sizeRange.max} sq.ft
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(project.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-center">
                      {project.investmentMetrics ? (
                        <div>
                          <div className="flex items-center space-x-1 text-green-600">
                            <TrendingUp className="w-4 h-4" />
                            <span className="font-medium">{project.investmentMetrics.expectedROI}% ROI</span>
                          </div>
                          <div className="text-xs text-slate-500">
                            Quality: {project.qualityScore || 'N/A'}/100
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm">No data</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Project"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Project"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;