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
    { value: 'over350', label: 'Over ₹350' },
  ]

  const uniqueColors = ['all', ...Array.from(new Set(products.map(p => p.color)))]
  const uniqueSizes = ['all', ...Array.from(new Set(products.flatMap(p => p.sizes)))]

  const getCategoryCount = (cat: string) => cat === 'all' ? products.length : products.filter(p => p.category === cat).length
  const getColorCount = (color: string) => color === 'all' ? products.length : products.filter(p => p.color === color).length
  const getSizeCount = (size: string) => size === 'all' ? products.length : products.filter(p => p.sizes.includes(size)).length
  const getPriceRangeCount = (range: string) => {
    switch (range) {
      case 'all': return products.length
      case 'under250': return products.filter(p => p.price < 250).length
      case '250to350': return products.filter(p => p.price >= 250 && p.price <= 350).length
      case 'over350': return products.filter(p => p.price > 350).length
      default: return 0
    }
  }

  const Pill = ({ active, label, count, onClick }: { active: boolean, label: string, count: number, onClick: () => void }) => (
    <button
      onClick={onClick}
      className={`
        w-full flex justify-between items-center px-3 py-2 rounded-lg text-sm transition-all
        ${active
          ? 'bg-rose-500 text-white shadow-md'
          : 'bg-white border border-gray-200 text-gray-700 hover:bg-rose-50 hover:border-rose-200'}
      `}
    >
      <span className="capitalize">{label}</span>
      <span className="text-xs text-gray-500">({count})</span>
    </button>
  )

  return (
    <div className="w-full md:w-72 flex-shrink-0">
      <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6 space-y-6 border border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900">Filters</h2>

        {/* Category */}
        <div className="space-y-2">
          <h3 className="text-gray-700 font-medium uppercase text-sm">Category</h3>
          <div className="grid gap-2">
            {categories.map(cat => (
              <Pill
                key={cat}
                active={filters.category === cat}
                label={cat}
                count={getCategoryCount(cat)}
                onClick={() => setFilters({ ...filters, category: cat })}
              />
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <h3 className="text-gray-700 font-medium uppercase text-sm">Price</h3>
          <div className="grid gap-2">
            {priceRanges.map(range => (
              <Pill
                key={range.value}
                active={filters.priceRange === range.value}
                label={range.label}
                count={getPriceRangeCount(range.value)}
                onClick={() => setFilters({ ...filters, priceRange: range.value })}
              />
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          <h3 className="text-gray-700 font-medium uppercase text-sm">Color</h3>
          <div className="grid gap-2">
            {uniqueColors.map(color => (
              <Pill
                key={color}
                active={filters.color === color}
                label={color}
                count={getColorCount(color)}
                onClick={() => setFilters({ ...filters, color })}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="space-y-2">
          <h3 className="text-gray-700 font-medium uppercase text-sm">Size</h3>
          <div className="grid gap-2">
            {uniqueSizes.map(size => (
              <Pill
                key={size}
                active={filters.size === size}
                label={size.toUpperCase()}
                count={getSizeCount(size)}
                onClick={() => setFilters({ ...filters, size })}
              />
            ))}
          </div>
        </div>

        {/* Clear All */}
        <button
          onClick={() => setFilters({ category: 'all', priceRange: 'all', color: 'all', size: 'all' })}
          className="w-full py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-400 text-white font-semibold shadow hover:scale-[1.02] transform transition"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  )
}
