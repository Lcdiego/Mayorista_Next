"use client";

import { useEcommerce } from "@/context/Contex"
import Card from "@/app/componentes/Card"

const ProductosAdmin = () => {
  const { productos, mensajes } = useEcommerce()

  return (
    <div className="w-full flex flex-col mt-20 overflow-x-hidden">
      <div className="my-14 ml-8">
        <h1 className="text-sm font-semibold bg-gray-300 inline-block px-2 py-1 rounded">
          Todos los productos
        </h1>
      </div>

      {mensajes && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 text-white bg-red-700 px-4 py-2 rounded text-center max-w-[90vw]">
          {mensajes}
        </div>
      )}

      <div className="flex flex-wrap justify-center px-4">
  {productos.map((product) => (
    <div
      key={product._id}
      className="w-96 py-5"
    >
      <Card
        {...product}
        botonEliminarAdmin={true}
        botonEditarAdmin={true}
      />
    </div>
  ))}
</div>

    </div>
  )
}

export default ProductosAdmin
