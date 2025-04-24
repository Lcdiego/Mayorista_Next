import mercadopago from 'mercadopago';

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});


export async function POST(req) {
  try {
    const { items } = await req.json();
  

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'No hay productos para procesar' }), { status: 400 });
    }

    const mpItems = items.map((item) => ({
      title: `producto:${item.title} + envio`,
      quantity: parseInt(item.quantity),
      unit_price: parseFloat(item.price),
      currency_id: 'ARS',
    }));
    
    

   

    const preference = {
      items: mpItems,
      back_urls: {
        success: 'https://cualquiercosa.ngrok.io/success',
        failure: 'https://cualquiercosa.ngrok.io/failure',
        pending: 'https://cualquiercosa.ngrok.io/pending',
      },
      
      auto_return: 'approved',
    
      
    };
    

    const response = await mercadopago.preferences.create(preference);

    return new Response(JSON.stringify({ init_point: response.body.init_point }), {
      status: 200,
    });

  } catch (error) {
    console.error('💥 Error en el backend:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
}
