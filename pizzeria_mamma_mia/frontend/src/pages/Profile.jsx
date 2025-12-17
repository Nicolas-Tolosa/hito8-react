import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { userEmail, logout, loading } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirigir al home tras el logout
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold text-center mb-8 text-slate-900">Mi Perfil</h1>
            
            <div className="text-lg mb-6 p-4 border border-gray-200 rounded-lg">
                <p className="font-semibold text-gray-700">Email del Usuario:</p>
                <p className="text-2xl font-light text-slate-900 break-words">{userEmail || 'Cargando...'}</p>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">¡Gracias por ser parte de nuestra Pizzería!</p>

            <button 
                onClick={handleLogout}
                className={`w-full py-3 rounded-lg text-white font-bold transition-colors ${loading ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'}`}
                disabled={loading}
            >
                Cerrar Sesión
            </button>
        </div>
    );
};

export default ProfilePage;