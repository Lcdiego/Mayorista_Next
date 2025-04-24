import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { DB } from '@/lib/db';
import Usuario from '@/models/Users';

export async function POST(req) {
  await DB();
  const { token, newPassword } = await req.json();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Usuario.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({ message: 'Contraseña actualizada con éxito' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 400 });
  }
}
