"use client";


import Card from "@/app/componentes/Card";
import { useEcommerce } from "@/context/Contex"


const Descuentos = () => {
    const { productos } = useEcommerce();
   

    const descuentos = productos.filter((Producto) => Producto.Seccion === 'descuentos')
    return (
        <div>
            <h1 className="sm:ml-20 p-8 font-medium">
                Descuentos
            </h1>
            <div className="xl:mx-20 flex flex-wrap justify-center">

                {descuentos.map((product) => (
                    <div className="w-96 my-5" key={product._id}>

                        <Card {...product} botonCarrito={true} botonMP={true} producto={product} />

                    </div>
                ))}
            </div>


        </div>


    )
}

export default Descuentos 