import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, 
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

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  date: string;
}

const AdminContacts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Load contacts from localStorage on component mount
  useEffect(() => {
    const loadContacts = () => {
      const storedContacts = localStorage.getItem('contacts');
      if (storedContacts) {
        const parsedContacts = JSON.parse(storedContacts);
        const formattedContacts = parsedContacts.map((contact: any) => ({
          id: contact.id,
          name: contact.name,
          email: contact.email,
          phone: contact.mobile, // Map mobile to phone
          message: contact.message,
          status: contact.status,
          date: new Date(contact.createdAt).toISOString().split('T')[0]
        }));
        setContacts(formattedContacts);
      }
    };

    loadContacts();
    
    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(loadContacts, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminLoginTime');
    navigate('/admin');
  };

  const updateStatus = (id: number, newStatus: 'new' | 'in_progress' | 'resolved') => {
    setContacts(prev => prev.map(contact => 
      contact.id === id ? { ...contact, status: newStatus } : contact
    ));
    
    // Update localStorage
    const storedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const updatedStoredContacts = storedContacts.map((contact: any) => 
      contact.id === id ? { 
        ...contact, 
        status: newStatus,
        updatedAt: new Date().toISOString()
      } : contact
    );
    localStorage.setItem('contacts', JSON.stringify(updatedStoredContacts));
  };

  const deleteContact = (id: number) => {
    if (window.confirm('Are you sure you want to delete this contact permanently?')) {
      setContacts(prev => prev.filter(contact => contact.id !== id));
      
      // Update localStorage
      const storedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
      const updatedStoredContacts = storedContacts.filter((contact: any) => contact.id !== id);
      localStorage.setItem('contacts', JSON.stringify(updatedStoredContacts));
    }
  };

  const replyToContact = (contact: Contact) => {
    const subject = `Re: Your Message to Sunrise Marketing Solutions`;
    const body = `Dear ${contact.name},\n\nThank you for contacting us. We have received your message and will get back to you shortly.\n\nYour Message: "${contact.message}"\n\nBest regards,\nSunrise Marketing Solutions Team`;
    window.open(`mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    
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
      default: return <Phone className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar activeItem="contacts" onLogout={handleLogout} />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-200">
          <div className="px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  <Phone className="w-8 h-8 inline mr-3 text-green-600" />
                  Contact Submissions
                </h1>
                <p className="text-gray-600 mt-1">Manage all "Get in Touch" form submissions</p>
              </div>
              <div className="text-sm text-gray-600">
                Total: {contacts.length} contacts
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
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
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
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-300 w-80"
                />
              </div>
            </div>
          </div>

          {/* Contacts Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Message</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                        <Phone className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-lg font-semibold mb-2">No contacts found</p>
                        <p>Try adjusting your search or filter criteria</p>
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((contact) => (
                      <tr key={contact.id} className="hover:bg-gray-50 transition-colors duration-300">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-gray-800">{contact.name}</div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{contact.email}</td>
                        <td className="px-6 py-4 text-gray-600">{contact.phone}</td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs truncate text-gray-600">{contact.message}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(contact.status)}
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contact.status)}`}>
                              {contact.status.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(contact.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => alert(`Viewing details for ${contact.name}`)}
                              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-300"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => replyToContact(contact)}
                              className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded-lg transition-colors duration-300"
                              title="Reply via Email"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => alert(`Editing ${contact.name}'s record`)}
                              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-colors duration-300"
                              title="Edit Record"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            {contact.status !== 'resolved' && (
                              <button
                                onClick={() => updateStatus(contact.id, 'resolved')}
                                className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-lg transition-colors duration-300"
                                title="Mark as Resolved"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => deleteContact(contact.id)}
                              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors duration-300"
                              title="Delete Record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <a
                              href={`https://wa.me/91${contact.phone}`}
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

export default AdminContacts;