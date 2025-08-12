import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, MessageSquare, ShoppingCart, Plus, LogOut, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { currentUser } from '../mock';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Listings', path: '/listings' },
    { name: 'Sellers', path: '/sellers' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b border-green-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-3">
          {/* Enhanced Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-green-800 bg-clip-text text-transparent">
                ExoticPets
              </div>
              <div className="text-xs text-gray-500 -mt-1">Marketplace</div>
            </div>
          </Link>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full relative group">
              <Input
                type="text"
                placeholder="Search for your perfect companion..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-full rounded-2xl border-2 border-green-200/50 bg-white/70 backdrop-blur-sm focus:border-green-400 focus:bg-white transition-all duration-300 placeholder:text-gray-400"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Button
                  type="submit"
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Search
                </Button>
              </div>
            </form>
          </div>

          {/* Enhanced Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-gray-700 hover:text-green-700 font-medium transition-all duration-300 group py-2"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Enhanced Auth/Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="border-2 border-green-300/50 text-green-700 hover:bg-green-50/80 backdrop-blur-sm rounded-xl font-medium transition-all duration-300"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Join Now
                </Button>
              </div>
            ) : (
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 hover:bg-green-50/80 rounded-2xl px-4 py-2 transition-all duration-300"
                >
                  <img
                    src={currentUser.profilePicture}
                    alt={currentUser.name}
                    className="w-10 h-10 rounded-full border-2 border-green-200 shadow-sm"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-gray-800 text-sm">{currentUser.name}</div>
                    <div className="text-xs text-gray-500">Verified Seller</div>
                  </div>
                </Button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-green-100 py-3 animate-scale-in">
                    <div className="px-4 py-3 border-b border-green-100">
                      <div className="flex items-center space-x-3">
                        <img
                          src={currentUser.profilePicture}
                          alt={currentUser.name}
                          className="w-12 h-12 rounded-full border-2 border-green-200"
                        />
                        <div>
                          <div className="font-semibold text-gray-800">{currentUser.name}</div>
                          <div className="text-sm text-gray-500">member@exoticpets.com</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      {[
                        { name: 'Profile', path: '/profile', icon: User },
                        { name: 'Messages', path: '/messages', icon: MessageSquare },
                        { name: 'Cart', path: '/cart', icon: ShoppingCart },
                        { name: 'Add Listing', path: '/add-listing', icon: Plus }
                      ].map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-green-50/80 hover:text-green-700 transition-all duration-200 group"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <item.icon className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="border-t border-green-100 pt-2">
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-3 text-red-600 hover:bg-red-50/80 transition-all duration-200 group"
                      >
                        <LogOut className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-green-50/80 rounded-xl transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search for pets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 w-full rounded-2xl border-2 border-green-200/50 bg-white/70 backdrop-blur-sm focus:border-green-400"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
          </form>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-green-100/50 bg-white/95 backdrop-blur-md animate-fade-in-up">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block text-gray-700 hover:text-green-700 font-medium py-3 px-4 rounded-xl hover:bg-green-50/80 transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {!isLoggedIn ? (
                <div className="flex flex-col space-y-3 pt-4 border-t border-green-100">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="border-2 border-green-300/50 text-green-700 rounded-xl"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl"
                  >
                    Join Now
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-green-100">
                  {[
                    { name: 'Profile', path: '/profile', icon: User },
                    { name: 'Messages', path: '/messages', icon: MessageSquare },
                    { name: 'Cart', path: '/cart', icon: ShoppingCart },
                    { name: 'Add Listing', path: '/add-listing', icon: Plus }
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center py-3 px-4 text-gray-700 hover:text-green-700 hover:bg-green-50/80 rounded-xl transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full py-3 px-4 text-red-600 hover:bg-red-50/80 rounded-xl transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;