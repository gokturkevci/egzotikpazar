import React, { useState } from 'react';
import { Filter, X, Sliders, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { speciesOptions, genderOptions, ageOptions } from '../mock';

const FilterPanel = ({ filters, onFiltersChange, onApplyFilters, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handlePriceChange = (value) => {
    handleFilterChange('priceRange', value);
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === 'priceRange') return value[0] > 0 || value[1] < 1000;
    if (key === 'inStock') return value;
    return value !== 'All' && value !== '';
  }).length;

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">Filters</span>
          {activeFiltersCount > 0 && (
            <Badge className="bg-orange-500 text-white rounded-full px-2 py-1 text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      {/* Enhanced Filter Panel */}
      <div className={`
        ${isOpen ? 'block' : 'hidden lg:block'}
        transition-all duration-300
      `}>
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <span className="text-xl font-bold">Filters</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                {activeFiltersCount > 0 && (
                  <Badge className="bg-orange-500 text-white rounded-full px-2 py-1 text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="lg:hidden text-white hover:bg-white/20 rounded-xl p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Species Filter */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Species</span>
              </label>
              <Select value={filters.species} onValueChange={(value) => handleFilterChange('species', value)}>
                <SelectTrigger className="border-2 border-green-200/50 focus:border-green-400 rounded-xl bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-300">
                  <SelectValue placeholder="All species" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl">
                  {speciesOptions.map((species) => (
                    <SelectItem key={species} value={species} className="rounded-lg">
                      {species}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Sub-species Filter */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Sub-species / Morph</label>
              <Select value={filters.subSpecies} onValueChange={(value) => handleFilterChange('subSpecies', value)}>
                <SelectTrigger className="border-2 border-green-200/50 focus:border-green-400 rounded-xl bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-300">
                  <SelectValue placeholder="All sub-species" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Ball Python">Ball Python</SelectItem>
                  <SelectItem value="Corn Snake">Corn Snake</SelectItem>
                  <SelectItem value="Crested Gecko">Crested Gecko</SelectItem>
                  <SelectItem value="Leopard Gecko">Leopard Gecko</SelectItem>
                  <SelectItem value="Bearded Dragon">Bearded Dragon</SelectItem>
                  <SelectItem value="Blue Tongue Skink">Blue Tongue Skink</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Enhanced Price Range */}
            <div className="space-y-4">
              <label className="text-sm font-semibold text-gray-700">
                Price Range
              </label>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-bold text-green-700">${filters.priceRange[0]}</span>
                  <span className="text-sm text-gray-500">to</span>
                  <span className="text-lg font-bold text-green-700">${filters.priceRange[1]}</span>
                </div>
                <Slider
                  value={filters.priceRange}
                  onValueChange={handlePriceChange}
                  max={1000}
                  min={0}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>$0</span>
                  <span>$500</span>
                  <span>$1000+</span>
                </div>
              </div>
            </div>

            {/* Gender Filter */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Gender</label>
              <Select value={filters.gender} onValueChange={(value) => handleFilterChange('gender', value)}>
                <SelectTrigger className="border-2 border-green-200/50 focus:border-green-400 rounded-xl bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-300">
                  <SelectValue placeholder="All genders" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl">
                  {genderOptions.map((gender) => (
                    <SelectItem key={gender} value={gender} className="rounded-lg">
                      {gender}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Age Range Filter */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Age Range</label>
              <Select value={filters.age} onValueChange={(value) => handleFilterChange('age', value)}>
                <SelectTrigger className="border-2 border-green-200/50 focus:border-green-400 rounded-xl bg-white/70 backdrop-blur-sm hover:bg-white transition-all duration-300">
                  <SelectValue placeholder="All ages" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-0 shadow-xl">
                  {ageOptions.map((age) => (
                    <SelectItem key={age} value={age} className="rounded-lg">
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Enhanced In Stock Checkbox */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-4 border border-amber-100">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="inStock"
                  checked={filters.inStock}
                  onCheckedChange={(checked) => handleFilterChange('inStock', checked)}
                  className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600 rounded-lg"
                />
                <label htmlFor="inStock" className="text-sm font-semibold text-gray-700 cursor-pointer flex items-center space-x-2">
                  <span>Only show available pets</span>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </label>
              </div>
            </div>

            {/* Enhanced Filter Actions */}
            <div className="flex space-x-3 pt-4">
              <Button
                onClick={onApplyFilters}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-2xl py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Apply Filters
              </Button>
              <Button
                onClick={onClearFilters}
                variant="outline"
                className="flex-1 border-2 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-2xl py-3 font-semibold transition-all duration-300"
              >
                Clear All
              </Button>
            </div>

            {/* Quick Filter Tags */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700">Quick Filters</label>
              <div className="flex flex-wrap gap-2">
                {['Under $200', 'Beginner Friendly', 'Breeding Pair', 'Recently Posted'].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-green-100 border-green-300 text-green-700 rounded-full px-3 py-1 text-xs transition-all duration-200 hover:scale-105"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FilterPanel;