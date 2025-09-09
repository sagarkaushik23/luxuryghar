import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Home, Filter } from 'lucide-react';
import { FilterOptions } from '../../types';

interface SearchSectionProps {
  onSearch: (filters: FilterOptions) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 50000000],
    location: '',
    builder: '',
    bedrooms: '',
    amenities: [],
    exclusiveOnly: false,
    minROI: 0,
    minQualityScore: 0,
    hasVipNeighbors: false,
    investmentType: 'residential'
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const priceRanges = [
    { label: 'Any Budget', value: '' },
    { label: '₹50L - ₹1Cr', value: '5000000-10000000' },
    { label: '₹1Cr - ₹2Cr', value: '10000000-20000000' },
    { label: '₹2Cr - ₹5Cr', value: '20000000-50000000' },
    { label: '₹5Cr+', value: '50000000-' }
  ];

  const bedroomOptions = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'];
  const amenityOptions = ['Swimming Pool', 'Gym', 'Club House', 'Parking', 'Security', 'Garden', 'Play Area'];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Exclusive
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              {' '}Luxury Properties
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Premium properties with guaranteed ROI, celebrity neighbors, and dedicated relationship managers.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl border border-white/20">
          <form onSubmit={handleSubmit}>
            {/* Main Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Location (City, Area)"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Price Range */}
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <select
                  value={filters.priceRange.join('-')}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split('-').map(Number);
                    setFilters({ ...filters, priceRange: [min || 0, max || 50000000] });
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all appearance-none"
                >
                  {priceRanges.map((range) => (
                    <option key={range.value} value={range.value} className="text-slate-800">
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bedrooms */}
              <div className="relative">
                <Home className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <select
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all appearance-none"
                >
                  <option value="" className="text-slate-800">Any BHK</option>
                  {bedroomOptions.map((bedroom) => (
                    <option key={bedroom} value={bedroom} className="text-slate-800">
                      {bedroom}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Search</span>
              </button>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Advanced Filters</span>
              </button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Builder */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Builder
                    </label>
                    <input
                      type="text"
                      placeholder="Enter builder name"
                      value={filters.builder}
                      onChange={(e) => setFilters({ ...filters, builder: e.target.value })}
                      className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Investment Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Investment Type
                    </label>
                    <select
                      value={filters.investmentType}
                      onChange={(e) => setFilters({ ...filters, investmentType: e.target.value as 'residential' | 'commercial' | 'both' })}
                      className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all appearance-none"
                    >
                      <option value="residential" className="text-slate-800">Residential</option>
                      <option value="commercial" className="text-slate-800">Commercial</option>
                      <option value="both" className="text-slate-800">Both</option>
                    </select>
                  </div>

                  {/* Minimum ROI */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Minimum ROI (%)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 15"
                      value={filters.minROI || ''}
                      onChange={(e) => setFilters({ ...filters, minROI: Number(e.target.value) })}
                      className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    />
                  </div>
                  {/* Amenities */}
                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Amenities
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {amenityOptions.map((amenity) => (
                        <button
                          key={amenity}
                          type="button"
                          onClick={() => {
                            const newAmenities = filters.amenities.includes(amenity)
                              ? filters.amenities.filter(a => a !== amenity)
                              : [...filters.amenities, amenity];
                            setFilters({ ...filters, amenities: newAmenities });
                          }}
                          className={`px-3 py-1 rounded-full text-sm transition-all ${
                            filters.amenities.includes(amenity)
                              ? 'bg-amber-500 text-white'
                              : 'bg-white/20 text-slate-300 hover:bg-white/30'
                          }`}
                        >
                          {amenity}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Premium Filters */}
                  <div className="md:col-span-2 lg:col-span-3">
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Premium Features
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.exclusiveOnly}
                          onChange={(e) => setFilters({ ...filters, exclusiveOnly: e.target.checked })}
                          className="w-4 h-4 text-amber-500 border-white/30 rounded focus:ring-amber-500 bg-white/20"
                        />
                        <span className="text-slate-300 text-sm">Exclusive Access Only</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.hasVipNeighbors}
                          onChange={(e) => setFilters({ ...filters, hasVipNeighbors: e.target.checked })}
                          className="w-4 h-4 text-amber-500 border-white/30 rounded focus:ring-amber-500 bg-white/20"
                        />
                        <span className="text-slate-300 text-sm">Celebrity Neighbors</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;