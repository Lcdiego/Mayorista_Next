"use client";

import Card from "@/app/componentes/Card"
import { useEcommerce } from "@/context/Contex"

const Productos = () => {
    const { productos } = useEcommerce()
    return (
        <div>
           <h1 className="sm:ml-20 p-8 font-medium">
                Productos
            </h1>
            <div className="xl:mx-20 flex flex-wrap justify-center">
                {productos.map((product) => (
                    <div className="w-96 my-5" key={product._id}>
                        <Card  {...product} botonCarrito={true} botonMP={true} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Productos 