import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 transform hover:scale-105 transition-all duration-500">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Abou
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Company history, mission, vision, team profiles, and core values
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Company Story</h3>
                <p className="text-sm text-gray-600">Our journey and milestones in real estate</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                <h3 className="font-semibold text-gray-800 mb-2">Team Profiles</h3>
                <p className="text-sm text-gray-600">Meet our experienced professionals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;