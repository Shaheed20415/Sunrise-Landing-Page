import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Mail, 
  MessageCircle, 
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Filter
} from 'lucide-react';
import AdminSidebar from '../../components/AdminSidebar';

interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  date: string;
}

const AdminEnquiries = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);

  // Load enquiries from localStorage on component mount
  useEffect(() => {
    const loadEnquiries = () => {
      const storedEnquiries = localStorage.getItem('enquiries');
      if (storedEnquiries) {
        const parsedEnquiries = JSON.parse(storedEnquiries);
        const formattedEnquiries = parsedEnquiries.map((enquiry: any) => ({
          id: enquiry.id,
          name: enquiry.name,
          email: enquiry.email,
          phone: enquiry.mobile, // Map mobile to phone
          subject: enquiry.subject,
          message: enquiry.message,
          status: enquiry.status === 'unread' ? 'new' : enquiry.status,
          date: new Date(enquiry.createdAt).toISOString().split('T')[0]
        }));
        setEnquiries(formattedEnquiries);
      }
    };

    loadEnquiries();
    
    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(loadEnquiries, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminLoginTime');
    navigate('/admin');
  };

  const updateStatus = (id: number, newStatus: 'new' | 'in_progress' | 'resolved') => {
    setEnquiries(prev => prev.map(enquiry => 
      enquiry.id === id ? { ...enquiry, status: newStatus } : enquiry
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
    if (window.confirm('Are you sure you want to delete this enquiry permanently?')) {
      setEnquiries(prev => prev.filter(enquiry => enquiry.id !== id));
      
      // Update localStorage
      const storedEnquiries = JSON.parse(localStorage.getItem('enquiries') || '[]');
      const updatedStoredEnquiries = storedEnquiries.filter((enquiry: any) => enquiry.id !== id);
      localStorage.setItem('enquiries', JSON.stringify(updatedStoredEnquiries));
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = 
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.phone.includes(searchTerm) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || enquiry.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

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

  const markAsRead = (id: number) => {
    updateStatus(id, 'in_progress');
  };

  const replyToEnquiry = (enquiry: Enquiry) => {
    const subject = `Re: ${enquiry.subject}`;
    const body = `Dear ${enquiry.name},\n\nThank you for your enquiry regarding "${enquiry.subject}". We have received your message and will get back to you shortly.\n\nBest regards,\nSunrise Marketing Solutions Team`;
    window.open(`mailto:${enquiry.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeItem="enquiries" onLogout={handleLogout} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-200">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  <FileText className="w-8 h-8 inline mr-3 text-blue-600" />
                  Enquiry Submissions
                </h1>
                <p className="text-gray-600 mt-1">Manage all enquiry form submissions</p>
              </div>
              <div className="text-sm text-gray-600">
                Total: {enquiries.length} enquiries
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'All Status' },
                  { key: 'new', label: 'New' },
                  { key: 'in_progress', label: 'In Progress' },
                  { key: 'resolved', label: 'Resolved' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setFilterStatus(filter.key)}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      filterStatus === filter.key
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search enquiries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-300 w-80"
                />
              </div>
            </div>
          </div>

          {/* Enquiries Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredEnquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="hover:bg-gray-50 transition-colors duration-300">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="font-semibold text-gray-800">{enquiry.name}</div>
                          {enquiry.status === 'new' && (
                            <span className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" title="New enquiry"></span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">ID: #{enquiry.id}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{enquiry.email}</td>
                      <td className="px-6 py-4 text-gray-600">{enquiry.phone}</td>
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
                        {new Date(enquiry.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => alert(`Viewing details for ${enquiry.name}`)}
                            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-300"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => alert(`Editing ${enquiry.name}'s record`)}
                            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-300"
                            title="Edit Record"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {enquiry.status !== 'resolved' && (
                            <button
                              onClick={() => markAsRead(enquiry.id)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg transition-colors duration-300"
                              title="Mark as Read"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => replyToEnquiry(enquiry)}
                            className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg transition-colors duration-300"
                            title="Reply via Email"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          {enquiry.status !== 'resolved' && (
                            <button
                              onClick={() => updateStatus(enquiry.id, 'resolved')}
                              className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition-colors duration-300"
                              title="Mark as Resolved"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteEnquiry(enquiry.id)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-300"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <a
                            href={`https://wa.me/91${enquiry.phone}`}
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminEnquiries;