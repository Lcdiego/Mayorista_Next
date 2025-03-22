"use client";

import { useEcommerce } from "@/context/Contex"
import Card from "@/app/componentes/Card"



const ProductosAdmin = () => {
    const { productos } = useEcommerce()
 

    return (
        <div className=" ">
            <h1 className="ml-20 p-8 font-medium">
                Todos los productos
            </h1>
            <div className="xl:mx-20 flex flex-wrap justify-center">

                {productos.map((product) => (
                    <div className="w-96 my-5" key={product._id}>

                        <Card {...product} botonEliminarAdmin={true} BotonEditarAdmin={true} />

                    </div>
                ))}
            </div>


        </div>
    )
}

export default ProductosAdmin 