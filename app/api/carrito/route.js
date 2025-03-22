import { DB } from "@/lib/db";
import Productos from "@/models/Productos";
import Carrito from "@/models/Carrito";
import User from "@/models/Users";
import { NextResponse } from "next/server";

export async function POST(req) {
    await DB();  
    try {
        const { _id, idCarrito } = await req.json(); 
 
        
        const producto = await Productos.findById(_id);  
        const usuario =await User.findById(idCarrito);

        if (!producto && usuario) {
            return NextResponse.json({ message: 'No se encontró el producto' }, { status: 404 });
        }

     
        const { Seccion, Categoria, titulo, precio, stock, descripcion, imagen, galeria, imagenPublicId, galeriaPublicId } = producto;

        const carrito = new Carrito({
            usuario:usuario._id,
            Seccion,
            Categoria,
            titulo,
            precio,
            stock,
            descripcion,
            imagen,
            galeria,
            imagenPublicId,
            galeriaPublicId
        });

        await carrito.save();  
        return NextResponse.json({ message: 'Carrito agregado con éxito', carrito }, { status: 200 });

    } catch (error) {
        console.error(error);  
        return NextResponse.json({ message: 'Error al guardar carrito', error }, { status: 500 });
    }
}
