// frontend/src/pages/Cart.jsx

import React, { useState } from 'react'; // <-- Importar useState
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { useUser } from '../context/UserContext';

const API_URL = 'http://localhost:5000/api'; // Definir URL

const Cart = () => {
  // Consumir Contextos 
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    calculateTotal,
    clearCart
  } = useCart();

  // Consumir User Context para token y headers
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
          ...getAuthHeader(), // Añadir el encabezado Authorization: Bearer
        },
        body: JSON.stringify({
          cart: cart, // Enviar el carrito
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al procesar la compra.');
      }

      setCheckoutMessage('¡Compra realizada con éxito! Recibirás un email de confirmación.');
      clearCart();

    } catch (err) {
      setCheckoutMessage(`Error en la compra: ${err.message}. Asegúrate de que el token JWT es válido.`);
      console.error("Checkout fallido:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-content-center">
      <h1 className="flex justify-center my-10 font-bold text-2xl md:text-4xl lg:text-4xl xl:text-4xl 2xl:text-4xl ">Carrito de Compras:</h1>

      {cart.length === 0 ? (
        <p className="text-lg text-center font-semibold text-gray-500">El carrito está vacío. ¡Añade algunas pizzas!</p>
      ) : (
        // Mapeo del carrito
        <>
          {cart.map((item) => (
            <div className="grid grid-cols-12 my-3 gap-3 text-xs md:text-base lg:text-base xl:text-base 2xl:text-base" key={item.id}>
              <img className="col-start-2 col-span-3 h-10 rounded-sm shadow-md shadow-slate-800 grid justify-center items-center" src={item.img} alt={item.name}></img>
              <h2 className="col-start-5 col-span-2 font-bold grid items-center">{item.name}</h2>
              <p className="col-start-7 col-span-1 grid justify-center items-center">${formatCurrency(item.price)}</p>
              <button
                onClick={() => decreaseQuantity(item.id)}
                disabled={item.quantity === 0}
                className={`col-start-9 col-span-1 min-w-full rounded-full font-bold text-white grid justify-center items-center ${item.quantity === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-700'}`}
              >
                -
              </button>
              <p className="col-start-10 col-span-1 grid justify-center items-center font-bold bg-gray-100 rounded-full text-slate-900">{item.quantity}</p>
              <button onClick={() => increaseQuantity(item.id)} className="col-start-11 col-span-1 min-w-full rounded-full bg-green-600 font-bold text-white grid justify-center items-center">+</button>
            </div>
          ))}
        </>
      )}

      {/* Mensaje de checkout (Éxito o Error) */}
      {checkoutMessage && (
        <p className={`text-center my-4 font-bold ${checkoutMessage.startsWith('¡Compra') ? 'text-green-600' : 'text-red-500'}`}>
          {checkoutMessage}
        </p>
      )}

      <div className="flex justify-center items-center flex-col">
        <h3 className="mt-10 text-slate-900 font-bold text-base md:text-xl ">Total: ${formatCurrency(total)}</h3>

        <button
          onClick={handleCheckout} // Llamada a la función de checkout
          className="p-4 max-w-fit px-20 text-white bg-slate-900 font-bold text-sm md:text-base rounded-full flex items-center justify-center my-3"
          disabled={cart.length === 0 || !isAuthenticated || loading}
        >
          {loading ? 'Procesando...' : 'Pagar'}
        </button>

        {cart.length > 0 && !isAuthenticated && (
          <p className="text-red-500 text-sm mt-2">Debes iniciar sesión para proceder al pago.</p>
        )}
      </div>
    </div>
  )
}

export default Cart