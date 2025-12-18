export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="text-white py-20" style={{ backgroundColor: '#00a63e' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About RIBBITT</h1>
          <p className="text-xl max-w-2xl mx-auto text-white/90">
            Creating memorable moments through quality children's clothing since 2020
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">Our Story</h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                RIBBITT was born from a simple idea: every child deserves to wear clothes that make them feel confident, 
                comfortable, and ready to explore the world. As parents ourselves, we understand the challenges of finding 
                quality children's clothing that balances style, durability, and affordability.
              </p>
              <p>
                What started as a small online boutique in 2020 has grown into a trusted destination for parents across 
                the country. We carefully curate each piece in our collection, ensuring it meets our high standards for 
                quality, comfort, and design.
              </p>
              <p>
                Today, we're proud to serve thousands of families, helping them dress their little ones in clothes that 
                support active play, creative expression, and everyday adventures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Our Mission & Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#00a63e' }}>Our Mission</h3>
              <p className="text-gray-700">
                To provide affordable, high-quality clothing that kids love to wear and parents trust. We're committed 
                to making shopping for children's clothes easy, enjoyable, and worry-free.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#00a63e' }}>Sustainability</h3>
              <p className="text-gray-700">
                We believe in responsible fashion. Our products are made with sustainable materials and ethical 
                manufacturing practices, ensuring a better future for the next generation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">💝</div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#00a63e' }}>Quality First</h3>
              <p className="text-gray-700">
                Every item is tested for safety, durability, and comfort. We stand behind our products with a 
                satisfaction guarantee and easy returns policy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Why Choose RIBBITT?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#00a63e' }}>
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Premium Quality Materials</h3>
                  <p className="text-gray-700">
                    We use only the finest fabrics - soft, breathable, and gentle on sensitive skin. All materials 
                    are tested for safety and durability.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#00a63e' }}>
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Affordable Prices</h3>
                  <p className="text-gray-700">
                    Quality shouldn't break the bank. We offer competitive pricing and frequent promotions to make 
                    our clothes accessible to all families.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#00a63e' }}>
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Wide Size Range</h3>
                  <p className="text-gray-700">
                    From toddlers to pre-teens (ages 2-10), we've got the perfect fit. Our detailed size guides 
                    make online shopping easy and accurate.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#00a63e' }}>
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Easy Returns & Exchanges</h3>
                  <p className="text-gray-700">
                    Not satisfied? No problem. We offer hassle-free returns within 30 days and free exchanges to 
                    ensure the perfect fit.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#00a63e' }}>
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Fast, Free Shipping</h3>
                  <p className="text-gray-700">
                    Orders over ₹500 ship free! Most orders arrive within 3-5 business days, so your kids can start 
                    enjoying their new clothes quickly.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: '#00a63e' }}>
                  ✓
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Excellent Customer Service</h3>
                  <p className="text-gray-700">
                    Our friendly support team is here to help with sizing questions, order tracking, or any concerns. 
                    We're just an email or call away.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold" style={{ backgroundColor: '#00a63e' }}>
                S
              </div>
              <h3 className="font-bold text-lg text-gray-900">Sarah Johnson</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold" style={{ backgroundColor: '#00a63e' }}>
                M
              </div>
              <h3 className="font-bold text-lg text-gray-900">Michael Chen</h3>
              <p className="text-gray-600">Head of Design</p>
            </div>
            <div className="text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold" style={{ backgroundColor: '#00a63e' }}>
                E
              </div>
              <h3 className="font-bold text-lg text-gray-900">Emily Rodriguez</h3>
              <p className="text-gray-600">Customer Experience</p>
            </div>
            <div className="text-center bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold" style={{ backgroundColor: '#00a63e' }}>
                D
              </div>
              <h3 className="font-bold text-lg text-gray-900">David Kim</h3>
              <p className="text-gray-600">Operations Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white text-center" style={{ backgroundColor: '#00a63e' }}>
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Follow us on social media for style tips, exclusive offers, and adorable customer photos!
          </p>
          <div className="flex justify-center gap-6">
            <button className="w-12 h-12 bg-white rounded-full hover:bg-gray-100 transition flex items-center justify-center font-bold" style={{ color: '#00a63e' }}>
              f
            </button>
            <button className="w-12 h-12 bg-white rounded-full hover:bg-gray-100 transition flex items-center justify-center font-bold" style={{ color: '#00a63e' }}>
              𝕏
            </button>
            <button className="w-12 h-12 bg-white rounded-full hover:bg-gray-100 transition flex items-center justify-center font-bold" style={{ color: '#00a63e' }}>
              in
            </button>
            <button className="w-12 h-12 bg-white rounded-full hover:bg-gray-100 transition flex items-center justify-center font-bold" style={{ color: '#00a63e' }}>
              IG
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}