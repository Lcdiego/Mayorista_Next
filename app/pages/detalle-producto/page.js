"use client"; 

import { useEcommerce } from "@/context/Contex";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";

const DetalleProducto = () => {
  const { seleccionarProductId, productos } = useEcommerce();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  // Filtramos el producto
  const producto = productos.filter((item) => item._id === seleccionarProductId)[0];

  // Si no hay producto, mostramos un mensaje de carga
  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex justify-around p-4 border rounded-lg shadow-lg bg-white">
        <div>
{/* Swiper principal */}
{producto.galeria && producto.galeria.length > 0 ? (
        <>
          <Swiper
            modules={[Navigation, Pagination, Thumbs]}
            navigation
            pagination={{ clickable: true }}
            thumbs={{ swiper: thumbsSwiper }}
            className="rounded-lg"
          >
            {producto.galeria.map((img, index) => (
              <SwiperSlide key={index}>
                <Image src={img} alt={producto.titulo} width={400} height={300} className="w-40 rounded-lg" />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Swiper de miniaturas */}
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            watchSlidesProgress
            className="mt-2 "
          >
            {producto.galeria.map((img, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                <Image src={img} alt={producto.titulo} width={80} height={60} className="rounded-md border w-20 h-20" />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      ) : (
        <p className="text-center text-gray-500">No hay imágenes disponibles</p>
      )}
        </div>
      

      {/* Información del producto */}
      <div>
      <div className="mt-4">
        <h2 className="text-lg font-bold">{producto.titulo}</h2>
        <p className="text-gray-500">Categoría: {producto.Categoria}</p>
        <div className="mt-2">
          <span className="line-through text-gray-400">${producto.precio}</span>
          <span className="ml-2 text-red-500 font-bold">${(producto.precio * 0.9).toFixed(2)}</span>
          <span className="ml-2 bg-red-200 text-red-700 px-2 py-1 text-xs rounded">10% OFF</span>
        </div>
        <p className="mt-2 text-sm text-green-600">6 cuotas sin interés de ${(producto.precio / 6).toFixed(2)}</p>
      </div>

      {/* Botones de acción */}
      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700">Comprar</button>
        <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300">Agregar al carrito</button>
      </div>
      </div>
     
    </div>
  );
};

export default DetalleProducto;
