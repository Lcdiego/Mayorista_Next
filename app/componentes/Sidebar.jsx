"use client";

import { useState, useEffect } from "react";
import { Home, Inbox, Users, Settings, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEcommerce } from "@/context/Contex";

const menuItems = [
  { title: "Agregar productos", icon: Home, path: "/Sidebar" },
  { title: "Productos admin", icon: Inbox, path: "/Sidebar/productos-admin" },
  { title: "Agregar banners", icon: Users, path: "/Sidebar/bannerForm" },
  { title: "Buscar productos", icon: Settings, path: "/Sidebar/buscadorDeProductos" },
  { title: "Cerrar sesion", icon: X, path: "/" },
];

export default function Sidebar() {
  const { Logout } = useEcommerce()
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detecta si es una pantalla chica
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize(); // al iniciar
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Botón flotante solo en mobile */}
      {isMobile && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-md text-white"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 sm:relative h-screen bg-gray-900 text-white p-5 z-40
          transition-all duration-300 ease-in-out
          ${isMobile
            ? isCollapsed
              ? "w-60 translate-x-0"
              : "w-60 -translate-x-full"
            : isCollapsed
              ? "w-16"
              : "w-60"}
        `}
      >
        {/* Botón de colapsar / cerrar */}
        <button
          className="flex items-center mb-5 text-gray-300 hover:text-white"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isMobile ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Menú */}
        <nav className="space-y-4">
          {menuItems.map(({ title, icon: Icon, path }) => (
            <Link
            key={title}
            href={path}
            className="flex items-center gap-3 p-1 rounded-lg hover:bg-gray-800 transition"
            onClick={() => {
              if (title === "Cerrar sesion") Logout();
              if (isMobile) setIsCollapsed(false);
            }}
          >
            <Icon className="w-5 h-5" />
            {(!isCollapsed || isMobile) && <span>{title}</span>}
          </Link>
          
          ))}
        </nav>
      </aside>

      {/* Fondo oscuro solo en mobile cuando está abierto */}
      {isMobile && isCollapsed && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsCollapsed(false)}
        />
      )}
    </>
  );
}
