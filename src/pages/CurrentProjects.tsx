import React from 'react';

const CurrentProjects = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 transform hover:scale-105 transition-all duration-500">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Current Projects
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Ongoing developments with progress tracking, availability, and booking options
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Development Status</h3>
                <p className="text-sm text-gray-600">Real-time progress updates</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Available Units</h3>
                <p className="text-sm text-gray-600">Current inventory and pricing</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Booking Options</h3>
                <p className="text-sm text-gray-600">Reservation and payment plans</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentProjects;