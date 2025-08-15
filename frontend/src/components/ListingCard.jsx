import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, MapPin, Star, Eye, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleCardClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log('Added to cart:', listing.title);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    console.log('Wishlist toggled:', listing.title);
  };

  return (
    <div 
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-green-100/50 overflow-hidden hover:shadow-2xl transition-all duration-500 h-full">
        
        {/* Responsive Layout Container */}
        <div className="flex flex-col xl:flex-row h-full">
          
          {/* Enhanced Image Container - Left Side on large screens */}
          <div className="relative overflow-hidden xl:w-2/5 flex-shrink-0">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-64 xl:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Enhanced Stock Status */}
            <div className="absolute top-4 left-4">
              <Badge 
                variant={listing.inStock ? "default" : "secondary"}
                className={`${
                  listing.inStock 
                    ? "bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700" 
                    : "bg-gradient-to-r from-red-500 to-red-600"
                } text-white rounded-full px-3 py-1 shadow-lg font-medium`}
              >
                {listing.inStock ? "✨ Available" : "Sold Out"}
              </Badge>
            </div>

            {/* Enhanced Wishlist Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleAddToWishlist}
              className={`absolute top-4 right-4 w-10 h-10 p-0 rounded-full shadow-lg transition-all duration-300 transform ${
                isLiked 
                  ? 'bg-red-500 text-white scale-110' 
                  : 'bg-white/90 text-gray-600 hover:bg-white hover:scale-110'
              }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </Button>

            {/* Multiple Images Indicator */}
            {listing.images.length > 1 && (
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-white/90 text-gray-700 rounded-full px-3 py-1 text-xs shadow-lg backdrop-blur-sm">
                  <Eye className="w-3 h-3 mr-1" />
                  +{listing.images.length - 1} photos
                </Badge>
              </div>
            )}

            {/* View Details Overlay */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <Button className="bg-white/90 text-gray-800 hover:bg-white rounded-full px-6 py-3 font-semibold shadow-xl backdrop-blur-sm transform transition-all duration-300 hover:scale-105">
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>

          {/* Enhanced Content - Right Side on large screens */}
          <div className="p-6 xl:p-8 space-y-4 flex-1 flex flex-col">
            
            {/* Price and Quantity Row */}
            <div className="flex items-center justify-between">
              <div className="text-3xl xl:text-4xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
                ${listing.price.toLocaleString()}
              </div>
              {listing.quantity > 1 && (
                <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-200 rounded-full px-3 py-1">
                  {listing.quantity} available
                </Badge>
              )}
            </div>

            {/* Title */}
            <h3 className="font-bold text-xl xl:text-2xl text-gray-800 line-clamp-2 group-hover:text-green-700 transition-colors duration-300 leading-tight">
              {listing.title}
            </h3>

            {/* Enhanced Species Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 rounded-full px-3 py-1 font-medium">
                {listing.species}
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border border-blue-200 rounded-full px-3 py-1 font-medium">
                {listing.subSpecies}
              </Badge>
              {listing.morph && (
                <Badge className="bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border border-purple-200 rounded-full px-3 py-1 font-medium">
                  {listing.morph}
                </Badge>
              )}
            </div>

            {/* Pet Details Grid - Improved Layout */}
            <div className="grid grid-cols-2 gap-4 py-4 bg-gradient-to-r from-green-50/70 to-emerald-50/70 rounded-2xl px-4 border border-green-100">
              <div className="text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Gender</div>
                <div className="font-bold text-gray-800 text-lg">{listing.gender}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">Age</div>
                <div className="font-bold text-gray-800 text-lg">{listing.age}</div>
              </div>
            </div>

            {/* Description Preview */}
            <p className="text-gray-600 line-clamp-3 leading-relaxed flex-1">
              {listing.description}
            </p>

            {/* Enhanced Action Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!listing.inStock}
              className={`w-full rounded-2xl py-4 font-semibold text-lg transition-all duration-300 transform ${
                listing.inStock
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {listing.inStock ? "Add to Cart" : "Currently Unavailable"}
            </Button>

            {/* Enhanced Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-green-100">
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>Posted {new Date(listing.datePosted).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-green-600 hover:text-green-700 transition-colors cursor-pointer">
                <MapPin className="w-3 h-3" />
                <span className="font-medium">View Seller</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;