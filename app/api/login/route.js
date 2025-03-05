import { DB } from "@/lib/db";
import User from "@/models/Users";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'


export async function POST(req) {
    await DB()

    try {
        const { email, password } = await req.json();



        if (!email || !password) {
            return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 })
        };
       
        const user = await User.findOne({ email })
        console.log(user);
        const Math = await bcrypt.compare(password,user.password)
       
        if (!Math) {
            return NextResponse.json({ message: "Usuario o contraseña incorrectos" }, { status: 401 })
        }
       
          
        return NextResponse.json({ user }, { status:200})

    } catch (error) {
        return NextResponse.json({ error, status: 400 })
    }
}