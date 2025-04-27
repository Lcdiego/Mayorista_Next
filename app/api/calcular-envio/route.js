export async function POST(req) {
  try {
    const { origenZip, destinoZip, peso, dimensiones } = await req.json();

    if (!origenZip || !destinoZip || !peso || !dimensiones) {
      return NextResponse.json({ error: "Faltan datos para calcular el envío" }, { status: 400 });
    }

    const accessToken = await getValidAccessToken(); // ¡Esto debe traer el token real!
    const userId = process.env.ML_CLIENT_ID; // Aquí debes poner tu ID de vendedor de Mercado Libre.

    const res = await fetch(`https://api.mercadolibre.com/users/${userId}/shipping_options`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        zip_code: destinoZip,
        dimensions: {
          height: dimensiones.height,
          width: dimensiones.width,
          length: dimensiones.length,
          weight: peso
        }
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Error en respuesta de cálculo de envío:", data);
      return NextResponse.json({ error: data.message }, { status: res.status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Error general en /api/calcular-envio:", error);
    return NextResponse.json({ error: "Error al calcular envío" }, { status: 500 });
  }
}
