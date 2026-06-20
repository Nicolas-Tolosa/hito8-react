import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { useUser } from '../context/UserContext';

const API_URL = 'http://localhost:5000/api';

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, calculateTotal, clearCart } = useCart();
  const { isAuthenticated, getAuthHeader } = useUser();
  const total = calculateTotal();

  const [checkoutMessage, setCheckoutMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    setCheckoutMessage(null);

    try {
      const response = await fetch(`${API_URL}/checkouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify({ cart: cart }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al procesar la compra.');

      setCheckoutMessage('¡Compra realizada con éxito! Recibirás un email de confirmación.');
      clearCart();
    } catch (err) {
      setCheckoutMessage(`Error en la compra: ${err.message}.`);
      console.error("Checkout fallido:", err);
    } finaly {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 min-h-[calc(100vh-68px)] text-white py-12 px-4">
      <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        
        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-wide text-white mb-6 border-b border-slate-800 pb-4">
          Tu <span className="text-orange-500">Carrito</span>
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-base text-slate-400 font-medium">El carrito está vacío.</p>
            <p className="text-xs text-slate-500 mt-1">¡Ve al menú principal y añade algunas deliciosas pizzas!</p>
          </div>
        ) : (
          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-2xl gap-4"
              >
                {/* Info Izquierda */}
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <img 
                    className="w-16 h-12 object-cover rounded-xl border border-slate-800 shadow-lg" 
                    src={item.img} 
                    alt={item.name} 
                  />
                  <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-wide">{item.name}</h2>
                    <p className="text-xs text-orange-400 font-semibold mt-0.5">${formatCurrency(item.price)} c/u</p>
                  </div>
                </div>

                {/* Controles Derecha */}
                <div className="flex items-center justify-between sm:justify-end space-x-4 w-full sm:w-auto border-t sm:border-t-0 border-slate-900 pt-3 sm:pt-0">
                  <div className="text-xs text-slate-400 sm:hidden">Cantidad:</div>
                  <div className="flex items-center space-x-2.5">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity === 0}
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all cursor-pointer ${
                        item.quantity === 0 ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700 text-rose-400'
                      }`}
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-black text-white bg-slate-900 border border-slate-800 py-1 rounded-lg">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => increaseQuantity(item.id)} 
                      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-slate-800 hover:bg-slate-700 text-emerald-400 cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mensajes del Checkout */}
        {checkoutMessage && (
          <div className={`p-4 rounded-xl text-center text-sm font-semibold mb-6 border ${
            checkoutMessage.startsWith('¡Compra') 
              ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-400' 
              : 'bg-rose-950/40 border-rose-800/60 text-rose-400'
          }`}>
            {checkoutMessage}
          </div>
        )}

        {/* Footer del Carrito */}
        <div className="pt-6 border-t border-slate-800 flex flex-col items-center">
          <div className="flex justify-between items-center w-full max-w-sm mb-4">
            <span className="text-slate-400 text-sm uppercase font-bold tracking-wider">Total a pagar:</span>
            <span className="text-2xl font-black text-orange-400 tracking-tight">${formatCurrency(total)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className={`w-full max-w-sm py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all cursor-pointer ${
              cart.length === 0 || !isAuthenticated || loading
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-950/50 hover:scale-[1.01]'
            }`}
            disabled={cart.length === 0 || !isAuthenticated || loading}
          >
            {loading ? 'Procesando pedido...' : 'Confirmar y Pagar'}
          </button>

          {cart.length > 0 && !isAuthenticated && (
            <div className="mt-4 bg-rose-950/20 border border-rose-900/40 px-4 py-2 rounded-xl">
              <p className="text-rose-400 text-xs text-center font-medium">
                Debes iniciar sesión para proceder al pago de tu pedido.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Cart;
