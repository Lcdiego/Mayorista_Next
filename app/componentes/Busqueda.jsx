"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useEcommerce } from '../../context/Contex'
import Card from './Card';

const PaginaBusqueda = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const { productos } = useEcommerce(); 
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const filtrados = productos.filter((prod) =>
      prod.titulo.toLowerCase().includes(query.toLowerCase())
    );
    setResultados(filtrados);
  }, [query, productos]);

  return (
    <div className="p-5 xl:mx-40">
      <h1 className="text-xl font-semibold mb-4">Resultados para: para: <strong>{query}</strong></h1>
      {resultados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {resultados.map((prod) => (
            <div key={prod._id} >
              <Card {...prod} botonCarrito={true} botonMP={true}/>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron productos que coincidan con tu búsqueda.</p>
      )}
    </div>
  );
};

export default PaginaBusqueda;
