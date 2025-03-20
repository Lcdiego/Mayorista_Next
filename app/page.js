"use client";
import Carousel from "../app/componentes/Carousel";
import CategoryCarousel from "../app/componentes/CategoryCarousel";
import { useEcommerce } from "../context/Contex";

export default function Home() {
  const { productos } = useEcommerce();

  return (
    <div>
      <Carousel />
      <div className="sm:mx-40">
        <div className="py-8">
          <h2 className="ml-3 text-xl font-semibold my-8">Descuentos</h2>
          {productos && productos.length > 0 && <CategoryCarousel productos={productos} Seccion="descuentos" />}
        </div>
        <div className="border-t-2 border-t-gray-300 ">
          <h2 className="ml-3 text-xl font-semibold my-8 ">Productos exclusivos</h2>
          {productos && productos.length > 0 && <CategoryCarousel productos={productos} Seccion="productosExclusivos" />}
        </div>

      </div>

    </div>
  );
}
