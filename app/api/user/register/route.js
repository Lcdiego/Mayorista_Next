import { DB } from '../../../../lib/db';
import { NextResponse } from 'next/server';
import User from '../../../../models/Users';
import bcrypt from 'bcryptjs'; 

export async function POST(req) {
    await DB(); 
    try {
        const { nombre, email, password } = await req.json();

        if (!nombre || !email || !password) {
            return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 401 });
        }

        
        const user = await User.findOne({ email });
     

        if (user) {
            return NextResponse.json({ message: 'El usuario ya existe' }, { status: 401 });
        }

     
        const hashedPassword = await bcrypt.hash(password, 10);

   
        const newUser = new User({ nombre, email, password: hashedPassword, role: 'user' });
        await newUser.save();

        return NextResponse.json(
            { data: newUser, message: "Usuario creado exitosamente" },
            { status: 201 }
        );
    } catch (error) {
        console.error(error); 

        
        return NextResponse.json({ message: 'Ocurrió un error al procesar la solicitud' }, { status: 500 });
    }
}
