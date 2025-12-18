"use client";

import { useState } from "react";
import { Menu, X, Home, ShoppingBag, Info, Phone, Sparkles } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="w-full">
        {/* Top Announcement Bar */}
        <div className="text-white overflow-hidden" style={{ backgroundColor: '#00a63e' }}>
          <div className="animate-slide">
            <div className="flex items-center justify-center gap-8 py-2.5 px-4 text-sm font-medium whitespace-nowrap">
              <span className="flex items-center gap-2">
                <Sparkles size={16} />
                Free Shipping on orders above ₹500
              </span>
              <span>•</span>
              <span>Easy 30-Day Returns</span>
              <span>•</span>
              <span>Premium Quality Guaranteed</span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Sparkles size={16} />
                New Spring Collection 2025
              </span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-green-50 rounded-xl transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X size={24} className="text-gray-700" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </button>

            {/* Logo */}
            <a href="/" className="flex items-center gap-4 group">
              <div className="relative">
                {/* Decorative background shape */}
                <div className="absolute inset-0 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-6" style={{ backgroundColor: '#00a63e20' }}></div>
                
                {/* Logo container */}
                <div className="relative bg-white rounded-2xl p-3 shadow-md group-hover:shadow-xl transition-all border-2" style={{ borderColor: '#00a63e' }}>
                  <img
                    src="/Ribbittt-02.jpg"
                    alt="RIBBITT Logo"
                    className="w-12 h-12 object-contain"
                  />
                </div>
                
                {/* Pulse indicator */}
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse shadow-lg" style={{ backgroundColor: '#00a63e' }}>
                  <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: '#00a63e50' }}></div>
                </div>
              </div>
              
              {/* Brand text */}
              <div className="flex flex-col">
                <span className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: '#00a63e' }}>
                  RIBBITT
                </span>
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#00a63e80' }}>
                  Kids Fashion
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {[
                { label: "Home", href: "/", icon: <Home size={18} /> },
                { label: "Shop", href: "/service/shop", icon: <ShoppingBag size={18} /> },
                { label: "About Us", href: "/service/about", icon: <Info size={18} /> },
                { label: "Contact", href: "/service/contact", icon: <Phone size={18} /> },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-6 py-3 text-gray-700 hover:text-white font-semibold transition-all rounded-full hover:shadow-lg transform hover:scale-105"
                  style={{ 
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#00a63e';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </nav>

            {/* CTA Button - Desktop */}
            <a
              href="/service/shop"
              className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold transition-all shadow-lg transform hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: '#00a63e' }}
            >
              <ShoppingBag size={18} />
              Shop Now
            </a>

            {/* Placeholder for mobile alignment */}
            <div className="md:hidden w-10"></div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gradient-to-b from-white to-green-50/30 border-t border-gray-100 shadow-xl">
            <nav className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-2">
                {[
                  { label: "Home", href: "/", icon: <Home size={22} /> },
                  { label: "Shop", href: "/service/shop", icon: <ShoppingBag size={22} /> },
                  { label: "About Us", href: "/service/about", icon: <Info size={22} /> },
                  { label: "Contact", href: "/service/contact", icon: <Phone size={22} /> },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="group flex items-center gap-4 px-5 py-4 text-gray-700 hover:text-white rounded-2xl transition-all font-semibold shadow-sm hover:shadow-lg transform hover:scale-105 bg-white"
                    style={{ 
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#00a63e';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    <div className="p-2 rounded-xl bg-green-50 group-hover:bg-white/20 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-lg">{item.label}</span>
                  </a>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <a
                  href="/service/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white font-bold transition-all shadow-lg transform hover:scale-105"
                  style={{ backgroundColor: '#00a63e' }}
                >
                  <ShoppingBag size={22} />
                  <span className="text-lg">Start Shopping</span>
                </a>
              </div>

              {/* Mobile Info */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 font-medium">
                  Premium Kids Fashion • Ages 0-10
                </p>
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl md:hidden z-50 backdrop-blur-lg bg-white/95">
        <div className="grid grid-cols-4 h-16">
          <a
            href="/"
            className="flex flex-col items-center justify-center gap-1 text-gray-600 transition-all relative group"
            style={{ color: '#666' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#00a63e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#666';
            }}
          >
            <Home size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Home</span>
            <div className="absolute bottom-0 w-0 h-1 group-hover:w-12 transition-all rounded-t-full" style={{ backgroundColor: '#00a63e' }}></div>
          </a>

          <a
            href="/service/shop"
            className="flex flex-col items-center justify-center gap-1 text-gray-600 transition-all relative group"
            style={{ color: '#666' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#00a63e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#666';
            }}
          >
            <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Shop</span>
            <div className="absolute bottom-0 w-0 h-1 group-hover:w-12 transition-all rounded-t-full" style={{ backgroundColor: '#00a63e' }}></div>
          </a>

          <a
            href="/service/about"
            className="flex flex-col items-center justify-center gap-1 text-gray-600 transition-all relative group"
            style={{ color: '#666' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#00a63e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#666';
            }}
          >
            <Info size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">About</span>
            <div className="absolute bottom-0 w-0 h-1 group-hover:w-12 transition-all rounded-t-full" style={{ backgroundColor: '#00a63e' }}></div>
          </a>

          <a
            href="/service/contact"
            className="flex flex-col items-center justify-center gap-1 text-gray-600 transition-all relative group"
            style={{ color: '#666' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#00a63e';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#666';
            }}
          >
            <Phone size={24} className="group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">Contact</span>
            <div className="absolute bottom-0 w-0 h-1 group-hover:w-12 transition-all rounded-t-full" style={{ backgroundColor: '#00a63e' }}></div>
          </a>
        </div>
      </div>
    </header>
  );
}