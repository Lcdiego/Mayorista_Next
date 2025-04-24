"use client";
import { useState } from "react";
import Image from "next/image";
import { useEcommerce } from "@/context/Contex";
import BotonMP from "./BotonMP";

const Carrito = ({ isModalOpen, closeModal }) => {
    const { carrito, eliminarProductoCart, addCarrito, MercadoPago } = useEcommerce();
    const [valor, setValor] = useState({});

    const total = carrito.reduce((acumulador, item) => {
        const cantidadTotal = valor[item._id] || item.cantidad || 1;
        return acumulador + item.precio * cantidadTotal;
    }, 0);

    const handleChange = (e, idProducto) => {
        const cantidadSeleccionada = parseInt(e.target.value) || 1;
        setValor(prevValor => ({
            ...prevValor,
            [idProducto]: cantidadSeleccionada,
        }));
        addCarrito(idProducto, cantidadSeleccionada);
    };

    return (
        <div>
            {isModalOpen && (
                <div
                    id="right-bottom-modal"
                    tabIndex="-1"
                    className="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
                >
                    <div className="relative w-full max-w-md md:max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
                        {/* Encabezado */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Carrito</h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-900 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
                            >
                                <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l12 12M13 1L1 13" />
                                </svg>
                            </button>
                        </div>

                        {/* Tabla */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm text-left text-gray-600">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                    <tr>
                                        <th className="px-2 py-2">Producto</th>
                                        <th className="px-2 py-2">Cantidad</th>
                                        <th className="px-2 py-2 hidden sm:table-cell">Imagen</th>
                                        <th className="px-2 py-2">Precio</th>
                                        <th className="px-2 py-2">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {carrito.map((producto) => (
                                        <tr key={producto._id} className="border-t bg-white">
                                            <td className="px-2 py-3 font-medium text-gray-800">
                                                {producto.titulo}
                                            </td>
                                            <td className="px-2 py-3">
                                                <select
                                                    value={valor[producto._id] || producto.cantidad || 1}
                                                    onChange={(e) => handleChange(e, producto.idProducto)}
                                                    className="border rounded px-1 py-0.5"
                                                >
                                                    {[1, 2, 3, 4, 5].map(num => (
                                                        <option key={num} value={num}>{num}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="px-2 py-3 hidden sm:table-cell">
                                                <Image
                                                    width={40}
                                                    height={40}
                                                    src={producto.imagen}
                                                    alt="Producto"
                                                    className="rounded"
                                                />
                                            </td>
                                            <td className="px-2 py-3">
                                                ${producto.precio * (valor[producto._id] || producto.cantidad || 1)}
                                            </td>
                                            <td className="px-2 py-3">
                                                <button
                                                    onClick={() => eliminarProductoCart(producto._id)}
                                                    className="text-blue-600 hover:underline text-sm"
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4 p-4 border-t border-gray-200">
                            <div
                                onClick={() => {
                                    const productosParaPagar = carrito.map((producto) => ({
                                        ...producto,
                                        cantidad: valor[producto._id] || producto.cantidad || 1,
                                    }));
                                    MercadoPago(productosParaPagar);
                                }}
                                className="w-full sm:w-auto"
                            >
                                <BotonMP />
                            </div>

                            <div className="text-base font-medium text-gray-800">
                                Total: ${total}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carrito;
