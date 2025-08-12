import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus, ArrowLeft, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { speciesOptions, genderOptions, ageOptions } from '../mock';

const AddListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    species: '',
    subSpecies: '',
    morph: '',
    gender: '',
    age: '',
    price: '',
    quantity: 1,
    description: '',
    images: []
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Mock image upload - in real app would upload to cloud storage
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          images: [...prev.images, {
            id: Date.now() + Math.random(),
            url: event.target.result,
            name: file.name
          }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== imageId)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.species) newErrors.species = 'Species is required';
    if (!formData.subSpecies.trim()) newErrors.subSpecies = 'Sub-species is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.images.length === 0) newErrors.images = 'At least one image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Mock listing creation
    setTimeout(() => {
      console.log('Creating listing:', formData);
      setIsLoading(false);
      navigate('/profile');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/profile')}
            className="hover:bg-green-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Profile
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">Create New Listing</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>Essential details about your pet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title *</label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Beautiful Ball Python - Pastel Morph"
                      className={errors.title ? 'border-red-500' : 'border-gray-300'}
                    />
                    {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Species *</label>
                      <Select value={formData.species} onValueChange={(value) => handleSelectChange('species', value)}>
                        <SelectTrigger className={errors.species ? 'border-red-500' : 'border-gray-300'}>
                          <SelectValue placeholder="Select species" />
                        </SelectTrigger>
                        <SelectContent>
                          {speciesOptions.filter(s => s !== 'All').map((species) => (
                            <SelectItem key={species} value={species}>
                              {species}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.species && <p className="text-red-500 text-xs">{errors.species}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Sub-species *</label>
                      <Input
                        name="subSpecies"
                        value={formData.subSpecies}
                        onChange={handleChange}
                        placeholder="e.g., Ball Python"
                        className={errors.subSpecies ? 'border-red-500' : 'border-gray-300'}
                      />
                      {errors.subSpecies && <p className="text-red-500 text-xs">{errors.subSpecies}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Morph (optional)</label>
                    <Input
                      name="morph"
                      value={formData.morph}
                      onChange={handleChange}
                      placeholder="e.g., Pastel, Albino, Normal"
                      className="border-gray-300"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Gender *</label>
                      <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
                        <SelectTrigger className={errors.gender ? 'border-red-500' : 'border-gray-300'}>
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          {genderOptions.filter(g => g !== 'All').map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Age *</label>
                      <Select value={formData.age} onValueChange={(value) => handleSelectChange('age', value)}>
                        <SelectTrigger className={errors.age ? 'border-red-500' : 'border-gray-300'}>
                          <SelectValue placeholder="Age" />
                        </SelectTrigger>
                        <SelectContent>
                          {ageOptions.filter(a => a !== 'All').map((age) => (
                            <SelectItem key={age} value={age}>
                              {age}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.age && <p className="text-red-500 text-xs">{errors.age}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Quantity</label>
                      <Input
                        name="quantity"
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Price ($) *</label>
                    <Input
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className={errors.price ? 'border-red-500' : 'border-gray-300'}
                    />
                    {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Description *</label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your pet's temperament, health, feeding habits, and any special characteristics..."
                      rows={4}
                      className={errors.description ? 'border-red-500' : 'border-gray-300'}
                    />
                    {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                  </div>
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card>
                <CardHeader>
                  <CardTitle>Photos</CardTitle>
                  <CardDescription>Upload clear, high-quality photos of your pet</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                      <input
                        type="file"
                        id="image-upload"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Camera className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">Click to upload photos</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Support: JPG, PNG, GIF (Max 10MB each)
                        </p>
                      </label>
                    </div>

                    {errors.images && <p className="text-red-500 text-xs">{errors.images}</p>}

                    {/* Uploaded Images */}
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={image.id} className="relative group">
                            <img
                              src={image.url}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(image.id)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                            {index === 0 && (
                              <Badge className="absolute bottom-1 left-1 text-xs bg-green-600">
                                Main
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview & Submit */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Listing Preview</CardTitle>
                  <CardDescription>How your listing will appear</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Preview Card */}
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {formData.images.length > 0 ? (
                      <img
                        src={formData.images[0].url}
                        alt="Preview"
                        className="w-full h-32 object-cover"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-green-600">
                          {formData.price ? `$${formData.price}` : '$0'}
                        </span>
                        {formData.quantity > 1 && (
                          <Badge variant="outline" className="text-xs">
                            Qty: {formData.quantity}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-800 text-sm line-clamp-2 mb-2">
                        {formData.title || 'Your listing title'}
                      </h3>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {formData.species && (
                          <Badge variant="outline" className="text-xs">
                            {formData.species}
                          </Badge>
                        )}
                        {formData.subSpecies && (
                          <Badge variant="outline" className="text-xs">
                            {formData.subSpecies}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-gray-600">
                        {formData.gender && <span>Gender: {formData.gender}</span>}
                        {formData.age && <span className="ml-2">Age: {formData.age}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-medium"
                  >
                    {isLoading ? 'Creating Listing...' : 'Publish Listing'}
                  </Button>

                  {/* Save Draft */}
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border-green-300 text-green-600 hover:bg-green-50"
                  >
                    Save as Draft
                  </Button>

                  {/* Guidelines */}
                  <div className="text-xs text-gray-500 space-y-2 mt-4">
                    <h4 className="font-medium text-gray-700">Listing Guidelines:</h4>
                    <ul className="space-y-1">
                      <li>• Use clear, well-lit photos</li>
                      <li>• Be honest about pet's condition</li>
                      <li>• Include care requirements</li>
                      <li>• Set competitive pricing</li>
                      <li>• Respond to messages promptly</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;