import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Eye, 
  Shield,
  User,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Crown,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'user' | 'builder' | 'vip';
  registrationDate: string;
  lastActive: string;
  totalInquiries: number;
  totalInvestment: number;
  status: 'active' | 'inactive' | 'suspended';
  verificationStatus: 'verified' | 'pending' | 'rejected';
  annualIncome?: string;
  investmentBudget?: string;
}

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockUsers: UserData[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@gmail.com',
      phone: '+91 98765 43210',
      type: 'vip',
      registrationDate: '2024-01-15',
      lastActive: '2024-01-20',
      totalInquiries: 12,
      totalInvestment: 25000000,
      status: 'active',
      verificationStatus: 'verified',
      annualIncome: '₹2Cr+',
      investmentBudget: '₹5Cr-10Cr'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@yahoo.com',
      phone: '+91 98765 43211',
      type: 'user',
      registrationDate: '2024-01-10',
      lastActive: '2024-01-19',
      totalInquiries: 5,
      totalInvestment: 8500000,
      status: 'active',
      verificationStatus: 'verified',
      annualIncome: '₹1Cr-2Cr',
      investmentBudget: '₹2Cr-5Cr'
    },
    {
      id: '3',
      name: 'Amit Patel',
      email: 'amit.patel@hotmail.com',
      phone: '+91 98765 43212',
      type: 'user',
      registrationDate: '2024-01-08',
      lastActive: '2024-01-18',
      totalInquiries: 3,
      totalInvestment: 0,
      status: 'active',
      verificationStatus: 'pending',
      annualIncome: '₹50L-1Cr',
      investmentBudget: '₹1Cr-2Cr'
    },
    {
      id: '4',
      name: 'Sobha Limited Admin',
      email: 'admin@sobha.com',
      phone: '+91 80 4931 4000',
      type: 'builder',
      registrationDate: '2024-01-01',
      lastActive: '2024-01-20',
      totalInquiries: 0,
      totalInvestment: 0,
      status: 'active',
      verificationStatus: 'verified'
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || user.type === filterType;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatPrice = (price: number) => {
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(1)}Cr`;
    }
    if (price >= 100000) {
      return `₹${(price / 100000).toFixed(1)}L`;
    }
    return price > 0 ? `₹${price.toLocaleString()}` : '₹0';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'suspended': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-amber-100 text-amber-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case 'vip': return <Crown className="w-4 h-4 text-amber-500" />;
      case 'builder': return <Shield className="w-4 h-4 text-blue-500" />;
      default: return <User className="w-4 h-4 text-slate-500" />;
    }
  };

  const stats = [
    {
      label: 'Total Users',
      value: mockUsers.length,
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      label: 'VIP Users',
      value: mockUsers.filter(u => u.type === 'vip').length,
      icon: Crown,
      color: 'bg-amber-500'
    },
    {
      label: 'Active Users',
      value: mockUsers.filter(u => u.status === 'active').length,
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      label: 'Total Investment',
      value: formatPrice(mockUsers.reduce((sum, u) => sum + u.totalInvestment, 0)),
      icon: DollarSign,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-600 mt-1">Manage all users, builders, and VIP members</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-slate-800 to-amber-500 text-white rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add User</span>
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

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent w-64"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Types</option>
                <option value="user">Regular Users</option>
                <option value="vip">VIP Users</option>
                <option value="builder">Builders</option>
              </select>
            </div>

            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <span>Total: {filteredUsers.length} users</span>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User Details</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Activity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Investment</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                        {getUserTypeIcon(user.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 flex items-center space-x-2">
                          <span>{user.name}</span>
                          {user.type === 'vip' && (
                            <Crown className="w-4 h-4 text-amber-500" />
                          )}
                        </h4>
                        <div className="text-sm text-slate-500">
                          Joined: {new Date(user.registrationDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-1 text-sm text-slate-700">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-slate-700">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span>{user.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.type === 'vip' ? 'bg-amber-100 text-amber-800' :
                        user.type === 'builder' ? 'bg-blue-100 text-blue-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {user.type.toUpperCase()}
                      </span>
                      <div className="text-xs text-slate-500">
                        <span className={`px-2 py-1 rounded-full ${getVerificationColor(user.verificationStatus)}`}>
                          {user.verificationStatus}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-slate-800">{user.totalInquiries} inquiries</div>
                      <div className="text-slate-500">
                        Last active: {new Date(user.lastActive).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-slate-800">
                        {formatPrice(user.totalInvestment)}
                      </div>
                      {user.investmentBudget && (
                        <div className="text-slate-500">
                          Budget: {user.investmentBudget}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(user.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
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
                        <Shield className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;