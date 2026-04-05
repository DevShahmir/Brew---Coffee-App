import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../Context/useCart'

const DrinkCard = ({ name, price, img, id, description }) => {
  const { addItem } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    addItem({ id, name, price, img })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 500)
  }

  return (
    <div className="card">
      <Link to={`/drink/${id}`} className="card-image-link" aria-label={`View ${name}`}>
        <img src={img} alt="" className="card-image" />
      </Link>
      <div className="card-content">
        <Link to={`/drink/${id}`} className="card-title-link">
          <h2 className="card-title">{name}</h2>
        </Link>
        {description && <p className="card-description">{description}</p>}
        <p className="card-price">{price}</p>
        <button
          type="button"
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