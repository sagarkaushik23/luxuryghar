import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Eye, BarChart3, Building2, Users, Calendar, MapPin, DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSupabase } from '../../hooks/useSupabase';
import type { Database } from '../../lib/supabase';

type Project = Database['public']['Tables']['projects']['Row'];
type Company = Database['public']['Tables']['companies']['Row'];

const BuilderDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    city: '',
    state: '',
    price_min: 0,
    price_max: 0,
    size_min: 0,
    size_max: 0,
    bedrooms: [''],
    amenities: [''],
    images: [''],
    status: 'upcoming' as 'upcoming' | 'ongoing' | 'completed',
    is_featured: false
  });

  // Get builder's company
  const { data: companies } = useSupabase('companies', {
    filter: user ? { id: profile?.user_id } : undefined
  });

  const builderCompany = companies[0];

  // Get builder's projects
  const { data: projects, loading, create, update, remove, refetch } = useSupabase('projects', {
    filter: builderCompany ? { company_id: builderCompany.id } : undefined,
    orderBy: { column: 'created_at', ascending: false }
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

  const handleDeleteProject = async (projectId: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await remove(projectId);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description || '',
      location: project.location,
      city: project.city,
      state: project.state,
      price_min: project.price_min,
      price_max: project.price_max,
      size_min: project.size_min,
      size_max: project.size_max,
      bedrooms: project.bedrooms,
      amenities: project.amenities,
      images: project.images,
      status: project.status,
      is_featured: project.is_featured
    });
    setShowProjectForm(true);
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!builderCompany) return;

    const projectData = {
      ...formData,
      company_id: builderCompany.id,
      bedrooms: formData.bedrooms.filter(b => b.trim()),
      amenities: formData.amenities.filter(a => a.trim()),
      images: formData.images.filter(i => i.trim())
    };

    if (editingProject) {
      await update(editingProject.id, projectData);
    } else {
      await create(projectData);
    }

    setShowProjectForm(false);
    setEditingProject(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      location: '',
      city: '',
      state: '',
      price_min: 0,
      price_max: 0,
      size_min: 0,
      size_max: 0,
      bedrooms: [''],
      amenities: [''],
      images: [''],
      status: 'upcoming',
      is_featured: false
    });
  };

  const handleArrayChange = (field: 'bedrooms' | 'amenities' | 'images', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'bedrooms' | 'amenities' | 'images') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (field: 'bedrooms' | 'amenities' | 'images', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

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
      icon: BarChart3,
      color: 'bg-green-500'
    },
    {
      label: 'Featured Projects',
      value: projects.filter(p => p.is_featured).length,
      icon: Users,
      color: 'bg-amber-500'
    },
    {
      label: 'Upcoming Projects',
      value: projects.filter(p => p.status === 'upcoming').length,
      icon: Calendar,
      color: 'bg-purple-500'
    }
  ];

  if (!builderCompany) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-600 mb-2">Company Not Found</h2>
          <p className="text-slate-500">Please contact admin to set up your company profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Builder Dashboard</h1>
              <p className="text-slate-600">Welcome back, {builderCompany.name}</p>
              <p className="text-sm text-slate-500">Manage your projects and track performance</p>
            </div>
            <button
              onClick={() => {
                setEditingProject(null);
                resetForm();
                setShowProjectForm(true);
              }}
              className="mt-4 md:mt-0 inline-flex items-center space-x-2 bg-gradient-to-r from-slate-800 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all transform hover:scale-105 font-medium"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Project</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        {/* Projects List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800">Your Projects</h2>
          </div>

          {projects.length === 0 ? (
            <div className="p-12 text-center">
              <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No Projects Yet</h3>
              <p className="text-slate-500 mb-6">Create your first project to get started</p>
              <button
                onClick={() => setShowProjectForm(true)}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-slate-800 to-amber-500 text-white px-6 py-3 rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all font-medium"
              >
                <Plus className="w-5 h-5" />
                <span>Add First Project</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Project</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Price Range</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Featured</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {projects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={project.images[0] || 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                            alt={project.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-slate-800">{project.name}</h4>
                            <p className="text-sm text-slate-500">{project.bedrooms.join(', ')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-700">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span>{project.location}</span>
                          </div>
                          <div className="text-sm text-slate-500">{project.city}, {project.state}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-slate-700">
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-4 h-4 text-slate-400" />
                            <span>{formatPrice(project.price_min)} - {formatPrice(project.price_max)}</span>
                          </div>
                          <div className="text-sm text-slate-500">
                            {project.size_min} - {project.size_max} sq.ft
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          project.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                          project.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {project.is_featured ? (
                          <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
                            Featured
                          </span>
                        ) : (
                          <span className="text-slate-500 text-sm">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Project"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                            title="View Project"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
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
          )}
        </div>
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl">
              <h2 className="text-2xl font-bold text-slate-800">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button
                onClick={() => {
                  setShowProjectForm(false);
                  setEditingProject(null);
                  resetForm();
                }}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleProjectSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Enter project name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Enter location/area"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Enter city"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Enter state"
                    required
                  />
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Price Range *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    value={formData.price_min}
                    onChange={(e) => setFormData({ ...formData, price_min: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Minimum price"
                    required
                  />
                  <input
                    type="number"
                    value={formData.price_max}
                    onChange={(e) => setFormData({ ...formData, price_max: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Maximum price"
                    required
                  />
                </div>
              </div>

              {/* Size Range */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Size Range (sq.ft) *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    value={formData.size_min}
                    onChange={(e) => setFormData({ ...formData, size_min: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Minimum size"
                    required
                  />
                  <input
                    type="number"
                    value={formData.size_max}
                    onChange={(e) => setFormData({ ...formData, size_max: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Maximum size"
                    required
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'upcoming' | 'ongoing' | 'completed' })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Available Configurations *
                </label>
                <div className="space-y-2">
                  {formData.bedrooms.map((bedroom, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={bedroom}
                        onChange={(e) => handleArrayChange('bedrooms', index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        placeholder="e.g., 2 BHK"
                      />
                      {formData.bedrooms.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('bedrooms', index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('bedrooms')}
                    className="text-amber-600 hover:text-amber-700 transition-colors text-sm"
                  >
                    + Add Configuration
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  placeholder="Enter project description..."
                />
              </div>

              {/* Featured */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                  className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
                />
                <label htmlFor="featured" className="text-sm text-slate-700">
                  Mark as Featured Project
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowProjectForm(false);
                    setEditingProject(null);
                    resetForm();
                  }}
                  className="px-6 py-3 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-slate-800 to-amber-500 text-white rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all font-medium"
                >
                  {editingProject ? 'Update Project' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuilderDashboard;