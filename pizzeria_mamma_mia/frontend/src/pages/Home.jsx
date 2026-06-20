import Header from '../pages/components/Header'
import CardPizza from '../components/CardPizza'
import { usePizzas } from '../context/PizzaContext'

const Home = () => {
  const { pizzas, loading, error } = usePizzas();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
        <p className="text-xl font-medium tracking-wide">Cargando nuestras deliciosas pizzas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center text-white px-4">
        <p className="text-xl text-rose-500 font-bold mb-2">¡Oops! Algo salió mal</p>
        <p className="text-slate-400 text-center max-w-md">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="mb-8 border-b border-slate-900 pb-4">
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
            Nuestro <span className="text-orange-500">Menú</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Selecciona tus favoritas e inicia tu pedido.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {pizzas.map((pizza) => (
            <CardPizza key={pizza.id} pizza={pizza} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home;
