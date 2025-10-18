// FILE: src/app/shop/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {ProductCard} from '../../components/productCard'
import {FilterSidebar} from '../../components/filterSidebar'

const products = [
  { id: 1, name: 'Rainbow Dress', price: 29.99, category: 'dresses', color: 'multicolor', size: '2-4Y' },
  { id: 2, name: 'Denim Jacket', price: 34.99, category: 'outerwear', color: 'blue', size: '4-6Y' },
  { id: 3, name: 'Cotton T-Shirt', price: 15.99, category: 'tops', color: 'white', size: '2-4Y' },
  { id: 4, name: 'Floral Skirt', price: 24.99, category: 'bottoms', color: 'pink', size: '4-6Y' },
  { id: 5, name: 'Striped Overalls', price: 39.99, category: 'sets', color: 'blue', size: '6-8Y' },
  { id: 6, name: 'Summer Romper', price: 27.99, category: 'sets', color: 'yellow', size: '2-4Y' },
  { id: 7, name: 'Cardigan Sweater', price: 32.99, category: 'outerwear', color: 'beige', size: '4-6Y' },
  { id: 8, name: 'Polka Dot Dress', price: 28.99, category: 'dresses', color: 'red', size: '2-4Y' },
]

export default function Shop() {
  const searchParams = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: 'all',
    color: 'all',
    size: 'all'
  })

  useEffect(() => {
    const category = searchParams.get('category') || 'all'
    setFilters(prev => ({ ...prev, category }))
  }, [searchParams])

  useEffect(() => {
    let filtered = products

    if (filters.category !== 'all') {
      filtered = filtered.filter(p => p.category === filters.category)
    }
    if (filters.color !== 'all') {
      filtered = filtered.filter(p => p.color === filters.color)
    }
    if (filters.size !== 'all') {
      filtered = filtered.filter(p => p.size === filters.size)
    }
    if (filters.priceRange === 'under25') {
      filtered = filtered.filter(p => p.price < 25)
    } else if (filters.priceRange === '25to35') {
      filtered = filtered.filter(p => p.price >= 25 && p.price <= 35)
    } else if (filters.priceRange === 'over35') {
      filtered = filtered.filter(p => p.price > 35)
    }

    setFilteredProducts(filtered)
  }, [filters])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shop All Products</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">{filteredProducts.length} products found</p>
            <select className="border rounded px-4 py-2">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">No products found matching your filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
