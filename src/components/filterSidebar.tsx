// FILE: src/components/FilterSidebar.tsx
'use client'

interface Filters {
  category: string
  priceRange: string
  color: string
  size: string
}

interface FilterSidebarProps {
  filters: Filters
  setFilters: (filters: Filters) => void
}

export  function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const categories = ['all', 'dresses', 'tops', 'bottoms', 'outerwear', 'sets']
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: 'under25', label: 'Under $25' },
    { value: '25to35', label: '$25 - $35' },
    { value: 'over35', label: 'Over $35' }
  ]
  const colors = ['all', 'blue', 'red', 'pink', 'white', 'yellow', 'multicolor', 'beige']
  const sizes = ['all', '2-4Y', '4-6Y', '6-8Y', '8-10Y']

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      <div className="border rounded-lg p-6 sticky top-24">
        <h2 className="text-xl font-bold mb-6">Filters</h2>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat}
                  onChange={() => setFilters({ ...filters, category: cat })}
                  className="cursor-pointer"
                />
                <span className="capitalize">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="space-y-2">
            {priceRanges.map(range => (
              <label key={range.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange === range.value}
                  onChange={() => setFilters({ ...filters, priceRange: range.value })}
                  className="cursor-pointer"
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Color Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Color</h3>
          <div className="space-y-2">
            {colors.map(color => (
              <label key={color} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  checked={filters.color === color}
                  onChange={() => setFilters({ ...filters, color: color })}
                  className="cursor-pointer"
                />
                <span className="capitalize">{color}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Size Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Size</h3>
          <div className="space-y-2">
            {sizes.map(size => (
              <label key={size} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="size"
                  checked={filters.size === size}
                  onChange={() => setFilters({ ...filters, size: size })}
                  className="cursor-pointer"
                />
                <span className="uppercase">{size}</span>
              </label>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setFilters({ category: 'all', priceRange: 'all', color: 'all', size: 'all' })}
          className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
        >
          Clear Filters
        </button>
      </div>
    </div>
  )
}