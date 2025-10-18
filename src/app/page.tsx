// FILE: src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-16 text-center py-20 bg-gradient-to-r from-pink-100 to-blue-100 rounded-lg">
        <h1 className="text-5xl font-bold mb-4">Kids Fashion Store</h1>
        <p className="text-xl mb-8 text-gray-700">
          Stylish & Comfortable Clothing for Your Little Ones
        </p>
        <Link
          href="/shop"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Shop Now
        </Link>
      </section>

      {/* Categories Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Dresses", "Tops", "Bottoms", "Outerwear"].map((cat) => (
            <Link key={cat} href={`/shop?category=${cat.toLowerCase()}`}>
              <div className="p-8 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-center">
                <h3 className="font-semibold text-lg">{cat}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="text-center p-6">
          <div className="text-4xl mb-4">🚚</div>
          <h3 className="font-bold mb-2">Free Shipping</h3>
          <p className="text-gray-600">On orders over $50</p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">↩️</div>
          <h3 className="font-bold mb-2">Easy Returns</h3>
          <p className="text-gray-600">30-day return policy</p>
        </div>
        <div className="text-center p-6">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="font-bold mb-2">Quality Products</h3>
          <p className="text-gray-600">Premium materials</p>
        </div>
      </section>
    </div>
  );
}
