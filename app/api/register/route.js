import { DB } from '../../../lib/db';
import { NextResponse } from 'next/server';
import User from '../../../models/Users';
import bcrypt from 'bcryptjs'; 

export async function POST(req) {
    await DB(); 
    try {
        const { nombre, email, password } = await req.json();

        if (!nombre || !email || !password) {
            return NextResponse.json({ message: "Todos los campos son obligatorios" }, { status: 400 });
        }

        // Verificar si el usuario ya existe
        const user = await User.findOne({ email });
        console.log('este es el back', user);

        if (user) {
            return NextResponse.json({ message: 'El usuario ya existe' }, { status: 400 });
        }

        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = new User({ nombre, email, password: hashedPassword, role: 'user' });
        await newUser.save();

        return NextResponse.json(
            { data: newUser, message: "Usuario creado exitosamente" },
            { status: 201 }
        );
    } catch (error) {
        console.error(error); // Mostrar el error en la consola

        // Devolver un mensaje adecuado en caso de error
        return NextResponse.json({ message: 'Ocurrió un error al procesar la solicitud' }, { status: 500 });
    }
}
