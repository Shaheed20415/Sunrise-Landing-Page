import React from 'react';

const Address = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 transform hover:scale-105 transition-all duration-500">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Our Address
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Office location, directions, landmarks, and visiting hours
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="p-6 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Office Location</h3>
                <p className="text-sm text-gray-600">Complete address with landmarks</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Directions</h3>
                <p className="text-sm text-gray-600">How to reach us by various modes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;