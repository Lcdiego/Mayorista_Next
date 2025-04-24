import { NextResponse } from 'next/server';
import {DB} from '../../../../../lib/db'; // Asegúrate de tener la conexión correcta a DB
import cloudinary from '../../../../../lib/cloudinary';
import Productos from '../../../../../models/Productos'; // Ajusta la ruta si es necesario

export async function PUT(request, { params }) {
  try {
    const { id } = await params;  // Esperamos a que los params se resuelvan

    // Recibe el body de la solicitud (formData, imagen, galería)
    const { Seccion, Categoria, titulo, precio, stock, peso, alto, ancho, largo, descripcion, imagen, galeria } = await request.json();
console.log(imagen, galeria);

    // Conéctate a la base de datos
    await DB();

    // Verificar que los campos obligatorios estén presentes
    if (!Seccion || !Categoria || !titulo || !precio || !stock || !descripcion) {
      return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
    }

    // Buscar el producto en la base de datos
    const productoExistente = await Productos.findById(id);
    console.log('esto es producto existente ',productoExistente);
    
    if (!productoExistente) {
      return NextResponse.json({ message: "Producto no encontrado" }, { status: 404 });
    }

    // Procesar la imagen principal
    let imagePath = productoExistente.imagen;
    let imagenPublicId = productoExistente.imagenPublicId;
    console.log( 'esto es imagenPath y imagenPublicId', imagePath,imagenPublicId);
    

    if (imagen?.startsWith("data:image")) {
      // Si hay una nueva imagen, eliminar la anterior en Cloudinary
      if (imagenPublicId) {
        await cloudinary.uploader.destroy(imagenPublicId);
      }

      // Subir la nueva imagen a Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(imagen, { folder: "products" });
      imagePath = uploadResponse.secure_url;
      imagenPublicId = uploadResponse.public_id;
    }

    // Procesar la galería de imágenes
    let galleryPaths = productoExistente.galeria;
    let galeriaPublicId = productoExistente.galeriaPublicId;

    if (galeria?.length && galeria[0].startsWith("data:image")) {
      if (galeriaPublicId?.length) {
        // Eliminar las imágenes anteriores de la galería en Cloudinary
        for (const publicId of galeriaPublicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      }

      galleryPaths = [];
      galeriaPublicId = [];

      // Subir nuevas imágenes de la galería
      for (const img of galeria) {
        const res = await cloudinary.uploader.upload(img, { folder: "products/gallery" });
        galleryPaths.push(res.secure_url);
        galeriaPublicId.push(res.public_id);
      }
    }

    // Actualizar el producto en la base de datos
    await Productos.findByIdAndUpdate(id, {
      Seccion,
      Categoria,
      titulo,
      precio,
      stock,
      peso,
      alto,
      ancho,
      largo,
      descripcion,
      imagen: imagePath,
      galeria: galleryPaths,
      imagenPublicId,
      galeriaPublicId
    });

    return NextResponse.json({ message: "Producto actualizado con éxito" }, { status: 200 });

  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
  }
}
