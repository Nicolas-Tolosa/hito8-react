// frontend/src/routes/AppRoutes.jsx (Ejemplo de implementación de rutas)

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import PizzaDetail from '../pages/Pizza';
import Navbar from '../components/Navbar';

import { ProtectedRoute, AuthRedirect } from './ProtectedRoute';
import ProfilePage from '../pages/Profile';
import LoginPage from '../pages/Login';
import RegisterPage from '../pages/Register';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* Rutas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/pizza/:id" element={<PizzaDetail />} />

        {/* RUTA PROTEGIDA para /profile: Si no hay token, va a /login */}
        <Route element={<ProtectedRoute redirectTo="/login" />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* RUTAS DE AUTENTICACIÓN con redirección: Si hay token, va a / */}
        <Route element={<AuthRedirect redirectTo="/" />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Ruta de error 404 (opcional) */}
        <Route path="*" element={
          <div className="text-center mt-20">
            <h1 className="text-3xl font-bold">404</h1>
            <p>Página no encontrada.</p>
          </div>
        } />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;