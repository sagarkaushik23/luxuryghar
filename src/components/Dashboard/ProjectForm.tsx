import React, { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Project } from '../../types';

interface ProjectFormProps {
  project: Project | null;
  onSubmit: (project: Partial<Project>) => void;
  onClose: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: project?.name || '',
    location: project?.location || '',
    city: project?.city || '',
    priceMin: project?.priceRange.min || 0,
    priceMax: project?.priceRange.max || 0,
    sizeMin: project?.sizeRange.min || 0,
    sizeMax: project?.sizeRange.max || 0,
    bedrooms: project?.bedrooms || [''],
    amenities: project?.amenities || [''],
    images: project?.images || [''],
    launchDate: project?.launchDate || '',
    status: project?.status || 'upcoming',
    description: project?.description || '',
    highlights: project?.highlights || [''],
    featured: project?.featured || false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArray = [...(formData as any)[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: string) => {
    const newArray = [...(formData as any)[field], ''];
    setFormData({ ...formData, [field]: newArray });
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArray = (formData as any)[field].filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData: Partial<Project> = {
      name: formData.name,
      location: formData.location,
      city: formData.city,
      priceRange: { min: Number(formData.priceMin), max: Number(formData.priceMax) },
      sizeRange: { min: Number(formData.sizeMin), max: Number(formData.sizeMax) },
      bedrooms: formData.bedrooms.filter(b => b.trim()),
      amenities: formData.amenities.filter(a => a.trim()),
      images: formData.images.filter(i => i.trim()),
      launchDate: formData.launchDate,
      status: formData.status as 'upcoming' | 'ongoing' | 'completed',
      description: formData.description,
      highlights: formData.highlights.filter(h => h.trim()),
      featured: formData.featured
    };

    onSubmit(projectData);
  };

  const sampleImages = [
    'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
    'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
    'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800&h=600'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-2xl font-bold text-slate-800">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Project Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
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
                name="location"
                value={formData.location}
                onChange={handleInputChange}
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
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter city"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                required
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
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
                name="priceMin"
                value={formData.priceMin}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Minimum price"
                required
              />
              <input
                type="number"
                name="priceMax"
                value={formData.priceMax}
                onChange={handleInputChange}
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
                name="sizeMin"
                value={formData.sizeMin}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Minimum size"
                required
              />
              <input
                type="number"
                name="sizeMax"
                value={formData.sizeMax}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Maximum size"
                required
              />
            </div>
          </div>

          {/* Launch Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Launch Date *
            </label>
            <input
              type="date"
              name="launchDate"
              value={formData.launchDate}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              required
            />
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
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('bedrooms')}
                className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add Configuration</span>
              </button>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Amenities *
            </label>
            <div className="space-y-2">
              {formData.amenities.map((amenity, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={amenity}
                    onChange={(e) => handleArrayChange('amenities', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="e.g., Swimming Pool"
                  />
                  {formData.amenities.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('amenities', index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('amenities')}
                className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add Amenity</span>
              </button>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Project Images *
            </label>
            <div className="space-y-2">
              {formData.images.map((image, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => handleArrayChange('images', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Enter image URL"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayChange('images', index, sampleImages[index % sampleImages.length])}
                    className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition-colors text-sm"
                  >
                    Sample
                  </button>
                  {formData.images.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('images', index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('images')}
                className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add Image</span>
              </button>
            </div>
          </div>

          {/* Project Highlights */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Project Highlights
            </label>
            <div className="space-y-2">
              {formData.highlights.map((highlight, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleArrayChange('highlights', index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="e.g., Prime Location"
                  />
                  {formData.highlights.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeArrayItem('highlights', index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem('highlights')}
                className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add Highlight</span>
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Project Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              placeholder="Enter project description..."
              required
            />
          </div>

          {/* Featured */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
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
              onClick={onClose}
              className="px-6 py-3 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-slate-800 to-amber-500 text-white rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all font-medium"
            >
              {project ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;