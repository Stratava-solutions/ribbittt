'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Mail,
  Package,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react'

const menuItems = [
  { name: 'Dashboard', href: '/admin/main/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/main/products', icon: Package },
  { name: 'Contact', href: '/admin/main/contact', icon: Mail },
  // { name: 'Settings', href: '/admin/main/settings', icon: Settings },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('adminToken') // remove token
    router.push('/admin/login') // redirect to login
  }

  return (
    <aside
      className={`bg-white border-r min-h-screen shadow-sm flex flex-col transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        {!collapsed && <h1 className="text-2xl font-bold text-gray-900">Ribbittt Admin</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-gray-100 transition"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map(({ name, href, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={name}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-gray-700 transition-all ${
                active
                  ? 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
                  : 'hover:bg-gray-100'
              }`}
            >
              <Icon size={20} />
              {!collapsed && <span>{name}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-red-100 hover:text-red-700 transition"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  )
}
