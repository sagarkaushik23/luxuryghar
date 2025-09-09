export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'company_admin' | 'property_manager' | 'relationship_manager';
  permissions: Permission[];
  companyId?: string;
  isActive: boolean;
  lastLogin: string;
  createdAt: string;
}

export interface Permission {
  module: string;
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve')[];
}

export interface CompanyOwner {
  id: string;
  name: string;
  email: string;
  phone: string;
  companyId: string;
  ownershipPercentage: number;
  registrationDocuments: Document[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  kycStatus: 'pending' | 'completed' | 'expired';
  panCard: string;
  aadharCard: string;
  address: Address;
  bankDetails: BankDetails;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'pan' | 'aadhar' | 'registration' | 'moa' | 'aoa' | 'gst' | 'other';
  url: string;
  uploadedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  status: 'pending' | 'verified' | 'rejected';
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface BankDetails {
  accountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
  accountHolderName: string;
}

export interface FeatureModule {
  id: string;
  name: string;
  description: string;
  completionPercentage: number;
  status: 'not_started' | 'in_progress' | 'testing' | 'completed' | 'deployed';
  subModules: SubModule[];
  assignedTo: string[];
  startDate: string;
  expectedCompletion: string;
  actualCompletion?: string;
  dependencies: string[];
}

export interface SubModule {
  id: string;
  name: string;
  description: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completionPercentage: number;
  assignedTo: string;
  estimatedHours: number;
  actualHours?: number;
}

export interface ROICalculation {
  id: string;
  projectId: string;
  propertyPrice: number;
  rentalIncome: number;
  maintenanceCosts: number;
  appreciationRate: number;
  calculatedROI: number;
  rentalYield: number;
  breakEvenPeriod: number;
  createdAt: string;
  updatedAt: string;
}

export interface MarketTrend {
  id: string;
  location: string;
  propertyType: 'residential' | 'commercial';
  averagePrice: number;
  priceChange: number;
  demandIndex: number;
  supplyIndex: number;
  trendDirection: 'rising' | 'stable' | 'declining';
  lastUpdated: string;
  dataSource: string;
}

export interface CelebrityNeighbor {
  id: string;
  name: string;
  profession: string;
  netWorth?: number;
  privacyLevel: 'public' | 'limited' | 'private';
  verificationStatus: 'verified' | 'pending' | 'unverified';
  projectIds: string[];
  image?: string;
  socialMediaHandles?: SocialMedia[];
}

export interface SocialMedia {
  platform: 'instagram' | 'twitter' | 'linkedin' | 'facebook';
  handle: string;
  followers: number;
}

export interface RelationshipManager {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string[];
  languages: string[];
  experience: number;
  rating: number;
  totalClients: number;
  activeClients: number;
  maxCapacity: number;
  availability: 'available' | 'busy' | 'unavailable';
  assignedProjects: string[];
  performanceMetrics: RMPerformance;
}

export interface RMPerformance {
  totalLeads: number;
  convertedLeads: number;
  conversionRate: number;
  averageResponseTime: number;
  clientSatisfactionScore: number;
  totalSales: number;
  monthlyTarget: number;
}

export interface SiteVisit {
  id: string;
  projectId: string;
  clientId: string;
  rmId: string;
  scheduledDate: string;
  duration: number;
  visitType: 'private' | 'group' | 'virtual';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  followUpRequired: boolean;
  clientFeedback?: ClientFeedback;
}

export interface ClientFeedback {
  rating: number;
  comments: string;
  interests: string[];
  concerns: string[];
  nextSteps: string[];
}

export interface ConciergeService {
  id: string;
  name: string;
  category: 'interior_design' | 'legal_advisory' | 'property_management' | 'home_loans' | 'insurance' | 'other';
  provider: ServiceProvider;
  description: string;
  pricing: ServicePricing;
  availability: boolean;
  rating: number;
  totalBookings: number;
}

export interface ServiceProvider {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  specialization: string[];
  experience: number;
  certifications: string[];
  portfolio: string[];
}

export interface ServicePricing {
  type: 'fixed' | 'hourly' | 'percentage' | 'custom';
  amount: number;
  currency: string;
  description: string;
}

export interface QualityAudit {
  id: string;
  projectId: string;
  auditDate: string;
  auditorName: string;
  auditorCompany: string;
  overallScore: number;
  categories: AuditCategory[];
  recommendations: string[];
  nextAuditDate: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'overdue';
}

export interface AuditCategory {
  name: string;
  score: number;
  maxScore: number;
  comments: string;
  images: string[];
}

export interface ConstructionProgress {
  id: string;
  projectId: string;
  phase: string;
  completionPercentage: number;
  startDate: string;
  expectedEndDate: string;
  actualEndDate?: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'delayed';
  milestones: Milestone[];
  photos: ProgressPhoto[];
  issues: ConstructionIssue[];
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  targetDate: string;
  completedDate?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delayed';
  dependencies: string[];
}

export interface ProgressPhoto {
  id: string;
  url: string;
  caption: string;
  uploadedAt: string;
  uploadedBy: string;
  location: string;
  tags: string[];
}

export interface ConstructionIssue {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  reportedBy: string;
  assignedTo: string;
  reportedAt: string;
  resolvedAt?: string;
  resolution?: string;
}

export interface VirtualTour {
  id: string;
  projectId: string;
  name: string;
  description: string;
  tourUrl: string;
  thumbnailUrl: string;
  duration: number;
  viewCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  accessLevel: 'public' | 'registered' | 'vip';
}

export interface FloorPlan {
  id: string;
  projectId: string;
  name: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  pdfUrl?: string;
  version: string;
  isActive: boolean;
  accessLevel: 'public' | 'registered' | 'vip';
  createdAt: string;
}

export interface LegalDocument {
  id: string;
  projectId: string;
  name: string;
  type: 'rera' | 'approval' | 'clearance' | 'noc' | 'agreement' | 'other';
  documentUrl: string;
  issueDate: string;
  expiryDate?: string;
  issuingAuthority: string;
  verificationStatus: 'pending' | 'verified' | 'expired';
  accessLevel: 'public' | 'registered' | 'vip';
}

export interface AdminDashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalBuilders: number;
  verifiedBuilders: number;
  totalUsers: number;
  premiumUsers: number;
  totalInquiries: number;
  convertedInquiries: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averagePropertyPrice: number;
  topPerformingRMs: RelationshipManager[];
  recentActivities: AdminActivity[];
}

export interface AdminActivity {
  id: string;
  type: 'user_registration' | 'project_added' | 'inquiry_received' | 'payment_completed' | 'document_verified';
  description: string;
  userId?: string;
  projectId?: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'error' | 'success';
}