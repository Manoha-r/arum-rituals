import React, { useContext } from 'react'
import { ModalContext } from './Layout'

export default function ProductCard({ product }) {
  const { setModalProduct } = useContext(ModalContext)

  return (
    <div className="prod-card" onClick={() => setModalProduct(product)}>
      <div className="prod-img-wrap">
        <img src={product.img} alt={product.alt} loading="lazy" />
        <span className={`prod-badge badge-${product.badgeType}`}>{product.badge}</span>
        <button className="prod-quick-view" onClick={e => { e.stopPropagation(); setModalProduct(product) }}>
          Quick View
        </button>
      </div>
      <div>
        <div className="prod-stars">
          {[1,2,3,4,5].map(i => <span key={i} className="star">★</span>)}
          <span className="star-count">({product.reviews})</span>
        </div>
        <div className="prod-brand">Aurum Ritual</div>
        <div className="prod-name">{product.name}</div>
        <div className="prod-short-desc">{product.shortDesc}</div>
        <div className="prod-pricing">
          <span className="prod-price">From &#8377;{product.price.toLocaleString("en-IN")}</span>
          {product.compare && <span className="prod-compare">&#8377;{product.compare.toLocaleString("en-IN")}</span>}
        </div>
      </div>
    </div>
  )
}
