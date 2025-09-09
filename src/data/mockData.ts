import { Builder, Project } from '../types';

export const mockBuilders: Builder[] = [
  {
    id: '1',
    name: 'Sobha Limited',
    logo: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'Sobha Limited is one of the fastest growing and foremost backward integrated real estate players in the country.',
    founded: '1995',
    headquarters: 'Bangalore, India',
    website: 'www.sobha.com',
    phone: '+91 80 4931 4000',
    email: 'info@sobha.com',
    totalProjects: 45,
    rating: 4.5,
    credibilityScore: 92,
    awards: ['Best Luxury Developer 2023', 'Quality Excellence Award', 'Customer Choice Award'],
    certifications: ['ISO 9001:2015', 'IGBC Platinum', 'RERA Certified'],
    completedOnTime: 95,
    customerSatisfaction: 4.6
  },
  {
    id: '2',
    name: 'Godrej Properties',
    logo: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'Godrej Properties is the real estate arm of the Godrej Group, known for innovative and sustainable developments.',
    founded: '1990',
    headquarters: 'Mumbai, India',
    website: 'www.godrejproperties.com',
    phone: '+91 22 2518 8999',
    email: 'info@godrejproperties.com',
    totalProjects: 38,
    rating: 4.3,
    credibilityScore: 89,
    awards: ['Sustainable Developer Award', 'Innovation in Design'],
    certifications: ['IGBC Gold', 'RERA Certified', 'Green Building Council'],
    completedOnTime: 88,
    customerSatisfaction: 4.4
  },
  {
    id: '3',
    name: 'DLF Limited',
    logo: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    description: 'DLF is India\'s largest real estate company in terms of revenues, earnings, market capitalization and developable area.',
    founded: '1946',
    headquarters: 'Gurgaon, India',
    website: 'www.dlf.in',
    phone: '+91 124 4567 100',
    email: 'info@dlf.in',
    totalProjects: 52,
    rating: 4.2,
    credibilityScore: 91,
    awards: ['Luxury Developer of the Year', 'Excellence in Construction'],
    certifications: ['ISO 14001:2015', 'RERA Certified', 'IGBC Platinum'],
    completedOnTime: 92,
    customerSatisfaction: 4.3
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    builderId: '1',
    builderName: 'Sobha Limited',
    name: 'Sobha Royal Pavilion',
    location: 'Sarjapur Road',
    city: 'Bangalore',
    priceRange: { min: 8500000, max: 15000000 },
    sizeRange: { min: 1200, max: 2800 },
    bedrooms: ['2 BHK', '3 BHK', '4 BHK'],
    amenities: ['Swimming Pool', 'Gym', 'Club House', 'Landscaped Gardens', 'Children\'s Play Area', 'Security', 'Power Backup'],
    images: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=800&h=600'
    ],
    launchDate: '2024-03-15',
    status: 'upcoming',
    description: 'Experience luxury living at its finest with Sobha Royal Pavilion. This premium residential project offers meticulously designed apartments with world-class amenities.',
    highlights: ['Premium Location', 'Vastu Compliant', 'World-class Amenities', 'Green Building Certification'],
    featured: true,
    exclusiveAccess: true,
    vipNeighbors: ['Bollywood Actor Akshay Kumar', 'Tech Entrepreneur Vijay Shekhar Sharma', 'Former Cricket Captain Rahul Dravid'],
    investmentMetrics: {
      expectedROI: 18,
      rentalYield: 4.2,
      appreciationRate: 12,
      marketTrend: 'rising'
    },
    qualityScore: 94,
    constructionProgress: 25,
    premiumServices: ['Concierge Service', 'Interior Design Consultation', 'Legal Advisory', 'Property Management', 'Valet Parking'],
    relationshipManager: {
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      email: 'priya.sharma@sobha.com',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'
    },
    virtualTour: 'https://example.com/virtual-tour',
    floorPlans: ['https://example.com/floor-plan-1.pdf', 'https://example.com/floor-plan-2.pdf'],
    legalDocuments: ['RERA Certificate', 'Approved Building Plan', 'Environmental Clearance']
  },
  {
    id: '2',
    builderId: '2',
    builderName: 'Godrej Properties',
    name: 'Godrej Aqua',
    location: 'Hosur Road',
    city: 'Bangalore',
    priceRange: { min: 6500000, max: 12000000 },
    sizeRange: { min: 1000, max: 2400 },
    bedrooms: ['1 BHK', '2 BHK', '3 BHK'],
    amenities: ['Swimming Pool', 'Fitness Center', 'Jogging Track', 'Multipurpose Hall', 'Kids Play Area', '24/7 Security'],
    images: [
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      'https://images.pexels.com/photos/2343465/pexels-photo-2343465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600'
    ],
    launchDate: '2024-01-20',
    status: 'ongoing',
    description: 'Godrej Aqua brings you closer to nature with its serene environment and modern amenities. Perfect for families seeking comfort and convenience.',
    highlights: ['Water-centric Theme', 'Sustainable Design', 'Prime Connectivity', 'Smart Home Features'],
    featured: true
  },
  {
    id: '3',
    builderId: '3',
    builderName: 'DLF Limited',
    name: 'DLF Camellias',
    location: 'Golf Course Road',
    city: 'Gurgaon',
    priceRange: { min: 25000000, max: 50000000 },
    sizeRange: { min: 3500, max: 6000 },
    bedrooms: ['4 BHK', '5 BHK'],
    amenities: ['Private Pool', 'Concierge Service', 'Golf Course View', 'Private Elevator', 'Premium Interiors', 'Valet Parking'],
    images: [
      'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      'https://images.pexels.com/photos/1534/windows-glass-business-office.jpg?auto=compress&cs=tinysrgb&w=800&h=600',
      'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800&h=600'
    ],
    launchDate: '2023-12-01',
    status: 'completed',
    description: 'DLF Camellias represents the pinnacle of luxury living with ultra-premium apartments offering unparalleled sophistication and comfort.',
    highlights: ['Ultra-luxury Segment', 'Golf Course Frontage', 'Branded Interiors', 'Exclusive Amenities'],
    featured: false
  },
  {
    id: '4',
    builderId: '1',
    builderName: 'Sobha Limited',
    name: 'Sobha Dream Acres',
    location: 'Thanisandra Road',
    city: 'Bangalore',
    priceRange: { min: 4500000, max: 9000000 },
    sizeRange: { min: 800, max: 1800 },
    bedrooms: ['1 BHK', '2 BHK', '3 BHK'],
    amenities: ['Clubhouse', 'Swimming Pool', 'Gymnasium', 'Tennis Court', 'Basketball Court', 'Cycling Track'],
    images: [
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=800&h=600'
    ],
    launchDate: '2024-06-01',
    status: 'upcoming',
    description: 'Sobha Dream Acres offers affordable luxury with thoughtfully designed homes in a serene environment.',
    highlights: ['Affordable Luxury', 'Thoughtful Design', 'Great Connectivity', 'Family-friendly'],
    featured: true
  }
];

export const mockUser = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  type: 'user' as const
};

export const mockBuilder = {
  id: '1',
  email: 'admin@sobha.com',
  name: 'Sobha Admin',
  type: 'builder' as const
};