import React, { useState, useMemo } from 'react';
import { Search, Filter, Clock, User, Eye, Heart, ArrowRight, TrendingUp, Calendar, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Mock blog data
  const blogPosts = [
    {
      id: 1,
      title: "Leopar Gecko Bakımı: Başlangıç Rehberi",
      excerpt: "Leopar geckoların temel bakım ihtiyaçları, beslenme programı ve habitat kurulumu hakkında kapsamlı rehber.",
      content: "Leopar gekoları...",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      category: "Geckos",
      author: "Dr. Ayşe Kaya",
      publishDate: "2024-01-15",
      readTime: "8 min",
      views: 1250,
      likes: 89,
      featured: true,
      tags: ["beginner", "care-guide", "habitat"]
    },
    {
      id: 2,
      title: "Egzotik Kuşlar İçin Doğru Beslenme",
      excerpt: "Papağan, kanarya ve diğer egzotik kuş türleri için beslenme programları ve önemli beslenme ipuçları.",
      content: "Egzotik kuşların beslenme ihtiyaçları...",
      image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop",
      category: "Exotic Birds",
      author: "Prof. Mehmet Özkan",
      publishDate: "2024-01-12",
      readTime: "6 min",
      views: 980,
      likes: 67,
      featured: false,
      tags: ["nutrition", "birds", "health"]
    },
    {
      id: 3,
      title: "Akvaryum Kurulumu: Tropik Balıklar",
      excerpt: "Tropik balıklar için ideal akvaryum ortamı nasıl hazırlanır? Su sıcaklığı, filtrasyon ve dekorasyon ipuçları.",
      content: "Tropik balık akvaryumu kurmak...",
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c33a?w=600&h=400&fit=crop",
      category: "Aquatic Animals",
      author: "Biyolog Fatma Demir",
      publishDate: "2024-01-10",
      readTime: "10 min",
      views: 1450,
      likes: 102,
      featured: true,
      tags: ["aquarium", "setup", "tropical-fish"]
    },
    {
      id: 4,
      title: "Bearded Dragon Sağlığı ve Veteriner Kontrolleri",
      excerpt: "Sakallı ejderlerin sık karşılaştığı sağlık sorunları ve düzenli veteriner kontrollerinin önemi.",
      content: "Bearded dragonların sağlığı...",
      image: "https://images.unsplash.com/photo-1580315399732-73c4e5b4e0e7?w=600&h=400&fit=crop",
      category: "Reptiles",
      author: "Veteriner Hakan Yılmaz",
      publishDate: "2024-01-08",
      readTime: "7 min",
      views: 876,
      likes: 54,
      featured: false,
      tags: ["health", "veterinary", "bearded-dragon"]
    },
    {
      id: 5,
      title: "Python Bakımında Sıcaklık ve Nem Kontrolü",
      excerpt: "Python türleri için optimal sıcaklık ve nem seviyeleri. Isıtma ekipmanları ve kontrol sistemleri.",
      content: "Python bakımında en önemli faktörler...",
      image: "https://images.unsplash.com/photo-1516505138812-55db2770b9b3?w=600&h=400&fit=crop",
      category: "Reptiles",
      author: "Uzman Serpil Aktaş",
      publishDate: "2024-01-05",
      readTime: "9 min",
      views: 1120,
      likes: 78,
      featured: false,
      tags: ["python", "temperature", "humidity"]
    },
    {
      id: 6,
      title: "Crested Gecko Habitat Dekorasyonu",
      excerpt: "Crested geckoların doğal yaşam alanlarını taklit eden terrarium dekorasyonu ve bitki seçimi.",
      content: "Crested gecko habitat tasarımı...",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      category: "Geckos",
      author: "Terrarium Uzmanı Ali Vural",
      publishDate: "2024-01-03",
      readTime: "5 min",
      views: 723,
      likes: 45,
      featured: false,
      tags: ["crested-gecko", "habitat", "decoration"]
    },
    {
      id: 7,
      title: "Macaw Papağanları: Sosyalleşme ve Eğitim",
      excerpt: "Büyük papağanların sosyalleşme ihtiyaçları, eğitim teknikleri ve davranış problemleri çözümleri.",
      content: "Macaw papağanları...",
      image: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&h=400&fit=crop",
      category: "Exotic Birds",
      author: "Davranış Uzmanı Zeynep Kara",
      publishDate: "2024-01-01",
      readTime: "12 min",
      views: 1580,
      likes: 134,
      featured: true,
      tags: ["macaw", "training", "socialization"]
    },
    {
      id: 8,
      title: "Axolotl Bakımı ve Su Kalitesi",
      excerpt: "Su salamandırı axolotl'ların bakım gereksinimleri, su kalitesi parametreleri ve beslenme düzeni.",
      content: "Axolotl bakımında dikkat edilmesi gerekenler...",
      image: "https://images.unsplash.com/photo-1583419124505-51e5976c399c?w=600&h=400&fit=crop",
      category: "Aquatic Animals",
      author: "Akvaryum Uzmanı Deniz Bulut",
      publishDate: "2023-12-28",
      readTime: "8 min",
      views: 945,
      likes: 71,
      featured: false,
      tags: ["axolotl", "water-quality", "care"]
    }
  ];

  const categories = ['All', 'Geckos', 'Exotic Birds', 'Aquatic Animals', 'Reptiles'];

  // Filter and search logic
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts;

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        return filtered.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
      case 'popular':
        return filtered.sort((a, b) => b.views - a.views);
      case 'liked':
        return filtered.sort((a, b) => b.likes - a.likes);
      default:
        return filtered;
    }
  }, [selectedCategory, searchQuery, sortBy]);

  const featuredPosts = blogPosts.filter(post => post.featured);
  const recentPosts = blogPosts.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate)).slice(0, 5);
  const popularPosts = blogPosts.sort((a, b) => b.views - a.views).slice(0, 5);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-20 -right-4 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              Egzotik Hayvan Blogu
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Egzotik hayvanlarınızın bakımı, sağlığı ve mutluluğu için uzman rehberleri keşfedin
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-12 animate-slide-in-left">
            <Card className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 backdrop-blur-md shadow-2xl border-2 border-white/60 rounded-3xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6 items-center">
                  
                  {/* Search Bar */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Blog yazıları ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 py-3 rounded-xl border-2 border-blue-200/50 focus:border-blue-400 transition-all duration-300 bg-white/70"
                    />
                  </div>

                  {/* Sort Dropdown */}
                  <div className="flex items-center space-x-3">
                    <Filter className="w-5 h-5 text-gray-600" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white/70 border-2 border-blue-200/50 rounded-xl px-4 py-3 focus:border-blue-400 focus:outline-none transition-all duration-300"
                    >
                      <option value="newest">En Yeni</option>
                      <option value="popular">En Popüler</option>
                      <option value="liked">En Çok Beğenilen</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Tabs */}
          <div className="mb-12 animate-slide-in-right">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`rounded-full px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-white/70 text-gray-700 border-2 border-blue-200/50 hover:bg-blue-50'
                  }`}
                >
                  <Tag className="w-4 h-4 mr-2" />
                  {category === 'All' ? 'Tümü' : category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              
              {/* Featured Posts Section */}
              {selectedCategory === 'All' && !searchQuery && (
                <div className="mb-12 animate-fade-in-up">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <TrendingUp className="w-8 h-8 mr-3 text-blue-600" />
                    Öne Çıkan Yazılar
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {featuredPosts.slice(0, 2).map((post, index) => (
                      <Card 
                        key={post.id}
                        className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 backdrop-blur-md shadow-2xl border-2 border-white/60 rounded-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:scale-105 group animate-scale-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="relative overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <Badge className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 font-semibold">
                            Öne Çıkan
                          </Badge>
                          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1">
                            {post.category}
                          </Badge>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="font-bold text-xl text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                {post.author}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {post.readTime}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              <span className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {post.views}
                              </span>
                              <span className="flex items-center">
                                <Heart className="w-3 h-3 mr-1" />
                                {post.likes}
                              </span>
                            </div>
                          </div>
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold">
                            <ArrowRight className="w-4 h-4 mr-2" />
                            Devamını Oku
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Regular Posts Grid */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedCategory === 'All' ? 'Tüm Yazılar' : selectedCategory}
                  </h2>
                  <Badge className="bg-blue-100 text-blue-700 px-3 py-1">
                    {filteredPosts.length} yazı
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredPosts.map((post, index) => (
                    <Card 
                      key={post.id}
                      className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 backdrop-blur-md shadow-xl border-2 border-white/60 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <Badge className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-2 py-1 text-xs">
                          {post.category}
                        </Badge>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(post.publishDate)}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {post.views}
                          </span>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 rounded-xl"
                        >
                          Devamını Oku
                          <ArrowRight className="w-3 h-3 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Yazı Bulunamadı</h3>
                    <p className="text-gray-500">
                      {searchQuery ? `"${searchQuery}" araması için sonuç bulunamadı.` : 'Bu kategoride henüz yazı bulunmuyor.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8 animate-slide-in-right">
              
              {/* Recent Posts */}
              <Card className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/40 backdrop-blur-md shadow-xl border-2 border-white/60 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border-b border-white/20">
                  <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-green-600" />
                    Son Yazılar
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {recentPosts.map((post, index) => (
                    <div key={post.id} className="p-4 border-b border-white/20 last:border-b-0 hover:bg-white/50 transition-colors duration-300 cursor-pointer">
                      <div className="flex space-x-3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-1">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {formatDate(post.publishDate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Posts */}
              <Card className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/40 backdrop-blur-md shadow-xl border-2 border-white/60 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-b border-white/20">
                  <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
                    Popüler Yazılar
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {popularPosts.map((post, index) => (
                    <div key={post.id} className="p-4 border-b border-white/20 last:border-b-0 hover:bg-white/50 transition-colors duration-300 cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-purple-100 text-purple-700 text-xs px-2 py-1">
                          #{index + 1}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Eye className="w-3 h-3 mr-1" />
                          {post.views}
                        </div>
                      </div>
                      <h4 className="font-semibold text-sm text-gray-800 line-clamp-2">
                        {post.title}
                      </h4>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="bg-gradient-to-br from-white via-orange-50/30 to-red-50/40 backdrop-blur-md shadow-xl border-2 border-white/60 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-orange-600/10 to-red-600/10 border-b border-white/20">
                  <CardTitle className="text-lg font-bold text-gray-800 flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-orange-600" />
                    Kategoriler
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    {categories.slice(1).map((category) => {
                      const count = blogPosts.filter(post => post.category === category).length;
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-300 text-left ${
                            selectedCategory === category
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                              : 'bg-white/70 text-gray-700 hover:bg-orange-50'
                          }`}
                        >
                          <span className="font-medium">{category}</span>
                          <Badge className={`${
                            selectedCategory === category ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {count}
                          </Badge>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;