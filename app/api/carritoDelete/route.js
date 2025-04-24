import Carrito from "@/models/Carrito";
import { DB } from "@/lib/db";
import { NextResponse } from "next/server";

// Conexión a la base de datos
await DB();

export async function DELETE(req) {
    try {
        const { _id } = await req.json();


       
        const producto = await Carrito.findByIdAndDelete(_id);

        if (!producto) {
            return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Producto eliminado', producto }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: 'Error al eliminar producto', error: error.message }, { status: 500 });
    }
}
