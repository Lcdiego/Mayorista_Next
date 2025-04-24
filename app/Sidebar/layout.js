"use client";


import Sidebar from "../componentes/Sidebar";

export default function SidebarLayout({ children }) {
  return (
    <div className="flex">
     
        <Sidebar />
        {children}
      
    </div>
  );
}
