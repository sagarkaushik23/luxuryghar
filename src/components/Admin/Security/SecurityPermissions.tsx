import React, { useState } from 'react';
import { 
  Shield, 
  Users, 
  Key, 
  Lock, 
  Eye, 
  Edit3, 
  Trash2,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Activity,
  Clock
} from 'lucide-react';

interface Permission {
  module: string;
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve')[];
}

interface AdminUser {
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

interface SecurityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
  status: 'success' | 'failed' | 'blocked';
  details: string;
}

const SecurityPermissions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'permissions' | 'logs'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const mockAdminUsers: AdminUser[] = [
    {
      id: '1',
      name: 'EliteHomes Super Admin',
      email: 'admin@elitehomes.com',
      role: 'super_admin',
      permissions: [
        { module: 'all', actions: ['create', 'read', 'update', 'delete', 'approve'] }
      ],
      isActive: true,
      lastLogin: '2024-01-20T10:30:00Z',
      createdAt: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      name: 'Sobha Company Admin',
      email: 'admin@sobha.com',
      role: 'company_admin',
      permissions: [
        { module: 'projects', actions: ['create', 'read', 'update', 'delete'] },
        { module: 'documents', actions: ['create', 'read', 'update'] },
        { module: 'users', actions: ['read'] }
      ],
      companyId: '1',
      isActive: true,
      lastLogin: '2024-01-19T15:45:00Z',
      createdAt: '2024-01-05T00:00:00Z'
    },
    {
      id: '3',
      name: 'Property Manager - Mumbai',
      email: 'pm.mumbai@elitehomes.com',
      role: 'property_manager',
      permissions: [
        { module: 'projects', actions: ['read', 'update'] },
        { module: 'inquiries', actions: ['read', 'update'] },
        { module: 'site_visits', actions: ['create', 'read', 'update'] }
      ],
      isActive: true,
      lastLogin: '2024-01-20T09:15:00Z',
      createdAt: '2024-01-10T00:00:00Z'
    },
    {
      id: '4',
      name: 'Relationship Manager - Priya',
      email: 'priya.rm@elitehomes.com',
      role: 'relationship_manager',
      permissions: [
        { module: 'inquiries', actions: ['read', 'update'] },
        { module: 'site_visits', actions: ['create', 'read', 'update'] },
        { module: 'clients', actions: ['read', 'update'] }
      ],
      isActive: false,
      lastLogin: '2024-01-15T14:20:00Z',
      createdAt: '2024-01-12T00:00:00Z'
    }
  ];

  const mockSecurityLogs: SecurityLog[] = [
    {
      id: '1',
      userId: '1',
      userName: 'EliteHomes Super Admin',
      action: 'LOGIN',
      resource: 'Admin Panel',
      timestamp: '2024-01-20T10:30:00Z',
      ipAddress: '192.168.1.100',
      status: 'success',
      details: 'Successful login from trusted device'
    },
    {
      id: '2',
      userId: '2',
      userName: 'Sobha Company Admin',
      action: 'CREATE_PROJECT',
      resource: 'Project: Sobha Royal Pavilion',
      timestamp: '2024-01-19T15:45:00Z',
      ipAddress: '203.192.12.45',
      status: 'success',
      details: 'Created new project with all required documents'
    },
    {
      id: '3',
      userId: 'unknown',
      userName: 'Unknown User',
      action: 'LOGIN_ATTEMPT',
      resource: 'Admin Panel',
      timestamp: '2024-01-19T02:15:00Z',
      ipAddress: '45.123.67.89',
      status: 'blocked',
      details: 'Multiple failed login attempts - IP blocked'
    },
    {
      id: '4',
      userId: '3',
      userName: 'Property Manager - Mumbai',
      action: 'UPDATE_PROJECT',
      resource: 'Project: Godrej Aqua',
      timestamp: '2024-01-18T11:30:00Z',
      ipAddress: '192.168.1.105',
      status: 'success',
      details: 'Updated project status and construction progress'
    },
    {
      id: '5',
      userId: '4',
      userName: 'Relationship Manager - Priya',
      action: 'ACCESS_DENIED',
      resource: 'User Management',
      timestamp: '2024-01-15T14:25:00Z',
      ipAddress: '192.168.1.110',
      status: 'failed',
      details: 'Attempted to access restricted module'
    }
  ];

  const filteredUsers = mockAdminUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'company_admin': return 'bg-blue-100 text-blue-800';
      case 'property_manager': return 'bg-green-100 text-green-800';
      case 'relationship_manager': return 'bg-purple-100 text-purple-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'blocked': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      default: return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'blocked': return 'bg-amber-100 text-amber-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const stats = [
    {
      label: 'Total Admin Users',
      value: mockAdminUsers.length,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      label: 'Active Sessions',
      value: mockAdminUsers.filter(u => u.isActive).length,
      icon: Activity,
      color: 'bg-green-500'
    },
    {
      label: 'Security Events',
      value: mockSecurityLogs.length,
      icon: Shield,
      color: 'bg-amber-500'
    },
    {
      label: 'Blocked Attempts',
      value: mockSecurityLogs.filter(l => l.status === 'blocked').length,
      icon: Lock,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Security & Permissions</h1>
          <p className="text-slate-600 mt-1">Manage admin users, roles, and security settings</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-slate-800 to-amber-500 text-white rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Admin User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-slate-600 text-sm">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'users', label: 'Admin Users', icon: Users },
              { id: 'permissions', label: 'Role Permissions', icon: Key },
              { id: 'logs', label: 'Security Logs', icon: Activity }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-amber-500 text-amber-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search admin users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent w-64"
                  />
                </div>
                
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="all">All Roles</option>
                    <option value="super_admin">Super Admin</option>
                    <option value="company_admin">Company Admin</option>
                    <option value="property_manager">Property Manager</option>
                    <option value="relationship_manager">Relationship Manager</option>
                  </select>
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User Details</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Permissions</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Last Login</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-slate-800">{user.name}</h4>
                              <p className="text-sm text-slate-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                            {user.role.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-slate-800">
                              {user.permissions.length} modules
                            </div>
                            <div className="text-slate-500">
                              {user.permissions[0]?.module === 'all' ? 'Full Access' : 'Limited Access'}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className={`text-sm font-medium ${user.isActive ? 'text-green-600' : 'text-red-600'}`}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-700">
                            {new Date(user.lastLogin).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                              title="View User"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Edit User"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors"
                              title="Manage Permissions"
                            >
                              <Key className="w-4 h-4" />
                            </button>
                            <button
                              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    role: 'Super Admin',
                    description: 'Full system access and control',
                    permissions: ['All Modules', 'User Management', 'System Settings', 'Security Controls'],
                    color: 'bg-red-100 text-red-800'
                  },
                  {
                    role: 'Company Admin',
                    description: 'Manage company projects and documents',
                    permissions: ['Project Management', 'Document Upload', 'Company Profile', 'User Reports'],
                    color: 'bg-blue-100 text-blue-800'
                  },
                  {
                    role: 'Property Manager',
                    description: 'Manage properties and client interactions',
                    permissions: ['Project Updates', 'Inquiry Management', 'Site Visit Scheduling', 'Client Reports'],
                    color: 'bg-green-100 text-green-800'
                  },
                  {
                    role: 'Relationship Manager',
                    description: 'Handle client relationships and inquiries',
                    permissions: ['Client Management', 'Inquiry Responses', 'Site Visit Coordination', 'Follow-ups'],
                    color: 'bg-purple-100 text-purple-800'
                  }
                ].map((role) => (
                  <div key={role.role} className="border border-slate-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-800">{role.role}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${role.color}`}>
                        {role.role.replace(' ', '_').toLowerCase()}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-4">{role.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-medium text-slate-700">Permissions:</h4>
                      <div className="space-y-1">
                        {role.permissions.map((permission) => (
                          <div key={permission} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-slate-600">{permission}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="mt-4 w-full bg-slate-100 text-slate-700 py-2 rounded-lg hover:bg-slate-200 transition-colors">
                      Edit Permissions
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Action</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Resource</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">IP Address</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {mockSecurityLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-slate-800">{log.userName}</div>
                            <div className="text-slate-500">ID: {log.userId}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-slate-800">{log.action}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-700">{log.resource}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(log.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                              {log.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-700 font-mono">{log.ipAddress}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-700">
                            {new Date(log.timestamp).toLocaleString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-gradient-to-r from-slate-800 to-amber-500 rounded-2xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Lock className="w-6 h-6 text-amber-300" />
              <h3 className="font-semibold">Two-Factor Authentication</h3>
            </div>
            <p className="text-sm text-slate-200 mb-3">Enhanced security for admin accounts</p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
              Configure 2FA
            </button>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-6 h-6 text-amber-300" />
              <h3 className="font-semibold">IP Whitelist</h3>
            </div>
            <p className="text-sm text-slate-200 mb-3">Restrict access to trusted IP addresses</p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
              Manage IPs
            </button>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Settings className="w-6 h-6 text-amber-300" />
              <h3 className="font-semibold">Session Management</h3>
            </div>
            <p className="text-sm text-slate-200 mb-3">Control session timeouts and limits</p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
              Configure Sessions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPermissions;