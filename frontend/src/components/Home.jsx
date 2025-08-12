import React, { useState, useEffect } from 'react';
import { mockListings } from '../mock';
import FilterPanel from './FilterPanel';
import ListingCard from './ListingCard';
import { Search } from 'lucide-react';

const Home = () => {
  const [listings, setListings] = useState(mockListings);
  const [filteredListings, setFilteredListings] = useState(mockListings);
  const [filters, setFilters] = useState({
    species: 'All',
    subSpecies: 'All',
    priceRange: [0, 1000],
    gender: 'All',
    age: 'All',
    inStock: false
  });

  // Apply filters to listings
  const applyFilters = () => {
    let filtered = [...listings];

    // Species filter
    if (filters.species !== 'All') {
      filtered = filtered.filter(listing => listing.species === filters.species);
    }

    // Sub-species filter
    if (filters.subSpecies !== 'All') {
      filtered = filtered.filter(listing => listing.subSpecies === filters.subSpecies);
    }

    // Price range filter
    filtered = filtered.filter(listing => 
      listing.price >= filters.priceRange[0] && listing.price <= filters.priceRange[1]
    );

    // Gender filter
    if (filters.gender !== 'All') {
      filtered = filtered.filter(listing => listing.gender === filters.gender);
    }

    // Age filter
    if (filters.age !== 'All') {
      filtered = filtered.filter(listing => listing.age === filters.age);
    }

    // Stock filter
    if (filters.inStock) {
      filtered = filtered.filter(listing => listing.inStock);
    }

    setFilteredListings(filtered);
  };

  const clearFilters = () => {
    const defaultFilters = {
      species: 'All',
      subSpecies: 'All', 
      priceRange: [0, 1000],
      gender: 'All',
      age: 'All',
      inStock: false
    };
    setFilters(defaultFilters);
    setFilteredListings(listings);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply filters whenever filters change
  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Perfect
            <span className="text-green-200 block">Exotic Companion</span>
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-3xl mx-auto">
            Discover amazing reptiles, amphibians, and exotic pets from trusted breeders and sellers worldwide
          </p>
          <div className="flex justify-center">
            <div className="flex items-center space-x-4 text-green-100">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                <span>500+ Active Listings</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                <span>Verified Sellers</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></div>
                <span>Safe Transactions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Panel - Left Sidebar */}
          <div className="lg:w-1/4">
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onApplyFilters={applyFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Listings Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Available Pets
                </h2>
              </div>
              <div className="text-sm text-gray-600">
                Showing {filteredListings.length} of {listings.length} results
              </div>
            </div>

            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No pets found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your filters to see more results
                </p>
                <button
                  onClick={clearFilters}
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Load More Section (placeholder) */}
            {filteredListings.length > 0 && filteredListings.length >= 8 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="border-green-300 text-green-600 hover:bg-green-50 px-8 py-3"
                >
                  Load More Listings
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="bg-white py-16 border-t border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Snakes', count: '150+', image: 'https://images.unsplash.com/photo-1516505255854-da1ba2fa7e6d?w=300&h=200&fit=crop', color: 'green' },
              { name: 'Geckos', count: '80+', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop', color: 'blue' },
              { name: 'Lizards', count: '120+', image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop', color: 'orange' },
              { name: 'Amphibians', count: '45+', image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=300&h=200&fit=crop', color: 'teal' }
            ].map((category) => (
              <div
                key={category.name}
                className="group cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-${category.color}-600/20 group-hover:bg-${category.color}-600/30 transition-all duration-300`}></div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">{category.count} listings</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;