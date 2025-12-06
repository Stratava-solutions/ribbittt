// src/components/FilterSidebar.tsx
'use client'

interface Filters {
  category: string
  priceRange: string
  color: string
  size: string
}

interface Product {
  category: string
  color: string
  sizes: string[]
  price: number
}

interface FilterSidebarProps {
  filters: Filters
  setFilters: (filters: Filters) => void
  products: Product[]
}

export function FilterSidebar({ filters, setFilters, products }: FilterSidebarProps) {
  const categories = ['all', 'dresses', 'tops', 'bottoms', 'outerwear', 'sets']
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'under250', label: 'Under ₹250' },
    { value: '250to350', label: '₹250 - ₹350' },
    { value: 'over350', label: 'Over ₹350' }
  ]

  // Extract unique colors and sizes from products
  const uniqueColors = ['all', ...Array.from(new Set(products.map(p => p.color)))]
  const uniqueSizes = ['all', ...Array.from(new Set(products.flatMap(p => p.sizes)))]

  // Count products for each filter option
  const getCategoryCount = (cat: string) => {
    if (cat === 'all') return products.length
    return products.filter(p => p.category === cat).length
  }

  const getColorCount = (color: string) => {
    if (color === 'all') return products.length
    return products.filter(p => p.color === color).length
  }

  const getSizeCount = (size: string) => {
    if (size === 'all') return products.length
    return products.filter(p => p.sizes.includes(size)).length
  }

  const getPriceRangeCount = (range: string) => {
    if (range === 'all') return products.length
    if (range === 'under25') return products.filter(p => p.price < 25).length
    if (range === '25to35') return products.filter(p => p.price >= 25 && p.price <= 35).length
    if (range === 'over35') return products.filter(p => p.price > 35).length
    return 0
  }

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <div className="border rounded-lg p-6 sticky top-24 bg-white">
        <h2 className="text-xl font-bold mb-6">Filters</h2>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <label key={cat} className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    checked={filters.category === cat}
                    onChange={() => setFilters({ ...filters, category: cat })}
                    className="cursor-pointer"
                  />
                  <span className="capitalize">{cat}</span>
                </div>
                <span className="text-xs text-gray-500">({getCategoryCount(cat)})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map(range => (
              <label key={range.value} className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filters.priceRange === range.value}
                    onChange={() => setFilters({ ...filters, priceRange: range.value })}
                    className="cursor-pointer"
                  />
                  <span>{range.label}</span>
                </div>
                <span className="text-xs text-gray-500">({getPriceRangeCount(range.value)})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Color</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {uniqueColors.map(color => (
              <label key={color} className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="color"
                    checked={filters.color === color}
                    onChange={() => setFilters({ ...filters, color: color })}
                    className="cursor-pointer"
                  />
                  <span className="capitalize">{color}</span>
                </div>
                <span className="text-xs text-gray-500">({getColorCount(color)})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Size</h3>
          <div className="space-y-2">
            {uniqueSizes.map(size => (
              <label key={size} className="flex items-center justify-between gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded transition">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="size"
                    checked={filters.size === size}
                    onChange={() => setFilters({ ...filters, size: size })}
                    className="cursor-pointer"
                  />
                  <span className="uppercase">{size}</span>
                </div>
                <span className="text-xs text-gray-500">({getSizeCount(size)})</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setFilters({ category: 'all', priceRange: 'all', color: 'all', size: 'all' })}
          className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition font-medium"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}