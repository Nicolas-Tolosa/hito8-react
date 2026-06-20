import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { userEmail, logout, loading } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="bg-slate-950 min-h-[calc(100vh-68px)] flex items-center justify-center px-4 py-12">
            <div className="max-w-xl w-full p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 bg-gradient-to-tr from-orange-600 to-amber-500 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-orange-950/50 mb-3">
                        {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-wide">Mi <span className="text-orange-500">Perfil</span></h1>
                    <p className="text-xs text-slate-500 mt-1">Miembro Preferencial de Mamma Mía</p>
                </div>
                
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Correo Electrónico Registrado:</p>
                    <p className="text-lg font-medium text-white break-all">{userEmail || 'Cargando datos...'}</p>
                </div>
                
                <p className="text-xs text-slate-400 text-center mb-8 leading-relaxed">
                    ¡Gracias por ser parte de nuestra Pizzería! Recuerda revisar nuestro menú para descubrir nuevos lanzamientos semanales.
                </p>

                <button 
                    onClick={handleLogout}
                    className={`w-full py-3 rounded-xl text-white font-bold text-sm uppercase tracking-wide transition-all cursor-pointer ${
                        loading ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-950/40'
                    }`}
                    disabled={loading}
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
