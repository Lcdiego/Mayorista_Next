import mongoose from "mongoose";

const CarritoSchema = new mongoose.Schema({
    usuario:{ type: String, required: true },
    Seccion: { type: String, required: true },
    Categoria: { type: String, required: true },
    titulo: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    descripcion: { type: String, required: true },
    imagen: { type: String, default: null },
    galeria: { type: [String], default: [] },
    imagenPublicId:{ type: String, default: null },
    galeriaPublicId: { type: [String], default: [] },
})
const Carrito = mongoose.models.carrito || mongoose.model("carrito", CarritoSchema);


export default Carrito;