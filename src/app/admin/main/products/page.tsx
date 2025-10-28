"use client";

import React, { useState } from "react";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "received" | "contacted" | "not answered";
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  sold: number;
}

export default function AdminDashboardPage() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 555 123-4567",
      subject: "Support",
      message: "Need help with login",
      status: "received",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Partnership",
      message: "Would like to collaborate",
      status: "contacted",
    },
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Office Chair", price: 4500, stock: 10, sold: 3 },
    { id: 2, name: "Standing Desk", price: 12500, stock: 5, sold: 1 },
    { id: 3, name: "Monitor", price: 8999, stock: 8, sold: 0 },
  ]);

  const handleStatusChange = (id: number, newStatus: Contact["status"]) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const markAsSold = (id: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id && p.stock > 0
          ? { ...p, stock: p.stock - 1, sold: p.sold + 1 }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Admin Dashboard
      </h1>


      {/* PRODUCT MANAGEMENT */}
      <section className="bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Product Inventory
        </h2>
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
                  key={product.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{product.name}</td>
                  <td className="p-3 text-gray-600">
                    ₹{product.price.toLocaleString()}
                  </td>
                  <td className="p-3">{product.stock}</td>
                  <td className="p-3 text-gray-600">{product.sold}</td>
                  <td className="p-3">
                    <button
                      onClick={() => markAsSold(product.id)}
                      disabled={product.stock === 0}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        product.stock === 0
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      Mark as Sold
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
