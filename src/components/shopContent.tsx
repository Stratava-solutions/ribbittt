'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FilterSidebar } from '../components/filterSidebar'
import { ProductCard } from '../components/productCard'
import { toast } from 'react-hot-toast'

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
    <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-4"></div>
        <p className="text-gray-500 text-lg">Loading products...</p>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-12">

      {/* Hero Section */}
      <div className="relative bg-pink-50 rounded-3xl overflow-hidden mb-12 flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-8">
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Kids Fashion Collection</h1>
          <p className="text-gray-600 mb-6">
            Explore the latest trends in kids clothing, from playful dresses to comfy everyday wear. Filter by color, size, and price to find perfect outfits.
          </p>
          <button className="px-6 py-3 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition font-semibold">
            Shop Now
          </button>
        </div>
        <img src="https://images.unsplash.com/photo-1705250466297-90035b3a2b26?q=80&w=2154&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Kids Fashion" className="w-full md:w-1/2 object-cover rounded-2xl shadow-lg" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <FilterSidebar filters={filters} setFilters={setFilters} products={products} />

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <p className="text-gray-600 font-medium">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
            <select
              className="border rounded-md px-4 py-2 shadow-sm focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product._id} product={product} hoverImages={true} showTags={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 mb-4">No products found matching your filters.</p>
              <button
                onClick={() => setFilters({ category: 'all', priceRange: 'all', color: 'all', size: 'all' })}
                className="px-6 py-3 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
