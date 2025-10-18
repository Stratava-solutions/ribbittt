// FILE: src/components/ProductCard.tsx
'use client'
import Link from 'next/link'
import { Heart, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

interface Product {
  id: number
  name: string
  price: number
  category: string
  color: string
  size: string
}

export  function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition group">
      <Link href={`/shop/${product.id}`}>
        <div className="bg-gray-200 aspect-square flex items-center justify-center relative overflow-hidden">
          <span className="text-gray-400">Product Image</span>
          <button 
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition"
          >
            <Heart 
              size={20} 
              className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
            />
          </button>
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/shop/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-blue-600">${product.price}</span>
          <span className="text-sm text-gray-500">{product.size}</span>
        </div>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  )
}