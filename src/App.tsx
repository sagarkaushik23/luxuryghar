import React, { useState, useEffect, lazy, Suspense } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useProjects, useCompanies } from './hooks/useSupabase';
import { supabase } from './lib/supabase';
import Header from './components/Layout/Header';
import SearchSection from './components/Home/SearchSection';
import FeaturedProjects from './components/Home/FeaturedProjects';
import ProjectCard from './components/Projects/ProjectCard';
import { FilterOptions } from './types';
import { Building2, Users, Award, Headphones } from 'lucide-react';

// Lazy load heavy components
const AdminApp = lazy(() => import('./components/Admin/AdminApp'));
const BuilderDashboard = lazy(() => import('./components/Dashboard/BuilderDashboard'));
const ProjectDetail = lazy(() => import('./components/Projects/ProjectDetail'));
const BuilderCard = lazy(() => import('./components/Builders/BuilderCard'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-slate-800 to-amber-500 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
        <Building2 className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">LuxuryGhar</h1>
      <p className="text-slate-600">Loading...</p>
    </div>
  </div>
);

function AppContent() {
  const { user, profile, loading: authLoading } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState<FilterOptions | null>(null);

  // Fetch data from Supabase
  const supabaseEnabled = Boolean(supabase);
  const shouldLoadProjects = (currentPage === 'home' || currentPage === 'projects' || currentPage === 'project-detail');

  const { data: allProjects, loading: projectsLoading } = useProjects(
    shouldLoadProjects ? {} : undefined,
    supabaseEnabled && shouldLoadProjects
  );
  const { data: companies, loading: companiesLoading } = useCompanies(supabaseEnabled);

  // Filter projects based on search criteria
  const filteredProjects = React.useMemo(() => {
    if (!searchFilters) return allProjects;

    return allProjects.filter(project => {
      // Location filter
      if (searchFilters.location) {
        const locationMatch = project.location.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
                             project.city.toLowerCase().includes(searchFilters.location.toLowerCase());
        if (!locationMatch) return false;
      }

      // Builder filter
      if (searchFilters.builder) {
        const company = companies.find(c => c.id === project.company_id);
        if (!company?.name.toLowerCase().includes(searchFilters.builder.toLowerCase())) {
          return false;
        }
      }

      // Bedrooms filter
      if (searchFilters.bedrooms) {
        if (!project.bedrooms.includes(searchFilters.bedrooms)) {
          return false;
        }
      }

      // Amenities filter
      if (searchFilters.amenities.length > 0) {
        const hasAmenity = searchFilters.amenities.some(amenity => 
          project.amenities.includes(amenity)
        );
        if (!hasAmenity) return false;
      }

      // Price range filter
      if (project.price_min > searchFilters.priceRange[1] || 
          project.price_max < searchFilters.priceRange[0]) {
        return false;
      }

      return true;
    });
  }, [allProjects, companies, searchFilters]);

  const selectedProject = selectedProjectId ? 
    allProjects.find(p => p.id === selectedProjectId) : null;

  const handleSearch = (filters: FilterOptions) => {
    setSearchFilters(filters);
    setCurrentPage('projects');
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentPage('project-detail');
  };

  const handleBuilderClick = (builderId: string) => {
    // In a real app, this would navigate to builder profile page
    console.log('Builder clicked:', builderId);
  };

  // Show loading while auth is initializing
  if (authLoading) {
    return <LoadingSpinner />;
  }

  // Role-based routing
  if (profile?.user_type === 'admin') {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <AdminApp />
      </Suspense>
    );
  }

  if (profile?.user_type === 'builder') {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <BuilderDashboard />
      </Suspense>
    );
  }

  // Regular user/buyer interface
  const renderHomePage = () => (
    <>
      <SearchSection onSearch={handleSearch} />
      <FeaturedProjects 
        projects={allProjects.filter(p => p.is_featured)} 
        onProjectClick={handleProjectClick} 
        companies={companies}
      />
      
      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Leading the real estate industry with exceptional properties and satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Building2, label: 'Projects', value: `${allProjects.length}+`, color: 'text-blue-600' },
              { icon: Users, label: 'Happy Families', value: '1,000+', color: 'text-green-600' },
              { icon: Award, label: 'Awards Won', value: '50+', color: 'text-amber-600' },
              { icon: Headphones, label: 'Support', value: '24/7', color: 'text-purple-600' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-2">{stat.value}</h3>
                <p className="text-slate-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  const renderProjectsPage = () => (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">All Projects</h1>
          <p className="text-slate-600">
            {filteredProjects.length} projects found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              company={companies.find(c => c.id === project.company_id)}
              onClick={handleProjectClick}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No Projects Found</h3>
            <p className="text-slate-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderBuildersPage = () => (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Trusted Builders</h1>
          <p className="text-slate-600">
            Discover India's leading real estate developers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company) => (
            <Suspense key={company.id} fallback={<div className="h-64 bg-slate-100 rounded-2xl animate-pulse" />}>
              <BuilderCard
                builder={{
                  id: company.id,
                  name: company.name,
                  logo: company.logo_url || 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
                  description: company.description || '',
                  founded: company.founded_year?.toString() || 'N/A',
                  headquarters: company.headquarters || 'N/A',
                  website: company.website || 'N/A',
                  phone: company.phone || 'N/A',
                  email: company.email || 'N/A',
                  totalProjects: company.total_projects,
                  rating: company.rating,
                  credibilityScore: company.credibility_score,
                  awards: company.awards || [],
                  certifications: company.certifications || [],
                  completedOnTime: company.completed_on_time,
                  customerSatisfaction: company.customer_satisfaction
                }}
                onClick={handleBuilderClick}
              />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContactPage = () => (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Contact Us</h1>
          <p className="text-xl text-slate-600">
            Get in touch with our team for personalized assistance
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter your phone"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter subject"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                placeholder="Enter your message..."
              />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-slate-800 to-amber-500 text-white py-3 rounded-lg font-medium hover:from-slate-700 hover:to-amber-600 transition-all transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return renderHomePage();
      case 'projects':
        return renderProjectsPage();
      case 'builders':
        return renderBuildersPage();
      case 'contact':
        return renderContactPage();
      case 'project-detail':
        return selectedProject ? (
          <Suspense fallback={<LoadingSpinner />}>
            <ProjectDetail
              project={{
                id: selectedProject.id,
                builderId: selectedProject.company_id,
                builderName: companies.find(c => c.id === selectedProject.company_id)?.name || 'Unknown',
                name: selectedProject.name,
                location: selectedProject.location,
                city: selectedProject.city,
                priceRange: { min: selectedProject.price_min, max: selectedProject.price_max },
                sizeRange: { min: selectedProject.size_min, max: selectedProject.size_max },
                bedrooms: selectedProject.bedrooms,
                amenities: selectedProject.amenities,
                images: selectedProject.images,
                videos: selectedProject.videos,
                launchDate: selectedProject.launch_date || '',
                status: selectedProject.status,
                description: selectedProject.description || '',
                highlights: selectedProject.highlights,
                featured: selectedProject.is_featured,
                qualityScore: selectedProject.quality_score,
                constructionProgress: selectedProject.construction_progress,
                virtualTour: selectedProject.virtual_tour_url
              }}
              onBack={() => setCurrentPage('projects')}
            />
          </Suspense>
        ) : renderProjectsPage();
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        currentPage={currentPage} 
        onNavigate={setCurrentPage}
      />
      {renderCurrentPage()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;