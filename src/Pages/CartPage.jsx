import React from 'react'
import { useCart } from '../Context/useCart'
import { Link, useNavigate } from 'react-router-dom'

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeItem, clearCart } = useCart();
  const total = cart.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return sum + (price * item.qty);
  }, 0);

  const handleCheckout = () => {
    
    
    setTimeout(() => {
      clearCart();
      alert('Thank you for your order! Please Click ok to proceed. ☕');
      navigate('/');
    }, 1000);
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p className="empty-hint">Add some delicious coffee! ☕</p>
          <Link to="/" className="back-to-menu">Browse Menu</Link>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h2>{item.name}</h2>
                <p className="item-price">{item.price}</p>
              </div>
              <div className="item-actions">
                <span className="item-qty">Qty: {item.qty}</span>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <span>Total:</span>
            <span className="total-price">${total.toFixed(2)}</span>
          </div>
          <div className="cart-actions">
            <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage