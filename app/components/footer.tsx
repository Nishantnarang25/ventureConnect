'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black/90 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="mb-6 md:mb-0 flex-1">
            <h3 className="text-3xl font-semibold">VentureConnect</h3>
            <p className="text-white/60 mt-2 text-sm">Connecting entrepreneurs with investors.</p>
          </div>

          {/* Middle and Right Section combined */}
          <div className="flex justify-end gap-10 items-start flex-1">
            <div>
              <h4 className="font-semibold text-lg">Quick Links</h4>
              <ul className="text-white/60 mt-2 space-y-2 text-sm">
                <li><a href="#home" className="hover:text-white">Home</a></li>
                <li><a href="#how-it-works" className="hover:text-white">How It Works</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#about" className="hover:text-white">About Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Legal</h4>
              <ul className="text-white/60 mt-2 space-y-2 text-sm">
                <li><a href="#terms" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#cookies" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            {/* Social Media Links */}
            <div className="flex gap-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook text-2xl hover:text-white"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter text-2xl hover:text-white"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin text-2xl hover:text-white"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram text-2xl hover:text-white"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="text-center mt-12 text-white/60 text-sm">
          <p>&copy; 2025 VentureConnect. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
