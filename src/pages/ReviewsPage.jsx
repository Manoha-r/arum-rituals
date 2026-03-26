import React, { useState } from 'react'
import { reviewsData } from '../data/products'
import styles from './ReviewsPage.module.css'

const EXTRA_REVIEWS = [
  { id:7,  text:'I have tried every luxury face oil on the market. The Midnight Recovery Oil is the only one I keep reordering. The texture, the results, the ritual of it — nothing compares.', name:'Helena V.', initials:'HV', product:'Midnight Recovery Oil', stars:5, date:'March 2025' },
  { id:8,  text:'The Gut Harmony powder is completely invisible in my morning drink. After three weeks, the bloating I had normalised over a decade simply stopped. I cannot overstate how significant that is.', name:'Dr. Riya P.', initials:'RP', product:'Prebiotic Gut Harmony', stars:5, date:'February 2025' },
  { id:9,  text:'Sceptical by nature, won over by evidence. The Luminary Serum is the only product that has measurably changed my photography lighting — my editor asked if I had changed my retouching workflow.', name:'Tom H.', initials:'TH', product:'Luminary Renewal Serum', stars:5, date:'January 2025' },
]
const ALL_REVIEWS = [...reviewsData, ...EXTRA_REVIEWS]

export default function ReviewsPage() {
  const [filter, setFilter] = useState('all')
  const products = ['all', ...new Set(ALL_REVIEWS.map(r => r.product))]
  const filtered = filter === 'all' ? ALL_REVIEWS : ALL_REVIEWS.filter(r => r.product === filter)

  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>Verified customers</div>
          <h1 className={styles.heroTitle}>What our community<br /><em>is saying.</em></h1>
        </div>
      </div>

      {/* Score bar */}
      <div className={styles.scoreBar}>
        <div className={styles.scoreLeft}>
          <span className={styles.scoreNum}>4.9</span>
          <div>
            <div className={styles.scoreStars}>{'★'.repeat(5)}</div>
            <div className={styles.scoreCount}>from 2,417 verified reviews</div>
          </div>
        </div>
        <div className={styles.scoreBars}>
          {[[5,'78%'],[4,'16%'],[3,'4%'],[2,'1%'],[1,'1%']].map(([stars, pct]) => (
            <div key={stars} className={styles.scoreBarRow}>
              <span className={styles.scoreBarLabel}>{stars}★</span>
              <div className={styles.scoreBarTrack}>
                <div className={styles.scoreBarFill} style={{ width: pct, background: stars >= 4 ? 'var(--oro)' : stars === 3 ? 'var(--stone)' : '#e2afa0' }} />
              </div>
              <span className={styles.scoreBarPct}>{pct}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Product filter */}
      <div className={styles.filterBar}>
        {products.map(p => (
          <button
            key={p}
            className={`${styles.filterBtn} ${filter === p ? styles.filterActive : ''}`}
            onClick={() => setFilter(p)}
          >
            {p === 'all' ? 'All Products' : p}
          </button>
        ))}
      </div>

      {/* Reviews */}
      <section className="page-section">
        <div className={styles.grid}>
          {filtered.map(r => (
            <div key={r.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.cardStars}>{'★'.repeat(r.stars)}</div>
                <span className={styles.cardDate}>{r.date}</span>
              </div>
              <div className={styles.quoteChar}>"</div>
              <p className={styles.cardText}>{r.text}</p>
              <div className={styles.cardAuthor}>
                <div className={styles.cardAvatar}>{r.initials}</div>
                <div>
                  <div className={styles.cardName}>{r.name}</div>
                  <div className={styles.cardProduct}>✓ Verified · {r.product}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
