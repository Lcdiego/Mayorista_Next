"use client";

import Link from "next/link";
import Image from "next/image";
import { useEcommerce } from "@/context/Contex";
import { IoCloseCircleOutline } from "react-icons/io5";
const Navbar = () => {

    const { usuarios, Logout } = useEcommerce();
    return (
        <div>


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