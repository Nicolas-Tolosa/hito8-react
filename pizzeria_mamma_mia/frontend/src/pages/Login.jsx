import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login, loading, error, isAuthenticated } = useUser();

    if (isAuthenticated) {
        navigate('/');
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(email, password);
        if (success) {
            navigate('/profile');
        }
    };

    return (
        <div className="bg-slate-950 min-h-[calc(100vh-68px)] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full p-8 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
                <h1 className="text-3xl font-black text-center text-white uppercase tracking-wide mb-2">
                    Iniciar <span className="text-orange-500">Sesión</span>
                </h1>
                <p className="text-xs text-slate-400 text-center mb-6">¡Qué bueno verte de regreso! Pide tu pizza favorita.</p>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                        <div className="bg-rose-950/40 border border-rose-800/60 p-3 rounded-xl text-center">
                            <p className="text-sm text-rose-400 font-medium">{error}</p>
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-light"
                            placeholder="tu@email.com"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Contraseña</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-light"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className={`w-full py-3 rounded-xl text-white font-bold text-sm tracking-wide uppercase transition-all mt-2 cursor-pointer ${
                            loading ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-950/40'
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Verificando...' : 'Ingresar'}
                    </button>
                </form>

                <p className="text-xs text-slate-500 text-center mt-6">
                    ¿No tienes cuenta aún?{' '}
                    <Link to="/register" className="text-orange-400 hover:underline font-medium">
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
