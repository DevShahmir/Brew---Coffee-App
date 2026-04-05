import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../Context/useCart'
import { drinks } from '../Data/menu'

const EachDrinkCard = () => {
  const { id } = useParams()
  const drink = drinks.find((d) => String(d.id) === String(id))
  const { addItem } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  if (!drink) {
    return (
      <div className="drink-detail drink-detail--empty">
        <header className="drink-detail__top">
          <Link to="/" className="drink-detail__back" aria-label="Back to menu">
            ←
          </Link>
          <span className="drink-detail__brand">Brew</span>
          <span className="drink-detail__top-spacer" aria-hidden />
        </header>
        <div className="drink-detail__empty-inner">
          <p className="drink-detail__empty-title">Drink not found</p>
          <p className="drink-detail__empty-hint">This item may have been removed from the menu.</p>
          <Link to="/" className="drink-detail__empty-btn">
            Back to menu
          </Link>
        </div>
      </div>
    )
  }

  const { id: drinkId, name, price, img, description } = drink

  const handleAddToCart = () => {
    addItem({ id: drinkId, name, price, img })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 500)
  }

  return (
    <div className="drink-detail">
      <header className="drink-detail__top">
        <Link to="/" className="drink-detail__back" aria-label="Back to menu">
          ←
        </Link>
        <span className="drink-detail__brand">Brew</span>
        <Link to="/cart" className="drink-detail__cart-mini" aria-label="Open cart">
          🛒
        </Link>
      </header>

      <div className="drink-detail__hero">
        <img src={img} alt="" className="drink-detail__hero-img" />
      </div>

      <div className="drink-detail__sheet">
        <div className="drink-detail__handle" aria-hidden />
        <p className="drink-detail__badge">Signature drink</p>
        <h1 className="drink-detail__title">{name}</h1>
        {description && <p className="drink-detail__desc">{description}</p>}
        <div className="drink-detail__meta">
          <span className="drink-detail__price">{price}</span>
          <span className="drink-detail__meta-note">Tax included · Pickup ready</span>
        </div>
      </div>

      <div className="drink-detail__footer">
        <button
          type="button"
          className={`drink-detail__cta ${isAdded ? 'drink-detail__cta--added' : ''}`}
          onClick={handleAddToCart}
          disabled={isAdded}
        >
          {isAdded ? 'Added to cart' : `Add to cart · ${price}`}
        </button>
      </div>
    </div>
  )
}

export default EachDrinkCard
