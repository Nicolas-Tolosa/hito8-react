import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { useUser } from '../context/UserContext';

const API_URL = 'http://localhost:5000/api'; // Definir URL

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, calculateTotal, clearCart } = useCart();
  const { isAuthenticated, getAuthHeader } = useUser();
  const total = calculateTotal();

  const [checkoutMessage, setCheckoutMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Diccionario para enlazar cada ID de pizza con su extensión exacta en /public
  const localImages = {
    "p001": "/napolitana.jpg",
    "p002": "/espanola.jpeg",
    "p003": "/salame.jpeg",
    "p004": "/cuatro_estaciones.jpg",
    "p005": "/bacon.jpg",
    "p006": "/pollo_picante.jpg"
  };

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
    } finally {
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
            {cart.map((item) => {
              // Mapeamos el ID de la pizza a su ruta correspondiente en public
              const imageSrc = localImages
