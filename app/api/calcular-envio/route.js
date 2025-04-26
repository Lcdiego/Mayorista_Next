import { NextResponse } from "next/server";
import { getValidAccessToken } from "@/lib/mercadolibre";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("itemId");
    const codigoPostal = searchParams.get("codigoPostal");

    if (!itemId || !codigoPostal) {
      return NextResponse.json(
        { error: "Item ID y código postal son requeridos" },
        { status: 400 }
      );
    }

    const accessToken = await getValidAccessToken();

    const url = `https://api.mercadolibre.com/items/${itemId}/shipping_options?zip_code=${codigoPostal}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
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
