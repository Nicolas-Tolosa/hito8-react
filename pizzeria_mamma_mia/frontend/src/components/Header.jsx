import React from 'react';

const Header = () => {
  return (
    <div 
      className="relative w-full h-[260px] md:h-[340px] bg-cover bg-center flex items-center justify-center border-b border-slate-900"
      style={{ backgroundImage: "url('/Header.jpg')" }} 
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/70 to-slate-950"></div>

      <div className="relative z-10 text-center px-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-2 drop-shadow-lg">
          ¡Pizzería <span className="text-orange-500">Mamma Mía!</span>
        </h1>
        <div className="w-16 h-1 bg-orange-500 mx-auto rounded-full mb-4"></div>
        <p className="text-xs md:text-base text-slate-300 font-light tracking-wide max-w-md mx-auto drop-shadow leading-relaxed">
          Tenemos las mejores pizzas artesanales que podrás encontrar, con ingredientes seleccionados y el verdadero toque tradicional italiano.
        </p>
      </div>
    </div>
  );
};

export default Header;
