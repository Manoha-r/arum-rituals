import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  function addToCart(product, variant) {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.variant === variant)
      if (existing) return prev.map(i => i.id === product.id && i.variant === variant ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...product, variant, qty: 1 }]
    })
    setIsOpen(true)
  }

  function removeFromCart(id, variant) {
    setCart(prev => prev.filter(i => !(i.id === id && i.variant === variant)))
  }

  function changeQty(id, variant, delta) {
    setCart(prev => prev
      .map(i => i.id === id && i.variant === variant ? { ...i, qty: i.qty + delta } : i)
      .filter(i => i.qty > 0)
    )
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQty, total, count, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
