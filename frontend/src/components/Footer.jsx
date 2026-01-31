import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0f1b3d] text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section: logo + links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand & description */}
          <div>
            <h3 className="text-xl font-bold text-white">Waste Management Co.</h3>
            <p className="text-sm mt-2">
              Sustainable and smart solutions for waste collection & recycling.
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="font-semibold text-white mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="/" className="hover:text-white">About Us</a></li>
              <li><a href="/services" className="hover:text-white">Services</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Contact & social icons */}
          <div>
            <h4 className="font-semibold text-white mb-2">Connect With Us</h4>
            <p className="text-sm">support@wastemanagement.com</p>
            <p className="text-sm">+1 (800) 123-4567</p>

            <div className="flex space-x-4 mt-3 text-gray-300">
              <a href="#" className="hover:text-white"><FaFacebookF /></a>
              <a href="#" className="hover:text-white"><FaTwitter /></a>
              <a href="#" className="hover:text-white"><FaInstagram /></a>
              <a href="#" className="hover:text-white"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Bottom line: legal info */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Waste Management Co. All rights reserved.
          </p>
          <div className="flex justify-center space-x-4 mt-2 text-gray-400">
            <a href="/privacy" className="hover:text-white">Privacy Policy</a>
            <a href="/terms" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
