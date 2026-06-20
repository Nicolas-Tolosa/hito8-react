import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'
import { usePizzas } from '../context/PizzaContext'

const PizzaDetail = () => {
    const { id } = useParams();
    const { pizzas, loading, error } = usePizzas();
    const [pizza, setPizza] = useState(null);

    // Diccionario para enlazar cada ID de pizza con su ruta local en /public
    const localImages = {
        "p001": "/napolitana.jpg",
        "p002": "/espanola.jpeg",
        "p003": "/salame.jpeg",
        "p004": "/cuatro_estaciones.jpg",
        "p005": "/bacon.jpg",
        "p006": "/pollo_picante.jpg"
    };

    useEffect(() => {
        if (pizzas.length > 0 && id) {
            const foundPizza = pizzas.find(p => p.id === id);
            setPizza(foundPizza);
        }
    }, [pizzas, id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex justify-center items-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }
    
    if (error) return <p className="text-center pt-20 text-xl text-rose-500 bg-slate-950 min-h-screen">Error al cargar datos: {error}</p>;
    if (!pizza) return <p className="text-center pt-20 text-slate-400 bg-slate-950 min-h-screen">Pizza no encontrada.</p>;

    // Obtenemos la imagen mapeada local o usamos la de la API si no existiera en el objeto
    const imageSrc = localImages[pizza.id] || pizza.img;

    return (
        <div className="bg-slate-950 min-h-screen flex items-center justify-center py-12 px-4">
            <div className="max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row gap-6 md:gap-8 p-6 md:p-8">

                {/* Imagen */}
                <div className="w-full md:w-1/2 aspect-video md:aspect-square rounded-2xl overflow-hidden bg-slate-950 shadow-inner">
                    <img className="w-full h-full object-cover" src={imageSrc} alt={pizza.name} />
                </div>

                {/* Detalles */}
                <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6">
                    <div>
                        <span className="text-xs font-bold text-orange-500 tracking-widest uppercase">Especialidad de la Casa</span>
                        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mt-1">{pizza.name}</h1>
                        <p className="mt-3 text-2xl font-black text-orange-400">${formatCurrency(pizza.price)}</p>
                        
                        <p className="mt-4 text-sm text-slate-400 leading-relaxed font-light">{pizza.desc}</p>

                        <div className="mt-6">
                            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Ingredientes Seleccionados:</h3>
                            <p className="text-sm text-slate-300 bg-slate-950/60 border border-slate-800/80 px-4 py-3 rounded-xl leading-relaxed">
                                {pizza.ingredients?.join(', ')}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-slate-800/60">
                        <Link to="/" className="w-full sm:w-auto text-center text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-6 py-3 rounded-xl transition-all">
                            Volver al Catálogo
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PizzaDetail;
