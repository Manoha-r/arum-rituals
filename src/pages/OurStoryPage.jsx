import React from 'react'
import styles from './OurStoryPage.module.css'

const TIMELINE = [
  { year: '2017', title: 'The Question', body: 'Our founder, a cosmetic biochemist, grew frustrated with luxury skincare that prioritised fragrance over function. The question became: what if science and ceremony were not opposites?' },
  { year: '2018', title: 'Two Years of Formulation', body: 'Working with a team of botanists and clinical dermatologists, the first three Aurum formulas were tested across 400 participants. 94% reported visible results within 28 days.' },
  { year: '2019', title: 'Aurum Ritual Launches', body: 'With three products and a commitment to zero synthetic fragrance, the brand launched quietly. Within six months, every product was on backorder.' },
  { year: '2021', title: 'Supplements Division', body: 'After hundreds of customers asked about ingestible wellness, the Supplements collection launched — bringing the same clinical rigour to inner wellness.' },
  { year: '2023', title: 'The Refill Programme', body: 'Our most sustainable initiative: aluminium refill pouches for every Aurum product. 72% of our customers now use the refill programme.' },
  { year: '2025', title: 'Spring Collection', body: 'Our most expansive range yet — 10 formulations, 48 botanical actives, and a renewed commitment to the rituals that matter.' },
]

const VALUES = [
  { icon: '◎', title: 'Clinical integrity', body: 'Every active concentration is evidence-backed. No marketing doses. We publish our clinical data.' },
  { icon: '❋', title: 'Botanical purity', body: 'Cold-pressed, third-party tested, and ethically sourced. We know every supplier by name.' },
  { icon: '◈', title: 'Radical transparency', body: 'Full ingredient disclosure, including percentages. No hidden fragrance blends. No greenwashing.' },
  { icon: '✦', title: 'Ritual over routine', body: 'We believe intention transforms efficacy. Our formulas are designed to be felt, not just applied.' },
]

export default function OurStoryPage() {
  return (
    <div>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>Founded 2019</div>
          <h1 className={styles.heroTitle}>
            Science with<br /><em>a sense of ceremony.</em>
          </h1>
        </div>
      </div>

      {/* Mission */}
      <section className={`page-section ${styles.mission}`}>
        <div className={styles.missionGrid}>
          <div>
            <div className="eyebrow">Our mission</div>
            <h2 className="section-title">We formulate for the <em>discerning few.</em></h2>
          </div>
          <div className={styles.missionBody}>
            <p>Aurum Ritual was built on a single belief: that the most effective skincare is also the most honest. We reject the luxury industry's tendency to dress ordinary formulas in extraordinary packaging.</p>
            <p>Every product we make starts with a clinical question — what does this tissue actually need? — and ends only when a rigorous answer has been found and validated.</p>
            <p>The result is a range that does less, promises less, and delivers more. Measurably.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`page-section ${styles.valuesSection}`}>
        <div className="eyebrow">What drives us</div>
        <h2 className="section-title" style={{ marginBottom: '52px' }}>Four principles. <em>No exceptions.</em></h2>
        <div className={styles.valuesGrid}>
          {VALUES.map(v => (
            <div key={v.title} className={styles.valueCard}>
              <span className={styles.valueIcon}>{v.icon}</span>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueBody}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className={`page-section ${styles.timelineSection}`}>
        <div className="eyebrow">Our journey</div>
        <h2 className="section-title" style={{ marginBottom: '64px' }}>Six years of <em>quiet excellence.</em></h2>
        <div className={styles.timeline}>
          {TIMELINE.map((t, i) => (
            <div key={t.year} className={`${styles.timelineItem} ${i % 2 === 0 ? styles.left : styles.right}`}>
              <div className={styles.timelineCard}>
                <div className={styles.timelineYear}>{t.year}</div>
                <h3 className={styles.timelineTitle}>{t.title}</h3>
                <p className={styles.timelineBody}>{t.body}</p>
              </div>
              <div className={styles.timelineDot} />
            </div>
          ))}
          <div className={styles.timelineLine} />
        </div>
      </section>

      {/* Founder Note */}
      <section className={`page-section ${styles.founderSection}`}>
        <div className={styles.founderGrid}>
          <img
            className={styles.founderImg}
            src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?w=700&q=80&auto=format"
            alt="Founder working on formulations"
          />
          <div className={styles.founderText}>
            <div className="eyebrow">A note from our founder</div>
            <blockquote className={styles.founderQuote}>
              "I wanted to build the brand I couldn't find. One that treated me as intelligent. One that showed its working. One that understood the difference between a routine and a ritual."
            </blockquote>
            <p className={styles.founderName}>— Dr. Amara Cole, Founder & Chief Formulator</p>
          </div>
        </div>
      </section>
    </div>
  )
}
