'use client'
import { useState, useEffect } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts'
import axios from 'axios'

const COLORS = ['#97cb4d', '#facc15', '#f87171']

export default function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([])
  const [contacts, setContacts] = useState<any[]>([])

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products')
      if(res.data.success) setProducts(res.data.data)
    } catch(err) { console.error(err) }
  }

  // Fetch Contacts
  const fetchContacts = async () => {
    try {
      const res = await axios.get('/api/contacts')
      if(res.data.success) setContacts(res.data.data)
    } catch(err) { console.error(err) }
  }

  useEffect(() => {
    fetchProducts()
    fetchContacts()
  }, [])

  // Charts Data
  const activeInactiveData = [
    { name: 'Active', value: products.filter(p => p.isActive).length },
    { name: 'Inactive', value: products.filter(p => !p.isActive).length }
  ]
  const stockData = products.map(p => ({ name: p.name, stock: p.stock }))

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-gray-500">Total Products</div>
          <div className="text-2xl font-bold text-gray-900">{products.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-gray-500">Active Products</div>
          <div className="text-2xl font-bold text-gray-900">{products.filter(p => p.isActive).length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-gray-500">Inactive Products</div>
          <div className="text-2xl font-bold text-gray-900">{products.filter(p => !p.isActive).length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <div className="text-gray-500">Total Stock</div>
          <div className="text-2xl font-bold text-gray-900">{products.reduce((sum, p) => sum + p.stock, 0)}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow h-64">
          <h2 className="text-lg font-bold mb-2 text-gray-900">Active vs Inactive Products</h2>
          <ResponsiveContainer width="100%" height="80%">
            <PieChart>
              <Pie data={activeInactiveData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
                {activeInactiveData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow h-64">
          <h2 className="text-lg font-bold mb-2 text-gray-900">Stock per Product</h2>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={stockData}>
              <XAxis dataKey="name" stroke="#333" />
              <YAxis stroke="#333" />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 overflow-x-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Products List</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-700 border-b">
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Stock</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map(p => (
              <tr key={p._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.category}</td>
                <td className="px-4 py-2">${p.price}</td>
                <td className="px-4 py-2">{p.stock}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${p.isActive ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
                    {p.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Contacts Table */}
      <div className="bg-white p-4 rounded-lg shadow overflow-x-auto">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Contact Requests</h2>
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-700 border-b">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {contacts.map(c => (
              <tr key={c._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.email}</td>
                <td className="px-4 py-2">{c.phone || '-'}</td>
                <td className="px-4 py-2">{c.subject}</td>
                <td className="px-4 py-2">{c.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
