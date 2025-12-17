// frontend/src/pages/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, loading, error, isAuthenticated } = useUser();

    // Redirección inmediata si ya está autenticado (AuthRedirect también lo hace)
    if (isAuthenticated) {
        navigate('/');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);

        if (success) {
            navigate('/profile'); // Redirigir al perfil o home tras el login
        } else {
            // El mensaje de error ya está en el estado 'error' del contexto
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">Contraseña</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
                <button 
                    type="submit" 
                    className={`w-full py-2 rounded-lg text-white font-bold transition-colors ${loading ? 'bg-gray-500' : 'bg-slate-900 hover:bg-slate-700'}`}
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginPage;