import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  Phone, 
  Settings, 
  LogOut, 
  Shield,
  Home,
  Users,
  Calendar
} from 'lucide-react';

interface AdminSidebarProps {
  activeItem: string;
  onLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeItem, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: BarChart3,
      path: '/admin/dashboard',
      color: 'text-blue-600'
    },
    {
      key: 'enquiries',
      label: 'Enquiry Data',
      icon: FileText,
      path: '/admin/enquiries',
      color: 'text-indigo-600'
    },
    {
      key: 'contacts',
      label: 'Contact Data',
      icon: Phone,
      path: '/admin/contacts',
      color: 'text-green-600'
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:bg-gradient-to-b lg:from-gray-800 lg:to-gray-900 lg:shadow-xl">
        {/* Logo */}
        <div className="flex items-center justify-center h-20 bg-black bg-opacity-20 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white text-lg font-bold">Admin Panel</h1>
              <p className="text-gray-300 text-xs">Sunrise Marketing</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.key}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeItem === item.key
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${activeItem === item.key ? 'text-white' : item.color}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="px-4 py-6 border-t border-gray-700 space-y-2">
          <Link
            to="/"
            className="flex items-center px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
          >
            <Home className="w-5 h-5 mr-3 text-blue-400" />
            <span className="font-medium">Back to Website</span>
          </Link>
          <button
            onClick={onLogout}
            className="w-full flex items-center px-4 py-3 rounded-xl text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-300"
          >
            <LogOut className="w-5 h-5 mr-3 text-red-400" />
            <span className="font-medium">Logout</span>
          </button>
        </div>

        {/* Admin Info */}
        <div className="px-4 py-4 bg-black bg-opacity-20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{localStorage.getItem('adminUsername')}</p>
              <p className="text-gray-400 text-xs">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6 text-orange-500" />
          <span className="font-bold">Admin Panel</span>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition-colors duration-300"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default AdminSidebar;