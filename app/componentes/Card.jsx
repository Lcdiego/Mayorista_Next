"use client";

import Image from "next/image";
import Link from "next/link";
import BotonCarrito from "./botonCarrito";
import BotonEditar from "./BotonEditar";
import BotonEliminar from "./BotonEliminar";
import { useEcommerce } from "@/context/Contex";


const Card = ({ titulo, precio, stock, imagen, _id, BotonHome = false, botonEliminarAdmin = false, BotonEditarAdmin = false }) => {

const {detalle}=useEcommerce()
    return (


        <div className="max-w-sm mx-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
             <Link href={'/pages/detalle-producto' } onClick={()=> detalle(_id)} >
             
                <div className="flex justify-center" >
                    <Image width={500} height={500} className="rounded-t-lg mt-5 h-40 sm:w-auto sm:h-60 object-contain" src={imagen || '/default-image.jpg'} alt={titulo} />
                </div>

            </Link>
            <div className="p-5">
                <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{titulo}</h5>
                </div>

                <p>Precio $: {precio}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Stock: {stock}u</p>


                {BotonHome && (<BotonCarrito _id={_id} />)}
                <div className="flex justify-around">
                    {botonEliminarAdmin && (<BotonEliminar _id = {_id} />)}
                    {BotonEditarAdmin && (<BotonEditar />)}

                </div>


            </div>
        </div>

    )
}

export default Card 