// frontend/src/main.jsx (Fragmento modificado)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// Importaciones de Context
import { PizzaProvider } from './context/PizzaContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { UserProvider } from './context/UserContext.jsx' // <-- NUEVA IMPORTACIÓN

import AppRoutes from './routes/AppRoutes.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PizzaProvider>
      <CartProvider>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </CartProvider>
    </PizzaProvider>
  </StrictMode>,
)