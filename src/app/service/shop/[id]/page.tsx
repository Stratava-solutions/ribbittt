"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ArrowLeft,
  Minus,
  Plus,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  color: string;
  sizes: string[];
  description: string;
  images: { url: string; thumbnailUrl: string }[];
  stock: number;
  sold: number;
  featured: boolean;
  createdAt: string;
}

const ADMIN_WHATSAPP_NUMBER = process.env.NEXT_APP_ADMIN_WHATSAPP_NUMBER || "";

export default function ProductDetailPage() {
  const params: any = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (params.id) fetchProduct(params.id);
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();

      if (data.success) {
        setProduct(data.data);
        if (data.data.sizes.length > 0) setSelectedSize(data.data.sizes[0]);
      } else {
        toast.error("Product not found");
        router.push("/shop");
      }
    } catch (error) {
      toast.error("Failed to load product");
      router.push("/shop");
    } finally {
      setLoading(false);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleWhatsApp = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    if (quantity > (product?.stock ?? 0)) {
      toast.error("Not enough stock available");
      return;
    }

    const phone = ADMIN_WHATSAPP_NUMBER.replace(/\D/g, "");
    const message = `
Hello, I'm interested in buying this product:

🧸 Product: ${product?.name}
💰 Price: ₹${product?.price?.toFixed(2)}
📏 Size: ${selectedSize}
📦 Quantity: ${quantity}

🔗 Product Link:
${window.location.href}
  `.trim();

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span>/</span>
          <Link href="/service/shop" className="hover:text-blue-600">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/service/shop?category=${product.category}`}
            className="hover:text-blue-600 capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link
          href="/service/shop"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition font-medium"
        >
          <ArrowLeft size={20} />
          Back to Shop
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Image Gallery */}
            <div>
              <div className="relative aspect-square mb-4 bg-gray-100 rounded-xl overflow-hidden">
                {product.images && product.images.length > 0 ? (
                  <Image
                    src={product.images[selectedImage].url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-400 text-lg">No Image</span>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.featured && (
                    <span className="bg-yellow-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-md">
                      ⭐ FEATURED
                    </span>
                  )}
                  {isOutOfStock && (
                    <span className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-md">
                      OUT OF STOCK
                    </span>
                  )}
                  {isLowStock && (
                    <span className="bg-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg shadow-md">
                      🔥 ONLY {product.stock} LEFT
                    </span>
                  )}
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  className="absolute top-4 right-4 p-2.5 bg-white rounded-full hover:bg-gray-100 transition shadow-md"
                >
                  <Share2 size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === index
                          ? "border-blue-600 ring-2 ring-blue-200"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={img.thumbnailUrl || img.url}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                  {product.category}
                </span>
                <h1 className="text-3xl lg:text-4xl font-bold mb-3 text-gray-900">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-gray-600">
                    <span className="font-medium">Color:</span>
                    <span className="capitalize">{product.color}</span>
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    <span className="font-medium">{product.sold}</span> sold
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">
                    SKU:{" "}
                    <span className="font-medium">
                      {product._id.slice(-8).toUpperCase()}
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-blue-600">
                  ₹{product.price.toFixed(2)}
                </span>
                {product.stock > 0 && (
                  <span className="text-gray-800 text-sm font-medium">
                    ✓ In Stock
                  </span>
                )}
              </div>

              <div className="mb-6 pb-6 border-b">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">Select Size</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-5 py-2.5 border-2 rounded-lg font-medium transition ${
                        selectedSize === size
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-gray-300 hover:border-gray-400 text-gray-700"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isOutOfStock}
                    >
                      <Minus size={20} />
                    </button>
                    <span className="px-6 py-2 font-bold text-lg min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="p-3 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isOutOfStock}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  <span className="text-sm text-gray-600">
                    <span className="font-medium">{product.stock}</span>{" "}
                    available
                  </span>
                </div>
              </div>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                disabled={isOutOfStock}
                className={`w-full py-4 rounded-lg font-semibold transition flex items-center justify-center gap-2 text-lg ${
                  isOutOfStock
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700 active:scale-[0.98] shadow-lg hover:shadow-xl"
                }`}
              >
                {isOutOfStock ? "Out of Stock" : "Contact via WhatsApp"}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlist}
                className="mt-3 w-full py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-semibold flex items-center justify-center gap-2"
              >
                <Heart
                  size={20}
                  className={
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                  }
                />
                Wishlist
              </button>

              {/* Features */}
              <div className="grid grid-cols-1 gap-3 pt-6 border-t">
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Truck className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Free Shipping</p>
                    <p className="text-gray-600 text-xs">On orders over ₹500</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Shield className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Secure Payment</p>
                    <p className="text-gray-600 text-xs">
                      100% secure transactions
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <RotateCcw className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Easy Returns</p>
                    <p className="text-gray-600 text-xs">
                      30-day return policy
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
