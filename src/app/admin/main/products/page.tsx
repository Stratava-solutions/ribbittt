// src/app/admin/dashboard/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Pencil, Trash2, Plus, Eye } from "lucide-react";
import Image from "next/image";
import { CreateUpdateProduct } from "@/components/admin-components/create-update-product";
import { ProductPreviewModal } from "@/components/admin-components/product-preview";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  sold: number;
  category: string;
  color: string;
  images: { url: string; thumbnailUrl: string }[];
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Product | any>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        toast.error("Failed to load products");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const markAsSold = async (id: string) => {
    const product = products.find((p) => p._id === id);
    if (!product || product.stock === 0) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stock: product.stock - 1,
          sold: product.sold + 1,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Product sold!");
        fetchProducts();
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update product");
    }
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handlePreview = (product: Product) => {
    setPreviewProduct(product);
    setIsPreviewOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Product deleted successfully");
        fetchProducts();
      } else {
        toast.error(data.error || "Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleModalSuccess = () => {
    fetchProducts();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handlePreviewClose = () => {
    setIsPreviewOpen(false);
    setPreviewProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">Admin Dashboard</h1>

      {/* PRODUCT MANAGEMENT */}
      <section className="bg-white p-6 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Product Inventory
          </h2>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">
                    Product
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">
                    Stock
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">
                    Sold
                  </th>
                  <th className="p-3 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {product.images?.[0] && (
                          <div className="relative w-10 h-10 flex-shrink-0">
                            <Image
                              src={
                                product.images[0].thumbnailUrl ||
                                product.images[0].url
                              }
                              alt={product.name}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500 capitalize">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">
                      ₹{product.price.toFixed(2)}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock > 10
                            ? "bg-green-100 text-green-700"
                            : product.stock > 0
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600">{product.sold}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePreview(product)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                          title="Preview & Update"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => markAsSold(product._id)}
                          disabled={product.stock === 0}
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            product.stock === 0
                              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                              : "bg-green-600 hover:bg-green-700 text-white"
                          }`}
                        >
                          Sell
                        </button>
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {products.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No products found</p>
                <button
                  onClick={handleCreate}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Add your first product
                </button>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Create/Edit Product Modal */}
      <CreateUpdateProduct
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        editProduct={editingProduct}
      />

      {/* Preview & Manual Update Modal */}
      <ProductPreviewModal
        isOpen={isPreviewOpen}
        onClose={handlePreviewClose}
        onSuccess={handleModalSuccess}
        product={previewProduct}
      />
    </div>
  );
}
