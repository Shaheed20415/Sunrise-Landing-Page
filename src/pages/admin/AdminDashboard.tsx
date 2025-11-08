import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Mail,
  MessageCircle,
  Search,
  Filter
} from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);

  // Load enquiries from localStorage
  useEffect(() => {
    const loadEnquiries = () => {
      try {
        const storedEnquiries = localStorage.getItem('enquiries');
        if (storedEnquiries) {
          const parsedEnquiries = JSON.parse(storedEnquiries);
          const formattedEnquiries = parsedEnquiries.map((enquiry: any) => ({
            id: enquiry.id,
            name: enquiry.name,
            email: enquiry.email,
            mobile: enquiry.mobile,
            subject: enquiry.subject,
            message: enquiry.message,
            status: enquiry.status === 'unread' ? 'new' : enquiry.status,
            createdAt: enquiry.createdAt,
            updatedAt: enquiry.updatedAt || enquiry.createdAt
          }));
          setEnquiries(formattedEnquiries);
        }
      } catch (error) {
        console.error('Error loading enquiries:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEnquiries();
    
    // Refresh data every 30 seconds
    const interval = setInterval(loadEnquiries, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminLoginTime');
    navigate('/admin');
  };

  const updateEnquiryStatus = (id: number, newStatus: 'new' | 'in_progress' | 'resolved') => {
    setEnquiries(prev => prev.map(enquiry => 
      enquiry.id === id ? { ...enquiry, status: newStatus, updatedAt: new Date().toISOString() } : enquiry
    ));
    
    // Update localStorage
    const storedEnquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
    const updatedStoredEnquiries = storedEnquiries.map((enquiry: any) => 
      enquiry.id === id ? { 
        ...enquiry, 
        status: newStatus === 'new' ? 'unread' : newStatus,
        updatedAt: new Date().toISOString()
      } : enquiry
    );
    localStorage.setItem('enquiries', JSON.stringify(updatedStoredEnquiries));
  };

  const deleteEnquiry = (id: number) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      setEnquiries(prev => prev.filter(enquiry => enquiry.id !== id));
      
      // Update localStorage
      const storedEnquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
      const updatedStoredEnquiries = storedEnquiries.filter((enquiry: any) => enquiry.id !== id);
      localStorage.setItem('enquiries', JSON.stringify(updatedStoredEnquiries));
    }
  };

  const replyToEnquiry = (enquiry: Enquiry) => {
    const subject = `Re: ${enquiry.subject}`;
    const body = `Dear ${enquiry.name},\n\nThank you for your enquiry regarding "${enquiry.subject}". We have received your message and will get back to you shortly.\n\nBest regards,\nSunrise Marketing Solutions Team`;
    window.open(`mailto:${enquiry.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  // Filter enquiries based on active tab and search term
  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'pending' && enquiry.status === 'new') ||
      (activeTab === 'completed' && enquiry.status === 'resolved') ||
      (activeTab === 'in_progress' && enquiry.status === 'in_progress');
    
    const matchesSearch = 
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.mobile.includes(searchTerm) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  // Calculate statistics
  const stats = {
    total: enquiries.length,
    pending: enquiries.filter(e => e.status === 'new').length,
    inProgress: enquiries.filter(e => e.status === 'in_progress').length,
    completed: enquiries.filter(e => e.status === 'resolved').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <AlertCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeItem="dashboard" onLogout={handleLogout} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-200">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  <BarChart3 className="w-8 h-8 inline mr-3 text-orange-600" />
                  Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-1">Welcome back, {localStorage.getItem('adminUsername')}</p>
              </div>
              <div className="text-sm text-gray-600">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Enquiries</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Progress</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.inProgress}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Tab Filters */}
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'All Orders', count: stats.total },
                  { key: 'pending', label: 'Pending', count: stats.pending },
                  { key: 'in_progress', label: 'In Progress', count: stats.inProgress },
                  { key: 'completed', label: 'Completed', count: stats.completed }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      activeTab === tab.key
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, mobile, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 w-80"
                />
              </div>
            </div>
          </div>

          {/* Enquiries Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Mobile</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEnquiries.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-semibold mb-2">No enquiries found</p>
                        <p>Try adjusting your search or filter criteria</p>
                      </td>
                    </tr>
                  ) : (
                    filteredEnquiries.map((enquiry) => (
                      <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors duration-300">
                        <td className="px-6 py-4 text-sm font-mono text-gray-600">#{enquiry.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="font-semibold text-gray-800">{enquiry.name}</div>
                            {enquiry.status === 'new' && (
                              <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" title="New enquiry"></span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{enquiry.email}</td>
                        <td className="px-6 py-4 text-gray-600">{enquiry.mobile}</td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-800">{enquiry.subject}</div>
                          <div className="text-sm text-gray-600 max-w-xs truncate">{enquiry.message}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(enquiry.status)}
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(enquiry.status)}`}>
                              {enquiry.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(enquiry.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateEnquiryStatus(enquiry.id, 'in_progress')}
                              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-300"
                              title="Mark as Read"
                              disabled={enquiry.status !== 'new'}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => replyToEnquiry(enquiry)}
                              className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg transition-colors duration-300"
                              title="Reply"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => updateEnquiryStatus(enquiry.id, 'resolved')}
                              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-300"
                              title="Mark as Delivered"
                              disabled={enquiry.status === 'resolved'}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteEnquiry(enquiry.id)}
                              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-300"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <a
                              href={`https://wa.me/91${enquiry.mobile}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors duration-300"
                              title="WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;