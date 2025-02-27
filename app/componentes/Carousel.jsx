"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const images = [
  "/mercado_1.png",
  "/mercado_2.png",
  "/mercado_3.png",
  "/mercado_4.png",
  "/mercado_5.png",
  "/mercado_6.png",
  
];

export default function FullScreenSwiper() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1} 
      navigation 
      pagination={{ clickable: true }} 
      autoplay={{ delay: 5000 }} 
      loop 
      className="w-screen " 
    >
      {images.map((src, index) => (
        <SwiperSlide key={index} className="flex justify-center items-center">
          <img src={src} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
