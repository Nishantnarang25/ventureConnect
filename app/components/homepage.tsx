"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Homepage = () => {
  const { data: session } = useSession();

  return (
    <section className="w-full flex flex-col md:flex-row justify-between items-center px-10 md:px-16 py-20 bg-gray-50">
      {/* Left Section */}
      <div className="max-w-2xl text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight">
          Empowering Startups, <br />
          <span className="text-gray-600">Connecting Innovators</span>
        </h1>

        <p className="text-gray-500 text-lg mt-4 leading-relaxed">
          Join a thriving network of entrepreneurs and investors. 
          Launch, grow, and succeed with <span className="font-semibold text-black">VentureConnect</span>.
        </p>

        {/* CTA Button */}
        <div className="mt-8">
          {!session ? (
            <button className="bg-black text-white flex items-center gap-3 px-6 py-3 rounded-lg text-lg font-medium transition hover:bg-gray-800">
              Get Started 
              <img src="/arrow.png" alt="Explore" className="w-6 h-6" />
            </button>
          ) : (
            <Link href="/startups">
              <button className="bg-black text-white flex items-center gap-3 px-6 py-3 rounded-lg text-lg font-medium transition hover:bg-gray-800">
                Explore Startups 
                <img src="/arrow.png" alt="Explore" className="w-6 h-6" />
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
        <img 
          src="/mainp.png" 
          alt="Startup illustration" 
          className="w-full max-w-lg md:max-w-xl rounded-lg shadow-md"
        />
      </div>
    </section>
  );
};

export default Homepage;
