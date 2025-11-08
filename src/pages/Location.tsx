import React from 'react';

const Location = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 transform hover:scale-105 transition-all duration-500">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Service Locations
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Service areas, interactive maps, and regional coverage details
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Coverage Areas</h3>
                <p className="text-sm text-gray-600">Cities and regions we serve</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Interactive Map</h3>
                <p className="text-sm text-gray-600">Visual representation of service zones</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Expansion Plans</h3>
                <p className="text-sm text-gray-600">Future service area extensions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;