"use client";
import Carousel from "../app/componentes/Carousel";
import CategoryCarousel from "../app/componentes/CategoryCarousel";
import { useEcommerce } from "../context/Contex";

export default function Home() {
  const { productos } = useEcommerce();

  return (
    <div>
      <Carousel />
      {productos && productos.length > 0 && <CategoryCarousel productos={productos} Seccion="descuentos" />}
    </div>
  );
}
