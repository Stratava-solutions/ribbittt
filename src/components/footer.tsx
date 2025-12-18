// FILE: src/components/Footer.tsx
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 mt-20 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* BRAND */}
          <div>
            <h3 className="text-2xl font-extrabold text-white mb-4 tracking-wide">
              KidsFashion
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Premium kids clothing crafted with comfort, love, and style.
              Designed for everyday smiles.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a className="p-2 rounded-full bg-gray-800 hover:bg-blue-600 transition">
                <Facebook size={18} />
              </a>
              <a className="p-2 rounded-full bg-gray-800 hover:bg-pink-600 transition">
                <Instagram size={18} />
              </a>
              <a className="p-2 rounded-full bg-gray-800 hover:bg-sky-500 transition">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/service/shop" className="hover:text-white transition">Shop</Link></li>
              <li><Link href="/service/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/service/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/service/" className="hover:text-white transition">Home</Link></li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Customer Service</h4>
            <ul className="space-y-3">
              <li><Link className="hover:text-white transition" href="/service/contact">React Us</Link></li>
              <li><Link className="hover:text-white transition" href="/service/privacy-policy">Privacy Policy</Link></li>
              {/* <li><Link className="hover:text-white transition" href="#">Size Guide</Link></li> */}
              <li><Link className="hover:text-white transition" href="#">FAQ</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            {/* <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-4">
              Join our newsletter for new arrivals, offers & updates.
            </p>

            <form className="flex items-center bg-gray-800 rounded-full overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-transparent outline-none text-gray-200"
              />
              <button
                type="submit"
                className="bg-blue-600 px-6 py-3 text-sm font-semibold hover:bg-blue-700 transition"
              >
                Subscribe
              </button>
            </form> */}

            {/* Contact Info */}
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail size={16} /> ribbitttians@gmail.com
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} /> +91 9901992861
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} /> Udupi, India
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} KidsFashion. Crafted with ❤️ for kids everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
