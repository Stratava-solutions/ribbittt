// app/admin/contacts/page.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { Contact } from '@/app/types';
import { toast } from 'react-hot-toast';
import Image from 'next/image';
import { X, Loader2 } from 'lucide-react';



export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/contacts');
      const json = await res.json();
      setContacts(json.items ?? []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: Contact['status']) {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/contacts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json?.message || 'Failed to update');
        return;
      }
      setContacts((prev) => prev.map(c => c._id === id ? json.item : c));
      toast.success('Status updated');
    } catch (err) {
      console.error(err);
      toast.error('Network error');
    } finally {
      setUpdatingId(null);
    }
  }

  async function removeContact(id: string) {
    if (!confirm('Delete this contact?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json?.message || 'Delete failed');
        return;
      }
      setContacts(prev => prev.filter(c => c._id !== id));
      toast.success('Deleted');
      if (selected?._id === id) setSelected(null);
    } catch (err) {
      console.error(err);
      toast.error('Network error');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">Contact Submissions</h2>

        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="text-sm text-gray-600">{contacts.length} results</div>
          <div>
            <button onClick={load} className="px-3 py-2 bg-blue-600 text-white rounded">Refresh</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Subject</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Message</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-6 text-center"><Loader2 className="animate-spin" /></td></tr>
              ) : (contacts.length === 0 ? (
                <tr><td colSpan={6} className="p-6 text-center text-gray-600">No contacts yet</td></tr>
              ) : contacts.map(contact => (
                <tr key={contact._id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-3 text-gray-800">{contact.name}</td>
                  <td className="p-3 text-gray-600">{contact.email}</td>
                  <td className="p-3 text-gray-600">{contact.subject}</td>
                  <td className="p-3 text-gray-600 max-w-xs truncate">{contact.message}</td>
                  <td className="p-3">
                    <select value={contact.status}
                      onChange={(e) => updateStatus(contact._id, e.target.value as Contact['status'])}
                      disabled={updatingId === contact._id}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium focus:outline-none ${contact.status === 'contacted' ? 'bg-green-100 text-green-800 border-green-300' : contact.status === 'received' ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-red-100 text-red-800 border-red-300'}`}>
                      <option value="received">Received</option>
                      <option value="contacted">Contacted</option>
                      <option value="not answered">Not Answered</option>
                    </select>
                  </td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => setSelected(contact)} className="px-3 py-2 rounded border">Preview</button>
                    <button onClick={() => removeContact(contact._id)} className="px-3 py-2 rounded border text-red-600" disabled={deletingId === contact._id}>
                      {deletingId === contact._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 rounded hover:bg-gray-100">
              <X />
            </button>

            <h3 className="text-2xl font-semibold mb-2">{selected.name}</h3>
            <div className="text-sm text-gray-600 mb-4">{selected.email} • {selected.phone}</div>
            <div className="mb-4">
              <div className="text-sm font-semibold text-gray-700">Subject</div>
              <div className="text-gray-800">{selected.subject}</div>
            </div>

            <div className="mb-4">
              <div className="text-sm font-semibold text-gray-700">Message</div>
              <div className="text-gray-800 whitespace-pre-wrap">{selected.message}</div>
            </div>

            {selected.attachmentUrl && (
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700">Attachment</div>
                <div className="mt-2">
                  {/* Use next/image for optimized preview, adjust size as needed */}
                  <div className="w-full h-64 relative rounded overflow-hidden border">
                    <Image src={selected.attachmentUrl} alt="attachment" fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 mt-6">
              <button onClick={() => { updateStatus(selected._id, 'contacted'); setSelected(null); }} className="px-4 py-2 bg-green-600 text-white rounded">Mark Contacted</button>
              <button onClick={() => { updateStatus(selected._id, 'not answered'); setSelected(null); }} className="px-4 py-2 bg-red-50 text-red-700 rounded border">Mark Not Answered</button>
              <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
