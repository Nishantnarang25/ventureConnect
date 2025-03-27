import React from 'react';
import { FaLightbulb, FaLeaf, FaHeartbeat } from 'react-icons/fa'; // Importing icons

const SuccessStories = () => {
  const stories = [
    {
      title: 'TechNova - Revolutionizing AI',
      description: 'TechNova developed an AI tool that helps businesses predict market trends with 90% accuracy.',
      icon: <FaLightbulb className="text-4xl text-indigo-600" />, // Icon for innovation
    },
    {
      title: 'GreenTech Solutions - Sustainable Future',
      description: 'GreenTech Solutions focuses on sustainable energy solutions and has grown its market share by 30%.',
      icon: <FaLeaf className="text-4xl text-green-600" />, // Icon for sustainability
    },
    {
      title: 'HealthPlus - Healthcare Innovation',
      description: 'HealthPlus launched a revolutionary telemedicine platform that connects doctors with patients worldwide.',
      icon: <FaHeartbeat className="text-4xl text-red-600" />, // Icon for healthcare
    },
  ];

  return (
    <div className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto text-center px-6">
        <h2 className="text-4xl mb-2 font-bold text-black leading-tight">
        Success Stories</h2>
        <p className="text-xl text-gray-600 mb-12">
          These are the success stories of startups that have made a significant impact in their industries.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105">
              <div className="mb-6 w-full">
                {story.icon} {/* Display the icon */}
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">{story.title}</h3>
              <p className="text-lg text-gray-600">{story.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
