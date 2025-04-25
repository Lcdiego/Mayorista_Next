import mercadopago from 'mercadopago';
import Productos from '@/models/Productos'; // Importa el modelo de Productos

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const { items, shipment_address } = await req.json();

    // Verificación de productos
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'No hay productos para procesar' }), { status: 400 });
    }

    // Obtener productos de la base de datos y mapearlos
    const mpItems = [];
    let totalPeso = 0;
    let totalAlto = 0;
    let totalAncho = 0;
    let totalLargo = 0;

    // Mapeo de productos con datos de la base de datos
    for (const item of items) {
      const producto = await Productos.findById(item.id); // Encuentra el producto por su ID en la base de datos

      if (!producto) {
        return new Response(JSON.stringify({ error: `Producto con ID ${item.id} no encontrado` }), { status: 400 });
      }

      // Añadir el producto a la preferencia de Mercado Pago
      mpItems.push({
        title: producto.titulo,
        quantity: parseInt(item.quantity),
        unit_price: parseFloat(producto.precio),
        currency_id: 'ARS',
      });

      // Sumar peso y dimensiones para el cálculo de envío
      totalPeso += producto.peso * item.quantity;  // Sumar el peso total en gramos
      totalAlto += producto.alto * item.quantity;  // Sumar altura total
      totalAncho += producto.ancho * item.quantity;  // Sumar ancho total
      totalLargo += producto.largo * item.quantity;  // Sumar largo total
    }

    // Datos para Mercado Envíos (ME2)
    const shipment = {
      zip_code: shipment_address.zip_code, // Código postal del cliente
      dimensions: {
        length: totalLargo, // Longitud total en cm
        width: totalAncho,  // Ancho total en cm
        height: totalAlto,  // Altura total en cm
        weight: totalPeso,  // Peso total en gramos
      },
    };

    // Solicitar cotización de envío con ME2
    const shippingCostResponse = await fetch('https://api.mercadolibre.com/ships/shipments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(shipment),
    });

    const shippingCostData = await shippingCostResponse.json();

    if (!shippingCostData) {
      return new Response(JSON.stringify({ error: 'Error al obtener cotización de envío' }), { status: 500 });
    }

    // Agregar la cotización de envío a la preferencia de Mercado Pago
    const preference = {
      items: mpItems,
      back_urls: {
        success: 'https://mundoshop.com.ar/success',
        failure: 'https://mundoshop.com.ar/failure',
        pending: 'https://mundoshop.com.ar/pending',
      },
      auto_return: 'approved',
      shipments: {
        cost: shippingCostData.cost,  // Costo de envío de la respuesta de Mercado Envíos
        mode: 'me2',  // Indicando que se usará Mercado Envíos 2
        destination: {
          zip_code: shipment_address.zip_code, // Código postal destino para el envío
        },
      },
    };

    // Crear la preferencia en Mercado Pago
    const response = await mercadopago.preferences.create(preference);

    return new Response(JSON.stringify({ init_point: response.body.init_point }), {
      status: 200,
    });

  } catch (error) {
    console.error('💥 Error en el backend:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
}
