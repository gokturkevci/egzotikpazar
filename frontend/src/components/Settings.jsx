import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Globe, Palette, Moon, Sun, Smartphone, Mail, Lock, Key, Eye, EyeOff, Save, Camera, Edit3, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { currentUser } from '../mock';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState({
    profile: false,
    password: false
  });
  
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: '+90 555 123 4567',
    bio: 'Egzotik hayvan uzmanı ve tutkulu koleksiyoner',
    location: 'İstanbul, Türkiye'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (type, value) => {
    setNotifications(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Settings Header */}
        <div className="mb-8 text-center animate-fade-in-up">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-transparent mb-2">
            Ayarlar
          </h1>
          <p className="text-lg text-gray-600">
            Hesabınızı ve tercihlerinizi yönetin
          </p>
        </div>

        {/* Settings Tabs */}
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-white/70 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-2 shadow-lg">
            <TabsTrigger 
              value="profile" 
              className="rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <User className="w-4 h-4 mr-2" />
              Profil
            </TabsTrigger>
            <TabsTrigger 
              value="notifications"
              className="rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Bell className="w-4 h-4 mr-2" />
              Bildirimler
            </TabsTrigger>
            <TabsTrigger 
              value="security"
              className="rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Shield className="w-4 h-4 mr-2" />
              Güvenlik
            </TabsTrigger>
            <TabsTrigger 
              value="preferences"
              className="rounded-xl font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Palette className="w-4 h-4 mr-2" />
              Tercihler
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6 animate-fade-in-up">
            <Card className="shadow-xl border-0 bg-gradient-to-r from-white via-blue-50/50 to-indigo-50/50 backdrop-blur-sm overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                      <User className="w-6 h-6 mr-3 text-blue-600" />
                      Profil Bilgileri
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Kişisel bilgilerinizi güncelleyin
                    </CardDescription>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(prev => ({ ...prev, profile: !prev.profile }))}
                    className="border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    {isEditing.profile ? 'İptal' : 'Düzenle'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Profile Picture */}
                <div className="flex items-center space-x-6">
                  <div className="relative group">
                    <img
                      src={currentUser.profilePicture}
                      alt={currentUser.name}
                      className="w-24 h-24 rounded-full border-4 border-blue-200 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <Badge className="absolute -bottom-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      Öncü
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl">
                      <Camera className="w-4 h-4 mr-2" />
                      Fotoğraf Değiştir
                    </Button>
                    <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 rounded-xl">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Fotoğrafı Kaldır
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Ad Soyad</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing.profile}
                      className="rounded-xl border-2 border-blue-200 focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">E-posta</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing.profile}
                      className="rounded-xl border-2 border-blue-200 focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">Telefon</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing.profile}
                      className="rounded-xl border-2 border-blue-200 focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-sm font-semibold text-gray-700">Konum</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      disabled={!isEditing.profile}
                      className="rounded-xl border-2 border-blue-200 focus:border-blue-400 transition-all duration-300"
                    />
                  </div>
                </div>

                {isEditing.profile && (
                  <div className="flex justify-end space-x-3 pt-4 border-t border-blue-200">
                    <Button variant="outline" onClick={() => setIsEditing(prev => ({ ...prev, profile: false }))}>
                      İptal
                    </Button>
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl">
                      <Save className="w-4 h-4 mr-2" />
                      Kaydet
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6 animate-fade-in-up">
            <Card className="shadow-xl border-0 bg-gradient-to-r from-white via-green-50/50 to-emerald-50/50 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-600/10 to-emerald-600/10">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                  <Bell className="w-6 h-6 mr-3 text-green-600" />
                  Bildirim Ayarları
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Hangi bildirimleri almak istediğinizi seçin
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-green-600" />
                      <div>
                        <h4 className="font-semibold text-gray-800">E-posta Bildirimleri</h4>
                        <p className="text-sm text-gray-600">Yeni mesajlar ve güncellemeler</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.emailNotifications}
                      onCheckedChange={(value) => handleNotificationChange('emailNotifications', value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-gray-800">Push Bildirimleri</h4>
                        <p className="text-sm text-gray-600">Anlık mobil bildirimler</p>
                      </div>
                    </div>
                    <Switch 
                      checked={notifications.pushNotifications}
                      onCheckedChange={(value) => handleNotificationChange('pushNotifications', value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6 animate-fade-in-up">
            <Card className="shadow-xl border-0 bg-gradient-to-r from-white via-purple-50/50 to-pink-50/50 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-600/10 to-pink-600/10">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-purple-600" />
                  Güvenlik Ayarları
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Hesabınızın güvenliğini yönetin
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white/60 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-800 flex items-center">
                        <Lock className="w-4 h-4 mr-2" />
                        Şifre Değiştir
                      </h4>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setIsEditing(prev => ({ ...prev, password: !prev.password }))}
                        className="border-purple-300 text-purple-600 hover:bg-purple-50"
                      >
                        {isEditing.password ? 'İptal' : 'Değiştir'}
                      </Button>
                    </div>
                    
                    {isEditing.password && (
                      <div className="space-y-3">
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Mevcut şifre"
                            className="pr-10 rounded-xl border-2 border-purple-200 focus:border-purple-400"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                        </div>
                        <Input
                          type="password"
                          placeholder="Yeni şifre"
                          className="rounded-xl border-2 border-purple-200 focus:border-purple-400"
                        />
                        <Input
                          type="password"
                          placeholder="Yeni şifre tekrar"
                          className="rounded-xl border-2 border-purple-200 focus:border-purple-400"
                        />
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">İptal</Button>
                          <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                            Kaydet
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-4 bg-white/60 rounded-xl border border-purple-200">
                    <h4 className="font-semibold text-gray-800 flex items-center mb-3">
                      <Key className="w-4 h-4 mr-2" />
                      İki Faktörlü Doğrulama
                    </h4>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Hesabınız için ek güvenlik katmanı
                      </div>
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl">
                        Etkinleştir
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences */}
          <TabsContent value="preferences" className="space-y-6 animate-fade-in-up">
            <Card className="shadow-xl border-0 bg-gradient-to-r from-white via-orange-50/50 to-red-50/50 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-orange-600/10 to-red-600/10">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                  <Palette className="w-6 h-6 mr-3 text-orange-600" />
                  Tercihler
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Uygulama tercihlerinizi özelleştirin
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/60 rounded-xl border border-orange-200">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-orange-600" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Dil</h4>
                      <p className="text-sm text-gray-600">Türkçe</p>
                    </div>
                  </div>
                  <Button variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                    Değiştir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;