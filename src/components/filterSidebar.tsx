'use client'

import { SlidersHorizontal, X } from 'lucide-react';

interface Filters {
  category: string;
  priceRange: string;
  color: string;
  size: string;
}

interface Product {
  category: string;
  color: string;
  sizes: string[];
  price: number;
}

interface FilterSidebarProps {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  products: Product[];
  showFilters?: boolean;
  setShowFilters?: (show: boolean) => void;
  isMobile?: boolean;
}

export function FilterSidebar({ 
  filters, 
  setFilters, 
  products, 
  showFilters = false, 
  setShowFilters, 
  isMobile = false 
}: FilterSidebarProps) {
  
  const categories = ['all', 'dresses', 'tops', 'bottoms', 'outerwear', 'sets'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'under250', label: 'Under ₹250' },
    { value: '250to350', label: '₹250 - ₹350' },
    { value: 'over350', label: 'Over ₹350' },
  ];

  const uniqueColors = ['all', ...Array.from(new Set(products.map(p => p.color)))];
  const uniqueSizes = ['all', ...Array.from(new Set(products.flatMap(p => p.sizes)))];

  const clearAllFilters = () => {
    setFilters({ category: 'all', priceRange: 'all', color: 'all', size: 'all' });
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Category</h3>
        <div className="space-y-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilters({ ...filters, category: cat })}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-all ${
                filters.category === cat
                  ? 'text-white shadow-lg transform scale-105'
                  : 'bg-gray-50 text-gray-700 hover:bg-green-50'
              }`}
              style={filters.category === cat ? { backgroundColor: '#00a63e' } : {}}
            >
              <span className="capitalize">{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Price Range</h3>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <button
              key={range.value}
              onClick={() => setFilters({ ...filters, priceRange: range.value })}
              className={`w-full text-left px-4 py-2.5 rounded-xl font-medium transition-all ${
                filters.priceRange === range.value
                  ? 'text-white shadow-lg transform scale-105'
                  : 'bg-gray-50 text-gray-700 hover:bg-green-50'
              }`}
              style={filters.priceRange === range.value ? { backgroundColor: '#00a63e' } : {}}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Color</h3>
        <div className="grid grid-cols-2 gap-2">
          {uniqueColors.map(color => (
            <button
              key={color}
              onClick={() => setFilters({ ...filters, color })}
              className={`px-4 py-2.5 rounded-xl font-medium transition-all capitalize ${
                filters.color === color
                  ? 'text-white shadow-lg transform scale-105'
                  : 'bg-gray-50 text-gray-700 hover:bg-green-50'
              }`}
              style={filters.color === color ? { backgroundColor: '#00a63e' } : {}}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Size</h3>
        <div className="grid grid-cols-3 gap-2">
          {uniqueSizes.map(size => (
            <button
              key={size}
              onClick={() => setFilters({ ...filters, size })}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all uppercase ${
                filters.size === size
                  ? 'text-white shadow-lg transform scale-105'
                  : 'bg-gray-50 text-gray-700 hover:bg-green-50'
              }`}
              style={filters.size === size ? { backgroundColor: '#00a63e' } : {}}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Desktop Sidebar
  if (!isMobile) {
    return (
      <div className="hidden lg:block w-80 flex-shrink-0">
        <div className="sticky top-24 bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
            <button
              onClick={clearAllFilters}
              className="text-sm font-semibold text-gray-500 hover:text-green-600 transition-colors"
            >
              Clear All
            </button>
          </div>
          <FilterContent />
        </div>
      </div>
    );
  }

  // Mobile Modal
  if (!showFilters) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
          <button 
            onClick={() => setShowFilters && setShowFilters(false)} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <FilterContent />

          <div className="flex gap-3 pt-6 sticky bottom-0 bg-white">
            <button
              onClick={() => {
                clearAllFilters();
                setShowFilters && setShowFilters(false);
              }}
              className="flex-1 px-6 py-3 rounded-full border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={() => setShowFilters && setShowFilters(false)}
              className="flex-1 px-6 py-3 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition-all"
              style={{ backgroundColor: '#00a63e' }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}