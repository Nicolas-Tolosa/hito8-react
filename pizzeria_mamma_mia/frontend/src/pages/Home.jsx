// src/pages/Home.jsx (Refactorizado)

import Header from '../pages/components/Header'
import CardPizza from '../components/CardPizza'
// import { useEffect, useState } from 'react' // ELIMINADO
// import Pizza from './Pizza' // ELIMINADO
import { usePizzas } from '../context/PizzaContext' // <-- NUEVA IMPORTACIÓN

const Home = () => {

  // ELIMINADA toda la lógica de fetch y useState
  const { pizzas, loading, error } = usePizzas(); // <-- CONSUMIMOS EL CONTEXT

  // Manejo de estados de carga y error
  if (loading) return <p className="text-center mt-10 text-xl">Cargando nuestras deliciosas pizzas...</p>;
  if (error) return <p className="text-center mt-10 text-xl text-red-600">Error al cargar las pizzas: {error}</p>;

  return (
    <div>
      <Header></Header>
      <div className="grid grid-cols-1 grid-flow-row justify-items-center mx-auto md:mx-28 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 my-3 gap-3 mb-12" >
        {pizzas.map((pizza) => (
          <CardPizza key={pizza.id} pizza={pizza}></CardPizza>
        ))}
      </div>

      <div className="grid grid-cols-1 grid-flow-row justify-items-center mx-auto md:mx-28 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 my-3 gap-3 mb-12">
      </div>
    </div>
  )
}

export default Home