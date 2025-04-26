"use client";

import { useEcommerce } from "@/context/Contex";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import Image from "next/image";
import { useState, useEffect } from "react";

import BotonMP from "@/app/componentes/BotonMP";
import { useParams } from "next/navigation";

const DetalleProducto = () => {
  const { productos, addCarrito, MercadoPago } = useEcommerce();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [valor, setValor] = useState({});
  const [codigoPostal, setCodigoPostal] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [error, setError] = useState('');

  const params = useParams();
  const producto = productos.find((item) => item._id === params.id);

  useEffect(() => {
    if (producto && !imagenSeleccionada && producto.imagen) {
      setImagenSeleccionada(producto.imagen);
    }
  }, [producto, imagenSeleccionada]);

  if (!producto) {
    return (
      <p className="min-h-screen flex justify-center items-center font-semibold text-3xl">
        Cargando producto...
      </p>
    );
  }

  const handleChange = (e, productoId) => {
    setValor((prevValor) => ({
      ...prevValor,
      [productoId]: parseInt(e.target.value) || 1,
    }));
  };

  const cantidad = valor[producto._id] || 1;
  const total = producto.precio * cantidad;

  // Función para calcular las opciones de envío
  const calcularEnvio = async () => {
    if (!codigoPostal) {
      setError("Por favor, ingresa un código postal.");
      return;
    }

    try {
      const response = await fetch(`/api/calcular-envio?itemId=${producto.id_meli}&codigoPostal=${codigoPostal}`);
      const data = await response.json();

      if (response.ok) {
        setShippingOptions(data.options || []);
        setError('');
      } else {
        setError(data.error || 'Error al calcular envío');
      }
    } catch (err) {
      console.error("Error al calcular envío:", err);
      setError('Error de red al calcular el costo de envío');
    }
  };

  return (
    <div className="flex flex-col px-4 sm:px-10 md:px-20">
      <div className="flex flex-col lg:flex-row gap-10 mt-10">
        {/* Swiper de imágenes */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center sm:items-center lg:items-end">
          {producto.galeria && producto.galeria.length > 0 ? (
            <>
              <div className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto aspect-square overflow-hidden flex justify-center items-center rounded-lg border">
                {imagenSeleccionada && (
                  <Image
                    src={imagenSeleccionada}
                    alt={producto.titulo}
                    width={500}
                    height={500}
                    className="p-5 w-full h-full object-contain"
                  />
                )}
              </div>

              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={3}
                breakpoints={{
                  640: { slidesPerView: 4 },
                }}
                watchSlidesProgress
                className="mt-5 w-full max-w-lg"
              >
                {producto.galeria.map((img, index) => (
                  <SwiperSlide
                    key={index}
                    className="cursor-pointer"
                    onClick={() => setImagenSeleccionada(img)}
                  >
                    <div className="w-20 h-20 overflow-hidden flex justify-center items-center border rounded-md">
                      <Image
                        src={img}
                        alt={producto.titulo}
                        width={100}
                        height={100}
                        className="p-2 w-full h-full object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          ) : (
            <p className="text-center text-gray-500">No hay imágenes disponibles</p>
          )}
        </div>

        {/* Información del producto */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-center">
          <div className="w-full max-w-md bg-white p-5 rounded-lg shadow-lg border">
            <h2 className="text-2xl font-bold text-gray-800 text-center lg:text-left">{producto.titulo}</h2>

            <select
              className="mt-4 border rounded p-2"
              value={valor[producto._id] || 1}
              onChange={(e) => handleChange(e, producto._id)}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            <p className="text-gray-500 mt-2">Stock: {producto.stock}</p>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="line-through text-gray-400 text-lg">${total}</span>
              <span className="text-red-500 font-bold text-xl">
                ${(total * 0.9).toFixed(2)}
              </span>
              <span className="bg-red-200 text-red-700 px-2 py-1 text-xs rounded">
                10% OFF
              </span>
            </div>

            <p className="mt-2 text-sm text-green-600">
              6 cuotas sin interés de ${(total / 6).toFixed(2)}
            </p>

            {/* Campo para calcular opciones de envío */}
            <div className="mt-4">
              <input
                type="text"
                value={codigoPostal}
                onChange={(e) => setCodigoPostal(e.target.value)}
                placeholder="Código Postal"
                className="border p-2 rounded"
              />
              <button
                onClick={calcularEnvio}
                className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Calcular Envío
              </button>

              {error && <p className="text-red-500 mt-2">{error}</p>}

              {shippingOptions.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Opciones de envío:</h4>
                  <ul className="space-y-2">
                    {shippingOptions.map((option, idx) => (
                      <li key={idx} className="text-green-600">
                        {option.name} - ${option.cost} - Entrega: {option.estimated_delivery_time?.unit} {option.estimated_delivery_time?.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Botones de acción */}
          <div className="my-10 flex flex-col gap-4 w-full max-w-md">
            <div className="w-full" onClick={() => MercadoPago(producto, cantidad)}>
              <BotonMP />
            </div>
            <button
              onClick={() => addCarrito(producto._id, cantidad)}
              className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 text-lg"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="w-full mt-40 mb-10 flex justify-center">
        <div className="w-full max-w-4xl px-4">
          <h1 className="pb-5 text-xl font-semibold text-center">Descripción del producto:</h1>
          <div className="border p-5 sm:p-10 bg-white rounded-md shadow-sm">
            <div className="text-left max-w-2xl mx-auto whitespace-pre-line">
              {producto.descripcion}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
