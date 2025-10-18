// FILE: src/components/AddToCartButton.tsx
'use client'
import { useState } from 'react'
import { ShoppingCart, Check } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
}

export  function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full py-4 rounded-lg font-semibold text-lg transition flex items-center justify-center gap-2 ${
        added 
          ? 'bg-green-600 text-white' 
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
    >
      {added ? (
        <>
          <Check size={24} />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart size={24} />
          Add to Cart
        </>
      )}
    </button>
  )
}