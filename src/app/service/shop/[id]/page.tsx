// FILE: src/app/shop/[id]/page.tsx
import Link from "next/link";
import { AddToCartButton } from "../../../components/addToCartCard";

const productDetails = {
  1: {
    id: 1,
    name: "Rainbow Dress",
    price: 29.99,
    description: "Beautiful rainbow-colored dress perfect for summer days",
    category: "dresses",
  },
  2: {
    id: 2,
    name: "Denim Jacket",
    price: 34.99,
    description: "Classic denim jacket for all seasons",
    category: "outerwear",
  },
};

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product =
    productDetails[params.id as unknown as keyof typeof productDetails] ||
    productDetails[1];

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/shop"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        ← Back to Shop
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
          <span className="text-gray-400 text-xl">Product Image</span>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-blue-600 mb-6">
            ${product.price}
          </p>

          <p className="text-gray-700 mb-8">{product.description}</p>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Size</label>
            <select className="border rounded px-4 py-2 w-full">
              <option>2-4 Years</option>
              <option>4-6 Years</option>
              <option>6-8 Years</option>
              <option>8-10 Years</option>
            </select>
          </div>

          <div className="mb-8">
            <label className="block font-semibold mb-2">Quantity</label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="border rounded px-4 py-2 w-24"
            />
          </div>

          <AddToCartButton product={product} />

          <div className="mt-8 border-t pt-8">
            <h3 className="font-semibold mb-4">Product Details</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• 100% Cotton</li>
              <li>• Machine washable</li>
              <li>• Comfortable fit</li>
              <li>• Available in multiple sizes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
