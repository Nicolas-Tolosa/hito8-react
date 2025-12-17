import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';
import { FaCartShopping } from "react-icons/fa6";
import { CiPizza } from "react-icons/ci"; 
import { FaUser } from "react-icons/fa";
import { BiSolidLogIn } from "react-icons/bi";
import { BiSolidLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext'; // <-- Importar UserContext

const Navbar = () => {
    // Consumir Cart Context para el total
    const { calculateTotal } = useCart();
    const total = calculateTotal();

    // 2. Consumir User Context
    const { isAuthenticated, logout } = useUser(); // Obtener el estado y el método logout

    return (
        <div className="flex justify-between bg-slate-900 items-center px-2 py-3">

            {/* SECCIÓN IZQUIERDA: Marca y Links de Usuario */}
            <div className="flex items-center space-x-3 text-white ml-6">
                {/* Link a Home (Siempre visible) */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center space-x-1">
                        <CiPizza className="text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-white" />
                        <span className="text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-white">Pizzería</span>
                    </Link>
                </div>

                {/* LINKS CONDICIONALES */}
                <div className="flex space-x-3">
                    {/* Si isAuthenticated es TRUE (Token existente) */}
                    {isAuthenticated ? (
                        <>
                            {/* Perfil */}
                            <Link to="/profile" className="flex items-center space-x-1">
                                <FaUser className="text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-white" />
                                <span className="text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-white">Perfil</span>
                            </Link>

                            {/* Logout: Usa un <button> y el método logout() */}
                            <button
                                onClick={logout}
                                className="flex items-center space-x-1 border-none bg-transparent cursor-pointer text-white"
                                title="Cerrar Sesión" // Opcional: para estilos y accesibilidad
                            >
                                <BiSolidLogOut className="text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg" />
                                <span className="text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Login (Si el token es FALSE) */}
                            <Link to="/login" className="flex items-center space-x-1">
                                <BiSolidLogIn className="text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-white" />
                                <span className="text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-white">Login</span>
                            </Link>
                            {/* Registrar (Si el token es FALSE) */}
                            <Link to="/register" className="flex items-center space-x-1">
                                <span cslassName="text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-white">Registrar</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>

            {/* SECCIÓN DERECHA: Carrito y Total (Siempre visible) */}
            <div className="flex items-center space-x-3 text-white mr-6">
                <Link to="/cart" className="flex items-center space-x-1">
                    <FaCartShopping className="text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-white" />
                    <p className="text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-white">Total:</p>
                    <span className="text-xs md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-white">
                        ${formatCurrency(total)}
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;