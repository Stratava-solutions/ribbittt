'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FilterSidebar } from '../components/filterSidebar'
import { ProductCard } from '../components/productCard'
import { toast } from 'react-hot-toast'
import { Sparkles, SlidersHorizontal, Package } from 'lucide-react'

interface Product {
  _id: string
  name: string
  price: number
  category: string
  color: string
  sizes: string[]
  description: string
  images: { url: string; thumbnailUrl: string }[]
  stock: number
  sold: number
  featured: boolean
  createdAt?: string
}

export function ShopContent() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    color: 'all',
    size: 'all'
  })
  const [sortBy, setSortBy] = useState('featured')

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/products')
      const data = await res.json()
      if (data.success) {
        setProducts(data.data)
        setFilteredProducts(data.data)
      } else toast.error('Failed to load products')
    } catch (err) {
      toast.error('Failed to load products')
    } finally { setLoading(false) }
  }

  useEffect(() => {
    const category = searchParams.get('category') || 'all'
    setFilters(prev => ({ ...prev, category }))
  }, [searchParams])

  useEffect(() => { applyFilters() }, [filters, products, sortBy])

  const applyFilters = () => {
    let filtered = [...products]
    if (filters.category !== 'all') filtered = filtered.filter(p => p.category === filters.category)
    if (filters.color !== 'all') filtered = filtered.filter(p => p.color === filters.color)
    if (filters.size !== 'all') filtered = filtered.filter(p => p.sizes.includes(filters.size))
    if (filters.priceRange === 'under250') filtered = filtered.filter(p => p.price < 250)
    if (filters.priceRange === '250to350') filtered = filtered.filter(p => p.price >= 250 && p.price <= 350)
    if (filters.priceRange === 'over350') filtered = filtered.filter(p => p.price > 350)

    if (sortBy === 'price-low') filtered.sort((a,b) => a.price - b.price)
    else if (sortBy === 'price-high') filtered.sort((a,b) => b.price - a.price)
    else if (sortBy === 'newest') filtered.sort((a,b) => new Date(b.createdAt||'').getTime() - new Date(a.createdAt||'').getTime())
    else if (sortBy === 'featured') filtered.sort((a,b) => (b.featured?1:0)-(a.featured?1:0))

    setFilteredProducts(filtered)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value)

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-white to-green-50/30">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 mx-auto mb-4" style={{ borderColor: '#00a63e' }}></div>
        <p className="text-gray-600 text-lg font-medium">Loading amazing products...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/20 to-white">
      {/* Compact Hero Banner */}
      <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-200/30 to-green-200/30 rounded-full blur-3xl -ml-24 -mb-24" />
        
        <div className="relative w-full px-4 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <Sparkles className="w-4 h-4" style={{ color: '#00a63e' }} />
                <span className="text-sm font-semibold" style={{ color: '#00a63e' }}>Discover Our Collection</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                Kids Fashion
                <span className="block mt-2" style={{ color: '#00a63e' }}>Shop</span>
              </h1>
              
              <p className="text-lg text-gray-700 max-w-lg">
                Explore playful styles and comfortable wear for ages 0-10. Filter by category, color, and size to find perfect outfits.
              </p>
            </div>

            <div className="relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/cloth_bundle.avif" 
                alt="Kids Fashion" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <FilterSidebar 
            filters={filters} 
            setFilters={setFilters} 
            products={products} 
          />

          {/* Products Section */}
          <div className="flex-1">
            {/* Mobile Filter Button & Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow-lg"
                  style={{ backgroundColor: '#00a63e' }}
                >
                  <SlidersHorizontal size={20} />
                  Filters
                </button>
                
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" style={{ color: '#00a63e' }} />
                  <p className="text-gray-700 font-bold">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
                  </p>
                </div>
              </div>

              <select
                className="px-6 py-3 rounded-full border-2 border-gray-200 focus:border-green-500 focus:outline-none font-semibold text-gray-700 bg-white shadow-sm"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product._id} product={product} hoverImages={true} showTags={true} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                <div className="flex justify-center mb-6">
                  <div className="p-6 bg-green-50 rounded-full">
                    <Package size={48} style={{ color: '#00a63e' }} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">No products found</p>
                <p className="text-gray-600 mb-6">Try adjusting your filters to see more results</p>
                <button
                  onClick={() => setFilters({ category: 'all', priceRange: 'all', color: 'all', size: 'all' })}
                  className="px-8 py-3 rounded-full text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  style={{ backgroundColor: '#00a63e' }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <FilterSidebar 
        filters={filters} 
        setFilters={setFilters} 
        products={products}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        isMobile={true}
      />
    </div>
  )
}