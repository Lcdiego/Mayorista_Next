import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  imagen: { type: String, default: null },
  imagenPublicId:{ type: String, default: null },
});

export default mongoose.models.Banner || mongoose.model("Banner", bannerSchema);
