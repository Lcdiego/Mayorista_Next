/*"use client";
import Carousel from "../app/componentes/Carousel";
import CategoryCarousel from "../app/componentes/CategoryCarousel";
import { useEcommerce } from "../context/Contex";
import { FaWhatsappSquare } from "react-icons/fa";


export default function Home() {
  const { productos } = useEcommerce();

  return (
    <div>
      <a
        href="https://wa.me/5491123215257?text=Hola!%20Estoy%20interesado%20en%20sus%20productos"
        target="_blank"
        rel="noopener noreferrer"
      >

        <FaWhatsappSquare className="fixed  text-green-500 right-10 bottom-4 z-50" size={60} />
      </a>



      <Carousel />
      <div className="sm:mx-40">
        <div className="py-8 border-t-2 border-t-gray-300 ">
          <h2 className="ml-3 text-xl font-semibold my-8 ">Oferta del día</h2>
          {productos && productos.length > 0 && <CategoryCarousel productos={productos} Seccion="OfertaDelDia" />}
        </div>
        <div className="py-8">
          <h2 className="ml-3 text-xl font-semibold my-8">Descuentos</h2>
          {productos && productos.length > 0 && <CategoryCarousel productos={productos} Seccion="descuentos" />}
        </div>
        <div className="py-8">
          <h2 className="ml-3 text-xl font-semibold my-8">Productos</h2>
          {productos && productos.length > 0 && <CategoryCarousel productos={productos} />}
        </div>

        <div className="py-8 border-t-2 border-t-gray-300 ">
          <h2 className="ml-3 text-xl font-semibold my-8 ">Productos exclusivos</h2>
          {productos && productos.length > 0 && <CategoryCarousel productos={productos} Seccion="productosExclusivos" />}
        </div>
        <div className="py-8 border-t-2 border-t-gray-300 ">
          <h2 className="ml-3 text-xl font-semibold my-8 ">Futuros productos</h2>
          {productos && productos.length > 0 && <CategoryCarousel productos={productos} Seccion="FuturosProductos" />}
        </div>

      </div>

    </div>
  );
}
*/

// app/page.js
export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen  bg-yellow-200">
      <div className="text-center p-20 bg-yellow-200 rounded-2xl  max-w-2xl">
        <img
          src="/under.jpg" 
          alt="Página en construcción"
          className="mx-auto mb-6 w-80 h-80"
        />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">¡Estamos trabajando en ello!</h1>
        <p className="text-gray-600 mb-4">Esta página está en construcción. Pronto estará disponible con muchas novedades.</p>
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} MundoShop</p>
      </div>
    </main>
  );
}
