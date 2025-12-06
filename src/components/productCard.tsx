// src/components/ProductCard.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

interface Product {
  _id: string
  name: string
  price: number
  category: string
  color: string
  sizes: string[]
  images: { url: string; thumbnailUrl: string }[]
  stock: number
  featured: boolean
}

export function ProductCard({ product }: { product: Product }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      duration: 2000,
    })
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    toast.success('Added to cart!', {
      duration: 2000,
    })
  }

  const isOutOfStock = product.stock === 0

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group bg-white">
      <Link href={`shop/${product._id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          
          {/* Wishlist Button */}
          <button 
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition shadow-md z-10"
          >
            <Heart 
              size={20} 
              className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
            />
          </button>

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.featured && (
              <span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                FEATURED
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                OUT OF STOCK
              </span>
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                LOW STOCK
              </span>
            )}
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/shop/${product._id}`}>
          <div className="mb-2">
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              {product.category}
            </span>
            <h3 className="font-semibold text-lg hover:text-blue-600 transition line-clamp-2">
              {product.name}
            </h3>
          </div>
        </Link>
        
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
          <span className="capitalize">{product.color}</span>
          <span>•</span>
          <span>{product.sizes.join(', ')}</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-blue-600">
            ₹{product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            {product.stock} in stock
          </span>
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className={`w-full py-2 rounded-lg transition flex items-center justify-center gap-2 font-medium ${
            isOutOfStock
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
          }`}
        >
          <ShoppingCart size={18} />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}