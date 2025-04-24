"use client";


import Card from "@/app/componentes/Card";
import { useEcommerce } from "@/context/Contex"


const OfertaDelDia = () => {
    const { productos } = useEcommerce();
 

    const OfertaDelDia = productos.filter((Producto) => Producto.Seccion === 'OfertaDelDia')
    return (
        <div>
            <h1 className="sm:ml-20 p-8 font-medium">
                Oferta del día
            </h1>
            <div className="xl:mx-20 flex flex-wrap justify-center">

                {OfertaDelDia.map((product) => (
                    <div className="w-96 my-5" key={product._id}>

                        <Card {...product} botonCarrito={true} botonMP={true} />

                    </div>
                ))}
            </div>


        </div>


    )
}

export default OfertaDelDia