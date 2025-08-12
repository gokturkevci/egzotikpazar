import React, { useState, useEffect } from 'react';
import { mockListings } from '../mock';
import FilterPanel from './FilterPanel';
import ListingCard from './ListingCard';
import { Search, Sparkles, Shield, Heart, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';

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

    if (filters.species !== 'All') {
      filtered = filtered.filter(listing => listing.species === filters.species);
    }

    if (filters.subSpecies !== 'All') {
      filtered = filtered.filter(listing => listing.subSpecies === filters.subSpecies);
    }

    filtered = filtered.filter(listing => 
      listing.price >= filters.priceRange[0] && listing.price <= filters.priceRange[1]
    );

    if (filters.gender !== 'All') {
      filtered = filtered.filter(listing => listing.gender === filters.gender);
    }

    if (filters.age !== 'All') {
      filtered = filtered.filter(listing => listing.age === filters.age);
    }

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

  useEffect(() => {
    applyFilters();
  }, [filters]);

  return (
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #f5f3f0 0%, #e8f5e8 50%, #f0f4f0 100%)'}}>
      {/* Enhanced Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="relative bg-gradient-to-br from-emerald-800 via-green-700 to-teal-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in-up">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-sm font-medium">Trusted by 10,000+ Pet Lovers</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Discover Your Next
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Exotic Friend
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-green-100 mb-10 max-w-4xl mx-auto leading-relaxed">
                Connect with verified breeders and passionate sellers. Find healthy, well-cared-for reptiles, amphibians, and exotic pets with complete care documentation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-green-100 mb-12">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">500+</div>
                    <div className="text-sm">Verified Sellers</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">98%</div>
                    <div className="text-sm">Happy Customers</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-lg">2K+</div>
                    <div className="text-sm">Successful Sales</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Explore Pets
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-sm transition-all duration-300"
                >
                  Become a Seller
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-300/20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-300/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Panel - Left Sidebar */}
          <div className="lg:w-80 animate-slide-in-left">
            <div className="sticky top-8">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onApplyFilters={applyFilters}
                onClearFilters={clearFilters}
              />
            </div>
          </div>

          {/* Listings Grid */}
          <div className="lg:flex-1 animate-fade-in-up">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-green-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Available Pets
                  </h2>
                  <p className="text-sm text-gray-600">
                    Showing {filteredListings.length} of {listings.length} results
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live listings</span>
              </div>
            </div>

            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                {filteredListings.map((listing, index) => (
                  <div 
                    key={listing.id} 
                    className="animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ListingCard listing={listing} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 animate-fade-in-up">
                <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-16 h-16 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-700 mb-3">No pets found</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                  We couldn't find any pets matching your current filters. Try adjusting your criteria to see more amazing companions.
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Load More Section */}
            {filteredListings.length > 0 && filteredListings.length >= 8 && (
              <div className="text-center mt-16 animate-fade-in-up">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-300 text-green-700 hover:bg-green-50 px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
                >
                  Load More Amazing Pets
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="py-20 bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Explore by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our curated collection of exotic pets by their natural habitats and characteristics
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { 
                name: 'Serpents', 
                count: '150+', 
                image: 'https://images.unsplash.com/photo-1516505255854-da1ba2fa7e6d?w=400&h=300&fit=crop', 
                color: 'from-emerald-500 to-green-600',
                description: 'Pythons, Boas & More'
              },
              { 
                name: 'Geckos', 
                count: '80+', 
                image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop', 
                color: 'from-amber-500 to-orange-600',
                description: 'Crested, Leopard & Exotic'
              },
              { 
                name: 'Dragons', 
                count: '120+', 
                image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop', 
                color: 'from-yellow-500 to-amber-600',
                description: 'Bearded Dragons & Skinks'
              },
              { 
                name: 'Amphibians', 
                count: '45+', 
                image: 'https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=400&h=300&fit=crop', 
                color: 'from-teal-500 to-cyan-600',
                description: 'Frogs, Newts & Salamanders'
              }
            ].map((category, index) => (
              <div
                key={category.name}
                className="group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}></div>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    
                    {/* Category Info Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                        <p className="text-sm opacity-90 mb-2">{category.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">{category.count} pets</span>
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                            <Search className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trust & Safety Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified Sellers",
                description: "All our sellers go through a comprehensive verification process to ensure quality and trust."
              },
              {
                icon: Heart,
                title: "Health Guaranteed", 
                description: "Every pet comes with health documentation and care instructions from experienced breeders."
              },
              {
                icon: TrendingUp,
                title: "Fair Pricing",
                description: "Transparent pricing with no hidden fees. Support both hobbyist and professional breeders."
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;