import React from 'react'
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-widest text-rose-500 uppercase mb-4 animate-pulse">ERROR</h1>
        
        <span className="flex flex-row items-center justify-center mb-8">
            <h1 className="text-7xl md:text-9xl font-black text-rose-500 -rotate-12 select-none">4</h1>
            <div className="h-28 md:h-48 transform hover:scale-105 transition-transform duration-300 px-2">
              <img 
                src="https://img.freepik.com/premium-vector/one-pizza-slice-opened-cardboard-box_163786-134.jpg?semt=ais_hybrid" 
                alt="Pizza Error" 
                className="h-full w-auto object-contain rounded-2xl bg-slate-900 p-2 border border-slate-800"
              />
            </div>
            <h1 className="text-7xl md:text-9xl font-black text-orange-500 rotate-12 select-none">4</h1>
        </span>
    
        <p className="text-base md:text-xl text-slate-300 font-medium text-center max-w-md mb-8 leading-relaxed">
          Oops... La porción de página que estás buscando parece haber sido devorada o no está disponible.
        </p>

        <Link to="/">
            <button
                type="button"
                className="text-white bg-orange-600 hover:bg-orange-500 font-bold rounded-xl text-sm px-8 py-3 transition-all shadow-lg shadow-orange-950/40 hover:scale-105 cursor-pointer"
            >
              Ir al Home
            </button>
        </Link>
    </section>
  )
}

export default NotFound;
