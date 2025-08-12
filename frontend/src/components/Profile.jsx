import React, { useState } from 'react';
import { Calendar, Settings, Plus, MessageSquare, ShoppingBag, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { currentUser, mockListings } from '../mock';
import ListingCard from './ListingCard';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('active-listings');
  
  // Mock data for user's listings and purchases
  const userListings = mockListings.filter(listing => listing.sellerId === currentUser.id);
  const soldItems = [
    { ...mockListings[1], soldDate: '2024-11-20', buyerName: 'John Doe', salePrice: 280 }
  ];
  const purchasedItems = [
    { ...mockListings[2], purchaseDate: '2024-11-18', sellerName: 'Emily Rodriguez', purchasePrice: 450 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <img
                src={currentUser.profilePicture}
                alt={currentUser.name}
                className="w-24 h-24 rounded-full border-4 border-green-200"
              />
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  {currentUser.name}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(currentUser.registrationDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Package className="w-4 h-4" />
                    <span>{userListings.length} Active Listings</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ShoppingBag className="w-4 h-4" />
                    <span>{purchasedItems.length} Purchases</span>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  <Badge className="bg-green-100 text-green-700">Verified Seller</Badge>
                  <Badge className="bg-blue-100 text-blue-700">4.8★ Rating</Badge>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Listing
                </Button>
                <Button variant="outline" className="border-green-300 text-green-600">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="active-listings">Active Listings</TabsTrigger>
            <TabsTrigger value="sold-items">Sold Items</TabsTrigger>
            <TabsTrigger value="purchased-items">Purchased Items</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="active-listings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Active Listings</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Add New Listing
              </Button>
            </div>
            
            {userListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map((listing) => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No active listings</h3>
                  <p className="text-gray-500 mb-6">Start selling by creating your first listing</p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Listing
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sold-items" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Sold Items</h2>
            {soldItems.length > 0 ? (
              <div className="space-y-4">
                {soldItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-600">Sold to {item.buyerName}</p>
                          <p className="text-sm text-gray-500">Sold on {new Date(item.soldDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">${item.salePrice}</div>
                          <Badge className="bg-green-100 text-green-700">Completed</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No sold items yet</h3>
                  <p className="text-gray-500">Your sales history will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="purchased-items" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Purchased Items</h2>
            {purchasedItems.length > 0 ? (
              <div className="space-y-4">
                {purchasedItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-600">From {item.sellerName}</p>
                          <p className="text-sm text-gray-500">Purchased on {new Date(item.purchaseDate).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">${item.purchasePrice}</div>
                          <Badge className="bg-blue-100 text-blue-700">Delivered</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No purchases yet</h3>
                  <p className="text-gray-500">Your purchase history will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
            <Card>
              <CardContent className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No messages yet</h3>
                <p className="text-gray-500">Your conversations with buyers and sellers will appear here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-green-300 text-green-600">
                    Change Password
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage your email and SMS preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-green-300 text-green-600">
                    Manage Notifications
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Verification</CardTitle>
                  <CardDescription>Verify your identity to build trust</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-green-100 text-green-700 mb-3">Verified</Badge>
                  <p className="text-sm text-gray-600">Your account is verified</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delete Account</CardTitle>
                  <CardDescription>Permanently delete your account and data</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;