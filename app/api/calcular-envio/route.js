import { NextResponse } from "next/server";
import { getValidAccessToken } from "@/lib/mercadolibre";  // Importa la función getValidAccessToken

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const codigoPostal = searchParams.get("codigoPostal");

    console.log("🧾 Código postal recibido:", codigoPostal);

    if (!codigoPostal) {
        return NextResponse.json({ error: "Código postal es requerido" }, { status: 400 });
    }

    try {
        const accessToken = await getValidAccessToken();  // Obtiene un token válido
        console.log("🔑 Access token obtenido:", accessToken);

        const params = {
            origen: { zip: "1903" },
            destino: { zip: codigoPostal },
            envio: { volumen: 1, peso: 0.5 },
        };

        console.log("📦 Parámetros para calcular envío:", params);

        const response = await fetch("https://api.mercadolibre.com/mercadoenvios/v1/items/price", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        const data = await response.json();

        console.log("📨 Respuesta de Mercado Envíos:", data);

        if (data.error) {
            return NextResponse.json({ error: data.error }, { status: 400 });
        }

        const costoEnvio = data.costo_envio;
        return NextResponse.json({ costoEnvio }, { status: 200 });

    } catch (error) {
        console.error("❌ Error en /api/calcular-envio:", error);
        return NextResponse.json({ error: "Hubo un error al calcular el costo de envío" }, { status: 500 });
    }
}
