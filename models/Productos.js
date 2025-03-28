import mongoose from "mongoose";

const ProductosSchema = new mongoose.Schema({
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
const Productos = mongoose.models.Productos || mongoose.model("Productos", ProductosSchema);


export default Productos;