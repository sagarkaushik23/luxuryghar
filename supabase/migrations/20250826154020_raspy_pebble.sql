/*
  # Complete Real Estate Platform Schema

  1. Authentication & Users
    - Extended user profiles with roles and preferences
    - Builder profiles with company information
    - Admin users with permissions

  2. Companies & Builders
    - Company registration and verification
    - Builder profiles with credibility scores
    - Document management and KYC

  3. Projects & Properties
    - Complete project information
    - Investment metrics and ROI data
    - Amenities and features

  4. Premium Features
    - Celebrity neighbors and VIP access
    - Relationship managers and assignments
    - Site visits and scheduling

  5. Analytics & Tracking
    - User interactions and inquiries
    - Business metrics and performance
    - Audit logs and security

  6. Documents & Media
    - File storage for images and documents
    - Legal document repository
    - Virtual tours and floor plans
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- User Profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  phone text,
  user_type text NOT NULL DEFAULT 'user' CHECK (user_type IN ('user', 'builder', 'admin')),
  annual_income text,
  investment_budget text,
  preferred_locations text[],
  is_vip boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Companies and Builders
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo_url text,
  description text,
  founded_year integer,
  headquarters text,
  website text,
  phone text,
  email text,
  total_projects integer DEFAULT 0,
  rating numeric(3,2) DEFAULT 0,
  credibility_score integer DEFAULT 0 CHECK (credibility_score >= 0 AND credibility_score <= 100),
  awards text[],
  certifications text[],
  completed_on_time integer DEFAULT 0,
  customer_satisfaction numeric(3,2) DEFAULT 0,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Company Owners (for KYC and verification)
CREATE TABLE IF NOT EXISTS company_owners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  ownership_percentage integer NOT NULL CHECK (ownership_percentage > 0 AND ownership_percentage <= 100),
  pan_card text,
  aadhar_card text,
  address jsonb,
  bank_details jsonb,
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  kyc_status text DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'completed', 'expired')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  location text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  pincode text,
  price_min bigint NOT NULL,
  price_max bigint NOT NULL,
  size_min integer NOT NULL,
  size_max integer NOT NULL,
  bedrooms text[] NOT NULL,
  amenities text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  videos text[] DEFAULT '{}',
  launch_date date,
  expected_completion date,
  status text DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed')),
  is_featured boolean DEFAULT false,
  exclusive_access boolean DEFAULT false,
  quality_score integer DEFAULT 0 CHECK (quality_score >= 0 AND quality_score <= 100),
  construction_progress integer DEFAULT 0 CHECK (construction_progress >= 0 AND construction_progress <= 100),
  highlights text[] DEFAULT '{}',
  virtual_tour_url text,
  floor_plans text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Investment Metrics
CREATE TABLE IF NOT EXISTS investment_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  expected_roi numeric(5,2) NOT NULL,
  rental_yield numeric(5,2) NOT NULL,
  appreciation_rate numeric(5,2) NOT NULL,
  market_trend text DEFAULT 'stable' CHECK (market_trend IN ('rising', 'stable', 'declining')),
  break_even_period integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Celebrity Neighbors (VIP Feature)
CREATE TABLE IF NOT EXISTS celebrity_neighbors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  profession text,
  net_worth bigint,
  privacy_level text DEFAULT 'public' CHECK (privacy_level IN ('public', 'limited', 'private')),
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('verified', 'pending', 'unverified')),
  image_url text,
  social_media jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Relationship Managers
CREATE TABLE IF NOT EXISTS relationship_managers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  specialization text[],
  languages text[],
  experience_years integer DEFAULT 0,
  rating numeric(3,2) DEFAULT 0,
  total_clients integer DEFAULT 0,
  active_clients integer DEFAULT 0,
  max_capacity integer DEFAULT 50,
  availability text DEFAULT 'available' CHECK (availability IN ('available', 'busy', 'unavailable')),
  assigned_projects uuid[],
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Inquiries
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  rm_id uuid REFERENCES relationship_managers(id),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text,
  annual_income text,
  investment_budget text,
  timeframe text,
  preferred_contact text DEFAULT 'email' CHECK (preferred_contact IN ('call', 'whatsapp', 'email')),
  request_private_viewing boolean DEFAULT false,
  request_rm boolean DEFAULT false,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'closed')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Site Visits
CREATE TABLE IF NOT EXISTS site_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id uuid REFERENCES inquiries(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  rm_id uuid REFERENCES relationship_managers(id),
  scheduled_date timestamptz NOT NULL,
  duration_minutes integer DEFAULT 60,
  visit_type text DEFAULT 'private' CHECK (visit_type IN ('private', 'group', 'virtual')),
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
  notes text,
  follow_up_required boolean DEFAULT false,
  client_feedback jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Documents
CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('rera', 'approval', 'clearance', 'noc', 'agreement', 'kyc', 'other')),
  file_url text NOT NULL,
  file_size bigint,
  uploaded_by uuid REFERENCES auth.users(id),
  uploaded_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected', 'expired')),
  expiry_date date,
  verified_by uuid REFERENCES auth.users(id),
  verified_at timestamptz,
  access_level text DEFAULT 'registered' CHECK (access_level IN ('public', 'registered', 'vip', 'admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Business Analytics
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id),
  event_type text NOT NULL,
  event_data jsonb,
  project_id uuid REFERENCES projects(id),
  company_id uuid REFERENCES companies(id),
  session_id text,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Admin Activity Logs
CREATE TABLE IF NOT EXISTS admin_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id uuid,
  old_data jsonb,
  new_data jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Concierge Services
CREATE TABLE IF NOT EXISTS concierge_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('interior_design', 'legal_advisory', 'property_management', 'home_loans', 'insurance', 'other')),
  provider_name text NOT NULL,
  provider_contact jsonb,
  description text,
  pricing jsonb,
  is_available boolean DEFAULT true,
  rating numeric(3,2) DEFAULT 0,
  total_bookings integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Service Requests
CREATE TABLE IF NOT EXISTS service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id uuid REFERENCES concierge_services(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id),
  request_details jsonb,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'assigned', 'in_progress', 'completed', 'cancelled')),
  assigned_to text,
  estimated_cost numeric(10,2),
  actual_cost numeric(10,2),
  scheduled_date timestamptz,
  completed_date timestamptz,
  client_rating integer CHECK (client_rating >= 1 AND client_rating <= 5),
  client_feedback text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_owners ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE celebrity_neighbors ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationship_managers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE concierge_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- User Profiles
CREATE POLICY "Users can read own profile" ON user_profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all profiles" ON user_profiles
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() AND user_type = 'admin'
    )
  );

-- Companies (Public read, builder/admin write)
CREATE POLICY "Anyone can read companies" ON companies
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Builders can manage own company" ON companies
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM company_owners 
      WHERE company_id = companies.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all companies" ON companies
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() AND user_type = 'admin'
    )
  );

-- Projects (Public read, builder/admin write)
CREATE POLICY "Anyone can read projects" ON projects
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Builders can manage own projects" ON projects
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM company_owners 
      WHERE company_id = projects.company_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all projects" ON projects
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() AND user_type = 'admin'
    )
  );

-- Inquiries (Users can read own, builders can read for their projects, admins all)
CREATE POLICY "Users can manage own inquiries" ON inquiries
  FOR ALL TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Builders can read inquiries for their projects" ON inquiries
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects p
      JOIN company_owners co ON p.company_id = co.company_id
      WHERE p.id = inquiries.project_id AND co.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all inquiries" ON inquiries
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() AND user_type = 'admin'
    )
  );

-- Similar policies for other tables...
CREATE POLICY "Public read investment metrics" ON investment_metrics
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Public read celebrity neighbors" ON celebrity_neighbors
  FOR SELECT TO authenticated
  USING (privacy_level = 'public');

CREATE POLICY "VIP users can read limited celebrity neighbors" ON celebrity_neighbors
  FOR SELECT TO authenticated
  USING (
    privacy_level IN ('public', 'limited') AND
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE user_id = auth.uid() AND is_vip = true
    )
  );

-- Functions and Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_company_owners_updated_at BEFORE UPDATE ON company_owners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_investment_metrics_updated_at BEFORE UPDATE ON investment_metrics FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_celebrity_neighbors_updated_at BEFORE UPDATE ON celebrity_neighbors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_relationship_managers_updated_at BEFORE UPDATE ON relationship_managers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_visits_updated_at BEFORE UPDATE ON site_visits FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_concierge_services_updated_at BEFORE UPDATE ON concierge_services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_service_requests_updated_at BEFORE UPDATE ON service_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_type ON user_profiles(user_type);
CREATE INDEX IF NOT EXISTS idx_projects_company_id ON projects(company_id);
CREATE INDEX IF NOT EXISTS idx_projects_city ON projects(city);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_inquiries_user_id ON inquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_project_id ON inquiries(project_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at);