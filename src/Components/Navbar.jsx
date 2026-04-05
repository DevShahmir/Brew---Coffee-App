import React from 'react'
import { useCart } from '../Context/useCart'
import { useAuth } from '../Context/useAuth'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { cart } = useCart()
  const { user, logout, isLoggedIn } = useAuth()
  const itemCount = cart.reduce((total, item) => total + item.qty, 0)
  const displayName = user?.name?.split(' ')[0] ?? user?.email

  return (
    <nav className="nav">
      <Link to="/" className="logo">
        <h3>Brew</h3>
      </Link>
      <div className="nav-actions">
        {isLoggedIn ? (
          <div className="nav-user">
            <span className="nav-user__greet" title={user.email}>
              Hi, {displayName}
            </span>
            <button type="button" className="nav-user__logout" onClick={logout}>
              Log out
            </button>
          </div>
        ) : (
          <Link to="/login" className="nav-login">
            Log in
          </Link>
        )}
        <Link to="/cart" className="cart">
          🛒 Cart <span>{itemCount}</span>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
