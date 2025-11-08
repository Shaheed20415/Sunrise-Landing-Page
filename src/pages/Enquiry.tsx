import React from 'react';

const Enquiry = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 transform hover:scale-105 transition-all duration-500">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Make an Enquiry
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Lead capture forms, property inquiry, and callback requests
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Property Inquiry</h3>
                <p className="text-sm text-gray-600">Specific property questions and requests</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Callback Request</h3>
                <p className="text-sm text-gray-600">Schedule a consultation call</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-rose-100 to-red-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">General Inquiry</h3>
                <p className="text-sm text-gray-600">Any questions about our services</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;