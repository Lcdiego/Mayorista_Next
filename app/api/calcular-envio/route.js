import { NextResponse } from "next/server";

// Función para calcular el costo de envío usando Mercado Envíos API
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const codigoPostal = searchParams.get("codigoPostal");
    console.log(codigoPostal);
    
    if (!codigoPostal) {
        return NextResponse.json({ error: "Código postal es requerido" }, { status: 400 });
    }

    try {
        // Parámetros del producto, como el código postal de origen y el destino
        const params = {
            origen: { zip: "1903" }, // Código postal de tu tienda (puedes actualizar esto)
            destino: { zip: codigoPostal },
            envio: { volumen: 1, peso: 0.5 }, // Peso y volumen del producto
        };

        // Llamada a la API de Mercado Envíos
        const response = await fetch("https://api.mercadolibre.com/mercadoenvios/v1/items/price", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        });

        const data = await response.json();

        if (data.error) {
            return NextResponse.json({ error: data.error }, { status: 400 });
        }

        // Suponiendo que la respuesta tiene un campo "cost" con el costo de envío
        const costoEnvio = data.costo_envio;

        return NextResponse.json({ costoEnvio }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Hubo un error al calcular el costo de envío" }, { status: 500 });
    }
}
