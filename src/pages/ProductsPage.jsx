import React, { useState, useMemo } from 'react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import styles from './ProductsPage.module.css'

const SORT_OPTIONS = [
  { value: 'default',   label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc',label: 'Price: High to Low' },
  { value: 'rating',    label: 'Best Rated' },
  { value: 'reviews',   label: 'Most Reviewed' },
]

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')
  const [priceMax, setPriceMax] = useState(3000)

  const filtered = useMemo(() => {
    let list = [...products]
    if (search) list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(search.toLowerCase())
    )
    list = list.filter(p => p.price <= priceMax)
    switch (sort) {
      case 'price-asc':  list.sort((a,b) => a.price - b.price); break
      case 'price-desc': list.sort((a,b) => b.price - a.price); break
      case 'rating':     list.sort((a,b) => b.rating - a.rating); break
      case 'reviews':    list.sort((a,b) => b.reviews - a.reviews); break
    }
    return list
  }, [search, sort, priceMax])

  return (
    <div>
      {/* Page Header */}
      <div className={styles.pageHead}>
        <div className={styles.pageHeadInner}>
          <div className={styles.eyebrow}>The Complete Range</div>
          <h1 className={styles.pageTitle}>All Products</h1>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className={styles.clearSearch} onClick={() => setSearch('')}>×</button>}
        </div>

        <div className={styles.priceFilter}>
          <span className={styles.filterLabel}>Max price: <strong>₹{priceMax}</strong></span>
          <input
            type="range" min="30" max="3000" step="50"
            value={priceMax}
            onChange={e => setPriceMax(Number(e.target.value))}
            className={styles.priceRange}
          />
        </div>

        <select
          className={styles.sortSelect}
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>

        <span className={styles.resultCount}>
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Grid */}
      <div className="page-section" style={{ paddingTop: '32px' }}>
        {filtered.length === 0 ? (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>✦</div>
            <p>No products match your search.</p>
            <button className={styles.resetBtn} onClick={() => { setSearch(''); setPriceMax(3000); setSort('default') }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
