// models/MercadoLibreToken.js

import mongoose from "mongoose";

const mercadoLibreTokenSchema = new mongoose.Schema({
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  expires_at: { type: Date, required: true },
  user_id: { type: String, required: true },
});

const MercadoLibreToken = mongoose.models.MercadoLibreToken || mongoose.model("MercadoLibreToken", mercadoLibreTokenSchema);

export default MercadoLibreToken;
