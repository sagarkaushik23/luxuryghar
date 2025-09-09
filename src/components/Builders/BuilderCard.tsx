import React from 'react';
import { Building2, MapPin, Star, Phone, Mail, ExternalLink, Award, Shield, TrendingUp } from 'lucide-react';
import { Builder } from '../../types';

interface BuilderCardProps {
  builder: Builder;
  onClick: (builderId: string) => void;
}

const BuilderCard: React.FC<BuilderCardProps> = ({ builder, onClick }) => {
  return (
    <div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group cursor-pointer"
      onClick={() => onClick(builder.id)}
    >
      {/* Builder Header */}
      <div className="bg-gradient-to-br from-slate-800 to-amber-500 p-6 text-white">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <img
              src={builder.logo}
              alt={`${builder.name} logo`}
              className="w-12 h-12 rounded-lg object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1 group-hover:text-amber-200 transition-colors">
              {builder.name}
            </h3>
            <div className="flex items-center space-x-2 text-slate-200 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{builder.headquarters}</span>
            </div>
            <div className="flex items-center space-x-4 text-slate-200">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-amber-300 fill-current" />
                <span className="text-sm font-medium">{builder.rating}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">{builder.totalProjects} Projects</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Builder Details */}
      <div className="p-6">
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {builder.description}
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Founded:</span>
            <span className="font-medium text-slate-800">{builder.founded}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Credibility Score:</span>
            <div className="flex items-center space-x-1">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="font-medium text-slate-800">{builder.credibilityScore || 'N/A'}/100</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Total Projects:</span>
            <span className="font-medium text-slate-800">{builder.totalProjects}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">On-Time Delivery:</span>
            <span className="font-medium text-green-600">{builder.completedOnTime || 'N/A'}%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-500">Rating:</span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span className="font-medium text-slate-800">{builder.rating}/5</span>
            </div>
          </div>
        </div>

        {/* Awards & Certifications */}
        {builder.awards && builder.awards.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-slate-700 mb-2 flex items-center">
              <Award className="w-4 h-4 mr-1 text-amber-500" />
              Recent Awards
            </h4>
            <div className="space-y-1">
              {builder.awards.slice(0, 2).map((award, index) => (
                <div key={index} className="text-xs text-slate-600 bg-amber-50 px-2 py-1 rounded">
                  {award}
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Contact Information */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2 text-slate-600">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{builder.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{builder.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-600">
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm">{builder.website}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium">
            View Projects
          </button>
          <button className="flex-1 border border-slate-300 text-slate-700 py-2 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
            Get RM
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuilderCard;