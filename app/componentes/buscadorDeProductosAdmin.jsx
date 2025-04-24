'use client'
import { useState, useEffect } from 'react';
import { useEcommerce } from '@/context/Contex';
import Card from './Card';

const BuscadorDeProductosAdmin = () => {
  const { productos } = useEcommerce();
  const [query, setQuery] = useState('');
  const [resultados, setResultados]= useState([])
  console.log({ query, productos });

   useEffect(() => {
      const filtrados = productos.filter((prod) =>
        prod.titulo.toLowerCase().includes(query.toLowerCase())
      );
      setResultados(filtrados);
    }, [query, productos]);
  return (
    <div className="p-4  ">
      <div className='max-w-xl mx-auto'>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      </div>
      
      
      {query && resultados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {resultados.map((prod) => (
            <div key={prod._id} >
              <Card {...prod} botonEditarAdmin={true} botonEliminarAdmin={true}/>
            </div>
          ))}
        </div>
      ) : (
        <p className='font-medium'>No se encontraron productos que coincidan con tu búsqueda.</p>
      )}
      </div>
   
  );
};

export default BuscadorDeProductosAdmin;
