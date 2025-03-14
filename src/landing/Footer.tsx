import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-indigo-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">
                O/A
              </span>
              <span>dapt</span>
            </h3>
            <p className="text-indigo-200 mb-6 font-display">
              AI-powered learning platform designed specifically for O & A Level
              students, helping you achieve top grades with personalized
              assistance.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-pink-400 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-pink-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-white hover:text-pink-400 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-300 font-display">
              Quick Links
            </h4>
            <ul className="space-y-2 font-display">
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-pink-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-pink-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-pink-400 transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-pink-400 transition-colors"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-pink-400 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-300 font-display">
              Subjects
            </h4>
            <ul className="space-y-2 font-display">
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-pink-400 transition-colors"
                >
                  Islamiat
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-pink-400 transition-colors"
                >
                  History
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-pink-400 transition-colors"
                >
                  Geography
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-pink-400 transition-colors"
                >
                  Biology
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-indigo-200 hover:text-pink-400 transition-colors"
                >
                  Economics
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-purple-300 font-display">
              Contact Us
            </h4>
            <ul className="space-y-4 font-display">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-400" />
                <a
                  href="mailto:info@oadapt.com"
                  className="text-indigo-200 hover:text-pink-400 transition-colors"
                >
                  info@oadapt.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-400" />
                <a
                  href="tel:+923001234567"
                  className="text-indigo-200 hover:text-pink-400 transition-colors"
                >
                  +92 300 1234567
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-md hover:from-pink-600 hover:to-purple-600 transition-colors font-display">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-indigo-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-indigo-300 text-sm font-display">
            &copy; {new Date().getFullYear()} O/Adapt. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 font-display">
            <a
              href="#"
              className="text-indigo-300 text-sm hover:text-pink-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-indigo-300 text-sm hover:text-pink-400 transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-indigo-300 text-sm hover:text-pink-400 transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
