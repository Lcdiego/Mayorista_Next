import { DB } from "../../../../lib/db";
import Productos from "../../../../models/Productos";
import { NextResponse } from "next/server";
export async function GET() {
    try {

        await DB()
        const productos = await Productos.find()
        return NextResponse.json(productos, { status: 200 })

    } catch (error) {
        console.log('Error al cargar productos', error)
        return NextResponse.json({ error, status: 500 })
    }

}