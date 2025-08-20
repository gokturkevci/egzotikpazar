import React, { useState } from 'react';
import { Globe, Mail, Clock, Send, User, MessageSquare, Facebook, Twitter, Instagram, Youtube, Linkedin, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Contact form submitted:', formData);
      alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: Globe,
      title: 'Dijital Platform',
      details: '7/24 Online Hizmet\nTürkiye Geneli Dijital Pazaryeri',
      color: 'text-blue-600'
    },
    {
      icon: Mail,
      title: 'E-posta',
      details: 'info@exoticpets.com.tr\ndestek@exoticpets.com.tr',
      color: 'text-purple-600'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: '+90 532 555 0123\nAnlık Destek',
      color: 'text-green-600'
    },
    {
      icon: Clock,
      title: 'Destek Saatleri',
      details: 'Pazartesi - Cuma: 09:00 - 18:00\nCumartesi: 10:00 - 16:00\nPazar: E-posta Desteği',
      color: 'text-orange-600'
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: 'https://facebook.com/exoticpetsturkey', color: 'hover:text-blue-600' },
    { icon: Twitter, name: 'X (Twitter)', url: 'https://x.com/exoticpetsturkey', color: 'hover:text-gray-800' },
    { icon: Instagram, name: 'Instagram', url: 'https://instagram.com/exoticpetsturkey', color: 'hover:text-pink-600' },
    { icon: Youtube, name: 'YouTube', url: 'https://youtube.com/@exoticpetsturkey', color: 'hover:text-red-600' },
    { icon: Linkedin, name: 'LinkedIn', url: 'https://linkedin.com/company/exoticpetsturkey', color: 'hover:text-blue-700' }
  ];

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
              İletişime Geçin
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Türkiye'nin ilk egzotik hayvan pazaryeri hakkında sorularınız mı var? 
              Size yardımcı olmaktan mutluluk duyarız!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <div className="animate-slide-in-left">
              <Card className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 backdrop-blur-md shadow-2xl border-2 border-white/60 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-white/20">
                  <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
                    <MessageSquare className="w-8 h-8 mr-3 text-blue-600" />
                    Mesaj Gönderin
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Sorularınızı ve önerilerinizi bizimle paylaşın
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                          Ad Soyad *
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Adınızı ve soyadınızı girin"
                            required
                            className="pl-12 py-3 rounded-xl border-2 border-blue-200/50 focus:border-blue-400 transition-all duration-300 bg-white/70"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                          E-posta *
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="E-posta adresinizi girin"
                            required
                            className="pl-12 py-3 rounded-xl border-2 border-blue-200/50 focus:border-blue-400 transition-all duration-300 bg-white/70"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                        Konu
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="Mesajınızın konusunu belirtin"
                        className="py-3 rounded-xl border-2 border-blue-200/50 focus:border-blue-400 transition-all duration-300 bg-white/70"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                        Mesaj *
                      </Label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Mesajınızı detaylı olarak yazın..."
                        required
                        rows="6"
                        className="w-full p-4 rounded-xl border-2 border-blue-200/50 focus:border-blue-400 focus:outline-none transition-all duration-300 resize-none bg-white/70"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                          Gönderiliyor...
                        </div>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Mesaj Gönder
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8 animate-slide-in-right">
              
              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => (
                  <Card 
                    key={index} 
                    className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 backdrop-blur-md shadow-xl border-2 border-white/60 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${info.color} bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <info.icon className="w-8 h-8" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{info.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                        {info.details}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* About Section */}
              <Card className="bg-gradient-to-br from-white via-green-50/30 to-emerald-50/40 backdrop-blur-md shadow-2xl border-2 border-white/60 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border-b border-white/20">
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    ExoticPets Türkiye Hakkında
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Türkiye'nin ilk ve en güvenilir egzotik hayvan pazaryeri olarak, 
                    sağlıklı ve kaliteli egzotik hayvanları pet severlere ulaştırmak için buradayız.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Deneyimli ekibimiz ve titizlikle seçilmiş satıcı ağımızla, 
                    hem alıcılara hem de satıcılara en iyi hizmeti sunmaya devam ediyoruz.
                  </p>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="bg-gradient-to-br from-white via-purple-50/30 to-pink-50/40 backdrop-blur-md shadow-2xl border-2 border-white/60 rounded-3xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-b border-white/20">
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    Sosyal Medyada Takip Edin
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    En son haberler ve güncellemeler için bizi takip edin
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-center space-x-6">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className={`w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 text-gray-600 ${social.color}`}
                        aria-label={social.name}
                      >
                        <social.icon className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '1s' }}>
            <Card className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 backdrop-blur-md shadow-2xl border-2 border-white/60 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 border-b border-white/20">
                <CardTitle className="text-2xl font-bold text-gray-800 text-center">
                  Konumumuz
                </CardTitle>
                <CardDescription className="text-gray-600 text-center">
                  İstanbul merkezindeki ofisimizi ziyaret edebilirsiniz
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="w-full h-96 bg-gradient-to-br from-gray-200 to-blue-100 flex items-center justify-center">
                  <div className="text-gray-600 text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                    <p className="text-lg font-semibold">Harita Entegrasyonu</p>
                    <p className="text-sm">Google Maps veya başka bir harita servis entegrasyonu</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
            <Card className="bg-gradient-to-br from-white via-orange-50/30 to-red-50/40 backdrop-blur-md shadow-2xl border-2 border-white/60 rounded-3xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-600/10 to-red-600/10 border-b border-white/20">
                <CardTitle className="text-2xl font-bold text-gray-800 text-center">
                  Sık Sorulan Sorular
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Nasıl satıcı olabilirim?</h4>
                    <p className="text-gray-600 text-sm">Kayıt olduktan sonra profil ayarlarınızdan satıcı başvurusu yapabilirsiniz.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Ödeme güvenli mi?</h4>
                    <p className="text-gray-600 text-sm">Tüm ödemeler SSL sertifikası ile korumalı sistemimiz üzerinden yapılmaktadır.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Kargo nasıl yapılıyor?</h4>
                    <p className="text-gray-600 text-sm">Özel hayvan kargo firmaları ile güvenli ve hızlı teslimat sağlıyoruz.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Müşteri desteği saatleri?</h4>
                    <p className="text-gray-600 text-sm">Hafta içi 09:00-18:00, Cumartesi 10:00-16:00 saatleri arasında hizmet veriyoruz.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;