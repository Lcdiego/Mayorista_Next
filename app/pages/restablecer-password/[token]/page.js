'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page({ params }) {
  const { token } = params;
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/user/restablecer-password', { token, newPassword: password });
      setMensaje(res.data.message);
      setTimeout(() => router.push('/login'), 3000);
    } catch (error) {
      console.error(error);
      setMensaje('Error al restablecer contraseña');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl mb-4 font-semibold">Nueva contraseña</h2>
        <input
          type="password"
          placeholder="Ingresá tu nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded mb-4"
          required
        />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
          Cambiar contraseña
        </button>
        {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
      </form>
    </div>
  );
}
