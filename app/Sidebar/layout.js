"use client";

import EcommerceProvider from "../../context/Contex";
import Sidebar from "../componentes/Sidebar";

export default function SidebarLayout({ children }) {
  return (
    <div className="flex">
      <EcommerceProvider>
        <Sidebar />
        {children}
      </EcommerceProvider>
    </div>
  );
}
