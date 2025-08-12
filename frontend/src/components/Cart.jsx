import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { mockCartItems, mockListings } from '../mock';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => {
    // Mock cart items with full listing details
    return mockCartItems.map(cartItem => {
      const listing = mockListings.find(l => l.id === cartItem.listingId);
      return {
        ...cartItem,
        listing
      };
    });
  });

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    
    setCartItems(items =>
      items.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (cartItemId) => {
    setCartItems(items => items.filter(item => item.id !== cartItemId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.listing.price * item.quantity), 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    return cartItems.length > 0 ? 25 : 0; // $25 shipping
  };

  const subtotal = calculateSubtotal();
  const tax = calculateTax(subtotal);
  const shipping = calculateShipping();
  const total = subtotal + tax + shipping;

  const handleCheckout = () => {
    console.log('Processing checkout for items:', cartItems);
    // Mock checkout process
    alert('Checkout feature coming soon! This is a demo.');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-16">
            <CardContent>
              <ShoppingCart className="w-24 h-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">Discover amazing exotic pets to add to your collection</p>
              <Button 
                onClick={() => navigate('/')}
                className="bg-green-600 hover:bg-green-700"
              >
                Continue Shopping
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="hover:bg-green-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
            <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          </div>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Item Image */}
                    <div 
                      className="w-24 h-24 rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/listing/${item.listing.id}`)}
                    >
                      <img
                        src={item.listing.images[0]}
                        alt={item.listing.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1">
                      <h3 
                        className="font-semibold text-gray-800 hover:text-green-600 cursor-pointer transition-colors"
                        onClick={() => navigate(`/listing/${item.listing.id}`)}
                      >
                        {item.listing.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {item.listing.species}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.listing.subSpecies}
                        </Badge>
                        {item.listing.morph && (
                          <Badge variant="outline" className="text-xs">
                            {item.listing.morph}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span>Gender: {item.listing.gender}</span>
                        <span className="mx-2">•</span>
                        <span>Age: {item.listing.age}</span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.listing.quantity}
                          className="h-8 w-8 p-0 hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="text-right space-y-2">
                      <div className="text-xl font-bold text-green-600">
                        ${(item.listing.price * item.quantity).toLocaleString()}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items):</span>
                    <span className="font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">${shipping}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-medium"
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>

                {/* Security Note */}
                <div className="text-xs text-gray-500 text-center bg-gray-50 p-3 rounded-lg">
                  🔒 Secure checkout powered by SSL encryption
                </div>

                {/* Continue Shopping */}
                <Button
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="w-full border-green-300 text-green-600 hover:bg-green-50"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;