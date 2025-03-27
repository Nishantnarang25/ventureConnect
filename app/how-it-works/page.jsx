"use client"
import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';


const HowItWorks = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto text-center px-4">
        <h1 className="text-4xl mb-2 font-bold text-black leading-tight">
        How VentureConnect Works</h1>

        <p className="text-lg text-gray-600 mb-10">
          VentureConnect is a platform that connects innovative startups with potential investors.
          Here’s how it works:
        </p>
        
        {/* Step 1: User Can Upload */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-12">
          <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg mb-8 md:mb-0">
            <div className="text-5xl text-blue-500 mb-4">
              <i className="fas fa-upload"></i> {/* FontAwesome Icon */}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Users Can Upload Startups</h3>
            <p className="text-gray-600">
              Entrepreneurs and startups can easily upload their business details, including pitch decks,
              videos, and other important documents to showcase their ideas and attract investment.
            </p>
          </div>
        </div>
        
        {/* Step 2: Investors Can Explore */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-12">
          <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg mb-8 md:mb-0">
            <div className="text-5xl text-blue-500 mb-4">
              <i className="fas fa-search"></i> {/* FontAwesome Icon */}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Investors Can Explore Startups</h3>
            <p className="text-gray-600">
              Investors can browse through a variety of startup opportunities, explore detailed profiles,
              and evaluate potential investments based on their interests.
            </p>
          </div>
        </div>
        
        {/* Step 3: Users and Investors Connect */}
        <div className="flex flex-col md:flex-row justify-center items-center mb-12">
          <div className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg mb-8 md:mb-0">
            <div className="text-5xl text-blue-500 mb-4">
              <i className="fas fa-users"></i> {/* FontAwesome Icon */}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Users and Investors Connect</h3>
            <p className="text-gray-600">
              Once an investor is interested, they can directly connect with the startup through private messaging
              and explore investment opportunities.
            </p>
          </div>
        </div>
        
        {/* Final CTA */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get Started Now</h3>
          <p className="text-lg text-gray-600 mb-6">
            Ready to make a difference? Join us today and begin your journey towards connecting with investors or discovering
            the next big startup idea!
          </p>
          <a href="/sign-up" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-xl hover:bg-blue-700">
            Join VentureConnect
          </a>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
