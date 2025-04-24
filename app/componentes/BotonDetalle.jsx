"use client";

import { useEcommerce } from "@/context/Contex";
import { LuBus } from "react-icons/lu";





const BotonDetalle = () => {
  
    return (

        <button  type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-300">
            <div className="flex">
                <LuBus />
                <div className="ml-10">Ver</div>
            </div>
        </button>

    )
}

export default BotonDetalle