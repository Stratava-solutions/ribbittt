// FILE: src/components/admin/ProductModal.tsx
'use client'
import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  category: string
  color: string
  size: string
  description: string
  stock: number
  isActive: boolean
}

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: Omit<Product, 'id'>) => void
  product: Product | null
}

export default function ProductModal({ isOpen, onClose, onSave, product }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'dresses',
    color: '',
    size: '2-4Y',
    description: '',
    stock: '',
    isActive: true
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category,
        color: product.color,
        size: product.size,
        description: product.description,
        stock: product.stock.toString(),
        isActive: product.isActive
      })
    } else {
      setFormData({
        name: '',
        price: '',
        category: 'dresses',
        color: '',
        size: '2-4Y',
        description: '',
        stock: '',
        isActive: true
      })
    }
  }, [product, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      color: formData.color,
      size: formData.size,
      description: formData.description,
      stock: parseInt(formData.stock),
      isActive: formData.isActive
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-[#97cb4d] to-[#88bc3e]">
          <h2 className="text-2xl font-bold text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-5">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97cb4d] focus:border-transparent"
                placeholder="e.g., Rainbow Dress"
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97cb4d] focus:border-transparent"
                  placeholder="29.99"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97cb4d] focus:border-transparent"
                  placeholder="10"
                />
              </div>
            </div>

            {/* Category and Color */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97cb4d] focus:border-transparent"
                >
                  <option value="dresses">Dresses</option>
                  <option value="tops">Tops</option>
                  <option value="bottoms">Bottoms</option>
                  <option value="outerwear">Outerwear</option>
                  <option value="sets">Sets</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Color *
                </label>
                <input
                  type="text"
                  required
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97cb4d] focus:border-transparent"
                  placeholder="e.g., Blue"
                />
              </div>
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Size *
              </label>
              <select
                required
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97cb4d] focus:border-transparent"
              >
                <option value="2-4Y">2-4 Years</option>
                <option value="4-6Y">4-6 Years</option>
                <option value="6-8Y">6-8 Years</option>
                <option value="8-10Y">8-10 Years</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#97cb4d] focus:border-transparent resize-none"
                placeholder="Product description..."
              />
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 text-[#97cb4d] rounded focus:ring-2 focus:ring-[#97cb4d]"
              />
              <label htmlFor="isActive" className="text-sm font-semibold text-gray-700 cursor-pointer">
                Make product active (visible to customers)
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 mt-6 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-[#97cb4d] text-white rounded-lg hover:bg-[#88bc3e] transition font-semibold"
            >
              {product ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}