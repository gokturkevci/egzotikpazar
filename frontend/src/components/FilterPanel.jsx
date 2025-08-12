import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
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

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          className="flex items-center space-x-2 border-green-300 text-green-600 hover:bg-green-50"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`
        ${isOpen ? 'block' : 'hidden lg:block'}
        bg-white rounded-lg shadow-lg border border-green-100 p-6 space-y-6
      `}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
            <Filter className="w-5 h-5 text-green-600" />
            <span>Filters</span>
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="lg:hidden"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Species Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Species</label>
          <Select value={filters.species} onValueChange={(value) => handleFilterChange('species', value)}>
            <SelectTrigger className="border-green-200 focus:border-green-400">
              <SelectValue placeholder="Select species" />
            </SelectTrigger>
            <SelectContent>
              {speciesOptions.map((species) => (
                <SelectItem key={species} value={species}>
                  {species}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sub-species Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Sub-species / Morph</label>
          <Select value={filters.subSpecies} onValueChange={(value) => handleFilterChange('subSpecies', value)}>
            <SelectTrigger className="border-green-200 focus:border-green-400">
              <SelectValue placeholder="Select sub-species" />
            </SelectTrigger>
            <SelectContent>
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

        {/* Price Range */}
        <div className="space-y-4">
          <label className="text-sm font-medium text-gray-700">
            Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </label>
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            max={1000}
            min={0}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>$0</span>
            <span>$1000+</span>
          </div>
        </div>

        {/* Gender Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Gender</label>
          <Select value={filters.gender} onValueChange={(value) => handleFilterChange('gender', value)}>
            <SelectTrigger className="border-green-200 focus:border-green-400">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {genderOptions.map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Age Range Filter */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Age Range</label>
          <Select value={filters.age} onValueChange={(value) => handleFilterChange('age', value)}>
            <SelectTrigger className="border-green-200 focus:border-green-400">
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent>
              {ageOptions.map((age) => (
                <SelectItem key={age} value={age}>
                  {age}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* In Stock Only */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="inStock"
            checked={filters.inStock}
            onCheckedChange={(checked) => handleFilterChange('inStock', checked)}
            className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
          />
          <label htmlFor="inStock" className="text-sm font-medium text-gray-700 cursor-pointer">
            Only show in stock
          </label>
        </div>

        {/* Filter Actions */}
        <div className="flex space-x-3 pt-4">
          <Button
            onClick={onApplyFilters}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            Apply Filters
          </Button>
          <Button
            onClick={onClearFilters}
            variant="outline"
            className="flex-1 border-green-300 text-green-600 hover:bg-green-50"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;