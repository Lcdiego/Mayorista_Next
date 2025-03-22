"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEcommerce } from "../../context/Contex";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { LiaUser } from "react-icons/lia";
import { RiMenu2Fill } from "react-icons/ri";



const Navbar = () => {
    const { usuario, Logout, carrito, eliminarProductoCart } = useEcommerce();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isopen, setisOpen] = useState(false);
    const [valor, setValor] = useState({});


    const menu = () => {
        setisOpen(!isopen)
    }



    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    const total = carrito.reduce((acumulador, item) => {
        const cantidad = valor[item._id] || 1;
        return acumulador + item.precio * cantidad;
    }, 0);


    const handleChange = (e, productoId) => {
        setValor(prevValor => ({
            ...prevValor,
            [productoId]: e.target.value
        }));
    };

    return (
        <div>
            {isModalOpen && (
                <div id="right-bottom-modal" tabIndex="-1" className="fixed top-20 right-4 z-50 p-5 overflow-x-hidden overflow-y-auto h-auto max-h-full">
                    <div className="relative">
                        <div className="relative bg-white rounded-lg shadow-sm dark:bg-white">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-black">Carrito</h3>
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div className="relative overflow-x-auto shadow-md ">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Productos</th>
                                            <th scope="col" className="px-6 py-3">Cantidad</th>
                                            <th scope="col" className="px-6 py-3">Imagen</th>
                                            <th scope="col" className="px-6 py-3">Precio</th>
                                            <th scope="col" className="px-6 py-3">Accion</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {carrito.map((producto) => (
                                            <tr key={producto._id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {producto.titulo}
                                                </th>
                                                <td className="px-6 py-4">
                                                    <select
                                                        value={valor[producto._id] || 1} // Si no hay valor, usamos 1 como valor por defecto
                                                        onChange={(e) => handleChange(e, producto._id)} // Pasamos el id del producto al cambiar la cantidad
                                                    >
                                                        <option value={1}>1</option>
                                                        <option value={2}>2</option>
                                                        <option value={3}>3</option>
                                                        <option value={4}>4</option>
                                                        <option value={5}>5</option>
                                                    </select>
                                                </td>
                                                <td className="px-6 py-4"><Image width={40} height={40} src={producto.imagen} alt="" /></td>
                                                <td className="px-6 py-4">  {producto.precio * (valor[producto._id] || 1)}</td>
                                                <td className="px-6 py-4">
                                                    <a href="#" onClick={() => { eliminarProductoCart(producto._id) }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Eliminar</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex justify-between p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button onClick={closeModal} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-blue-400 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    Comprar
                                </button>
                                <h3 className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-blue-400 rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                    Total: {total}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-5 xl:mx-40 max-w-screen-xl p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image width={60} height={60} src="/camaleon.png" alt="camaleon Logo" />
                        <span className="self-center text-md sm:text-2xl font-semibold whitespace-nowrap dark:text-white">Juliana Genia</span>
                    </Link>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse relative">

                        {usuario ? (
                            <div className="flex items-center">
                                Hola! {String(usuario.nombre)}
                                <div className="ml-2 flex items-center">
                                    <IoCloseCircleOutline onClick={Logout} size={20} />
                                </div>
                                <button onClick={openModal} className="ml-2 relative">
                                    {usuario.role === 'admin' ? (
                                        ''
                                    ) : (
                                        <>
                                            {carrito.length > 0 && (
                                                <div className="absolute top-0 right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                                    {carrito.length}
                                                </div>
                                            )}
                                            <IoCartOutline size={40} />
                                        </>
                                    )}
                                </button>

                            </div>

                        ) : (
                            <div className="flex items-center">
                                {isopen ? (<nav className="sm:hidden absolute top-16 left-10 z-10 bg-gray-50 dark:bg-gray-700">
                                    <div className="max-w-screen-xl px-4 py-3 mx-auto">
                                        <div className="flex items-center">
                                            <ul className="flex flex-col font-medium ">
                                                <li><Link href="/" onClick={() => { menu() }} className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</Link></li>
                                                <li><Link href="#" onClick={() => { menu() }} className="text-gray-900 dark:text-white hover:underline">Company</Link></li>
                                                <li><Link href="#" onClick={() => { menu() }} className="text-gray-900 dark:text-white hover:underline">Team</Link></li>
                                                <li><Link href="#" onClick={() => { menu() }} className="text-gray-900 dark:text-white hover:underline">Features</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </nav>) : ('')}

                                <div className="">
                                    <Link href="/pages/login" className=" dark:text-blue-500 hover:underline hover:text-blue-400"><LiaUser size={35} /></Link>
                                </div>
                                <div className="sm:hidden ml-10" onClick={() => { menu() }}>
                                    <RiMenu2Fill size={25} />
                                </div>


                            </div>

                        )}
                    </div>
                </div>
            </nav>
            <nav className="hidden sm:block bg-gray-50 dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li><Link href="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</Link></li>
                            <li><Link href="/pages/descuentos" className="text-gray-900 dark:text-white hover:underline">Descuentos</Link></li>
                            <li><Link href="/pages/productos-exclusivos" className="text-gray-900 dark:text-white hover:underline">Productos exclusivos</Link></li>
                            <li><Link href="/pages/futuros-productos" className="text-gray-900 dark:text-white hover:underline">Futuros productos</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
