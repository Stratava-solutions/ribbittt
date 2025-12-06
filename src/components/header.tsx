'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, Menu, X, Search, Heart, User, Baby, Shirt } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 bg-white shadow-sm z-50 border-b">
      <div className="w-full">

        {/* Top Bar */}
        <div className="bg-green-600 text-white text-center py-2 text-sm">
          🎉 Free Shipping on orders above ₹500 · Easy Returns · Premium Quality
        </div>

        {/* Main Header Section */}
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="text-3xl font-bold text-green-700 flex items-center gap-2">
            <Baby className="text-green-700" size={30} />
            Ribbitte
          </Link>

          {/* Search Bar (Desktop Only) */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="w-full max-w-xl relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full border rounded-full py-2 px-4 pr-10 shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
              />
              <Search
                size={20}
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <Link href="/wishlist" className="hover:text-green-600 transition hidden md:block">
              <Heart size={22} />
            </Link>

            <Link href="/account" className="hover:text-green-600 transition hidden md:block">
              <User size={22} />
            </Link>

            <Link href="/cart" className="relative hover:text-green-600 transition">
              <ShoppingCart size={22} />
              <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-center gap-10 py-3 border-t bg-gray-50">
          {[
            { label: "Home", href: "/" },
            { label: "Shop", href: "shop" },
            { label: "New Arrivals", href: "new" },
            { label: "Boys", href: "category/boys" },
            { label: "Girls", href: "category/girls" },
            { label: "Contact", href: "contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-gray-50 border-t py-4 px-6 animate-fadeIn">
            <div className="flex flex-col gap-4 text-lg">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
              <Link href="/new" onClick={() => setMobileMenuOpen(false)}>New Arrivals</Link>
              <Link href="/category/boys" onClick={() => setMobileMenuOpen(false)}>Boys</Link>
              <Link href="/category/girls" onClick={() => setMobileMenuOpen(false)}>Girls</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              <Link href="/account" onClick={() => setMobileMenuOpen(false)}>My Account</Link>
              <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)}>Wishlist</Link>
            </div>
          </nav>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg py-2 px-6 flex justify-between md:hidden">
        <Link href="/" className="flex flex-col items-center text-gray-700">
          <Baby size={22} />
          <span className="text-xs">Home</span>
        </Link>

        <Link href="/shop" className="flex flex-col items-center text-gray-700">
          <Shirt size={22} />
          <span className="text-xs">Shop</span>
        </Link>

        <Link href="/wishlist" className="flex flex-col items-center text-gray-700">
          <Heart size={22} />
          <span className="text-xs">Wishlist</span>
        </Link>

        <Link href="/account" className="flex flex-col items-center text-gray-700">
          <User size={22} />
          <span className="text-xs">Account</span>
        </Link>

        <Link href="/cart" className="flex flex-col items-center text-gray-700 relative">
          <ShoppingCart size={22} />
          <span className="absolute -top-1 -right-3 bg-green-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
          <span className="text-xs">Cart</span>
        </Link>
      </div>
    </header>
  )
}
