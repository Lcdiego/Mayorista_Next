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
     
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        navigation
        loop
        breakpoints={{
          0: { slidesPerView: 1 },  
          1024: { slidesPerView: 2 }, 
          1440: { slidesPerView: 4 }, 
        }}
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <Card {...product} BotonHome={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoryCarousel;
