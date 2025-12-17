import React from 'react'
import { Link} from "react-router-dom";

const NotFound = () => {
  return (
    <section className='flex flex-col justify-center items-center'>
        <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-8xl font-bold text-rose-600  mt-40">ERROR</h1>
        <span className="flex flex-row">
            <h1 className="text-8xl md:text-8xl lg:text-9xl xl:text-9xl 2xl:text-9xl font-bold text-rose-600 -rotate-12">4</h1>
            <img src="https://img.freepik.com/premium-vector/one-pizza-slice-opened-cardboard-box_163786-134.jpg?semt=ais_hybrid" alt="" className="h-32 lg:h-60"/>
            <h1 className="text-8xl md:text-8xl lg:text-9xl xl:text-9xl 2xl:text-9xl font-bold text-green-600 rotate-12">4</h1>
        </span>
    
        <p className="text-sm md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl text-slate-700 font-bold">Oops... la página que buscas no está disponible.</p>
        <Link to="/">
            <button
                type="button"
                className="text-white bg-green-600 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-900 font-bold rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-800 dark:focus:bg-green-800 mt-10">Ir al Home
            </button>
        </Link>
    </section>
  )
}

export default NotFound