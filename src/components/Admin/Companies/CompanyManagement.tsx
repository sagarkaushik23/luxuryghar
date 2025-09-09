import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Eye, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Clock,
  Building2,
  Phone,
  Mail,
  MapPin,
  FileText,
  AlertTriangle
} from 'lucide-react';
import { CompanyOwner } from '../../../types/admin';

const CompanyManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState<CompanyOwner | null>(null);
  const [showModal, setShowModal] = useState(false);

  const mockCompanies: CompanyOwner[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh@sobha.com',
      phone: '+91 98765 43210',
      companyId: '1',
      ownershipPercentage: 45,
      registrationDocuments: [
        { id: '1', name: 'PAN Card', type: 'pan', url: '#', uploadedAt: '2024-01-15', status: 'verified' },
        { id: '2', name: 'Aadhar Card', type: 'aadhar', url: '#', uploadedAt: '2024-01-15', status: 'verified' },
        { id: '3', name: 'Company Registration', type: 'registration', url: '#', uploadedAt: '2024-01-15', status: 'verified' }
      ],
      verificationStatus: 'verified',
      kycStatus: 'completed',
      panCard: 'ABCDE1234F',
      aadharCard: '1234-5678-9012',
      address: {
        street: '123 Business District',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560001',
        country: 'India'
      },
      bankDetails: {
        accountNumber: '1234567890',
        ifscCode: 'HDFC0001234',
        bankName: 'HDFC Bank',
        branchName: 'MG Road Branch',
        accountHolderName: 'Rajesh Kumar'
      },
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya@godrej.com',
      phone: '+91 98765 43211',
      companyId: '2',
      ownershipPercentage: 30,
      registrationDocuments: [
        { id: '4', name: 'PAN Card', type: 'pan', url: '#', uploadedAt: '2024-01-10', status: 'verified' },
        { id: '5', name: 'Aadhar Card', type: 'aadhar', url: '#', uploadedAt: '2024-01-10', status: 'pending' }
      ],
      verificationStatus: 'pending',
      kycStatus: 'pending',
      panCard: 'FGHIJ5678K',
      aadharCard: '9876-5432-1098',
      address: {
        street: '456 Corporate Avenue',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400001',
        country: 'India'
      },
      bankDetails: {
        accountNumber: '0987654321',
        ifscCode: 'ICICI0005678',
        bankName: 'ICICI Bank',
        branchName: 'Bandra Branch',
        accountHolderName: 'Priya Sharma'
      },
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12'
    }
  ];

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || company.verificationStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-slate-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Company Management</h1>
          <p className="text-slate-600 mt-1">Manage company owners and verification status</p>
        </div>
        <button className="px-4 py-2 bg-gradient-to-r from-slate-800 to-amber-500 text-white rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Company Owner</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent w-64"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-slate-600">
            <span>Total: {filteredCompanies.length} companies</span>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Owner Details</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Company Info</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Ownership</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Verification</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">KYC Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{company.name}</h4>
                        <div className="flex items-center space-x-1 text-sm text-slate-500">
                          <Mail className="w-3 h-3" />
                          <span>{company.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-slate-500">
                          <Phone className="w-3 h-3" />
                          <span>{company.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="font-medium text-slate-800">Company ID: {company.companyId}</p>
                      <div className="flex items-center space-x-1 text-slate-500 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span>{company.address.city}, {company.address.state}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-800">{company.ownershipPercentage}%</div>
                      <div className="text-xs text-slate-500">Ownership</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(company.verificationStatus)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(company.verificationStatus)}`}>
                        {company.verificationStatus}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {company.registrationDocuments.length} documents
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(company.kycStatus)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(company.kycStatus)}`}>
                        {company.kycStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedCompany(company);
                          setShowModal(true);
                        }}
                        className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Company"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-lg transition-colors"
                        title="Verify Documents"
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

      {/* Company Details Modal */}
      {showModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-800">Company Owner Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Full Name</label>
                      <p className="text-slate-800">{selectedCompany.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Email</label>
                      <p className="text-slate-800">{selectedCompany.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Phone</label>
                      <p className="text-slate-800">{selectedCompany.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">PAN Card</label>
                      <p className="text-slate-800">{selectedCompany.panCard}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Aadhar Card</label>
                      <p className="text-slate-800">{selectedCompany.aadharCard}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">Company Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Company ID</label>
                      <p className="text-slate-800">{selectedCompany.companyId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Ownership Percentage</label>
                      <p className="text-slate-800">{selectedCompany.ownershipPercentage}%</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Verification Status</label>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedCompany.verificationStatus)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCompany.verificationStatus)}`}>
                          {selectedCompany.verificationStatus}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">KYC Status</label>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedCompany.kycStatus)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCompany.kycStatus)}`}>
                          {selectedCompany.kycStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Address Information</h3>
                <div className="bg-slate-50 rounded-lg p-4">
                  <p className="text-slate-800">
                    {selectedCompany.address.street}<br />
                    {selectedCompany.address.city}, {selectedCompany.address.state} - {selectedCompany.address.pincode}<br />
                    {selectedCompany.address.country}
                  </p>
                </div>
              </div>

              {/* Bank Details */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Bank Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-600">Account Number</label>
                    <p className="text-slate-800">{selectedCompany.bankDetails.accountNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">IFSC Code</label>
                    <p className="text-slate-800">{selectedCompany.bankDetails.ifscCode}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Bank Name</label>
                    <p className="text-slate-800">{selectedCompany.bankDetails.bankName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-600">Branch Name</label>
                    <p className="text-slate-800">{selectedCompany.bankDetails.branchName}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Registration Documents</h3>
                <div className="space-y-3">
                  {selectedCompany.registrationDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-slate-600" />
                        <div>
                          <p className="font-medium text-slate-800">{doc.name}</p>
                          <p className="text-sm text-slate-500">Uploaded: {doc.uploadedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                        <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Close
                </button>
                <button className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                  Verify Documents
                </button>
                <button className="px-6 py-2 bg-gradient-to-r from-slate-800 to-amber-500 text-white rounded-lg hover:from-slate-700 hover:to-amber-600 transition-all">
                  Approve Company
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyManagement;