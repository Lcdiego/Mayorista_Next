
import mongoose from "mongoose";

const db = process.env.URI;


export const DB = async () => {
    try {
        if (!db) {
            throw new Error("La URI de la base de datos no está definida en process.env");
        }

        const coneccion = await mongoose.connect(db);
        console.log("Conectado a la base de datos");

    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
};
