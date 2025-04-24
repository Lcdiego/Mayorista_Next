import { Suspense } from 'react';
import PaginaBusqueda from '../../componentes/busqueda';

export default function BusquedaPage() {
  return (
    <Suspense fallback={<div>Cargando resultados de búsqueda...</div>}>
      <PaginaBusqueda />
    </Suspense>
  );
}
