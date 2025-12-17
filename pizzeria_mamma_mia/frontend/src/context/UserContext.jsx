// frontend/src/context/UserContext.jsx

import React, { createContext, useState, useContext, useCallback } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// URL del backend
const API_URL = 'http://localhost:5000/api'; 

export const UserProvider = ({ children }) => {
    
    // Estado inicial: se lee el token y el email de localStorage si existen
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función auxiliar para obtener el encabezado de autorización
    const getAuthHeader = useCallback(() => {
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }, [token]);


    // 1. Implementa Register
    const register = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Manejo de errores de la API
                throw new Error(data.message || 'Error en el registro');
            }

            // Almacenar token y email en estado y localStorage
            setToken(data.token);
            setUserEmail(email);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userEmail', email);

            return true; // Éxito
        } catch (err) {
            setError(err.message);
            console.error("Registro fallido:", err);
            return false;
        } finally {
            setLoading(false);
        }
    };


    // 1. Implementa Login
    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Credenciales inválidas');
            }

            // Almacenar token y email en estado y localStorage
            setToken(data.token);
            setUserEmail(email);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userEmail', email);

            return true; // Éxito
        } catch (err) {
            setError(err.message);
            console.error("Login fallido:", err);
            return false;
        } finally {
            setLoading(false);
        }
    };


    // 2. Implementa Logout
    const logout = useCallback(() => {
        setToken(null);
        setUserEmail(null);
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        setError(null);
    }, []);


    // 3. Implementa obtener perfil
    const getProfile = useCallback(async () => {
        if (!token) {
            setError('No hay token para obtener el perfil.');
            return null;
        }
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_URL}/auth/me`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
            });

            const data = await response.json();

            if (!response.ok) {
                // Si el token expiró o es inválido, cerramos sesión
                if (response.status === 401) {
                    logout();
                }
                throw new Error(data.message || 'Error al obtener perfil');
            }
            
            setUserEmail(data.email || userEmail); 
            return data;
        } catch (err) {
            setError(err.message);
            console.error("Fallo al obtener perfil:", err);
            return null;
        } finally {
            setLoading(false);
        }
    }, [token, userEmail, logout, getAuthHeader]);

    // Valor del contexto
    const contextValue = {
        token,
        userEmail,
        isAuthenticated: !!token, // TRUE si hay un token, FALSE si es null
        loading,
        error,
        login,
        register,
        logout,
        getProfile,
        getAuthHeader, // Exportar para Checkouts y otras peticiones protegidas
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};