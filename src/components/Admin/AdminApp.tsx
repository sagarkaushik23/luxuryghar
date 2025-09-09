import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import AdminDashboard from './Dashboard/AdminDashboard';
import CompanyManagement from './Companies/CompanyManagement';
import FeatureImplementation from './Features/FeatureImplementation';
import ProjectManagement from './Projects/ProjectManagement';
import UserManagement from './Users/UserManagement';
import Analytics from './Analytics/Analytics';
import DocumentManagement from './Documents/DocumentManagement';
import SecurityPermissions from './Security/SecurityPermissions';

const AdminApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'companies':
        return <CompanyManagement />;
      case 'features':
        return <FeatureImplementation />;
      case 'projects':
        return <ProjectManagement />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <Analytics />;
      case 'documents':
        return <DocumentManagement />;
      case 'security':
        return <SecurityPermissions />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <AdminLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderCurrentPage()}
    </AdminLayout>
  );
};

export default AdminApp;