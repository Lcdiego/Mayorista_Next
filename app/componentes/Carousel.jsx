"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEcommerce } from "@/context/Contex";


export default function FullScreenSwiper() {

  const{banners}=useEcommerce();
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1} 
      navigation 
      pagination={{ clickable: true }} 
      autoplay={{ delay: 5000 }} 
      loop 
      className="w-screen h-36 sm:h-auto" 
    >
      {banners.map((items) => (
        <SwiperSlide key={items._id} className="flex justify-center items-center">
          <img src={items.imagen} alt={items.titulo} className="w-full h-full object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
