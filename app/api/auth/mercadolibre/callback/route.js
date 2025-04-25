// app/api/auth/mercadolibre/callback/route.js

import { DB } from "@/lib/db";
import MercadoLibreToken from "@/models/MercadoLibreToken";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (!code) {
      return Response.json({ error: "Falta el parámetro 'code'" }, { status: 400 });
    }

    // Conexión a la base de datos
    await DB();

    // Solicitud del token a Mercado Libre
    const res = await fetch("https://api.mercadolibre.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.ML_CLIENT_ID,
        client_secret: process.env.ML_CLIENT_SECRET,
        code,
        redirect_uri: "https://mundoshop.com.ar/api/auth/mercadolibre/callback", // URI real registrada en ML
      }),
    });

    const data = await res.json();

    if (data.error) {
      return Response.json({ error: data.error_description || "Error al obtener el token" }, { status: 500 });
    }

    const { access_token, refresh_token, expires_in, user_id } = data;
    const expires_at = new Date(Date.now() + expires_in * 1000);

    // Guardar los tokens en MongoDB
    const newToken = new MercadoLibreToken({
      access_token,
      refresh_token,
      expires_at,
      user_id,
    });

    await newToken.save();

    return Response.json({
      message: "✅ Tokens guardados correctamente.",
      access_token,
      refresh_token,
      expires_in,
    });
  } catch (error) {
    console.error("Error en el callback:", error);
    return Response.json({ error: "Error inesperado" }, { status: 500 });
  }
}
