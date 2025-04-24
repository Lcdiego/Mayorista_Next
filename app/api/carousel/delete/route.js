
import { DB } from "@/lib/db";
import Banners from "@/models/Banner";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req) {
   await DB()
   try {
      const { _id } = await req.json()
     
      
      const img = await Banners.findById(_id)
    



      if (!img)
         return NextResponse.json({ message: 'No se recibieron datos de la imagen' }, { status: 404 });
   
      await cloudinary.uploader.destroy(img.imagenPublicId);

     
    

      await Banners.findByIdAndDelete(_id)
      return NextResponse.json({ message: 'Imagen eliminado' }, { status: 200 })

   } catch (error) {
      return NextResponse.json({ message: 'Error al eliminar imagen' }, { status: 500 })

   }

}