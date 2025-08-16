import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '../contexts/CartContext';

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleCardClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(listing);
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
      <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-green-100/50 overflow-hidden hover:shadow-lg hover:border-green-200/70 transition-all duration-300 h-80 flex flex-col">
        
        {/* Compact Image Container - Remove Available/Sold labels */}
        <div className="relative overflow-hidden">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Wishlist Button - Smaller */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleAddToWishlist}
            className={`absolute top-2 right-2 w-7 h-7 p-0 rounded-full shadow-sm transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white scale-110' 
                : 'bg-white/90 text-gray-600 hover:bg-white hover:scale-110'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
          </Button>

          {/* Multiple Images Indicator - Smaller */}
          {listing.images.length > 1 && (
            <div className="absolute bottom-2 right-2">
              <Badge className="bg-black/70 text-white rounded-md px-1.5 py-0.5 text-xs backdrop-blur-sm">
                +{listing.images.length - 1}
              </Badge>
            </div>
          )}
        </div>

        {/* Simplified Card Content - More Compact with Price First */}
        <div className="p-3 flex flex-col flex-1 space-y-2">
          
          {/* Price First - More Prominent */}
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ${listing.price.toLocaleString()}
            </div>
            {listing.quantity > 1 && (
              <Badge className="bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-1.5 py-0.5 text-xs">
                {listing.quantity}
              </Badge>
            )}
          </div>

          {/* Title - Smaller Font but Clear */}
          <h3 className="font-medium text-sm text-gray-800 line-clamp-2 group-hover:text-green-700 transition-colors duration-200 leading-tight h-10 overflow-hidden">
            {listing.title}
          </h3>

          {/* Species, Gender & Age - Add age back */}
          <div className="flex flex-wrap gap-1">
            <Badge className="bg-green-50 text-green-700 border border-green-200 rounded-full px-2 py-0.5 text-xs font-medium">
              {listing.species}
            </Badge>
            <Badge className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2 py-0.5 text-xs font-medium">
              {listing.gender}
            </Badge>
            <Badge className="bg-purple-50 text-purple-700 border border-purple-200 rounded-full px-2 py-0.5 text-xs font-medium">
              {listing.age}
            </Badge>
          </div>

          {/* Compact Action Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!listing.inStock}
            className={`w-full rounded-lg py-2 font-medium text-sm transition-all duration-200 mt-auto ${
              listing.inStock
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-sm hover:shadow-md'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
            {listing.inStock ? "Add to Cart" : "Unavailable"}
          </Button>

          {/* Minimal Footer - Optional */}
          <div className="flex items-center justify-between pt-1 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="w-2.5 h-2.5" />
              <span>{new Date(listing.datePosted).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-0.5 text-green-600 hover:text-green-700 transition-colors cursor-pointer">
              <MapPin className="w-2.5 h-2.5" />
              <span className="font-medium">Seller</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;