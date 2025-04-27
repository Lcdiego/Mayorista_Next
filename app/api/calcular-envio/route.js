export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const codigoPostal = searchParams.get("codigoPostal");
    const productoEnvio = JSON.parse(searchParams.get("producto"));

    if (!codigoPostal || !productoEnvio) {
      return NextResponse.json(
        { error: "Código postal y producto son requeridos" },
        { status: 400 }
      );
    }

    const { codigo_postal, peso, dimensiones } = productoEnvio;

    // Llamada a la API de Mercado Envíos usando los datos de peso, dimensiones y códigos postales
    const url = `https://api.mercadolibre.com/sites/MLA/shipping_modes?zip_code=${codigoPostal}&origin_zip_code=${codigo_postal}&weight=${peso}&dimensions=${dimensiones.length},${dimensiones.width},${dimensiones.height}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Error en consulta de opciones de envío:", data);
      return NextResponse.json(
        { error: data.message || "Error al obtener opciones de envío" },
        { status: res.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("❌ Error general en /api/calcular-envio:", error);
    return NextResponse.json(
      { error: "Hubo un problema al calcular el costo de envío" },
      { status: 500 }
    );
  }
}
