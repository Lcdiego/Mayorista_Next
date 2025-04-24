"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEcommerce } from "../../context/Contex";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { LiaUser } from "react-icons/lia";
import { RiMenu2Fill } from "react-icons/ri";
import { SwalCarrito } from "./Swal";
import { FcSearch } from "react-icons/fc";
import { useRouter } from "next/navigation";
import Carrito from "./Carrito";



const Navbar = () => {
    const { usuario, Logout, carrito, swal } = useEcommerce();

    const [isopen, setisOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(!isModalOpen);
    const closeModal = () => setIsModalOpen(false);

    const [searchTerm, setSearchTerm] = useState('');




    const router = useRouter();



    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            router.push(`/pages/busqueda?query=${encodeURIComponent(searchTerm)}`);
        }
        setTimeout(() => {
            setSearchTerm('')
        }, 3000);
    };


    const menu = () => {
        setisOpen(!isopen)
    }

    return (
        <div>
            {swal ? <SwalCarrito /> : ''}
            <Carrito isModalOpen={isModalOpen} closeModal={closeModal} />

            <nav className="bg-white border-gray-200 dark:bg-gray-200">
                <div className="flex flex-wrap justify-between items-center mx-5 xl:mx-40 max-w-screen-xl p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image width={100} height={100} src="/Logo.png" alt="camaleon Logo" />

                    </Link>

                    <div className="flex items-center">
                        {isopen ? (<nav className="sm:hidden absolute top-20 right-0 rounded-sm z-10 bg-gray-50 ">
                            <div className="max-w-screen-xl px-4 py-3 mx-auto">
                                <div className="flex items-center">
                                    <ul className="flex flex-col font-medium ">

                                        <div className="sm:hidden flex items-center space-x-6 rtl:space-x-reverse relative">

                                            {usuario ? (
                                                <div className="flex items-center">
                                                    Hola! {String(usuario.nombre)}
                                                    <div className="ml-2 flex items-center">
                                                        <IoCloseCircleOutline onClick={Logout}   size={20} />
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
                                                <div className="flex" >
                                                    <Link href="/pages/login"
                                                        onClick={() => { menu() }}
                                                        className="dark:text-black hover:underline hover:text-blue-400">
                                                        <LiaUser size={35} />
                                                    </Link>
                                                    <IoCartOutline size={40} className="ml-10" />
                                                </div>

                                            )}

                                        </div>
                                        <li><Link href="/" onClick={() => { menu() }} className="text-gray-900 hover:underline" aria-current="page">Home</Link></li>
                                        <li><Link href="/pages/Oferta-del-dia" onClick={() => { menu() }} className="text-gray-900 hover:underline">Oferta del día</Link></li>
                                        <li><Link href="/pages/descuentos" onClick={() => { menu() }} className="text-gray-900 hover:underline">Descuentos</Link></li>
                                        <li><Link href="/pages/productos" onClick={() => { menu() }} className="text-gray-900 hover:underline">Productos</Link></li>
                                        <li><Link href="/pages/productos-exclusivos" onClick={() => { menu() }} className="text-gray-900 hover:underline">Productos exclusivos</Link></li>
                                        <li><Link href="/pages/futuros-productos" onClick={() => { menu() }} className="text-gray-900 hover:underline">Futuros productos</Link></li>

                                    </ul>
                                </div>
                            </div>
                        </nav>) : ('')}


                        <div className="sm:hidden ml-10" onClick={() => { menu() }}>
                            <RiMenu2Fill size={25} />
                        </div>


                    </div>

                    <form onSubmit={handleSearch} className="mt-5 flex-grow flex justify-center mx-4">
                        <div className="relative w-full sm:w-96">

                            <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
                                <FcSearch size={20} />
                            </button>


                            <input
                                type="text"
                                placeholder="Buscar productos..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    </form>

                    <div className="hidden sm:flex sm:items-center space-x-6 rtl:space-x-reverse relative">

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
                            <div className="hidden  sm:flex">
                                <Link href="/pages/login" className="dark:text-black hover:underline hover:text-blue-400"><LiaUser size={35} /></Link>
                                <IoCartOutline size={40} className="ml-10" />
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
                            <li><Link href="/pages/Oferta-del-dia" className="text-gray-900 dark:text-white hover:underline">Oferta del día</Link></li>
                            <li><Link href="/pages/descuentos" className="text-gray-900 dark:text-white hover:underline">Descuentos</Link></li>
                            <li><Link href="/pages/productos" className="text-gray-900 dark:text-white hover:underline">Productos</Link></li>
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
