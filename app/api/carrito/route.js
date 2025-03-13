import { DB } from "@/lib/db";
import Productos from "@/models/Productos";
import Carrito from "@/models/Carrito";
import User from "@/models/Users";
import { NextResponse } from "next/server";

export async function POST(req) {
    await DB();  // Asegúrate de que esta función haga lo correcto
    try {
        const { _id, email } = await req.json();  // Obtener _id del cuerpo de la solicitud
        console.log(_id);
        
        const producto = await Productos.findById(_id);  // Buscar el producto
        const usuario =await User.findOne({email:email});

        if (!producto && usuario) {
            return NextResponse.json({ message: 'No se encontró el producto' }, { status: 404 });
        }

        // Aquí debes definir cómo obtener las variables, por ejemplo:
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

        await carrito.save();  // Guardar el carrito en la base de datos
        return NextResponse.json({ message: 'Carrito agregado con éxito' }, { status: 200 });

    } catch (error) {
        console.error(error);  // Es útil para depurar el error
        return NextResponse.json({ message: 'Error al guardar carrito', error }, { status: 500 });
    }
}
