// FILE: src/components/Header.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, Search, Heart, User } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="border-b sticky top-0 bg-white z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="py-2 text-sm text-gray-600 text-center border-b">
          Free shipping on orders over $50 | Easy 30-day returns
        </div>

        {/* Main Header */}
        <div className="py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            KidsFashion
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/service/home" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/service/shop" className="hover:text-blue-600 transition">Shop</Link>
            <Link href="/service/about" className="hover:text-blue-600 transition">About</Link>
            <Link href="/service/contact" className="hover:text-blue-600 transition">Contact</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="hover:text-blue-600 transition hidden md:block">
              <Search size={20} />
            </button>
            <Link href="/account/orders" className="hover:text-blue-600 transition hidden md:block">
              <User size={20} />
            </Link>
            <button className="hover:text-blue-600 transition hidden md:block">
              <Heart size={20} />
            </button>
            <Link href="/cart" className="hover:text-blue-600 transition relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-blue-600 transition" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/shop" className="hover:text-blue-600 transition" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
              <Link href="/about" className="hover:text-blue-600 transition" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link href="/contact" className="hover:text-blue-600 transition" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link href="/account/orders" className="hover:text-blue-600 transition" onClick={() => setMobileMenuOpen(false)}>My Orders</Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
