import { DB } from "../../../../lib/db";
import cloudinary from "../../../../lib/cloudinary";
import { NextResponse } from "next/server";
import Productos from "../../../../models/Productos";

export async function POST(req) {
  try {
    const { Seccion, Categoria, titulo, precio, stock, descripcion, imagen, galeria } = await req.json(); 

    


    await DB();

    // Validar los datos
    if (!Seccion || !Categoria || !titulo || !precio || !stock || !descripcion || !imagen || !galeria) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Subir imagen principal a Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(imagen, { folder: "products" });
    const imagePath = uploadResponse.secure_url;
    const imagenPublicId= uploadResponse.public_id
    console.log('esto es la imagen principal',imagenPublicId);
   


    // Subir galería a Cloudinary
    const galleryPaths = [];
    const galeriaPublicId=[]
    
    
    
    for (const img of galeria) {
      const res = await cloudinary.uploader.upload(img, { folder: "products/gallery" });
      galleryPaths.push(res.secure_url);
      galeriaPublicId.push(res.public_id)
    }

    // Guardar en la base de datos
    const productos = new Productos({
      Seccion,
      Categoria,
      titulo,
      precio,
      stock,
      descripcion,
      imagen: imagePath,
      galeria: galleryPaths,
      imagenPublicId,
      galeriaPublicId
    });

    await productos.save();

    // Enviar respuesta correcta
    return NextResponse.json({ message: "Producto agregado con éxito" }, { status: 201 });

  } catch (error) {
    console.error("Error al agregar producto:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
