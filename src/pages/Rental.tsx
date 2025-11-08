import React from 'react';

const Rental = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 transform hover:scale-105 transition-all duration-500">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Rental & Lease Opportunities
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Rental properties, lease agreements, tenant services, and property management
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-gradient-to-br from-sky-100 to-blue-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Rental Listings</h3>
                <p className="text-sm text-gray-600">Available properties for rent</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Lease Management</h3>
                <p className="text-sm text-gray-600">Comprehensive lease services</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Tenant Support</h3>
                <p className="text-sm text-gray-600">Full-service tenant assistance</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rental;