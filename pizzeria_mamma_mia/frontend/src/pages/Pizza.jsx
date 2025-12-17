// frontend/src/pages/Pizza.jsx (Componente de Detalle)

import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'
import { usePizzas } from '../context/PizzaContext' // Usar el Context de Pizzas

const PizzaDetail = () => {
    // 1. Obtener el ID de la URL
    const { id } = useParams();

    // 2. Consumir el Context de Pizzas para acceder a todas las pizzas cargadas
    const { pizzas, loading, error } = usePizzas();

    // Estado local para la pizza seleccionada
    const [pizza, setPizza] = useState(null);

    // 3. Lógica para buscar la pizza cuando cambien el ID o las pizzas cargadas
    useEffect(() => {
        // Buscamos la pizza solo si las pizzas ya cargaron y tenemos un ID
        if (pizzas.length > 0 && id) {
            // Buscamos la pizza usando el ID (asegúrate de que el ID es un string)
            const foundPizza = pizzas.find(p => p.id === id);
            setPizza(foundPizza);
        }
    }, [pizzas, id]); // Se re-ejecuta si el ID de la URL o la lista de pizzas cambia

    if (loading) return <p className="text-center mt-10 text-xl">Cargando detalles de pizza...</p>;
    if (error) return <p className="text-center mt-10 text-xl text-red-600">Error al cargar datos: {error}</p>;
    if (!pizza) return <p className="text-center mt-10">Pizza no encontrada.</p>;

    return (
        <div className="flex justify-center my-10">
            <div className="max-w-3xl bg-white border border-gray-100 rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">

                {/* Imagen */}
                <div className="md:w-1/2">
                    <img className="rounded-t-lg w-full h-auto object-cover" src={pizza.img} alt={pizza.name} />
                </div>

                {/* Detalles */}
                <div className="md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-900">{pizza.name}</h1>
                        <p className="mt-2 text-xl font-semibold text-gray-800">${formatCurrency(pizza.price)}</p>
                        <p className="mt-4 text-gray-700 italic">{pizza.desc}</p>

                        <h3 className="mt-6 text-lg font-bold">Ingredientes:</h3>
                        <p className="text-gray-600">{pizza.ingredients?.join(', ')}</p>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <Link to="/" className="text-white bg-slate-900 hover:bg-slate-700 font-bold rounded-full text-sm px-5 py-2.5 text-center transition-colors">
                            Volver al Catálogo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PizzaDetail;