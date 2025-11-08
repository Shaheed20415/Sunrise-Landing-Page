import React from 'react';

const Listings = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 transform hover:scale-105 transition-all duration-500">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Property Listings
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Comprehensive listings for plots, lands, and houses with advanced search and filters
            </p>
            <div className="grid md:grid-cols-4 gap-8 mt-12">
              <div className="p-6 bg-gradient-to-br from-slate-100 to-gray-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Search & Filter</h3>
                <p className="text-sm text-gray-600">Advanced property search tools</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-gray-100 to-zinc-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Property Cards</h3>
                <p className="text-sm text-gray-600">Detailed property information</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-zinc-100 to-neutral-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Map View</h3>
                <p className="text-sm text-gray-600">Location-based browsing</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-neutral-100 to-stone-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Comparison Tool</h3>
                <p className="text-sm text-gray-600">Side-by-side property analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;