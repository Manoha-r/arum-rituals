import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import styles from './CollectionsPage.module.css'

const COLLECTIONS = [
  { id: 'all',         label: 'All',         desc: 'Every ritual in one place.' },
  { id: 'skincare',    label: 'Skincare',     desc: 'Face serums, oils & masks.' },
  { id: 'supplements', label: 'Supplements',  desc: 'Adaptogens & inner wellness.' },
  { id: 'body',        label: 'Body Care',    desc: 'Mists, rubs & body rituals.' },
  { id: 'bundles',     label: 'Bundles',      desc: 'Curated ritual kits.' },
  { id: 'refills',     label: 'Refills',      desc: 'Sustainable refill pouches.' },
]

export default function CollectionsPage() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? products
    : products.filter(p => p.collection === active)

  return (
    <div>
      {/* Page Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>Explore</div>
          <h1 className={styles.heroTitle}>Our Collections</h1>
          <p className={styles.heroSub}>
            Every formula begins with a question: what does this skin truly need?
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={styles.filterBar}>
        {COLLECTIONS.map(c => (
          <button
            key={c.id}
            className={`${styles.filterBtn} ${active === c.id ? styles.filterActive : ''}`}
            onClick={() => setActive(c.id)}
          >
            {c.label}
            <span className={styles.filterCount}>
              {c.id === 'all' ? products.length : products.filter(p => p.collection === c.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Collection Description */}
      <div className={styles.collDesc}>
        {COLLECTIONS.find(c => c.id === active)?.desc}
      </div>

      {/* Products Grid */}
      <div className="page-section" style={{ paddingTop: '32px' }}>
        {filtered.length === 0 ? (
          <p className={styles.empty}>No products in this collection yet — check back soon.</p>
        ) : (
          <div className={styles.grid}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
