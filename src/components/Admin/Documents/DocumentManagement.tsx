import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Shield,
  AlertTriangle,
  Upload,
  Trash2
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'rera' | 'approval' | 'clearance' | 'noc' | 'agreement' | 'kyc' | 'other';
  projectId?: string;
  projectName?: string;
  builderId: string;
  builderName: string;
  uploadedBy: string;
  uploadedAt: string;
  fileSize: string;
  status: 'pending' | 'verified' | 'rejected' | 'expired';
  expiryDate?: string;
  verifiedBy?: string;
  verifiedAt?: string;
  accessLevel: 'public' | 'registered' | 'vip' | 'admin';
}

const DocumentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const mockDocuments: Document[] = [
    {
      id: '1',
      name: 'RERA Certificate - Sobha Royal Pavilion',
      type: 'rera',
      projectId: '1',
      projectName: 'Sobha Royal Pavilion',
      builderId: '1',
      builderName: 'Sobha Limited',
      uploadedBy: 'Sobha Admin',
      uploadedAt: '2024-01-15',
      fileSize: '2.4 MB',
      status: 'verified',
      expiryDate: '2026-01-15',
      verifiedBy: 'EliteHomes Admin',
      verifiedAt: '2024-01-16',
      accessLevel: 'public'
    },
    {
      id: '2',
      name: 'Environmental Clearance - Godrej Aqua',
      type: 'clearance',
      projectId: '2',
      projectName: 'Godrej Aqua',
      builderId: '2',
      builderName: 'Godrej Properties',
      uploadedBy: 'Godrej Admin',
      uploadedAt: '2024-01-10',
      fileSize: '1.8 MB',
      status: 'pending',
      expiryDate: '2025-12-31',
      accessLevel: 'registered'
    },
    {
      id: '3',
      name: 'Building Approval - DLF Camellias',
      type: 'approval',
      projectId: '3',
      projectName: 'DLF Camellias',
      builderId: '3',
      builderName: 'DLF Limited',
      uploadedBy: 'DLF Admin',
      uploadedAt: '2024-01-08',
      fileSize: '3.2 MB',
      status: 'verified',
      verifiedBy: 'EliteHomes Admin',
      verifiedAt: '2024-01-09',
      accessLevel: 'vip'
    },
    {
      id: '4',
      name: 'Fire NOC - Sobha Dream Acres',
      type: 'noc',
      projectId: '4',
      projectName: 'Sobha Dream Acres',
      builderId: '1',
      builderName: 'Sobha Limited',
      uploadedBy: 'Sobha Admin',
      uploadedAt: '2024-01-05',
      fileSize: '1.2 MB',
      status: 'expired',
      expiryDate: '2024-01-01',
      accessLevel: 'registered'
    },
    {
      id: '5',
      name: 'Company Registration - Sobha Limited',
      type: 'kyc',
      builderId: '1',
      builderName: 'Sobha Limited',
      uploadedBy: 'Sobha Admin',
      uploadedAt: '2024-01-01',
      fileSize: '0.8 MB',
      status: 'verified',
      verifiedBy: 'EliteHomes Admin',
      verifiedAt: '2024-01-02',
      accessLevel: 'admin'
    }
  ];

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.builderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (doc.projectName && doc.projectName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'all' || doc.type === filterType;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'expired': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'rera': return <Shield className="w-4 h-4 text-blue-500" />;
      case 'approval': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'clearance': return <FileText className="w-4 h-4 text-purple-500" />;
      case 'noc': return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'agreement': return <FileText className="w-4 h-4 text-slate-500" />;
      case 'kyc': return <Shield className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4 text-slate-500" />;
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'public': return 'bg-green-100 text-green-800';
      case 'registered': return 'bg-blue-100 text-blue-800';
      case 'vip': return 'bg-amber-100 text-amber-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const stats = [
    {
      label: 'Total Documents',
      value: mockDocuments.length,
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      label: 'Pending Verification',
      value: mockDocuments.filter(d => d.status === 'pending').length,
      icon: Clock,
      color: 'bg-amber-500'
    },
    {
      label: 'Verified Documents',
      value: mockDocuments.filter(d => d.status === 'verified').length,
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      label: 'Expired/Rejected',
      value: mockDocuments.filter(d => d.status === 'expired' || d.status === 'rejected').length,
      icon: AlertTriangle,
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Document Management</h1>
          <p className="text-slate-600 mt-1">Manage and verify all legal documents and certifications</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-slate-800 to-amber-500 text-white rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all flex items-center space-x-2">
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
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
                placeholder="Search documents..."
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
                <option value="rera">RERA Certificate</option>
                <option value="approval">Building Approval</option>
                <option value="clearance">Environmental Clearance</option>
                <option value="noc">NOC Documents</option>
                <option value="agreement">Agreements</option>
                <option value="kyc">KYC Documents</option>
                <option value="other">Other</option>
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
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <span>Total: {filteredDocuments.length} documents</span>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Document Details</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Project/Builder</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Upload Info</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Access Level</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Expiry</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      {getTypeIcon(doc.type)}
                      <div>
                        <h4 className="font-semibold text-slate-800">{doc.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-slate-500">
                          <span className="capitalize">{doc.type.replace('_', ' ')}</span>
                          <span>•</span>
                          <span>{doc.fileSize}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-slate-800">{doc.builderName}</div>
                      {doc.projectName && (
                        <div className="text-sm text-slate-500">{doc.projectName}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-slate-700">By: {doc.uploadedBy}</div>
                      <div className="text-slate-500">
                        {new Date(doc.uploadedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(doc.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                      {doc.verifiedBy && (
                        <div className="text-xs text-slate-500">
                          By: {doc.verifiedBy}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccessLevelColor(doc.accessLevel)}`}>
                      {doc.accessLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {doc.expiryDate ? (
                      <div className="text-sm">
                        <div className={`font-medium ${
                          new Date(doc.expiryDate) < new Date() ? 'text-red-600' : 'text-slate-800'
                        }`}>
                          {new Date(doc.expiryDate).toLocaleDateString()}
                        </div>
                        {new Date(doc.expiryDate) < new Date() && (
                          <div className="text-xs text-red-500">Expired</div>
                        )}
                      </div>
                    ) : (
                      <span className="text-slate-400 text-sm">No expiry</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Document"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Download Document"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      {doc.status === 'pending' && (
                        <button
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                          title="Verify Document"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Document"
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

      {/* Document Verification Actions */}
      <div className="bg-gradient-to-r from-slate-800 to-amber-500 rounded-2xl shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Document Verification Center</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-semibold mb-2">Pending Verification</h3>
            <p className="text-2xl font-bold mb-2">
              {mockDocuments.filter(d => d.status === 'pending').length}
            </p>
            <p className="text-sm text-slate-200">Documents awaiting review</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-semibold mb-2">Expiring Soon</h3>
            <p className="text-2xl font-bold mb-2">
              {mockDocuments.filter(d => 
                d.expiryDate && 
                new Date(d.expiryDate) > new Date() && 
                new Date(d.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
              ).length}
            </p>
            <p className="text-sm text-slate-200">Documents expiring in 30 days</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <h3 className="font-semibold mb-2">Compliance Rate</h3>
            <p className="text-2xl font-bold mb-2">
              {Math.round((mockDocuments.filter(d => d.status === 'verified').length / mockDocuments.length) * 100)}%
            </p>
            <p className="text-sm text-slate-200">Documents verified and compliant</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManagement;