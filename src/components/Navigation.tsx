import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/', section: 'home' },
    { name: 'About Us', path: '/', section: 'about' },
    { name: 'Enquiry', path: '/', section: 'enquiry' },
    { name: 'Location', path: '/', section: 'location' },
    { name: 'Contact', path: '/', section: 'contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (item: any) => {
    if (item.section && location.pathname === '/') {
      scrollToSection(item.section);
    }
    setIsOpen(false);
  };
  return (
    <nav className="bg-white shadow-xl sticky top-0 z-50 transition-all duration-300 border-b border-gray-100">
      <div className="max-w-7xl mx-auto pl-0 pr-4 sm:pr-6 lg:pr-8">
       <div className="flex items-center h-24">
        {/* Logo Section - Extreme Left Alignment */}
        <div className="flex items-center pl-4 sm:pl-6 lg:pl-8">
          <Link to="/" className="flex items-center space-x-2 group cursor-pointer">
            {/* Logo */}
            <div>
              <img 
                src="/logo-removebg-preview copy.png" 
                alt="Company Logo" 
                className="h-14 w-14 object-contain"
              />
            </div>
            {/* Company Name and Caption */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 leading-tight">
                Sunrise Marketing Solutions
              </span>
              <span className="text-sm text-gray-500 font-medium tracking-wide -mt-1">
                Impact Better Living
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - Right Side */}
        <div className="hidden lg:flex items-center ml-auto space-x-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 transform hover:scale-105 ${
                  item.name === 'Home' && isActive('/')
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                    : 'text-gray-700 hover:shadow-md'
                }`}
              >
                {item.name}
              </button>
            ))}
            <Link
              to="/admin"
              className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 transform hover:scale-105 shadow-lg ml-4"
            >
              Admin Login
            </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 rounded-xl text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-300 shadow-md"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
        </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-6 space-y-3 border-t border-gray-100 bg-gray-50/50">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item)}
                className={`block w-full text-left px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 hover:pl-8 mx-2 ${
                  item.name === 'Home' && isActive('/')
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg'
                    : 'text-gray-700'
                }`}
              >
                {item.name}
              </button>
            ))}
            <Link
              to="/admin"
              className="block w-full text-left px-6 py-4 rounded-xl text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-800 hover:to-gray-900 mx-2 text-center"
              onClick={() => setIsOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;