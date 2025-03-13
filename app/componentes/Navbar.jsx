"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEcommerce } from "../../context/Contex";
import { IoCloseCircleOutline } from "react-icons/io5";
const Navbar = () => {

    const { usuarios, Logout } = useEcommerce();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Funciones para abrir y cerrar el modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div>
 {isModalOpen && ( // Si el modal está abierto, lo renderizamos
                    <div id="top-right-modal" data-modal-placement="top-right" tabIndex="-1" className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative w-full max-w-2xl max-h-full">
                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Top right modal</h3>
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

                                <div className="p-4 md:p-5 space-y-4">
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
                                    </p>
                                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                        The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
                                    </p>
                                </div>

                                <div className="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                                    <button onClick={closeModal} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        I accept
                                    </button>
                                    <button onClick={closeModal} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        Decline
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            

            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <Image width={60} height={60} src="/camaleon.png" alt="camaleon Logo" />
                        <span className="self-center text-md sm:text-2xl font-semibold whitespace-nowrap dark:text-white">Juliana Genia</span>
                    </Link>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <Link href="tel:5541251234" className="text-sm  text-gray-500 dark:text-white hover:underline">(555) 412-1234</Link>
                        {usuarios ? (
                            <div className="flex">
                                Hola! {String(usuarios)}
                                <div className="ml-2 flex items-center">
                                    <IoCloseCircleOutline onClick={Logout} size={20} />
                                </div>
                            </div>
                        ) : (
                            <div className="flex">
                                <Link href="/pages/login" className="text-sm text-blue-600 dark:text-blue-500 hover:underline">
                                    Login
                                </Link>
                                <Link href="/pages/registers-users" className="ml-2 text-sm text-blue-600 dark:text-blue-500 hover:underline">
                                    Register
                                </Link>
                               <button onClick={openModal}>
                                carrito
                               </button>
                            </div>

                        )}


                    </div>
                </div>
            </nav>
            <nav className="bg-gray-50 dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <Link href="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-900 dark:text-white hover:underline">Company</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-900 dark:text-white hover:underline">Team</Link>
                            </li>
                            <li>
                                <Link href="#" className="text-gray-900 dark:text-white hover:underline">Features</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
       


               

        </div>
    )
}

export default Navbar 