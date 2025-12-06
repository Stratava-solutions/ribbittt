// src/components/ShopContent.tsx
'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from "../components/productCard"
import { FilterSidebar } from '../components/filterSidebar'
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

  // Fetch products from API
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/products')
      const data = await response.json()
      
      if (data.success) {
        setProducts(data.data)
        setFilteredProducts(data.data)
      } else {
        toast.error('Failed to load products')
      }
    } catch (error) {
      console.error('Fetch error:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  // Handle URL search params (e.g., ?category=dresses)
  useEffect(() => {
    const category = searchParams.get('category') || 'all'
    setFilters(prev => ({ ...prev, category }))
  }, [searchParams])

  // Apply filters whenever filters or products change
  useEffect(() => {
    applyFilters()
  }, [filters, products, sortBy])

  const applyFilters = () => {
    let filtered = [...products]

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category)
    }

    // Color filter
    if (filters.color !== 'all') {
      filtered = filtered.filter(p => p.color === filters.color)
    }

    // Size filter
    if (filters.size !== 'all') {
      filtered = filtered.filter(p => p.sizes.includes(filters.size))
    }

    // Price range filter
    if (filters.priceRange === 'under25') {
      filtered = filtered.filter(p => p.price < 25)
    } else if (filters.priceRange === '25to35') {
      filtered = filtered.filter(p => p.price >= 25 && p.price <= 35)
    } else if (filters.priceRange === 'over35') {
      filtered = filtered.filter(p => p.price > 35)
    }

    // Sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'newest') {
      filtered.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } else if (sortBy === 'featured') {
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    setFilteredProducts(filtered)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shop All Products</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar 
          filters={filters} 
          setFilters={setFilters}
          products={products}
        />
        
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
            <select 
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="featured">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 mb-4">No products found matching your filters</p>
              <button
                onClick={() => setFilters({ category: 'all', priceRange: 'all', color: 'all', size: 'all' })}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}