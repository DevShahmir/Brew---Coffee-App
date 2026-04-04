import React, { useState } from 'react'
import { useCart } from '../Context/useCart'


const DrinkCard = ({ name, price, img, id, description }) => {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({ id, name, price, img });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 500);
  };

  return (
    <div className="card">
      <img src={img} alt={name} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        {description && <p className="card-description">{description}</p>}
        <p className="card-price">{price}</p>
        <button 
          className={isAdded ? 'added' : ''} 
          onClick={handleAddToCart}
          disabled={isAdded}
        >
          {isAdded ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default DrinkCard