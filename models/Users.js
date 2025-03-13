import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    nombre: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },

})
const User = mongoose.models.user || mongoose.model('user', UserSchema);
export default User

