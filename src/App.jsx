import './App.css'
import Navbar from './Components/Navbar'
import EachDrinkCard from './Components/EachDrinkCard'
import MenuPage from './Pages/MenuPage'
import { CartProvider } from './Context/CartProvider'
import CartPage from './Pages/CartPage'
import { Route, Routes, useLocation } from 'react-router-dom'

function App() {
  const { pathname } = useLocation()
  const showNavbar = !pathname.startsWith('/drink/')

  return (
    <CartProvider>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/drink/:id" element={<EachDrinkCard />} />
      </Routes>
    </CartProvider>
  )
}

export default App
