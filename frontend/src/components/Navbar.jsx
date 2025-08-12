import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, MessageSquare, ShoppingCart, Plus, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { currentUser } from '../mock';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // For demo purposes
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, this would filter listings
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
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">EP</span>
            </div>
            <span className="hidden sm:block text-xl font-bold text-green-800">ExoticPets</span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="text"
                placeholder="Search for pets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-green-200 focus:border-green-400 transition-colors"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth/Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoggedIn ? (
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/login')}
                  className="border-green-300 text-green-600 hover:bg-green-50"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => navigate('/register')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Register
                </Button>
              </div>
            ) : (
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 hover:bg-green-50"
                >
                  <img
                    src={currentUser.profilePicture}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-medium text-gray-700">{currentUser.name}</span>
                </Button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-50 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </Link>
                    <Link
                      to="/messages"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-50 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <MessageSquare className="w-4 h-4 mr-3" />
                      Messages
                    </Link>
                    <Link
                      to="/cart"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-50 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-3" />
                      Cart
                    </Link>
                    <Link
                      to="/add-listing"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-green-50 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Plus className="w-4 h-4 mr-3" />
                      Add Listing
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        setIsLoggedIn(false);
                        setIsProfileOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
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
              className="p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search for pets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-green-200 focus:border-green-400"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
          </form>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-green-100 py-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-700 hover:text-green-600 font-medium py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              
              {!isLoggedIn ? (
                <div className="flex flex-col space-y-2 pt-4 border-t border-green-100">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="border-green-300 text-green-600"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Register
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-green-100">
                  <Link
                    to="/profile"
                    className="flex items-center py-2 text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </Link>
                  <Link
                    to="/messages"
                    className="flex items-center py-2 text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MessageSquare className="w-4 h-4 mr-3" />
                    Messages
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center py-2 text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-3" />
                    Cart
                  </Link>
                  <Link
                    to="/add-listing"
                    className="flex items-center py-2 text-gray-700 hover:text-green-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Plus className="w-4 h-4 mr-3" />
                    Add Listing
                  </Link>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center py-2 text-red-600 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
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