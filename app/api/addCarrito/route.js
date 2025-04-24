import { DB } from "@/lib/db";
import Productos from "@/models/Productos";
import Carrito from "@/models/Carrito";
import User from "@/models/Users";
import { NextResponse } from "next/server";

export async function POST(req) {
    await DB();
    try {
        const { _id, idUsuario, cantidad = 1 } = await req.json();



        const producto = await Productos.findById(_id);
        const usuario = await User.findById(idUsuario);

        if (!producto && !usuario) {
            return NextResponse.json({ message: 'No se encontró el producto' }, { status: 404 });
        }
        const productoEnCarrito = await Carrito.findOne({ usuario: usuario._id, titulo: producto.titulo });

        if (productoEnCarrito) {

            productoEnCarrito.cantidad = cantidad;
            await productoEnCarrito.save();

            return NextResponse.json({ message: 'Cantidad actualizada en el carrito', productoEnCarrito }, { status: 200 });
        }

        const { Seccion, Categoria, titulo, precio, stock, peso, alto, ancho, largo, descripcion, imagen, galeria, imagenPublicId, galeriaPublicId } = producto;

        const carrito = new Carrito({
            usuario: usuario._id,
            idProducto: _id,
            cantidad,
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
