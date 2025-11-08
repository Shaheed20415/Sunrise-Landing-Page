import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 transform hover:scale-105 transition-all duration-500">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Contact Details
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Phone numbers, email addresses, social media, and business hours
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="p-6 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Contact Information</h3>
                <p className="text-sm text-gray-600">All communication channels</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Business Hours</h3>
                <p className="text-sm text-gray-600">When we're available to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;