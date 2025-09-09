import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Home, Star, Phone, Mail, User, X, Check, TrendingUp, Shield, Award, Users } from 'lucide-react';
import { Project } from '../../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

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
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to a backend
    console.log('Contact form submitted:', { ...formData, projectId: project.id });
    setFormSubmitted(true);
    setTimeout(() => {
      setShowContactForm(false);
      setFormSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Projects</span>
            </button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-amber-400 fill-current" />
                <span className="text-sm font-medium text-slate-700">{project.qualityScore || 4.5}/100 Quality Score</span>
              </div>
              {project.relationshipManager && (
                <button
                  onClick={() => window.open(`tel:${project.relationshipManager?.phone}`)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all font-medium text-sm"
                >
                  Call RM
                </button>
              )}
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-gradient-to-r from-slate-800 to-amber-500 text-white px-6 py-2 rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all font-medium"
              >
                Contact Builder
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                  project.status === 'upcoming' ? 'bg-blue-500' :
                  project.status === 'ongoing' ? 'bg-green-500' : 'bg-amber-500'
                }`}>
                  {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </span>
                {project.featured && (
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                {project.name}
              </h1>
              <div className="flex items-center space-x-2 text-slate-600 mb-2">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">{project.location}, {project.city}</span>
              </div>
              <p className="text-slate-500 font-medium">
                by {project.builderName}
              </p>
            </div>

            <div className="text-right">
              <p className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                {formatPrice(project.priceRange.min)} - {formatPrice(project.priceRange.max)}
              </p>
              <p className="text-slate-600 mb-4">
                {project.sizeRange.min} - {project.sizeRange.max} sq.ft
              </p>
              <div className="flex items-center justify-end space-x-4 text-slate-600">
                <div className="flex items-center space-x-1">
                  <Home className="w-4 h-4" />
                  <span className="font-medium">{project.bedrooms.join(', ')}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Launch: {formatDate(project.launchDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Metrics */}
        {project.investmentMetrics && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
              <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
              Investment Analysis
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {project.investmentMetrics.expectedROI}%
                </div>
                <p className="text-slate-600 font-medium">Expected ROI</p>
                <p className="text-xs text-slate-500">Annual Returns</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {project.investmentMetrics.rentalYield}%
                </div>
                <p className="text-slate-600 font-medium">Rental Yield</p>
                <p className="text-xs text-slate-500">Monthly Income</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {project.investmentMetrics.appreciationRate}%
                </div>
                <p className="text-slate-600 font-medium">Appreciation</p>
                <p className="text-xs text-slate-500">Capital Growth</p>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold mb-2 ${
                  project.investmentMetrics.marketTrend === 'rising' ? 'text-green-600' :
                  project.investmentMetrics.marketTrend === 'stable' ? 'text-blue-600' : 'text-red-600'
                }`}>
                  {project.investmentMetrics.marketTrend === 'rising' ? '↗️' :
                   project.investmentMetrics.marketTrend === 'stable' ? '→' : '↘️'}
                </div>
                <p className="text-slate-600 font-medium">Market Trend</p>
                <p className="text-xs text-slate-500 capitalize">{project.investmentMetrics.marketTrend}</p>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={project.images[selectedImage]}
                  alt={project.name}
                  className="w-full h-96 object-cover"
                />
                {project.virtualTour && (
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => window.open(project.virtualTour)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium text-sm"
                    >
                      Virtual Tour
                    </button>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === index ? 'border-amber-500' : 'border-white/50'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* VIP Neighbors */}
            {project.vipNeighbors && project.vipNeighbors.length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-purple-600" />
                  Distinguished Neighbors
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.vipNeighbors.map((neighbor, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-slate-700 font-medium">{neighbor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Premium Services */}
            {project.premiumServices && project.premiumServices.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-2 text-amber-600" />
                  Premium Services Included
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.premiumServices.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-amber-50 rounded-lg">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-slate-700 font-medium">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">About This Project</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Project Highlights */}
              <h3 className="text-xl font-bold text-slate-800 mb-4">Project Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-slate-600">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {project.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center justify-center p-4 bg-slate-50 rounded-lg text-center"
                  >
                    <span className="text-slate-700 font-medium text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Location</h2>
              <div className="bg-slate-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p className="font-medium">Interactive Map</p>
                  <p className="text-sm">{project.location}, {project.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Relationship Manager */}
            {project.relationshipManager && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Your Relationship Manager</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={project.relationshipManager.image}
                    alt={project.relationshipManager.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800">{project.relationshipManager.name}</h4>
                    <p className="text-sm text-slate-600">Senior Property Consultant</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => window.open(`tel:${project.relationshipManager?.phone}`)}
                    className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call Now</span>
                  </button>
                  <button
                    onClick={() => window.open(`https://wa.me/${project.relationshipManager?.phone.replace(/[^0-9]/g, '')}`)}
                    className="w-full flex items-center justify-center space-x-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Status:</span>
                  <span className="font-medium text-slate-800 capitalize">{project.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Quality Score:</span>
                  <span className="font-medium text-slate-800">{project.qualityScore || 'N/A'}/100</span>
                </div>
                {project.constructionProgress && (
                  <div className="flex justify-between">
                    <span className="text-slate-600">Construction:</span>
                    <span className="font-medium text-slate-800">{project.constructionProgress}% Complete</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-600">Price Range:</span>
                  <span className="font-medium text-slate-800">
                    {formatPrice(project.priceRange.min)} - {formatPrice(project.priceRange.max)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Size Range:</span>
                  <span className="font-medium text-slate-800">
                    {project.sizeRange.min} - {project.sizeRange.max} sq.ft
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Configurations:</span>
                  <span className="font-medium text-slate-800">
                    {project.bedrooms.join(', ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Launch Date:</span>
                  <span className="font-medium text-slate-800">
                    {formatDate(project.launchDate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Builder */}
            <div className="bg-gradient-to-br from-slate-800 to-amber-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Contact Builder</h3>
              <p className="mb-6 text-slate-100">
                Get detailed information about this project and schedule a site visit.
              </p>
              <button
                onClick={() => setShowContactForm(true)}
                className="w-full bg-white text-slate-800 py-3 rounded-lg font-medium hover:bg-slate-100 transition-colors"
              >
                Send Inquiry
              </button>
            </div>

            {/* Similar Projects */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Similar Projects</h3>
              <p className="text-slate-600 text-sm">
                Discover more projects from {project.builderName} and other premium builders in {project.city}.
              </p>
              <button className="w-full mt-4 bg-slate-100 text-slate-800 py-3 rounded-lg font-medium hover:bg-slate-200 transition-colors">
                View Similar Projects
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800">Contact Builder</h2>
              <button
                onClick={() => setShowContactForm(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {formSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Inquiry Sent!</h3>
                <p className="text-slate-600">
                  Your relationship manager will contact you within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Annual Income
                    </label>
                    <select
                      value={formData.annualIncome || ''}
                      onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Range</option>
                      <option value="50L-1Cr">₹50L - ₹1Cr</option>
                      <option value="1Cr-2Cr">₹1Cr - ₹2Cr</option>
                      <option value="2Cr-5Cr">₹2Cr - ₹5Cr</option>
                      <option value="5Cr+">₹5Cr+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Investment Budget
                    </label>
                    <select
                      value={formData.investmentBudget || ''}
                      onChange={(e) => setFormData({ ...formData, investmentBudget: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Budget</option>
                      <option value="1Cr-2Cr">₹1Cr - ₹2Cr</option>
                      <option value="2Cr-5Cr">₹2Cr - ₹5Cr</option>
                      <option value="5Cr-10Cr">₹5Cr - ₹10Cr</option>
                      <option value="10Cr+">₹10Cr+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.requestPrivateViewing || false}
                      onChange={(e) => setFormData({ ...formData, requestPrivateViewing: e.target.checked })}
                      className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
                    />
                    <span className="text-sm text-slate-700">Request Private Site Visit</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.requestRelationshipManager || false}
                      onChange={(e) => setFormData({ ...formData, requestRelationshipManager: e.target.checked })}
                      className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
                    />
                    <span className="text-sm text-slate-700">Assign Dedicated Relationship Manager</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-slate-800 to-amber-500 text-white py-3 rounded-lg font-medium hover:from-slate-700 hover:to-amber-600 transition-all"
                >
                  Send Premium Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;