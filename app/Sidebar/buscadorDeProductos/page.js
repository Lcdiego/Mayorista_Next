import BuscadorDeProductos from '../../componentes/buscadorDeProductosAdmin'

export default function Home() {
  return (
    <main className="min-h-screen w-full p-6 bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-center mt-20">Buscador de Productos</h1>
      <BuscadorDeProductos />
    </main>
  )
}
