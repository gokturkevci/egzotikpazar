import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Listings', path: '/listings' },
    { name: 'Sellers', path: '/sellers' },
    { name: 'Contact', path: '/contact' }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'TikTok', icon: Youtube, href: 'https://tiktok.com' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">EP</span>
              </div>
              <span className="text-xl font-bold">ExoticPets</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              The most trusted marketplace for exotic pets and reptiles. 
              Connecting passionate breeders with caring pet owners since 2024. 
              Your gateway to finding the perfect exotic companion.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-200 group"
                >
                  <social.icon className="w-5 h-5 text-gray-300 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 space-y-2">
              <Link
                to="/privacy"
                className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
              >
                Terms of Service
              </Link>
              <Link
                to="/help"
                className="block text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
              >
                Help Center
              </Link>
            </div>
          </div>

          {/* Contact & Newsletter Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Stay Connected</h3>
            <p className="text-gray-300 text-sm">
              Get updates on new listings, breeding tips, and community events.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:border-green-500 text-sm"
                />
                <button className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-r-lg font-medium transition-colors duration-200 text-sm">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-400">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
            <div className="pt-4 text-sm text-gray-300">
              <p>📧 support@exoticpets.com</p>
              <p>📞 +1 (555) 123-PETS</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-400">
              © 2025 ExoticPets Marketplace. All rights reserved.
            </p>
            <div className="flex space-x-6 text-xs text-gray-400">
              <span>Made with ❤️ for exotic pet lovers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;