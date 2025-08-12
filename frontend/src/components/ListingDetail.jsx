import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, MessageSquare, MapPin, Calendar, Shield, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { mockListings, mockUsers } from '../mock';

const ListingDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [seller, setSeller] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Find listing by ID
    const foundListing = mockListings.find(l => l.id === id);
    if (foundListing) {
      setListing(foundListing);
      // Find seller
      const foundSeller = mockUsers.find(u => u.id === foundListing.sellerId);
      setSeller(foundSeller);
    }
  }, [id]);

  if (!listing || !seller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Listing not found</h2>
          <Button onClick={() => navigate('/')} className="bg-green-600 hover:bg-green-700">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log('Added to cart:', listing.title, 'Quantity:', quantity);
    // Mock cart functionality
  };

  const handleSendMessage = () => {
    console.log('Opening message composer for seller:', seller.name);
    navigate('/messages');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 hover:bg-green-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Listings
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={listing.images[currentImageIndex]}
                alt={listing.title}
                className="w-full h-96 object-cover"
              />
              
              {listing.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-700 transform rotate-180" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {listing.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {listing.images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {listing.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex ? 'border-green-500' : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${listing.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Listing Details */}
          <div className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {listing.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      {listing.species}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      {listing.subSpecies}
                    </Badge>
                    {listing.morph && (
                      <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                        {listing.morph}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                </Button>
              </div>

              <div className="text-4xl font-bold text-green-600 mb-6">
                ${listing.price}
              </div>

              {/* Quick Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-700">Gender:</span>
                  <span className="text-gray-600">{listing.gender}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-700">Age:</span>
                  <span className="text-gray-600">{listing.age}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-700">Quantity:</span>
                  <span className="text-gray-600">{listing.quantity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-700">Status:</span>
                  <Badge variant={listing.inStock ? "default" : "secondary"}>
                    {listing.inStock ? "In Stock" : "Out of Stock"}
                  </Badge>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                {listing.inStock && (
                  <div className="flex items-center space-x-4 mb-4">
                    <label className="text-sm font-medium text-gray-700">Quantity:</label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {[...Array(Math.min(listing.quantity, 5))].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex space-x-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!listing.inStock}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {listing.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    variant="outline"
                    className="flex-1 border-green-300 text-green-600 hover:bg-green-50"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message Seller
                  </Button>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Seller Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={seller.profilePicture}
                    alt={seller.name}
                    className="w-16 h-16 rounded-full border-2 border-green-200"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800 flex items-center space-x-2">
                      <span>{seller.name}</span>
                      {seller.isVerified && (
                        <Shield className="w-4 h-4 text-green-600" />
                      )}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Joined {new Date(seller.registrationDate).getFullYear()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>4.8 (127 reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-green-300 text-green-600 hover:bg-green-50"
                  onClick={() => navigate(`/seller/${seller.id}`)}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  View Seller Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="care">Care Information</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About This Pet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {listing.description}
                  </p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Species:</span>
                          <span className="font-medium">{listing.species}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sub-species:</span>
                          <span className="font-medium">{listing.subSpecies}</span>
                        </div>
                        {listing.morph && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Morph:</span>
                            <span className="font-medium">{listing.morph}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gender:</span>
                          <span className="font-medium">{listing.gender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Age:</span>
                          <span className="font-medium">{listing.age}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Availability</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Stock:</span>
                          <Badge variant={listing.inStock ? "default" : "secondary"}>
                            {listing.inStock ? "Available" : "Out of Stock"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-medium">{listing.quantity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Posted:</span>
                          <span className="font-medium">{new Date(listing.datePosted).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="care" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Care Information</CardTitle>
                  <CardDescription>
                    General care guidelines for {listing.subSpecies}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Habitat Requirements</h4>
                      <p className="text-gray-700 text-sm">
                        Proper enclosure size, temperature gradients, humidity levels, and substrate recommendations will be provided by the seller upon purchase.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Feeding</h4>
                      <p className="text-gray-700 text-sm">
                        Species-appropriate diet, feeding schedule, and prey size guidelines will be included with your purchase.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Handling</h4>
                      <p className="text-gray-700 text-sm">
                        This pet has been socialized and is accustomed to gentle handling. Care instructions will be provided.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                  <CardDescription>
                    Reviews for {seller.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock reviews */}
                    {[
                      {
                        id: 1,
                        author: "Alex M.",
                        rating: 5,
                        date: "2024-11-15",
                        comment: "Amazing seller! The pet arrived healthy and exactly as described. Great communication throughout."
                      },
                      {
                        id: 2,
                        author: "Jamie K.",
                        rating: 5,
                        date: "2024-10-28", 
                        comment: "Very professional breeder. The animal was in perfect condition and came with detailed care instructions."
                      }
                    ].map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">{review.author}</span>
                            <div className="flex space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;