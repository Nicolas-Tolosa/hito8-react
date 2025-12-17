import './App.css'
import { useState } from 'react'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Cart from './pages/Cart.jsx'

import { formatCurrency } from './utils/formatCurrency'
import { pizzaCart } from './data/pizzas.js'
import Home from './pages/Home.jsx'

import AppRoutes from './routes/AppRoutes.jsx'


function App() {


  const [cartItems, setCartItems] = useState(pizzaCart);

  const handleChangeQuantity = (id, newQuantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, count: newQuantity }
          : item
      )
    );
  };

  const total = cartItems.reduce((acc, pizza) => acc + pizza.price * pizza.count, 0);

  return (
    <>

      <Navbar />

      <Home />

      <div>
        {cartItems.map((pizza) => (
          <Cart
            key={pizza.id}
            {...pizza}
            onChangeQuantity={(newQty) => handleChangeQuantity(pizza.id, newQty)}
          />
        ))}

        <h3>Total: ${formatCurrency(total)}</h3>
        <button>Pagar</button>
      </div>
      <Footer />
    </>
  )
}

export default App
