// src/context/PizzaContext.jsx (Para referencia y confirmación)

import { createContext, useState, useEffect, useContext } from 'react';
import React from 'react';

const PizzaContext = createContext();

export const usePizzas = () => useContext(PizzaContext);

export const PizzaProvider = ({ children }) => {
    const [pizzas, setPizzas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/api/pizzas")
            .then((res) => {
                if (!res.ok) {
                    throw new Error('La respuesta de la red no fue exitosa');
                }
                return res.json();
            })
            .then((data) => {
                setPizzas(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching pizzas:", err);
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const getPizzaById = (id) => pizzas.find(pizza => pizza.id === id);

    const contextValue = {
        pizzas,
        loading,
        error,
        getPizzaById,
    };

    return (
        <PizzaContext.Provider value={contextValue}>
            {children}
        </PizzaContext.Provider>
    );
};