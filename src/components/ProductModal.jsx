import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import styles from './ProductModal.module.css'

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart()
  const [selected, setSelected] = useState(product.variants[0])
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addToCart(product, selected)
    setAdded(true)
    setTimeout(() => { setAdded(false); onClose() }, 900)
  }

  return (
    <>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.panel}>
        <div className={styles.imgSide}>
          <button className={styles.close} onClick={onClose}>
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          <img src={product.img} alt={product.alt} />
        </div>

        <div className={styles.infoSide}>
          <div className={styles.brand}>Aurum Ritual</div>
          <h2 className={styles.name}>{product.name}</h2>

          <div className={styles.stars}>
            {[1,2,3,4,5].map(i => <span key={i} className="star">★</span>)}
            <span className={styles.reviewCount}>{product.reviews} reviews</span>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>₹{product.price}</span>
            {product.compare && <span className={styles.compare}>₹{product.compare}</span>}
          </div>

          <p className={styles.desc}>{product.desc}</p>

          <div className={styles.variantLabel}>Size / Volume</div>
          <div className={styles.variants}>
            {product.variants.map(v => (
              <button
                key={v}
                className={`${styles.variantPill} ${selected === v ? styles.variantActive : ''}`}
                onClick={() => setSelected(v)}
              >
                {v}
              </button>
            ))}
          </div>

          <div className={styles.actions}>
            <button
              className={`${styles.atcBtn} ${added ? styles.atcAdded : ''}`}
              onClick={handleAdd}
            >
              {added ? 'Added ✓' : 'Add to Ritual Bag'}
            </button>
            <button className={styles.wishBtn}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
              </svg>
            </button>
          </div>

          <div className={styles.guarantee}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            30-day satisfaction guarantee · Cruelty-free & vegan
          </div>
        </div>
      </div>
    </>
  )
}
