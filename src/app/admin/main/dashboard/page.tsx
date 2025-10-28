// FILE: src/app/admin/page.tsx
'use client'
import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import ProductModal from '../../../../components/productModal'
import DeleteModal from '../../../../components/deleteProductModal'

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

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: 'Rainbow Dress', price: 29.99, category: 'dresses', color: 'multicolor', size: '2-4Y', description: 'Beautiful rainbow dress', stock: 15, isActive: true },
    { id: 2, name: 'Denim Jacket', price: 34.99, category: 'outerwear', color: 'blue', size: '4-6Y', description: 'Classic denim jacket', stock: 10, isActive: true },
    { id: 3, name: 'Cotton T-Shirt', price: 15.99, category: 'tops', color: 'white', size: '2-4Y', description: 'Soft cotton tee', stock: 25, isActive: false },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [deletingProductId, setDeletingProductId] = useState<number | null>(null)

  const handleCreate = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleDelete = (id: number) => {
    setDeletingProductId(id)
    setIsDeleteModalOpen(true)
  }

  const handleToggleActive = (id: number) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ))
  }

  const handleSaveProduct = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p
      ))
    } else {
      const newProduct = { ...productData, id: Date.now() }
      setProducts([...products, newProduct])
    }
    setIsModalOpen(false)
  }

  const confirmDelete = () => {
    if (deletingProductId) {
      setProducts(products.filter(p => p.id !== deletingProductId))
      setIsDeleteModalOpen(false)
      setDeletingProductId(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Product Management</h1>
              <p className="text-gray-600 mt-1">Manage your Ribbittt products</p>
            </div>
            <button
              onClick={handleCreate}
              className="bg-[#97cb4d] text-white px-6 py-3 rounded-lg hover:bg-[#88bc3e] transition flex items-center gap-2 font-semibold"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="text-gray-600 text-sm font-medium">Total Products</div>
            <div className="text-3xl font-bold text-gray-800 mt-2">{products.length}</div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="text-gray-600 text-sm font-medium">Active Products</div>
            <div className="text-3xl font-bold text-[#97cb4d] mt-2">
              {products.filter(p => p.isActive).length}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="text-gray-600 text-sm font-medium">Inactive Products</div>
            <div className="text-3xl font-bold text-orange-500 mt-2">
              {products.filter(p => !p.isActive).length}
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="text-gray-600 text-sm font-medium">Total Stock</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">
              {products.reduce((sum, p) => sum + p.stock, 0)}
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.size} • {product.color}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">${product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(product.id)}
                        className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                          product.isActive 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {product.isActive ? (
                          <>
                            <Eye size={14} />
                            Active
                          </>
                        ) : (
                          <>
                            <EyeOff size={14} />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        productName={products.find(p => p.id === deletingProductId)?.name || ''}
      />
    </div>
  )
}
