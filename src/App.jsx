import './App.css'
import Navbar from './Components/Navbar'
import EachDrinkCard from './Components/EachDrinkCard'
import MenuPage from './Pages/MenuPage'
import { AuthProvider } from './Context/AuthProvider'
import { CartProvider } from './Context/CartProvider'
import CartPage from './Pages/CartPage'
import { Route, Routes, useLocation } from 'react-router-dom'
import Signup_or_Login from './Components/Signup_or_Login'

function App() {
  const { pathname } = useLocation()
  const showNavbar = !pathname.startsWith('/drink/') && pathname !== '/login'

  return (
    <AuthProvider>
      <CartProvider>
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/drink/:id" element={<EachDrinkCard />} />
          <Route path="/login" element={<Signup_or_Login />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
