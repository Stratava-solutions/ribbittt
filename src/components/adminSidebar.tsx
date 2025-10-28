'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Mail, Package, Settings } from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', href: '/admin/main/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/main/products', icon: Package },
  { name: 'Contact', href: '/admin/main/contact', icon: Mail },
  { name: 'Settings', href: '/admin/main/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white border-r min-h-screen shadow-sm flex flex-col">
      <div className="px-6 py-4 border-b">
        <h1 className="text-2xl font-bold text-[#97cb4d]">Ribbittt Admin</h1>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map(({ name, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 font-medium transition ${
                active
                  ? 'bg-[#97cb4d]/10 text-[#97cb4d] border-l-4 border-[#97cb4d]'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Icon size={18} />
              {name}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t text-sm text-gray-500">
        © 2025 Ribbittt
      </div>
    </aside>
  )
}
