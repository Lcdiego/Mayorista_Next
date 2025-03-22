"use client";


import Card from "@/app/componentes/Card";
import { useEcommerce } from "@/context/Contex"


const Descuentos = () => {
    const { productos } = useEcommerce();
    console.log(productos);

    const descuentos = productos.filter((Producto) => Producto.Seccion === 'descuentos')
    return (
        <div className=" ">
            <h1 className="ml-20 p-8 font-medium">
                Descuentos
            </h1>
            <div className="xl:mx-20 flex flex-wrap justify-center">

                {descuentos.map((product) => (
                    <div className="w-96 my-5" key={product._id}>

                        <Card {...product} BotonHome={true} />

                    </div>
                ))}
            </div>


        </div>


    )
}

export default Descuentos 