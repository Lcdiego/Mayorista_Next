"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Card from "./Card";

const CategoryCarousel = ({ productos, Seccion }) => {
  const filteredProducts = Array.isArray(productos)
    ? productos.filter((product) => product.Seccion === Seccion)
    : [];

  return (
    <div className="my-6">
      <h2 className="text-xl font-bold mb-4">Descuentos</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        loop
        breakpoints={{
          0: { slidesPerView: 1 },  // En pantallas muy pequeñas (celulares)
          640: { slidesPerView: 2 }, // En tablets pequeñas
          1024: { slidesPerView: 4 }, // En pantallas grandes
        }}
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <Card {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryCarousel;
