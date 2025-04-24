"use client";


import Card from "@/app/componentes/Card";
import { useEcommerce } from "@/context/Contex"


const FuturosProductos = () => {
    const { productos } = useEcommerce();
   

    const FuturosProductos = productos.filter((Producto) => Producto.Seccion === 'FuturosProductos')
    return (
        <div>
            <h1 className="sm:ml-20 p-8 font-medium">
            Futuros productos
            </h1>
            <div className="xl:mx-20 flex flex-wrap justify-center">

                {FuturosProductos.map((product) => (
                    <div className="w-96 my-5" key={product._id}>

                        <Card {...product} botonCarrito={true} botonMP={true} />

                    </div>
                ))}
            </div>


        </div>


    )
}

export default FuturosProductos