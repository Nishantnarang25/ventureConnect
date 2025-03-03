"use client"
import React from 'react';

const WorkFlow = () => {
  return (
    <section className="py-16 bg-gray-50 w-full bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">How It Works</h2>
        <p className="text-lg text-gray-600 mb-12">
          VentureConnect is designed to make posting startups and investing a seamless experience.
          Here’s how it works:
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg w-full md:w-1/3">
            <div className="bg-blue-500 text-white p-4 rounded-full mb-6">
              <i className="fas fa-upload text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 1: Post Your Idea</h3>
            <p className="text-gray-600">
              Add your startup idea to the platform. It’s simple, quick, and effective.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg w-full md:w-1/3">
            <div className="bg-green-500 text-white p-4 rounded-full mb-6">
              <i className="fas fa-search text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 2: Get Noticed</h3>
            <p className="text-gray-600">
              Investors discover your startup and express interest. Be ready to connect!
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg w-full md:w-1/3">
            <div className="bg-yellow-500 text-white p-4 rounded-full mb-6">
              <i className="fas fa-handshake text-2xl"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Step 3: Secure Funding</h3>
            <p className="text-gray-600">
              Receive offers from investors and secure the funding to grow your startup.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkFlow;
