import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { FaCartShopping } from "react-icons/fa6";
import { CiPizza } from "react-icons/ci"; 
import { FaUser } from "react-icons/fa";
import { BiSolidLogIn, BiSolidLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Navbar = () => {
    const { calculateTotal } = useCart();
    const total = calculateTotal();
    const { isAuthenticated, logout } = useUser();

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/90 border-b border-slate-800 px-4 py-3 md:px-8">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                
                {/* SECCIÓN IZQUIERDA: Marca y Links */}
                <div className="flex items-center space-x-4 md:space-x-6">
                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <CiPizza className="text-2xl md:text-3xl text-orange-500 transition-transform group-hover:rotate-45 duration-300" />
                        <span className="font-black text-base md:text-xl tracking-wider text-white uppercase">
                            Mamma<span className="text-orange-500">Mía</span>
                        </span>
                    </Link>

                    {/* LINKS CONDICIONALES */}
                    <div className="flex items-center space-x-2 md:space-x-4 border-l border-slate-800 pl-4">
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="flex items-center space-x-1 text-xs md:text-sm font-medium text-slate-300 hover:text-white transition-colors py-1 px-2 rounded-md hover:bg-slate-900">
                                    <FaUser className="text-sm text-orange-500" />
                                    <span className="hidden sm:inline">Perfil</span>
                                </Link>

                                <button
                                    onClick={logout}
                                    className="flex items-center space-x-1 text-xs md:text-sm font-medium text-rose-400 hover:text-rose-300 transition-colors py-1 px-2 rounded-md hover:bg-rose-950/30 cursor-pointer"
                                    title="Cerrar Sesión"
                                >
                                    <BiSolidLogOut className="text-base" />
                                    <span className="hidden sm:inline">Salir</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="flex items-center space-x-1 text-xs md:text-sm font-medium text-slate-300 hover:text-white transition-colors py-1 px-2 rounded-md hover:bg-slate-900">
                                    <BiSolidLogIn className="text-base text-slate-400" />
                                    <span>Ingresar</span>
                                </Link>
                                <Link to="/register" className="text-xs md:text-sm font-medium text-slate-300 hover:text-white transition-colors py-1 px-2 rounded-md hover:bg-slate-900">
                                    <span>Registrar</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* SECCIÓN DERECHA: Carrito */}
                <div className="flex items-center">
                    <Link 
                        to="/cart" 
                        className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs md:text-sm px-4 py-2 rounded-full transition-all shadow-lg shadow-orange-950/40 hover:scale-105"
                    >
                        <FaCartShopping className="text-sm md:text-base" />
                        <span className="hidden xs:inline">Total:</span>
                        <span className="tracking-wide">${formatCurrency(total)}</span>
                    </Link>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
