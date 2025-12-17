import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link de React Router

const Footer = () => {
  return (
    <div>
      <div className="bg-slate-900 h-auto grid-cols-1 grid md-grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 pt-6 justify-center pb-6">
        <div className="ml-12 flex items-center mb-6">
          <img src="/react/pizzeria_mammamia/public/logo.jpg" alt="" className="rounded-full h-20"/>
        </div>

        <div className="flex flex-col mx-6 text-white mb-4">
          <h2 className="font-bold">MAMMA MÍA</h2>
          {/* Reemplazar <a> por <Link> */}
          <Link to="#" className="hover:underline">Acerca de nosotros</Link>
          <Link to="#" className="hover:underline">Ingredientes</Link>
          <Link to="#" className="hover:underline">Mamma Mía SpA</Link>
          <Link to="#" className="hover:underline">Pizzas</Link>
        </div>
        
        <div className="flex flex-col mx-6 text-white mb-4">
          <h2 className="font-bold">AYUDA</h2>
          <Link to="#" className="hover:underline">Preguntas frecuentes</Link>
          <Link to="#" className="hover:underline">Contacto</Link>
          <a href="tel:6666666666" className="hover:underline">Pide por teléfono 666 666 6666</a>
        </div>
        
        <div className="flex flex-col mx-6 text-white mb-4">
          <h2 className="font-bold">LEGAL</h2>
          <Link to="#" className="hover:underline">Términos y condiciones</Link>
          <Link to="#" className="hover:underline">Política de privacidad</Link>
          <Link to="#" className="hover:underline">Código Ético</Link>
          <Link to="#" className="hover:underline">Canal Ético</Link>
        </div>
        
        <div className="flex flex-col mx-6 text-white mb-4">
          <h2 className="font-bold">LOCALES</h2>
          <Link to="#" className="hover:underline">Nuestros locales</Link>
        </div>

      </div>

      <div className="bg-red-800 h-10 flex items-center justify-center">
        <p className="text-white text-xs">© 2024 - Pizzería Mamma Mia! - Todos los derechos reservados</p>
      </div>
    </div>
  );
};

export default Footer;