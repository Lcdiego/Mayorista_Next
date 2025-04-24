import { DB } from "../../../../lib/db";
import User from "../../../../models/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'


export async function POST(req) {
    await DB()

    try {
        const { email, password } = await req.json();



        if (!email || !password) {
            return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 })
        };
       
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "Usuario incorrecto o no registrado" }, { status: 401 })
        }
        const isMath = await bcrypt.compare(password,user.password)
       
        if (!isMath) {
            return NextResponse.json({ message: " Contraseña incorrecta " }, { status: 401 })
        }
       const token= jwt.sign({_id:user._id, email:user.email, role:user.role},process.env.JWT_SECRET,
        { expiresIn: '7d' })
          
        return NextResponse.json({ user, token }, { status:200},
            
        )

    } catch (error) {
        return NextResponse.json({ message: error.message || "Error en el servidor" }, { status: 400 });

    }
}