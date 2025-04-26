import MercadoLibreToken from "../models/MercadoLibreToken";
import { DB } from "./db";

// Función para obtener el `access_token` y `refresh_token` a partir del `code`
export async function getAccessToken(code) {
  const clientId = process.env.ML_CLIENT_ID;
  const clientSecret = process.env.ML_CLIENT_SECRET;
  const redirectUri = process.env.ML_REDIRECT_URI;
await DB()
  const url = `https://api.mercadolibre.com/oauth/token`;
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    code: code,
    redirect_uri: redirectUri,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const data = await response.json();
    console.log("📩 Respuesta de Mercado Libre:", data);
    if (response.ok) {
      const { access_token, refresh_token, expires_in, user_id } = data;
      
      // Calculamos la fecha de expiración
      const expires_at = new Date(Date.now() + expires_in * 1000); // Convertimos de segundos a milisegundos

      // Guardamos el token y sus detalles en MongoDB
      const newTokenData = new MercadoLibreToken({
        access_token,
        refresh_token,
        expires_at,
        user_id,
      });

      await newTokenData.save();  // Guardamos el nuevo token en MongoDB
      console.log("✅ Token guardado exitosamente en MongoDB");
      return { access_token, refresh_token, expires_at, user_id };
    } else {
      throw new Error(`Error al obtener el token: ${data.error}`);
    }
  } catch (error) {
    console.error("Error al obtener el token de Mercado Libre:", error);
    throw new Error("Error al obtener el token de Mercado Libre");
  }
}

// Función para obtener un nuevo access_token usando el refresh_token
export async function refreshAccessToken(refresh_token) {
  const clientId = process.env.ML_CLIENT_ID;
  const clientSecret = process.env.ML_CLIENT_SECRET;

  const url = `https://api.mercadolibre.com/oauth/token`;
  const body = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refresh_token,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });

    const data = await response.json();
    console.log("📩 Respuesta de Mercado Libre:", data);
    if (response.ok) {
      const { access_token, expires_in } = data;
      const expires_at = new Date(Date.now() + expires_in * 1000); // Calculamos la nueva fecha de expiración

      // Actualizamos el token en la base de datos
      await MercadoLibreToken.updateOne(
        { refresh_token },
        { access_token, expires_at }
      );

      return { access_token, expires_at };
    } else {
      console.error("Error al refrescar el token:", data);
      throw new Error(`Error al refrescar el token: ${data.error_description || data.error}`);
    }
  } catch (error) {
    console.error("Error al refrescar el token de Mercado Libre:", error);
    throw new Error("Error al refrescar el token de Mercado Libre");
  }
}

// Función para obtener un access_token válido
export async function getValidAccessToken() {
  const tokenData = await MercadoLibreToken.findOne(); // Recupera el token de la base de datos

  if (!tokenData) {
    throw new Error("No hay token guardado");
  }

  const now = new Date();
  const expiresAt = new Date(tokenData.expires_at);

  // Si el token está por expirar o ya expiró, refrescamos el token
  if (expiresAt <= now) {
    console.log("El token ha expirado, refrescando...");
    const refreshedTokenData = await refreshAccessToken(tokenData.refresh_token); // Refresca el token
    return refreshedTokenData.access_token;
  }

  return tokenData.access_token; // Si el token aún es válido, lo usamos
}
