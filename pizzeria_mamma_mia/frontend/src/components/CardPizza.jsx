import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';

const CardPizza = ({ pizza }) => {
  const { addToCart } = useCart();

  const localImages = {
    "p001": "/napolitana.jpg",
    "p002": "/espanola.jpeg", // o /española.jpeg si decides mantener la ñ
    "p003": "/salame.jpeg",
    "p004": "/cuatro_estaciones.jpg",
    "p005": "/bacon.jpg",
    "p006": "/pollo_picante.jpg"
  };

  // Si el ID coincide, usa la local; si no, intenta usar la de la pizza por si acaso
  const imageSrc = localImages[pizza.id] || pizza.img;

  const handleAddToCart = () => {
    addToCart(pizza);
  };
  return (
    <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-950/20 flex flex-col group">
      
      {/* Contenedor de Imagen con Efecto Hover */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <Link to={`/pizza/${pizza.id}`}>
          <img 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
            src={`${import.meta.env.VITE_API_URL}${pizza.img}`}
            alt={pizza.name} 
          />
        </Link>
        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm text-orange-400 text-xs font-bold px-2.5 py-1 rounded-full border border-slate-800">
          🍕 Premium
        </div>
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <Link to={`/pizza/${pizza.id}`}>
            <h5 className="text-xl font-bold tracking-tight text-white mb-2 group-hover:text-orange-500 transition-colors uppercase">
              {pizza.name}
            </h5>
          </Link>
          
          {/* Ingredientes */}
          <p className="text-xs font-semibold tracking-wide text-orange-400/90 uppercase mb-2">
            Ingredientes:
          </p>
          <p className="text-sm text-slate-400 line-clamp-2 min-h-[40px] mb-3 leading-relaxed">
            {pizza.ingredients.join(', ')}
          </p>

          {/* Descripción Breve */}
          <p className="text-xs text-slate-500 line-clamp-3 mb-5 leading-relaxed">
            {pizza.desc}
          </p>
        </div>

        {/* Botones de Acción */}
        <div className="flex items-center space-x-3 pt-4 border-t border-slate-800 mt-auto">
          <Link 
            to={`/pizza/${pizza.id}`}
            className="flex-1 text-center text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 py-2.5 px-4 rounded-xl transition-colors border border-slate-700"
          >
            Ver más
          </Link>
          
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 text-xs font-bold text-white bg-orange-600 hover:bg-orange-500 py-2.5 px-2 rounded-xl transition-all shadow-lg shadow-orange-950/50 hover:scale-[1.02]"
          >
            Añadir: ${formatCurrency(pizza.price)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardPizza;
