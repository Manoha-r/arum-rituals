import React from 'react'
import { useCart } from '../context/CartContext'
import styles from './CartSidebar.module.css'

export default function CartSidebar({ isOpen, onClose }) {
  const { cart, removeFromCart, changeQty, total } = useCart()

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <aside className={`${styles.panel} ${isOpen ? styles.open : ''}`}>
        <div className={styles.head}>
          <h2 className={styles.title}>Your Ritual Bag</h2>
          <button className={styles.close} onClick={onClose}>
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className={styles.items}>
          {cart.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>✦</div>
              <p>Your bag is beautifully empty.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={`${item.id}-${item.variant}`} className={styles.item}>
                <div className={styles.itemImg}>
                  <img src={item.img} alt={item.alt} />
                </div>
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemVariant}>{item.variant}</div>
                  <div className={styles.itemBottom}>
                    <div className={styles.qty}>
                      <button className={styles.qtyBtn} onClick={() => changeQty(item.id, item.variant, -1)}>−</button>
                      <span>{item.qty}</span>
                      <button className={styles.qtyBtn} onClick={() => changeQty(item.id, item.variant, 1)}>+</button>
                    </div>
                    <span className={styles.itemPrice}>₹{item.price * item.qty}</span>
                  </div>
                </div>
                <button className={styles.remove} onClick={() => removeFromCart(item.id, item.variant)}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.foot}>
            <div className={styles.subtotal}>
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            {total < 120 && (
              <div className={styles.freeShipBar}>
                <div
                  className={styles.freeShipFill}
                  style={{ width: `${Math.min((total / 120) * 100, 100)}%` }}
                />
                <span>₹{(120 - total).toFixed(0)} away from free delivery</span>
              </div>
            )}
            <button className={styles.checkoutBtn}>Proceed to Checkout</button>
            <p className={styles.note}>Taxes calculated at checkout · Free returns</p>
          </div>
        )}
      </aside>
    </>
  )
}
