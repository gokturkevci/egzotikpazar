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
      className="group cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-green-100/50 overflow-hidden hover:shadow-xl hover:border-green-200/70 transition-all duration-300 h-full flex flex-col">
        
        {/* Compact Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Stock Status Badge */}
          <div className="absolute top-3 left-3">
            <Badge 
              variant={listing.inStock ? "default" : "secondary"}
              className={`${
                listing.inStock 
                  ? "bg-emerald-500 hover:bg-emerald-600" 
                  : "bg-red-500"
              } text-white rounded-full px-2 py-1 text-xs shadow-md font-medium`}
            >
              {listing.inStock ? "Available" : "Sold"}
            </Badge>
          </div>

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddToWishlist}
            className={`absolute top-3 right-3 w-8 h-8 p-0 rounded-full shadow-md transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white scale-110' 
                : 'bg-white/90 text-gray-600 hover:bg-white hover:scale-110'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>

          {/* Multiple Images Indicator */}
          {listing.images.length > 1 && (
            <div className="absolute bottom-3 right-3">
              <Badge className="bg-black/70 text-white rounded-md px-2 py-1 text-xs backdrop-blur-sm">
                <Eye className="w-3 h-3 mr-1" />
                +{listing.images.length - 1}
              </Badge>
            </div>
          )}
        </div>

        {/* Card Content - Organized Vertically */}
        <div className="p-4 flex flex-col flex-1 space-y-3">
          
          {/* Price - Prominent at Top */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ${listing.price.toLocaleString()}
            </div>
            {listing.quantity > 1 && (
              <Badge className="bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-1 text-xs">
                {listing.quantity} left
              </Badge>
            )}
          </div>

          {/* Title - Clear and Readable */}
          <h3 className="font-bold text-lg text-gray-800 line-clamp-2 group-hover:text-green-700 transition-colors duration-200 leading-tight">
            {listing.title}
          </h3>

          {/* Species & Type Tags */}
          <div className="flex flex-wrap gap-1.5">
            <Badge className="bg-green-50 text-green-700 border border-green-200 rounded-full px-2 py-1 text-xs font-medium">
              {listing.species}
            </Badge>
            <Badge className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2 py-1 text-xs font-medium">
              {listing.subSpecies}
            </Badge>
            {listing.morph && (
              <Badge className="bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-2 py-1 text-xs font-medium">
                {listing.morph}
              </Badge>
            )}
          </div>

          {/* Key Details Grid - Compact */}
          <div className="grid grid-cols-2 gap-2 py-2 px-3 bg-gray-50/80 rounded-lg border border-gray-100">
            <div className="text-center">
              <div className="text-xs text-gray-500 font-medium">Gender</div>
              <div className="font-semibold text-gray-800 text-sm">{listing.gender}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 font-medium">Age</div>
              <div className="font-semibold text-gray-800 text-sm">{listing.age}</div>
            </div>
          </div>

          {/* Description Preview - Compact */}
          <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed flex-1">
            {listing.description}
          </p>

          {/* Action Button - Full Width */}
          <Button
            onClick={handleAddToCart}
            disabled={!listing.inStock}
            className={`w-full rounded-xl py-2.5 font-semibold text-sm transition-all duration-200 ${
              listing.inStock
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {listing.inStock ? "Add to Cart" : "Unavailable"}
          </Button>

          {/* Footer Info - Compact */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{new Date(listing.datePosted).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors cursor-pointer">
              <MapPin className="w-3 h-3" />
              <span className="font-medium">Seller</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;