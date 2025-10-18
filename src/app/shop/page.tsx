
// FILE: src/app/shop/page.tsx
'use client'
import { Suspense } from 'react'
import {ShopContent} from '../../components/shopContent'

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#97cb4d] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading products...</p>
          </div>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
