// FILE: src/components/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">KidsFashion</h3>
            <p className="text-gray-400">
              Quality clothing for kids that parents trust and children love.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/shop" className="text-gray-400 hover:text-white transition">Shop</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
              <li><Link href="/account/orders" className="text-gray-400 hover:text-white transition">My Orders</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Shipping Info</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Returns</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">Size Guide</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">Subscribe for exclusive offers!</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-4 py-2 rounded-l text-gray-900"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700 transition">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 KidsFashion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}