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
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #fafbfc 0%, #f0f4f8 25%, #e2e8f0 50%, #f0f4f8 75%, #fafbfc 100%)'}}>
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
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                "Türkiye'nin ilk ve tek
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Egzotik pazaryerine katılın"
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-green-100 mb-8 max-w-4xl mx-auto leading-relaxed">
                Onaylı üreticiler ve tutkulu satıcılarla bağlantı kurun. Sağlıklı ve özenle bakılmış sürüngenler, amfibiler ve egzotik hayvanları keşfedin.
              </p>

              {/* Açılışa Özel Fırsat */}
              <div className="bg-gradient-to-r from-orange-500/20 to-amber-500/20 backdrop-blur-sm border border-orange-300/30 rounded-2xl p-8 mb-12 max-w-4xl mx-auto animate-pulse">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center animate-bounce">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-orange-200 font-semibold text-xl">Açılışa Özel Fırsat</span>
                </div>
                <p className="text-3xl md:text-4xl font-bold text-center text-white leading-tight mb-2">
                  %50 Komisyon indirimi + Özel 'Öncü Satıcı' Rozetine Sahip Olun
                </p>
                <p className="text-lg font-medium text-orange-200 text-center">
                  İlk 100 Satıcıya Özeldir
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Satıcı Ol
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-sm transition-all duration-300"
                >
                  İlanlara Göz At
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

      {/* Main Content with Enhanced Modern Background */}
      <div className="bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-12 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-20 -right-4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filter Panel with Distinctive Background */}
          <div className="lg:w-80 animate-slide-in-left">
            <div className="sticky top-8 bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 rounded-3xl shadow-2xl border-2 border-white/50 backdrop-blur-lg p-1">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-inner">
                <FilterPanel
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onApplyFilters={applyFilters}
                  onClearFilters={clearFilters}
                />
              </div>
            </div>
          </div>

          {/* Enhanced Main Content with Prominent Background */}
          <div className="lg:flex-1 animate-fade-in-up bg-gradient-to-br from-white via-slate-50 to-blue-50/60 rounded-3xl shadow-2xl border-2 border-white/50 backdrop-blur-lg p-8 relative overflow-hidden">
            
            {/* Content Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-green-400 to-blue-400 rounded-full filter blur-3xl"></div>
            </div>
            
            <div className="relative z-10">
            {/* Enhanced Sorting Options Header */}
            <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-white/80 via-blue-50/50 to-indigo-50/50 backdrop-blur-md rounded-3xl p-6 shadow-lg border-2 border-white/60">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent">
                    {listings.length} Sonuçtan {filteredListings.length} tanesi gösteriliyor
                  </h2>
                </div>
              </div>
              
              {/* Sorting Options */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Sırala:</span>
                  <select className="bg-white border border-green-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500">
                    <option value="newest">En Yeni Önce</option>
                    <option value="price-low">Fiyat: Düşükten Yükseğe</option>
                    <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
                    <option value="name">Harf A-Z</option>
                  </select>
                </div>
                
                {/* View Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button className="p-2 rounded-md bg-white shadow-sm text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                    </svg>
                  </button>
                  <button className="p-2 rounded-md text-gray-500 hover:text-gray-700">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </button>
                </div>
                
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Aktif İlanlar</span>
                </div>
              </div>
            </div>

            {/* Listings Grid */}
            {filteredListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  Bütün Filtreleri Temizle
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