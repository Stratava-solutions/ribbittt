// FILE: src/app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Baby,
  Shirt,
  Handbag,
  ShoppingCart,
  Heart,
  MapPin,
  Phone,
} from "lucide-react";

type Product = {
  _id: string;
  name: string;
  price: number;
  images?: { url: string }[];
  shortDescription?: string;
  featured?: boolean;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);


  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/products");
      const json = await res.json();
      if (res.ok && Array.isArray(json.data)) {
        setProducts(json.data);
        setFeatured(json.data.filter((p: Product) => p.featured).slice(0, 6));
      } else if (Array.isArray(json)) {
        // fallback if API returns array directly
        setProducts(json as Product[]);
        setFeatured((json as Product[]).filter((p) => p.featured).slice(0, 6));
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter((p) =>
    `${p.name} ${p.shortDescription ?? ""}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  function handleAddToCart(p: Product) {
    // placeholder - integrate with cart logic
    alert(`${p.name} added to cart`);
  }

  function subscribeNewsletter(e: React.FormEvent) {
    e.preventDefault();
    if (!newsletterEmail || !/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      alert("Please enter a valid email address");
      return;
    }
    // fake send — integrate backend if desired
    setNewsletterSent(true);
    setNewsletterEmail("");
    setTimeout(() => setNewsletterSent(false), 3500);
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* HERO */}
      <main>
        <section className="bg-gradient-to-r from-green-50 via-pink-50 to-yellow-50">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* left text */}
            <div className="lg:col-span-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900">
                Little styles, big smiles — clothing kids love
              </h1>
              <p className="mt-4 text-lg text-gray-700 max-w-xl">
                Soft fabrics, playful prints and perfectly safe materials.
                Explore stylish outfits for ages 0–10 with free returns and fast
                delivery.
              </p>

              <div className="mt-6 flex gap-4">
                <a
                  href="/service//shop"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition-shadow shadow"
                >
                  Shop Collection
                </a>
                <a
                  href="/sale"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-200 text-gray-800 hover:bg-gray-100"
                >
                  View Sale
                </a>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-md">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <ShoppingCart size={20} className="text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Free Shipping</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <Heart size={20} className="text-pink-500" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Easy Returns</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <BadgeIcon />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Quality Assured</div>
                  </div>
                </div>
              </div>
            </div>

            {/* right image */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="w-full max-w-xl relative rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="https://plus.unsplash.com/premium_photo-1698305283092-575dcb4d3ec2?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Kids wearing clothes"
                  width={1200}
                  height={900}
                  className="object-cover w-full h-80 sm:h-96"
                />
                <div className="absolute bottom-4 left-4 bg-white/80 rounded-lg px-4 py-2 shadow">
                  <div className="text-sm font-semibold">New Arrivals</div>
                  <div className="text-xs text-gray-600">
                    Spring Collection 2025
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <CategoryCard
              icon={<Baby size={48} className="text-pink-500" />}
              title="Newborn"
            />
            <CategoryCard
              icon={<Shirt size={48} className="text-green-500" />}
              title="Tops"
            />
            <CategoryCard
              icon={<Handbag size={48} className="text-purple-500" />}
              title="Accessories"
            />
            <CategoryCard
              icon={<Handbag size={48} className="text-yellow-500" />}
              title="Outerwear"
            />
          </div>
        </section>

        {/* FEATURED COLLECTIONS */}
        <section className="bg-gradient-to-r from-yellow-50 to-pink-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6">Featured Collections</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <CollectionCard
                title="Playful Prints"
                subtitle="Colorful & comfortable"
                image="https://images.unsplash.com/photo-1696751965681-613d043b5a49?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              <CollectionCard
                title="Soft Basics"
                subtitle="Everyday essentials"
                image="https://images.unsplash.com/photo-1632232963262-0e5cd712d44c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGVjb21tZXJjZSUyMGNsb3RocyUyMGNoaWxkcmVufGVufDB8fDB8fHww"
              />
              <CollectionCard
                title="Party Picks"
                subtitle="Cute outfits for special days"
                image="https://images.unsplash.com/photo-1614532188535-2fa164c9ea24?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
            </div>
          </div>
        </section>

        {/* TRENDING PRODUCTS */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Trending products</h2>
            <a
              href="/service//shop"
              className="text-sm text-green-600 font-medium hover:underline"
            >
              Browse all
            </a>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="animate-pulse bg-white rounded-lg p-6 h-72"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(filteredProducts.length
                ? filteredProducts
                : products.slice(0, 6)
              ).map((p) => (
                <ProductCard key={p._id} product={p}  />
              ))}
            </div>
          )}
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">What parents say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Testimonial
                quote="Soft fabric, true to size and shipped quickly. My toddler loves it!"
                author="Priya — Bangalore"
              />
              <Testimonial
                quote="Adorable prints and durable stitching. Will buy again."
                author="Rajat — Mumbai"
              />
              <Testimonial
                quote="Great value for money and easy returns. Highly recommended."
                author="Anya — Delhi"
              />
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Join our newsletter</h3>
            <p className="text-gray-600 mb-6">
              Get 10% off your first order and be the first to see new arrivals.
            </p>

            <form
              onSubmit={subscribeNewsletter}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <input
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full sm:flex-1 border rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700"
              >
                {newsletterSent ? "Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-white border-t mt-12">
          <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-lg mb-3">Kids Fashion</div>
              <p className="text-sm text-gray-600">
                Cute, comfy and safe clothing for kids. Delivered with care.
              </p>
              <div className="flex items-center gap-3 mt-4 text-sm text-gray-700">
                <MapPin size={16} />
                <span>123 Fashion Street, NY</span>
              </div>
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-700">
                <Phone size={16} />
                <span>+1 555 123 4567</span>
              </div>
            </div>

            <div>
              <div className="font-semibold mb-3">Company</div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  <a href="/about" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/careers" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="/press" className="hover:underline">
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold mb-3">Support</div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  <a href="/help" className="hover:underline">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="/shipping" className="hover:underline">
                    Shipping
                  </a>
                </li>
                <li>
                  <a href="/returns" className="hover:underline">
                    Returns
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-semibold mb-3">Legal</div>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  <a href="/terms" className="hover:underline">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:underline">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t py-6">
            <div className="max-w-7xl mx-auto px-4 text-sm text-center text-gray-600">
              © {new Date().getFullYear()} Kids Fashion. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}


function CategoryCard({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <a
      href={`/service/shop?category=${encodeURIComponent(title.toLowerCase())}`}
      className="block bg-white rounded-xl shadow p-6 text-center hover:shadow-lg transition"
    >
      <div className="flex items-center justify-center mb-4">{icon}</div>
      <div className="text-lg font-semibold">{title}</div>
    </a>
  );
}

function CollectionCard({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle: string;
  image: string;
}) {
  return (
    <a
      href="/service/shop"
      className="group block overflow-hidden rounded-2xl shadow-lg"
    >
      <div className="relative h-56">
        <Image src={image} alt={title} fill style={{ objectFit: "cover" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
      </div>
      <div className="p-4 bg-white">
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-gray-600 mt-1">{subtitle}</div>
      </div>
    </a>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const img = product.images?.[0]?.url || "/placeholder.png";

    const ADMIN_WHATSAPP_NUMBER = '919876543210'


  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in buying the product: ${product.name} (₹${product.price}). Product Link: ${window.location.href}/shop/${product._id}`;
    const url = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col">
      <div className="relative rounded-lg overflow-hidden h-56">
        <Image
          src={img}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="mt-4 flex-1">
        <div className="font-semibold">{product.name}</div>
        <div className="text-sm text-gray-600 mt-1">
          {product.shortDescription}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="text-lg font-bold">₹{product.price}</div>

        {/* WhatsApp Contact Button */}
        <button
          onClick={handleWhatsApp}
          className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700"
        >
          Contact via WhatsApp
        </button>

        <button className="p-2 rounded-full border hover:bg-gray-50">
          <Heart size={16} />
        </button>
      </div>
    </div>
  );
}

function Testimonial({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <div className="text-gray-700 italic">“{quote}”</div>
      <div className="mt-4 text-sm font-semibold">{author}</div>
    </div>
  );
}

function BadgeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2l2.09 4.26L19 7.27l-3 2.92.71 5.19L12 14.77 7.29 15.38 8 10.19 5 7.27l4.91-.99L12 2z"
        fill="#F59E0B"
      />
    </svg>
  );
}
