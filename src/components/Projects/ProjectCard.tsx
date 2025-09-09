import React from 'react';
import { MapPin, Home, Calendar, Star, ArrowRight } from 'lucide-react';
import type { Database } from '../../lib/supabase';

type Project = Database['public']['Tables']['projects']['Row'];
type Company = Database['public']['Tables']['companies']['Row'];

interface ProjectCardProps {
  project: Project;
  company?: Company;
  onClick: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, company, onClick }) => {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'TBA';
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return 'TBA';
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group cursor-pointer"
      onClick={() => onClick(project.id)}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <img
          src={project.images?.[0] || 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600'}
          alt={project.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            project.status === 'upcoming' ? 'bg-blue-500' :
            project.status === 'ongoing' ? 'bg-green-500' : 'bg-amber-500'
          }`}>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 bg-black/50 px-2 py-1 rounded-full">
            <Star className="w-3 h-3 text-amber-400 fill-current" />
            <span className="text-white text-xs font-medium">{project.quality_score || 85}/100</span>
          </div>
        </div>
        {project.is_featured && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          </div>
        )}
        {project.exclusive_access && (
          <div className="absolute bottom-4 right-4">
            <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
              VIP Access
            </span>
          </div>
        )}
      </div>

      {/* Project Details */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-amber-600 transition-colors">
            {project.name}
          </h3>
          <div className="flex items-center space-x-2 text-slate-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{project.location}, {project.city}</span>
          </div>
          <p className="text-sm text-slate-500 font-medium">
            by {company?.name || 'Unknown Builder'}
          </p>
        </div>

        {/* Price and Size */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-2xl font-bold text-slate-800">
                {formatPrice(project.price_min)} - {formatPrice(project.price_max)}
              </p>
              <p className="text-sm text-slate-500">
                {project.size_min} - {project.size_max} sq.ft
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 text-slate-600 mb-1">
                <Home className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {project.bedrooms.join(', ')}
                </span>
              </div>
              <div className="flex items-center space-x-1 text-slate-500">
                <Calendar className="w-3 h-3" />
                <span className="text-xs">
                  Launch: {formatDate(project.launch_date)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-1">
            {project.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs"
              >
                {amenity}
              </span>
            ))}
            {project.amenities.length > 4 && (
              <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                +{project.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* View Details Button */}
        <button className="w-full flex items-center justify-center space-x-2 bg-slate-800 text-white py-3 rounded-lg hover:bg-slate-700 transition-colors group-hover:bg-amber-600">
          <span className="font-medium">View Details</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;