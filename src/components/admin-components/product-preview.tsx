// src/components/admin-components/ProductPreviewModal.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  sold: number;
  category: string;
  color: string;
  sizes: string[];
  description: string;
  images: { url: string; thumbnailUrl: string }[];
  featured: boolean;
}

interface ProductPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
}

export function ProductPreviewModal({
  isOpen,
  onClose,
  onSuccess,
  product,
}: ProductPreviewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [manualStock, setManualStock] = useState(0);
  const [manualSold, setManualSold] = useState(0);
  const [manualPrice, setManualPrice] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Reset values when product changes
  useEffect(() => {
    if (product) {
      setManualStock(product.stock);
      setManualSold(product.sold);
      setManualPrice(product.price);
      setSelectedImage(0);
    }
  }, [product]);

  const handleSave = async () => {
    if (!product) return;

    try {
      setIsSaving(true);

      const response = await fetch(`/api/products/${product._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stock: manualStock,
          sold: manualSold,
          price: manualPrice,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Product updated successfully!');
        onSuccess();
        onClose();
      } else {
        toast.error(data.error || 'Failed to update product');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update product');
    } finally {
      setIsSaving(false);
    }
  };

  const adjustStock = (amount: number) => {
    setManualStock(Math.max(0, manualStock + amount));
  };

  const adjustSold = (amount: number) => {
    setManualSold(Math.max(0, manualSold + amount));
  };

  const adjustPrice = (amount: number) => {
    setManualPrice(Math.max(0, manualPrice + amount));
  };

  if (!isOpen || !product) return null;

  const hasChanges =
    manualStock !== product.stock ||
    manualSold !== product.sold ||
    manualPrice !== product.price;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Product Preview</h2>
              <p className="text-sm text-gray-500 mt-1">
                Review and manually adjust product details
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Product Preview */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Preview</h3>
                
                {/* Main Image */}
                <div className="relative aspect-square mb-4 bg-gray-100 rounded-xl overflow-hidden">
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[selectedImage].url}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.featured && (
                      <span className="bg-yellow-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                        ⭐ FEATURED
                      </span>
                    )}
                    {manualStock === 0 && (
                      <span className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                        OUT OF STOCK
                      </span>
                    )}
                    {manualStock > 0 && manualStock <= 5 && (
                      <span className="bg-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-lg">
                        LOW STOCK
                      </span>
                    )}
                  </div>
                </div>

                {/* Thumbnails */}
                {product.images && product.images.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {product.images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition ${
                          selectedImage === index
                            ? 'border-blue-600 ring-2 ring-blue-200'
                            : 'border-gray-200 hover:border-gray-300'
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

                {/* Product Info */}
                <div className="mt-6 space-y-4">
                  <div>
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase">
                      {product.category}
                    </span>
                    <h4 className="text-2xl font-bold mt-2">{product.name}</h4>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Description</p>
                    <p className="text-gray-700">{product.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-1">Color</p>
                      <p className="capitalize">{product.color}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-500 mb-1">Available Sizes</p>
                      <p>{product.sizes.join(', ')}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-500 mb-1">Product ID</p>
                    <p className="font-mono text-sm">{product._id}</p>
                  </div>
                </div>
              </div>

              {/* Right: Manual Controls */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Manual Controls</h3>

                <div className="space-y-6">
                  {/* Price Control */}
                  <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Price ($)
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => adjustPrice(-1)}
                        className="p-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        type="button"
                      >
                        <Minus size={20} />
                      </button>
                      <div className="flex-1">
                        <input
                          type="number"
                          step="0.01"
                          value={manualPrice}
                          onChange={(e) => setManualPrice(Math.max(0, parseFloat(e.target.value) || 0))}
                          className="w-full px-6 py-3 text-2xl font-bold text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={() => adjustPrice(1)}
                        className="p-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        type="button"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 text-center">
                      Original: ${product.price.toFixed(2)}
                      {manualPrice !== product.price && (
                        <span className="ml-2 text-blue-600 font-medium">
                          (Changed)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stock Control */}
                  <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Current Stock
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => adjustStock(-1)}
                        className="p-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        type="button"
                      >
                        <Minus size={20} />
                      </button>
                      <div className="flex-1">
                        <input
                          type="number"
                          value={manualStock}
                          onChange={(e) => setManualStock(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full px-6 py-3 text-2xl font-bold text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={() => adjustStock(1)}
                        className="p-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        type="button"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 text-center">
                      Original: {product.stock} units
                      {manualStock !== product.stock && (
                        <span className="ml-2 text-green-600 font-medium">
                          (Changed)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Sold Control */}
                  <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Total Sold
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => adjustSold(-1)}
                        className="p-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        type="button"
                      >
                        <Minus size={20} />
                      </button>
                      <div className="flex-1">
                        <input
                          type="number"
                          value={manualSold}
                          onChange={(e) => setManualSold(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full px-6 py-3 text-2xl font-bold text-center border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        onClick={() => adjustSold(1)}
                        className="p-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        type="button"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <div className="mt-2 text-sm text-gray-600 text-center">
                      Original: {product.sold} units
                      {manualSold !== product.sold && (
                        <span className="ml-2 text-purple-600 font-medium">
                          (Changed)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gray-50 rounded-xl p-6 border-2 border-gray-200">
                    <p className="text-sm font-bold text-gray-700 mb-3">Quick Actions</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setManualStock(0)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition"
                        type="button"
                      >
                        Set Stock to 0
                      </button>
                      <button
                        onClick={() => {
                          setManualStock(product.stock);
                          setManualSold(product.sold);
                          setManualPrice(product.price);
                        }}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition"
                        type="button"
                      >
                        Reset All
                      </button>
                      <button
                        onClick={() => setManualStock(manualStock + 10)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition"
                        type="button"
                      >
                        Add 10 Stock
                      </button>
                      <button
                        onClick={() => setManualStock(manualStock + 50)}
                        className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium transition"
                        type="button"
                      >
                        Add 50 Stock
                      </button>
                    </div>
                  </div>

                  {/* Summary */}
                  {hasChanges && (
                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4">
                      <p className="text-sm font-bold text-yellow-800 mb-2">
                        ⚠️ Pending Changes
                      </p>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {manualPrice !== product.price && (
                          <li>• Price: ${product.price.toFixed(2)} → ${manualPrice.toFixed(2)}</li>
                        )}
                        {manualStock !== product.stock && (
                          <li>• Stock: {product.stock} → {manualStock}</li>
                        )}
                        {manualSold !== product.sold && (
                          <li>• Sold: {product.sold} → {manualSold}</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-between rounded-b-2xl">
            <p className="text-sm text-gray-600">
              {hasChanges ? (
                <span className="text-yellow-600 font-medium">
                  You have unsaved changes
                </span>
              ) : (
                <span>No changes made</span>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!hasChanges || isSaving}
                className={`px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition ${
                  hasChanges && !isSaving
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}