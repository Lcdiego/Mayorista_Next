"use client";

import { useState } from "react";
import { Home, Inbox, Users, Settings, Menu } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { title: "productos admin", icon: Home, path: "/pages/productos-admin" },
  { title: "Inbox", icon: Inbox, path: "/inbox" },
  { title: "Users", icon: Users, path: "/users" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div >
      {/* Sidebar */}
      <aside
        className={`h-screen bg-gray-900 text-white p-5 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-60"
        }`}
      >
        {/* Botón de colapsar */}
        <button
          className="flex items-center mb-5 text-gray-300 hover:text-white"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Menú */}
        <nav className="space-y-4">
          {menuItems.map(({ title, icon: Icon, path }) => (
            <Link
              key={title}
              href={path}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition"
            >
              <Icon className="w-5 h-5" />
              {!isCollapsed && <span>{title}</span>}
            </Link>
          ))}
        </nav>
      </aside>

    
    </div>
  );
}
