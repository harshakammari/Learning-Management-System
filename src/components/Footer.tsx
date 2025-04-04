import React from 'react';
import { GraduationCap, Github, Twitter, Linkedin } from 'lucide-react';
import logoSrc from '../assets/Logo.png';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <div className="flex items-center">
              <img src={logoSrc} alt="OracadeHub Logo" className="h-8 w-auto" />
              <span className="ml-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
                OracadeHub
              </span>
            </div>
            <p className="mt-4 text-gray-500 dark:text-gray-300">
              Transforming education through interactive online learning.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Platform</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-base text-gray-500 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Connect</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} OracadeHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;