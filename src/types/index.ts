export interface User {
  id: string;
  email: string;
  name: string;
  type: 'user' | 'builder' | 'admin';
}

export interface Builder {
  id: string;
  name: string;
  logo: string;
  description: string;
  founded: string;
  headquarters: string;
  website: string;
  phone: string;
  email: string;
  totalProjects: number;
  rating: number;
}

export interface Project {
  id: string;
  builderId: string;
  builderName: string;
  name: string;
  location: string;
  city: string;
  priceRange: {
    min: number;
    max: number;
  };
  sizeRange: {
    min: number;
    max: number;
  };
  bedrooms: string[];
  amenities: string[];
  images: string[];
  videos?: string[];
  launchDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
  highlights: string[];
  featured: boolean;
  // Premium Features
  exclusiveAccess?: boolean;
  vipNeighbors?: string[];
  investmentMetrics?: {
    expectedROI: number;
    rentalYield: number;
    appreciationRate: number;
    marketTrend: 'rising' | 'stable' | 'declining';
  };
  qualityScore?: number;
  constructionProgress?: number;
  premiumServices?: string[];
  relationshipManager?: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  virtualTour?: string;
  floorPlans?: string[];
  legalDocuments?: string[];
  // Premium Features
  credibilityScore?: number;
  awards?: string[];
  certifications?: string[];
  completedOnTime?: number;
  customerSatisfaction?: number;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  projectId: string;
  // Premium Features
  annualIncome?: string;
  investmentBudget?: string;
  timeframe?: string;
  preferredContact?: 'call' | 'whatsapp' | 'email';
  requestPrivateViewing?: boolean;
  requestRelationshipManager?: boolean;
}

export interface FilterOptions {
  priceRange: [number, number];
  location: string;
  builder: string;
  bedrooms: string;
  amenities: string[];
  // Premium Filters
  exclusiveOnly?: boolean;
  minROI?: number;
  minQualityScore?: number;
  hasVipNeighbors?: boolean;
  investmentType?: 'residential' | 'commercial' | 'both';
}