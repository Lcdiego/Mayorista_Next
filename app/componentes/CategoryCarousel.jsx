"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import Card from "./Card";

const CategoryCarousel = ({ productos, Seccion }) => {
  console.log("Renderizando CategoryCarousel");


  // Filtra los productos por categoría
  const filteredProducts = productos.filter((product) => product.Seccion === Seccion);
  console.log(filteredProducts);

  return (
    <div className="my-6 ">
      <h2 className="text-xl font-bold mb-4">Descuentos</h2>
      <Swiper modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        
        className="w-2/3"
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
