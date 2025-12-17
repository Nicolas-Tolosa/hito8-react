// frontend/src/pages/Register.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { register, loading, error, isAuthenticated } = useUser();

    if (isAuthenticated) {
        navigate('/');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await register(email, password);

        if (success) {
            navigate('/profile'); // Redirigir al perfil o home tras el registro
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-6">Registrarse</h1>
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
                    {loading ? 'Cargando...' : 'Registrar'}
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;