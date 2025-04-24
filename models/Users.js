import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  nombre: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },

  // 📦 Campos para Mercado Envíos:
  address: {
    street_name: { type: String, default: '' },
    street_number: { type: Number, default: 0 },
    zip_code: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
  },
});

const User = mongoose.models.user || mongoose.model('user', UserSchema);
export default User;


