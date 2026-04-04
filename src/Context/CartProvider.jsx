import { useReducer, useEffect } from 'react'
import { CartContext } from './CartContext'

// Load cart from localStorage
const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem('coffee-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

// The reducer — lives OUTSIDE the Provider component
const reducer = (state, action) => {
  switch(action.type) {
    case 'ADD_ITEM':
    return state.find(item => item.id === action.payload.id)
      ? state.map(item => item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item)
      : [...state, { ...action.payload, qty: 1 }];
      
    case 'REMOVE_ITEM':
      return state.find(item=>item.id === action.payload.id)
      ? state.find(item=>item.id === action.payload.id).qty > 1
        ? state.map(item => item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item)
        : state.filter(item => item.id !== action.payload.id)
      : state;
    case 'UPDATE_QTY':
      return state.map(item => item.id === action.payload.id ? { ...item, qty: action.payload.qty } : item);
    
    case 'CLEAR_CART':
      return [];
      
    default:
      return state;
  }
}

// Job 2 — the Provider component (this goes in App.jsx wrapping everything)
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, [], getInitialCart);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('coffee-cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

