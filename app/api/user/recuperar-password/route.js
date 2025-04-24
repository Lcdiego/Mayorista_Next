// app/api/user/recuperar-password/route.js

import { Resend } from 'resend';
import { DB } from '@/lib/db';
import User from '@/models/Users';
import jwt from 'jsonwebtoken';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  await DB();
  const { email } = await req.json();

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const link = `${process.env.NEXT_PUBLIC_BASE_URL}/restablecer-password/${token}`;

    await resend.emails.send({
      from: '',
      to: email,
      subject: 'Restablece tu contraseña',
      html: `<p>Hacé clic en el siguiente enlace para restablecer tu contraseña:</p><p><a href="${link}">${link}</a></p>`
    });

    return new Response(JSON.stringify({ message: 'Correo enviado' }), { status: 200 });
  } catch (error) {
    console.error('Error enviando el correo:', error);
    return new Response(JSON.stringify({ error: 'Error interno' }), { status: 500 });
  }
}
