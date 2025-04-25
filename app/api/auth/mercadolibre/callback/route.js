// app/api/auth/mercadolibre/callback/route.js

export async function GET(req) {
    try {
      const { searchParams } = new URL(req.url);
      const code = searchParams.get("code");
  
      if (!code) {
        return Response.json({ error: "Falta el parámetro 'code'" }, { status: 400 });
      }
  
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
          redirect_uri: "https://TUDOMINIO.COM/api/auth/mercadolibre/callback", // Cambiá esto por tu dominio real
        }),
      });
  
      const data = await res.json();
  
      if (data.error) {
        return Response.json({ error: data.error_description || "Error al obtener el token" }, { status: 500 });
      }
  
      console.log("🔐 ACCESS TOKEN:", data.access_token);
      console.log("🔁 REFRESH TOKEN:", data.refresh_token);
      console.log("⏳ EXPIRA EN:", data.expires_in, "segundos");
  
      return Response.json({
        message: "✅ Tokens obtenidos correctamente.",
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
      });
    } catch (error) {
      console.error("Error en el callback:", error);
      return Response.json({ error: "Error inesperado" }, { status: 500 });
    }
  }
  