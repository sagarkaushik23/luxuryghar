import React, { memo } from 'react';
import { MapPin, Home, ArrowRight, Star } from 'lucide-react';
import type { Database } from '../../lib/supabase';

type Project = Database['public']['Tables']['projects']['Row'];
type Company = Database['public']['Tables']['companies']['Row'];

interface FeaturedProjectsProps {
  projects: Project[];
  companies: Company[];
  onProjectClick: (projectId: string) => void;
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = memo(({ projects, companies, onProjectClick }) => {
  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return `₹${price.toLocaleString()}`;
  };

  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover handpicked premium properties from India's most trusted builders
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const company = companies.find(c => c.id === project.company_id);
            return (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group cursor-pointer"
              onClick={() => onProjectClick(project.id)}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.images?.[0] || 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600'}
                  alt={project.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
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
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-slate-800">
                      {formatPrice(project.price_min)} - {formatPrice(project.price_max)}
                    </p>
                    <p className="text-sm text-slate-500">
                      {project.size_min} - {project.size_max} sq.ft
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-slate-600">
                      <Home className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {project.bedrooms.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.amenities.slice(0, 3).map((amenity) => (
                      <span
                        key={amenity}
                        className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs"
                      >
                        {amenity}
                      </span>
                    ))}
                    {project.amenities.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                        +{project.amenities.length - 3} more
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
          })}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => {}} // This would navigate to all projects
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-slate-800 to-amber-500 text-white rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all transform hover:scale-105 font-medium"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
});

FeaturedProjects.displayName = 'FeaturedProjects';

export default FeaturedProjects;