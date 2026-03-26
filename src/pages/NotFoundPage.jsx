import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <div className={styles.mark}>✦</div>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>This ritual doesn't exist — yet.</h2>
        <p className={styles.body}>
          The page you're looking for has moved, been retired, or never existed.
          Let us guide you back to the ceremony.
        </p>
        <div className={styles.links}>
          <Link to="/" className="btn-primary">
            Return home
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link to="/products" className={styles.altLink}>Browse all products</Link>
        </div>
      </div>
    </div>
  )
}
