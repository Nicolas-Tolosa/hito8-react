import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 items-start">
        
        {/* Branding */}
        <div className="flex flex-col items-start space-y-4">
        <img 
          src="/logo.png" 
          alt="Mamma Mía Logo" 
          className="rounded-full h-16 w-16 object-cover border-2 border-orange-500 bg-slate-900 mx-auto md:mx-0" 
        />
          <p className="text-xs text-slate-500">Las mejores pizzas artesanales con el sabor tradicional italiano directo a tu mesa.</p>
        </div>

        {/* Links: MAMMA MIA */}
        <div className="flex flex-col space-y-2 text-sm">
          <h3 className="font-bold text-white tracking-wider text-xs uppercase mb-2 text-orange-500">Mamma Mía</h3>
          <Link to="#" className="hover:text-white transition-colors">Acerca de nosotros</Link>
          <Link to="#" className="hover:text-white transition-colors">Ingredientes</Link>
          <Link to="#" className="hover:text-white transition-colors">Mamma Mía SpA</Link>
          <Link to="#" className="hover:text-white transition-colors">Pizzas</Link>
        </div>
        
        {/* Links: AYUDA */}
        <div className="flex flex-col space-y-2 text-sm">
          <h3 className="font-bold text-white tracking-wider text-xs uppercase mb-2 text-orange-500">Ayuda</h3>
          <Link to="#" className="hover:text-white transition-colors">Preguntas frecuentes</Link>
          <Link to="#" className="hover:text-white transition-colors">Contacto</Link>
          <a href="tel:1112223333" className="text-slate-300 font-semibold hover:text-orange-400 transition-colors mt-1">
            Pide al: +569 1222 3333
          </a>
        </div>
        
        {/* Links: LEGAL */}
        <div className="flex flex-col space-y-2 text-sm">
          <h3 className="font-bold text-white tracking-wider text-xs uppercase mb-2 text-orange-500">Legal</h3>
          <Link to="#" className="hover:text-white transition-colors">Términos y condiciones</Link>
          <Link to="#" className="hover:text-white transition-colors">Política de privacidad</Link>
          <Link to="#" className="hover:text-white transition-colors">Código Ético</Link>
        </div>
        
        {/* Links: LOCALES */}
        <div className="flex flex-col space-y-2 text-sm">
          <h3 className="font-bold text-white tracking-wider text-xs uppercase mb-2 text-orange-500">Locales</h3>
          <Link to="#" className="hover:text-white transition-colors">Nuestros locales</Link>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="bg-slate-900/60 border-t border-slate-900 py-4 text-center px-4">
        <p className="text-[11px] md:text-xs text-slate-500 tracking-wide">
          &copy; {new Date().getFullYear()} - <span className="text-slate-400 font-medium">Pizzería Mamma Mía!</span> - Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
