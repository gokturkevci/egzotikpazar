import React, { useState } from 'react';
import { Calendar, Settings, Plus, MessageSquare, ShoppingBag, Package, Star, TrendingUp, Award, Edit, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { currentUser, mockListings } from '../mock';
import ListingCard from './ListingCard';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('active-listings');
  const [isHovering, setIsHovering] = useState(false);
  
  // Mock data for user's listings and purchases
  const userListings = mockListings.filter(listing => listing.sellerId === currentUser.id);
  const soldItems = [
    { ...mockListings[1], soldDate: '2024-11-20', buyerName: 'John Doe', salePrice: 280 }
  ];
  const purchasedItems = [
    { ...mockListings[2], purchaseDate: '2024-11-18', sellerName: 'Emily Rodriguez', purchasePrice: 450 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Enhanced Profile Header */}
        <Card className="mb-8 shadow-xl border-0 bg-gradient-to-r from-white via-blue-50/50 to-indigo-50/50 backdrop-blur-sm overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
          <CardContent className="pt-8 relative">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              
              {/* Enhanced Profile Picture */}
              <div 
                className="relative group/avatar"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div className="relative">
                  <img
                    src={currentUser.profilePicture}
                    alt={currentUser.name}
                    className="w-32 h-32 rounded-full border-4 border-gradient-to-r border-blue-200 shadow-2xl transition-all duration-500 group-hover/avatar:scale-105 group-hover/avatar:shadow-blue-200/50"
                  />
                  <div className={`absolute inset-0 bg-black/20 rounded-full flex items-center justify-center transition-all duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Enhanced User Info */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent animate-fade-in-up">
                    {currentUser.name}
                  </h1>
                  <p className="text-lg text-gray-600 animate-fade-in-up delay-100">
                    Türkiye'nin İlk Egzotik Hayvan Satıcısı
                  </p>
                </div>
                
                {/* Enhanced Stats */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm">
                  <div className="flex items-center space-x-2 bg-white/60 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">Joined {new Date(currentUser.registrationDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/60 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <Package className="w-4 h-4 text-green-500" />
                    <span className="font-medium">{userListings.length} Aktif İlanlar</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/60 rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <ShoppingBag className="w-4 h-4 text-purple-500" />
                    <span className="font-medium">{purchasedItems.length} Satın Aldıklarım</span>
                  </div>
                </div>
                
                {/* Enhanced Badges */}
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce">
                    ⭐ Öncü Satıcı
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Star className="w-3 h-3 mr-1" />
                    4.8★ Değerlendirme
                  </Badge>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Top Seller
                  </Badge>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col space-y-3">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold">
                  <Plus className="w-5 h-5 mr-2" />
                  İlan Ekle
                </Button>
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold">
                  <Edit className="w-5 h-5 mr-2" />
                  Profili Düzenle
                </Button>
                <Button variant="outline" className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold">
                  <Settings className="w-5 h-5 mr-2" />
                  Ayarlar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="active-listings">Aktif İlanlar</TabsTrigger>
            <TabsTrigger value="sold-items">Satışlarım</TabsTrigger>
            <TabsTrigger value="purchased-items">Satın Aldıklarım</TabsTrigger>
            <TabsTrigger value="messages">Mesajlar</TabsTrigger>
            <TabsTrigger value="settings">Ayarlar</TabsTrigger>
          </TabsList>

          <TabsContent value="active-listings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Aktif İlanlar</h2>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Yeni İlan Ekle
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
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Aktif İlanın Yok</h3>
                  <p className="text-gray-500 mb-6">İlk ilanını oluştur, satışa başla!</p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    İlk İlanını Oluştur
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sold-items" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Satılan Ürünler</h2>
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
            <h2 className="text-2xl font-bold text-gray-800">Hesap Ayarları</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Şifreni Değiştir</CardTitle>
                  <CardDescription>Hesap Şif</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-green-300 text-green-600">
                    Şifreni Değiştir
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bildirim</CardTitle>
                  <CardDescription>Manage your email and SMS preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-green-300 text-green-600">
                    Bildirimleri Yönet
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