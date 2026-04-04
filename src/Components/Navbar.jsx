import React from 'react'
import { useCart } from '../Context/useCart'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { cart } = useCart();
  const itemCount = cart.reduce((total, item) => total + item.qty, 0);
  
  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <h3>Brew</h3>
      </Link>
      <Link to="/cart" className="cart">
        🛒 Cart <span>{itemCount}</span>
      </Link>
    </nav>
  )
}

export default Navbar