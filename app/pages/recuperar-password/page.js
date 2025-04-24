'use client';

import { useState } from 'react';
import axios from 'axios';

export default function RecuperarPasswordPage() {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/user/recuperar-password', { email });
      setMensaje(res.data.message);
    } catch (error) {
      console.error(error);
      setMensaje('Error al enviar el email');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl mb-4 font-semibold">Recuperar contraseña</h2>
        <input
          type="email"
          placeholder="Tu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
          required
        />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Enviar link
        </button>
        {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
      </form>
    </div>
  );
}
