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

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 (555) 123-4567",
      subject: "Support",
      message: "I need help with my account.",
      status: "received",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+44 7777 888888",
      subject: "Sales",
      message: "Interested in your premium plan.",
      status: "contacted",
    },
    {
      id: 3,
      name: "Michael Lee",
      email: "mike@domain.com",
      phone: "",
      subject: "Feedback",
      message: "Great website experience!",
      status: "not answered",
    },
  ]);

  const handleStatusChange = (id: number, newStatus: Contact["status"]) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">
          Contact Submissions
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Subject
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Message
                </th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3 text-gray-800">{contact.name}</td>
                  <td className="p-3 text-gray-600">{contact.email}</td>
                  <td className="p-3 text-gray-600">{contact.subject}</td>
                  <td className="p-3 text-gray-600 max-w-xs truncate">
                    {contact.message}
                  </td>
                  <td className="p-3">
                    <select
                      value={contact.status}
                      onChange={(e) =>
                        handleStatusChange(
                          contact.id,
                          e.target.value as Contact["status"]
                        )
                      }
                      className={`px-3 py-2 rounded-lg border text-sm font-medium focus:outline-none ${
                        contact.status === "contacted"
                          ? "bg-green-100 text-green-800 border-green-300"
                          : contact.status === "received"
                          ? "bg-blue-100 text-blue-800 border-blue-300"
                          : "bg-red-100 text-red-800 border-red-300"
                      }`}
                    >
                      <option value="received">Received</option>
                      <option value="contacted">Contacted</option>
                      <option value="not answered">Not Answered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
