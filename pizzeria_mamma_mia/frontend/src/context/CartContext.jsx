// src/context/CartContext.jsx

import { createContext, useState, useContext } from 'react';
import React from 'react';
// Importamos usePizzas, aunque ya no lo usaremos para inicializar el carrito
import { usePizzas } from './PizzaContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    // El carrito inicia vacío
    const [cart, setCart] = useState([]);

    // Función para agregar o incrementar
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === product.id);

            if (existingItem) {
                // Si ya existe, incrementamos la cantidad
                return prevCart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // Si no existía, lo agregamos con cantidad 1
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    // Función para incrementar la cantidad
    const increaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // FUNCIÓN DE DECREMENTO (elimina el ítem si la cantidad llega a 0)
    const decreaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 } // Decrementa
                        : item
                )
                // LÓGICA DE FILTRADO
                .filter(item => item.quantity > 0)
        );
    };

    // 🚨 NUEVA FUNCIÓN: Restablece el carrito a un array vacío
    const clearCart = () => {
        setCart([]);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const contextValue = {
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        calculateTotal,
        // 🚨 EXPORTAR LA NUEVA FUNCIÓN
        clearCart,
    };

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};