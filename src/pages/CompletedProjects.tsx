import React from 'react';

const CompletedProjects = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 transform hover:scale-105 transition-all duration-500">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Completed Projects
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Successfully delivered projects with galleries, testimonials, and success metrics
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Project Gallery</h3>
                <p className="text-sm text-gray-600">Visual showcase of completed work</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Client Testimonials</h3>
                <p className="text-sm text-gray-600">Success stories from satisfied customers</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Project Details</h3>
                <p className="text-sm text-gray-600">Specifications and delivery timelines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedProjects;