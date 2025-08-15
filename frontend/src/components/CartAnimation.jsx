import React from 'react';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, Check } from 'lucide-react';

const CartAnimation = () => {
  const { showCartAnimation, lastAddedItem, getTotalItems } = useCart();

  if (!showCartAnimation || !lastAddedItem) return null;

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
      <div className="bg-white border border-green-200 rounded-2xl shadow-2xl p-4 w-80 transform transition-all duration-500 ease-out">
        {/* Success Header */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-green-700">Added to Cart!</span>
        </div>

        {/* Product Info */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={lastAddedItem.images?.[0] || '/api/placeholder/60/60'}
            alt={lastAddedItem.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className="flex-1">
            <h4 className="font-medium text-gray-800 text-sm line-clamp-1">
              {lastAddedItem.title}
            </h4>
            <p className="text-green-600 font-semibold">
              ${lastAddedItem.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-green-50 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-700">
              {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in cart
            </span>
          </div>
          <button className="text-xs font-medium text-green-600 hover:text-green-700 underline">
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartAnimation;