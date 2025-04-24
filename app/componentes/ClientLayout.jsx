"use client";

import { useEcommerce } from "@/context/Contex";

export default function ClientLayout({ children }) {
  const { usuario } = useEcommerce();

  const esAdmin = usuario?.role === "admin";

  return (
    <>
      {!esAdmin && (
        <header>
     
        </header>
      )}
      {children}
      {!esAdmin && (
        <footer>
       
        </footer>
      )}
    </>
  );
}
