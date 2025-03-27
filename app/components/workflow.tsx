"use client";
import React from "react";
import { FaUpload, FaSearch, FaHandshake } from "react-icons/fa";

const WorkFlow = () => {
  return (
    <section className="py-20 bg-gray-50 w-full">
      <div className="container mx-auto px-6 text-center">
        {/* Intro Section */}
        <h2 className="text-4xl font-bold text-gray-900 mb-6">How VentureConnect Works</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          VentureConnect is designed to make startup funding seamless. Whether you’re an 
          entrepreneur seeking investors or an investor looking for promising startups, 
          our platform connects you effortlessly.
        </p>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="flex flex-col items-center bg-white shadow-lg p-8 rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="bg-blue-500 text-white p-5 rounded-full mb-6">
              <FaUpload className="text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Step 1: Post Your Idea</h3>
            <p className="text-gray-600">
              Share your startup idea with potential investors. It’s simple, quick, and 
              increases visibility.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center bg-white shadow-lg p-8 rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="bg-green-500 text-white p-5 rounded-full mb-6">
              <FaSearch className="text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Step 2: Get Noticed</h3>
            <p className="text-gray-600">
              Investors discover your startup, read your pitch, and show interest. Be ready 
              to showcase your vision!
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center bg-white shadow-lg p-8 rounded-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="bg-yellow-500 text-white p-5 rounded-full mb-6">
              <FaHandshake className="text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Step 3: Secure Funding</h3>
            <p className="text-gray-600">
              Connect with investors, negotiate terms, and secure the funding needed to take 
              your startup to the next level.
            </p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="mt-12">
          <a
            href="/startups"
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium shadow-md hover:bg-blue-700 transition"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default WorkFlow;
