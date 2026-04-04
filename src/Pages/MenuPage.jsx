import React from 'react'
import { drinks } from '../Data/menu'
import DrinkCard from '../Components/DrinkCard'

const MenuPage = () => {
  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Our Menu</h1>
        <p>Handcrafted with love, served with a smile</p>
      </div>
      <div className="menu">
        {drinks.map((drink) => (
          <DrinkCard
            key={drink.id}
            id={drink.id}
            name={drink.name}
            price={drink.price}
            img={drink.img}
            description={drink.description}
          />
        ))}
      </div>
    </div>
  )
}

export default MenuPage