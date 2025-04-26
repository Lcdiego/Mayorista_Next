// app/api/auth/mercadolibre/callback/route.js

import { DB } from "@/lib/db";
import MercadoLibreToken from "@/models/MercadoLibreToken";
import { redirect } from "next/navigation"; // 👈 IMPORTANTE

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    console.log("🚨 Código recibido:", code); 
    if (!code) {
      return Response.json({ error: "Falta el parámetro 'code'" }, { status: 400 });
    }

    await DB(); // conectar a MongoDB

    const res = await fetch("https://api.mercadolibre.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.ML_CLIENT_ID,
        client_secret: process.env.ML_CLIENT_SECRET,
        code,
        redirect_uri: "https://mundoshop.com.ar/api/auth/mercadolibre/callback",
      }),
    });

    const data = await res.json();
    console.log("📨 Respuesta de Mercado Libre:", data);

    if (data.error) {
      return Response.json({ error: data.error_description || "Error al obtener el token" }, { status: 500 });
    }

    const { access_token, refresh_token, expires_in, user_id } = data;
    const expires_at = new Date(Date.now() + expires_in * 1000);    

    let existingToken = null;
    try {
      existingToken = await MercadoLibreToken.findOne({ user_id });
    } catch (findError) {
      console.error("Error buscando token en MongoDB:", findError);
    }

    if (existingToken) {
      // Actualizar token existente
      existingToken.access_token = access_token;
      existingToken.refresh_token = refresh_token;
      existingToken.expires_at = expires_at;
      await existingToken.save();
      console.log("✅ Token actualizado exitosamente en MongoDB");
    } else {
      // Crear nuevo token
      try {
        const newToken = new MercadoLibreToken({
          access_token,
          refresh_token,
          expires_at,
          user_id,
        });
        await newToken.save();
        console.log("✅ Token guardado exitosamente en MongoDB");
      } catch (saveError) {
        console.error("Error guardando nuevo token en MongoDB:", saveError);
        return Response.json({ error: "Error guardando el token en la base de datos" }, { status: 500 });
      }
    }

    // 🔥 Redirigir al home (o a donde quieras)
    redirect("/");

  } catch (error) {
    console.error("Error en el callback:", error);
    return Response.json({ error: "Error inesperado en el servidor" }, { status: 500 });
  }
}
