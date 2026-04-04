import './App.css'
import Navbar from './Components/Navbar'
import MenuPage from './Pages/MenuPage'
import { CartProvider } from './Context/CartProvider'
import CartPage from './Pages/CartPage'
import { Route,Routes } from 'react-router-dom'

function App() {
  return (
    <>

      <CartProvider>
        <Navbar />
<Routes>
  <Route path= '/' element={<MenuPage />} />
  <Route path= '/cart' element={<CartPage />} />
</Routes>
      </CartProvider>

    </>
  )
}

export default App
