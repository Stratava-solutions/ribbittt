"use client"
import { useEffect, useState } from "react";
import {
  Baby,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Heart,
  Star,
  Truck,
  RefreshCw,
  Shield,
  Sparkles,
  ArrowRight,
  Users,
  Award,
  Package,
  Zap,
  TrendingUp,
  Gift,
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
  const [loading, setLoading] = useState(true);

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
      } else if (Array.isArray(json)) {
        setProducts(json);
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50/30 to-white text-gray-900">
      <main>
        {/* HERO */}
        <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-200/30 to-emerald-200/30 rounded-full blur-3xl -mr-48 -mt-48" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-teal-200/30 to-green-200/30 rounded-full blur-3xl -ml-40 -mb-40" />
          
          <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                <Sparkles className="w-4 h-4" style={{ color: '#00a63e' }} />
                <span className="text-sm font-semibold" style={{ color: '#00a63e', }}>New Spring Collection 2025</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight text-gray-900">
                Little styles,
                <span className="block mt-2" style={{ color: '#00a63e' }}>big smiles</span>
              </h1>
              
              <p className="text-xl text-gray-700 max-w-xl leading-relaxed">
                Soft fabrics, playful prints and perfectly safe materials.
                Explore stylish outfits for ages 0–10 with free returns and fast delivery.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="/service/shop" className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold hover:shadow-xl transition-all transform hover:scale-105" style={{ backgroundColor: '#00a63e' }}>
                  Shop Collection
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="/service/shop" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-gray-900 font-bold hover:shadow-xl transition-all border-2 border-gray-200">
                  Browse All
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  { icon: <Truck className="w-5 h-5" />, text: "Free Shipping", color: '#00a63e' },
                  { icon: <RefreshCw className="w-5 h-5" />, text: "Easy Returns", color: '#ec4899' },
                  { icon: <Shield className="w-5 h-5" />, text: "Quality Assured", color: '#8b5cf6' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                    <div className="p-2 rounded-lg" style={{ backgroundColor: item.color + '20' }}>
                      <div style={{ color: item.color }}>{item.icon}</div>
                    </div>
                    <div className="text-sm font-bold text-gray-900">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-3xl blur-2xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img src="/two_kids_girls.avif" alt="Kids wearing clothes" className="object-cover w-full h-96 sm:h-[500px]" />
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-gray-900">New Arrivals</div>
                        <div className="text-sm text-gray-600">Spring Collection 2025</div>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star key={n} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST BADGES */}
        <section className="bg-white py-12 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <Users className="w-8 h-8" />, number: "100+", text: "Happy Customers" },
                { icon: <Award className="w-8 h-8" />, number: "100%", text: "Quality Products" },
                { icon: <Package className="w-8 h-8" />, number: "24/7", text: "Customer Support" },
                { icon: <TrendingUp className="w-8 h-8" />, number: "4.9★", text: "Average Rating" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-4 rounded-2xl" style={{ backgroundColor: '#00a63e20' }}>
                      <div style={{ color: '#00a63e' }}>{stat.icon}</div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated collections designed for comfort and style
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: <Baby size={56} className="text-pink-500" />, title: "Newborn", bg: "from-pink-50 to-pink-100", items: "200+ Items" },
              { icon: <Shirt size={56} style={{ color: '#00a63e' }} />, title: "Tops", bg: "from-green-50 to-emerald-100", items: "350+ Items" },
              { icon: <ShoppingBag size={56} className="text-purple-500" />, title: "Accessories", bg: "from-purple-50 to-purple-100", items: "150+ Items" },
              { icon: <ShoppingBag size={56} className="text-yellow-500" />, title: "Outerwear", bg: "from-yellow-50 to-yellow-100", items: "180+ Items" }
            ].map((cat, i) => (
              <a key={i} href={`/service/shop?category=${encodeURIComponent(cat.title.toLowerCase())}`} className={`group block bg-gradient-to-br ${cat.bg} rounded-3xl shadow-lg p-8 text-center hover:shadow-2xl transition-all transform hover:scale-105`}>
                <div className="flex items-center justify-center mb-5 transform group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">{cat.title}</div>
                <div className="text-sm text-gray-600">{cat.items}</div>
              </a>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Why Parents Love RIBBITT</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                We're committed to providing the best for your little ones
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { icon: <Shield className="w-12 h-12" />, title: "100% Safe Materials", desc: "All our fabrics are certified safe for sensitive skin and meet international safety standards", color: "#00a63e" },
                { icon: <Zap className="w-12 h-12" />, title: "Fast Delivery", desc: "Get your orders delivered within 3-5 business days across India with free shipping", color: "#f59e0b" },
                { icon: <Award className="w-12 h-12" />, title: "Premium Quality", desc: "Durable stitching and high-quality fabrics that withstand countless washes", color: "#8b5cf6" },
                { icon: <RefreshCw className="w-12 h-12" />, title: "Easy Returns", desc: "30-day hassle-free returns and exchanges if you're not completely satisfied", color: "#ec4899" },
                { icon: <Heart className="w-12 h-12" />, title: "Made with Love", desc: "Each piece is designed with care keeping your child's comfort in mind", color: "#ef4444" },
                { icon: <Gift className="w-12 h-12" />, title: "Gift Wrapping", desc: "Beautiful gift packaging available for birthdays and special occasions", color: "#06b6d4" }
              ].map((feature, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
                  <div className="flex items-center justify-center w-20 h-20 rounded-2xl mb-6 mx-auto" style={{ backgroundColor: feature.color + '20' }}>
                    <div style={{ color: feature.color }}>{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED COLLECTIONS */}
        <section className="bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">Featured Collections</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Handpicked styles that kids love and parents trust
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { title: "Playful Prints", subtitle: "Colorful & comfortable", img: "/girl_pose.avif", badge: "Trending" },
                { title: "Soft Basics", subtitle: "Everyday essentials", img: "/two_cha_pr.avif", badge: "Best Seller" },
                { title: "Party Picks", subtitle: "Cute outfits for special days", img: "/news_paper.avif", badge: "New" }
              ].map((col, i) => (
                <a key={i} href="/service/shop" className="group block overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  <div className="relative h-80">
                    <img src={col.img} alt={col.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                      <span className="text-sm font-bold" style={{ color: '#00a63e' }}>{col.badge}</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex items-end p-6">
                      <div className="text-white">
                        <div className="text-2xl font-bold mb-2">{col.title}</div>
                        <div className="text-sm text-white/90 mb-4">{col.subtitle}</div>
                        <div className="inline-flex items-center gap-2 text-sm font-semibold">
                          Explore Collection
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>


        {/* TRENDING PRODUCTS */}
        <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-2">Trending Products</h2>
              <p className="text-gray-600">Most loved by our customers this month</p>
            </div>
            <a href="/service/shop" className="hidden sm:inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all border-2" style={{ borderColor: '#00a63e', color: '#00a63e' }}>
              Browse All
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="animate-pulse bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-96" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 6).map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          )}
        </section>

        {/* INSTAGRAM FEED */}
        <section className="bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">#RIBBITTKids</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                See how parents are styling their little ones with RIBBITT
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "/kids_show.avif",
                "/kids_hands.avif",
                "/kids_two_girls.avif",
                "/jump_kid.avif"
              ].map((img, i) => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 group cursor-pointer">
                  <img src={img} alt={`Instagram ${i + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <a href="https://instagram.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all border-2" style={{ borderColor: '#00a63e', color: '#00a63e' }}>
                Follow Us on Instagram
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-green-50/50 to-emerald-50/50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">What Parents Say</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real reviews from happy families across India
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { quote: "Soft fabric, true to size and shipped quickly. My toddler loves it! The quality exceeded my expectations.", author: "Priya", location: "Bangalore" },
                { quote: "Adorable prints and durable stitching. Will buy again. My daughter refuses to wear anything else now!", author: "Rajat", location: "Mumbai" },
                { quote: "Great value for money and easy returns. Highly recommended. Customer service was super helpful.", author: "Anya", location: "Delhi" },
                { quote: "Perfect for my newborn. The fabric is so gentle on sensitive skin. Love the colors!", author: "Meera", location: "Chennai" },
                { quote: "My son looks adorable in these outfits. Great quality and fits perfectly. Will recommend to all!", author: "Karthik", location: "Hyderabad" },
                { quote: "Fast delivery and beautiful packaging. The clothes are even better than the pictures online!", author: "Sneha", location: "Pune" }
              ].map((test, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-gray-700 italic text-base leading-relaxed mb-6">
                    "{test.quote}"
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: '#00a63e' }}>
                      {test.author[0]}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{test.author}</div>
                      <div className="text-sm text-gray-500">{test.location}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const img = product.images?.[0]?.url || "/placeholder.png";

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in buying: ${product.name} (₹${product.price})`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="group bg-white rounded-3xl shadow-lg p-5 flex flex-col hover:shadow-2xl transition-all transform hover:scale-105">
      <div className="relative rounded-2xl overflow-hidden h-64 bg-gray-100">
        <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
          NEW
        </div>
        <button className="absolute top-4 right-4 p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-all">
          <Heart size={20} className="text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>

      <div className="mt-5 flex-1">
        <div className="text-xl font-bold text-gray-900 mb-2">{product.name}</div>
        <div className="text-sm text-gray-600 line-clamp-2">
          {product.shortDescription || "Premium quality clothing for your little one"}
        </div>
        
        <div className="flex items-center gap-1 mt-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star key={n} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="text-sm text-gray-500 ml-2">(4.9)</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div>
          <div className="text-2xl font-bold" style={{ color: '#00a63e' }}>
            ₹{product.price}
          </div>
          <div className="text-sm text-gray-500 line-through">₹{Math.round(product.price * 1.3)}</div>
        </div>
        <button onClick={handleWhatsApp} className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-white font-semibold hover:shadow-lg transition-all" style={{ backgroundColor: '#00a63e' }}>
          <ShoppingCart size={18} />
          Buy Now
        </button>
      </div>
    </div>
  );
}