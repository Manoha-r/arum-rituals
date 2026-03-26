import React, { useState } from 'react'
import styles from './IngredientsPage.module.css'

const INGREDIENTS = [
  { icon:'💧', name:'Squalane', source:'Olive-derived', benefit:'Deep hydration without pore-clogging', detail:'A lipid molecule identical to skin\'s own sebum. Our cold-pressed olive squalane penetrates instantly, restoring the skin barrier without any occlusive residue. Stable at all temperatures — no refrigeration required.', products:['Midnight Recovery Oil','Clarity Cleansing Oil'], category:'hydration' },
  { icon:'🌿', name:'Bakuchiol', source:'Babchi plant seeds', benefit:'Plant-based retinol alternative', detail:'Clinically proven to match retinol\'s cell-turnover efficacy at 0.5% concentration — without the photosensitivity, flaking, or purging. Safe for pregnancy. Safe for reactive skin. No exceptions.', products:['Midnight Recovery Oil'], category:'actives' },
  { icon:'✨', name:'THD Ascorbate', source:'Vitamin C ester', benefit:'8× deeper penetration than L-AA', detail:'Tetrahexyldecyl Ascorbate is the oil-soluble, stable form of Vitamin C. Where L-Ascorbic Acid oxidises within weeks and irritates at clinical concentrations, THD remains active for 18+ months and penetrates the dermis rather than sitting on the epidermis.', products:['Luminary Renewal Serum'], category:'actives' },
  { icon:'🍄', name:"Lion's Mane", source:'Ethically wild-harvested', benefit:'Nerve growth factor support', detail:'Hericium erinaceus extract, standardised to 30% beta-glucans. Linked to NGF synthesis in four peer-reviewed trials. Our supplier provides third-party COAs with every batch. No mycelium-on-grain fillers.', products:['Adaptogen Focus Blend'], category:'adaptogens' },
  { icon:'🌱', name:'Ashwagandha KSM-66', source:'Root extract', benefit:'Cortisol reduction — 27% in 60 days', detail:'The most clinically studied ashwagandha extract available. Our KSM-66 is patented, full-spectrum root extract — not leaf, not whole-plant — standardised to ≥5% withanolides. Six placebo-controlled RCTs support the stress-reduction claim.', products:['Adaptogen Focus Blend'], category:'adaptogens' },
  { icon:'🔮', name:'Magnesium Chloride', source:'Zechstein seabed', benefit:'Transdermal GABA pathway support', detail:'Ancient seabed magnesium chloride at 31% concentration — the therapeutic threshold for transdermal absorption. Applied to the skin before sleep, it supports the GABAergic pathway that governs muscle relaxation and sleep onset.', products:['Deep Sleep Magnesium Mist'], category:'minerals' },
  { icon:'🌺', name:'Hyaluronic Acid (3 weights)', source:'Fermentation-derived', benefit:'Multi-depth skin hydration', detail:'We use three molecular weights of HA simultaneously: high (800kDa) for surface plumping, medium (300kDa) for mid-dermis hydration, and low (50kDa) for deep tissue retention. Single-weight HA products are leaving efficacy on the table.', products:['Luminary Renewal Serum'], category:'hydration' },
  { icon:'🌾', name:'Inulin (Chicory)', source:'Chicory root', benefit:'Prebiotic gut microbiome support', detail:'3g of chicory-root inulin per serving — the clinical dose validated across 14 trials. Fermented by Bifidobacterium to produce short-chain fatty acids that protect the gut lining. No taste, no texture, dissolves completely in cold liquid.', products:['Prebiotic Gut Harmony'], category:'prebiotics' },
]

const CATEGORIES = [
  { id:'all', label:'All Ingredients' },
  { id:'actives', label:'Skin Actives' },
  { id:'hydration', label:'Hydration' },
  { id:'adaptogens', label:'Adaptogens' },
  { id:'minerals', label:'Minerals' },
  { id:'prebiotics', label:'Prebiotics' },
]

export default function IngredientsPage() {
  const [active, setActive] = useState('all')
  const [expanded, setExpanded] = useState(null)

  const filtered = active === 'all' ? INGREDIENTS : INGREDIENTS.filter(i => i.category === active)

  return (
    <div>
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>Formulation transparency</div>
          <h1 className={styles.heroTitle}>What goes in.<br /><em>No secrets.</em></h1>
          <p className={styles.heroSub}>Every active. Every source. Every reason why.</p>
        </div>
      </div>

      {/* Philosophy strip */}
      <div className={styles.philosophy}>
        <div className={styles.philosophyGrid}>
          {[['48+','Botanical actives'],['0','Synthetic fragrances'],['100%','Third-party tested'],['Full','Concentration disclosure']].map(([n,l]) => (
            <div key={n} className={styles.philoStat}>
              <span className={styles.philoNum}>{n}</span>
              <span className={styles.philoLabel}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div className={styles.filterBar}>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`${styles.filterBtn} ${active === c.id ? styles.filterActive : ''}`}
            onClick={() => setActive(c.id)}
          >{c.label}</button>
        ))}
      </div>

      {/* Ingredients grid */}
      <section className="page-section">
        <div className={styles.grid}>
          {filtered.map(ing => (
            <div
              key={ing.name}
              className={`${styles.card} ${expanded === ing.name ? styles.cardExpanded : ''}`}
              onClick={() => setExpanded(expanded === ing.name ? null : ing.name)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.ingIcon}>{ing.icon}</div>
                <div className={styles.ingMeta}>
                  <div className={styles.ingName}>{ing.name}</div>
                  <div className={styles.ingSource}>{ing.source}</div>
                </div>
                <div className={styles.expandIcon}>{expanded === ing.name ? '−' : '+'}</div>
              </div>
              <div className={styles.ingBenefit}>{ing.benefit}</div>
              {expanded === ing.name && (
                <div className={styles.ingDetail}>
                  <p>{ing.detail}</p>
                  <div className={styles.ingProducts}>
                    <span className={styles.ingProductsLabel}>Found in:</span>
                    {ing.products.map(p => <span key={p} className={styles.ingProductTag}>{p}</span>)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
