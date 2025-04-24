"use client";

import Image from "next/image";
import Link from "next/link";
import BotonCarrito from "./BotonCarrito";
import BotonEditar from "./BotonEditar";
import BotonEliminar from "./BotonEliminar";
import BotonMP from "./BotonMP";
import { useEcommerce } from "@/context/Contex";




const Card = ({ titulo, precio, stock, imagen, _id, botonCarrito = false, botonMP = false, botonEliminarAdmin = false, botonEditarAdmin = false, botonEliminarImgCarousel = false }) => {
    const {  MercadoPago, addCarrito, eliminarProducto, eliminarImgCarousel } = useEcommerce()
    const cantidad = 1
    const productos = { titulo, precio, cantidad, _id }
    return (


        <div className="max-w-sm mx-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-100 dark:border-gray-700">
          
                <Link href={`/pages/detalle/${_id}`} >

                    <div className="flex justify-center" >
                        <Image width={500} height={500} className="rounded-t-lg mt-5 h-40 sm:w-auto sm:h-60 object-contain" src={imagen} alt={titulo} />
                    </div>

                </Link> 
            
            <div className="p-5">
                <div>
                    <h5 className="mb-2  font-medium tracking-tight text-gray-900 dark:text-gray-800">{titulo}</h5>
                </div>

                <p>Precio $: {precio}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Stock: {stock}u</p>


                <div className="flex flex-col">
                    <div onClick={() => { addCarrito(_id) }}>
                        {botonCarrito && (<BotonCarrito />)}
                    </div>
                    <div className="" onClick={() => MercadoPago(productos)}>
                        {botonMP && (<BotonMP />)}
                    </div>

                </div>



                <div className="flex justify-around">
                    {botonEliminarAdmin && (<div onClick={() => eliminarProducto(_id)}><BotonEliminar /></div>)}
                    {botonEliminarImgCarousel && (<div onClick={() => eliminarImgCarousel(_id)}><BotonEliminar /></div>)}
                    {botonEditarAdmin && (<Link href={`/Sidebar/updateProductos/${_id}`} ><BotonEditar /></Link>
                    )}

                </div>


            </div>
        </div>

    )
}

export default Card 