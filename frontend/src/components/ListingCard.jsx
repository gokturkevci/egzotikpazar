import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Mock add to cart functionality
    console.log('Added to cart:', listing.title);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    // Mock wishlist functionality  
    console.log('Added to wishlist:', listing.title);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md border border-green-100 overflow-hidden hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Stock Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge 
            variant={listing.inStock ? "default" : "secondary"}
            className={listing.inStock ? "bg-green-600 hover:bg-green-700" : "bg-red-500 hover:bg-red-600"}
          >
            {listing.inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleAddToWishlist}
          className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/80 hover:bg-white group-hover:scale-110 transition-all duration-200"
        >
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
        </Button>

        {/* Multiple Images Indicator */}
        {listing.images.length > 1 && (
          <div className="absolute bottom-3 left-3">
            <Badge variant="outline" className="bg-white/90 text-xs">
              +{listing.images.length - 1} more
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Price and Title */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">
              ${listing.price}
            </span>
            {listing.quantity > 1 && (
              <Badge variant="outline" className="text-xs">
                Qty: {listing.quantity}
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-gray-800 line-clamp-2 group-hover:text-green-600 transition-colors">
            {listing.title}
          </h3>
        </div>

        {/* Species and Details */}
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs border-green-200 text-green-700">
              {listing.species}
            </Badge>
            <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
              {listing.subSpecies}
            </Badge>
            {listing.morph && (
              <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                {listing.morph}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span className="font-medium">Gender:</span>
              <span>{listing.gender}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium">Age:</span>
              <span>{listing.age}</span>
            </div>
          </div>
        </div>

        {/* Description Preview */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {listing.description}
        </p>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            onClick={handleAddToCart}
            disabled={!listing.inStock}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {listing.inStock ? "Add to Cart" : "Out of Stock"}
          </Button>
        </div>

        {/* Seller Info Preview */}
        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Posted {new Date(listing.datePosted).toLocaleDateString()}</span>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>View Seller</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;