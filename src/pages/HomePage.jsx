import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import useReveal from '../hooks/useReveal'
import styles from './HomePage.module.css'

const TRUST_ITEMS = [
  { icon: '✦', text: 'Free Delivery Over ₹120' },
  { icon: '◎', text: 'Clinically Tested Formulas' },
  { icon: '↺', text: '30-Day Returns' },
  { icon: '❋', text: 'Cruelty-Free & Vegan' },
  { icon: '★', text: '4.9 from 2,400+ Reviews' },
  { icon: '◈', text: 'Sustainable Packaging' },
]

const COLLECTIONS = [
  { tag: '01 · Skincare', name: 'Luminous\nSkin Rituals', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80&auto=format', alt: 'Skincare collection', span: true },
  { tag: '02 · Supplements', name: 'Inner\nBalance', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80&auto=format', alt: 'Supplements collection' },
  { tag: '03 · Body Care', name: 'Body\nCeremony', img: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38e1a?w=600&q=80&auto=format', alt: 'Body care collection' },
  { tag: '04 · Gifting', name: 'Gift of\nRitual', img: 'https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&q=80&auto=format', alt: 'Gift sets' },
]

export default function HomePage() {
  useReveal()
  const [emailSent, setEmailSent] = React.useState(false)
  const emailRef = useRef()

  function handleEmail(e) {
    e.preventDefault()
    setEmailSent(true)
    emailRef.current.value = ''
    setTimeout(() => setEmailSent(false), 3500)
  }

  const featured = products.slice(0, 4)

  return (
    <div className={styles.root}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroGrain} />
        <div className={styles.heroContent}>
          <div className={styles.heroEyebrow}>New Collection · Spring Ritual</div>
          <h1 className={styles.heroH1}>
            Ceremony<br />begins <em>within.</em>
          </h1>
          <p className={styles.heroSub}>
            Science-led formulations for those who believe<br />self-care is not indulgence — it is discipline.
          </p>
          <div className={styles.heroCtas}>
            <Link to="/products" className="btn-primary">
              Explore the ritual
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link to="/our-story" className="btn-ghost">Our Philosophy</Link>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <div className={styles.scrollLine} />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <div className={styles.trustBar}>
        <div className={styles.trustTrack}>
          {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
            <div key={i} className={styles.trustItem}>
              <span className={styles.trustIcon}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* ── COLLECTIONS ── */}
      <section className="page-section">
        <div data-reveal className={styles.collHeader}>
          <div className="eyebrow">Shop by ritual</div>
          <h2 className="section-title">Explore <em>our collections</em></h2>
        </div>
        <div className={styles.collGrid}>
          {COLLECTIONS.map((c, i) => (
            <Link
              to="/collections"
              key={i}
              className={`${styles.collCard} ${c.span ? styles.collSpan : ''}`}
              data-reveal
            >
              <img className={styles.collImg} src={c.img} alt={c.alt} loading="lazy" />
              <div className={styles.collOverlay}>
                <div className={styles.collTag}>{c.tag}</div>
                <div className={styles.collName}>{c.name.replace('\\n', '\n')}</div>
                <div className={styles.collLink}>Explore Collection →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className={`page-section ${styles.productsSection}`}>
        <div className={styles.prodHeader} data-reveal>
          <div>
            <div className="eyebrow">Bestsellers</div>
            <h2 className="section-title">Crafted for <em>discerning skin</em></h2>
          </div>
          <Link to="/products" className={styles.viewAll}>View all products →</Link>
        </div>
        <div className={styles.prodGrid}>
          {featured.map((p, i) => (
            <div key={p.id} data-reveal style={{ animationDelay: `${i * 0.08}s` }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ── BRAND STORY STRIP ── */}
      <section className={`page-section ${styles.storySection}`}>
        <div className={styles.storyInner}>
          <div className={styles.storyImgStack} data-reveal>
            <img className={styles.storyMain} src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=700&q=80&auto=format" alt="Founder at work" />
            <img className={styles.storyAccent} src="https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80&auto=format" alt="Botanicals" />
            <div className={styles.storyBadge}>Since<br />2019</div>
          </div>
          <div data-reveal className={styles.storyText}>
            <div className="eyebrow">Our philosophy</div>
            <h2 className="section-title light">Where <em>science</em><br />meets ceremony</h2>
            <p className={styles.storyBody}>
              We believe the most transformative ingredient in any ritual is intention. Every Aurum formula is developed by cosmetic biochemists, botanists, and ritual practitioners — because true luxury answers to biology first, and feeling second.
            </p>
            <div className={styles.storyStats}>
              {[['94%','Saw visible results in 28 days'],['48+','Botanical actives across the range'],['0','Synthetic fragrances or parabens'],['2.4k','Five-star reviews and counting']].map(([n, l]) => (
                <div key={n} className={styles.storyStat}>
                  <span className={styles.storyNum}>{n}</span>
                  <span className={styles.storyLabel}>{l}</span>
                </div>
              ))}
            </div>
            <Link to="/our-story" className="btn-primary">
              Read our story
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── EMAIL CAPTURE ── */}
      <section className={`page-section ${styles.capture}`}>
        <div className={styles.captureInner} data-reveal>
          <div className="eyebrow centered">Join the ritual</div>
          <h2 className={styles.captureH2}>The ceremony starts<br />before you open the bottle.</h2>
          <p className={styles.captureSub}>New formulations, ritual guides, and exclusive access. For the inner circle only.</p>
          <form className={styles.emailForm} onSubmit={handleEmail}>
            <input ref={emailRef} className={styles.emailInput} type="email" placeholder="Your email address" required />
            <button type="submit" className={styles.emailBtn}>
              {emailSent ? 'Welcome ✓' : 'Begin Ritual'}
            </button>
          </form>
          <p className={styles.captureNote}>We never share your details. Unsubscribe any time.</p>
        </div>
      </section>

      {/* ── PRESS ── */}
      <div className={styles.press}>
        <span className={styles.pressLabel}>As seen in</span>
        {['Vogue','Condé Nast','Forbes','Goop','Byrdie','Well+Good'].map(p => (
          <span key={p} className={styles.pressLogo}>{p}</span>
        ))}
      </div>
    </div>
  )
}
