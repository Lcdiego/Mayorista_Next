import { DB } from "../../../../lib/db";
import cloudinary from "../../../../lib/cloudinary";
import { NextResponse } from "next/server";
import Productos from "../../../../models/Banner";

export async function POST(req) {
    try {
        const { titulo, imagen } = await req.json();




        await DB();


        if (!titulo || !imagen) {
            return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
        }


        const uploadResponse = await cloudinary.uploader.upload(imagen, { folder: "imagen" });
        const imagePath = uploadResponse.secure_url;
        const imagenPublicId = uploadResponse.public_id






        const productos = new Productos({

            titulo,
            imagen: imagePath,
            imagenPublicId,

        });

        await productos.save();


        return NextResponse.json({ message: "imagen agregado con éxito" }, { status: 201 });

    } catch (error) {
        console.error("Error al agregar imagen:", error);
        return NextResponse.json({ message: "Error interno del servidor" }, { status: 500 });
    }
}
