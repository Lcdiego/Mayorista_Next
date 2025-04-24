
import { DB } from "@/lib/db";
import Productos from "@/models/Productos";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
export async function DELETE(req) {
   await DB()
   try {
      const { _id } = await req.json()
     
      
      const producto = await Productos.findById(_id)
    



      if (!producto)
         return NextResponse.json({ message: 'No se recibieron datos del producto' }, { status: 404 });
   
      await cloudinary.uploader.destroy(producto.imagenPublicId);

     
      await Promise.all(
         producto.galeriaPublicId.map((publicId) => cloudinary.uploader.destroy(publicId))
      );

      await Productos.findByIdAndDelete(_id)
      return NextResponse.json({ message: 'Producto eliminado' }, { status: 200 })

   } catch (error) {
      return NextResponse.json({ message: 'Error al eliminar producto' }, { status: 500 })

   }

}