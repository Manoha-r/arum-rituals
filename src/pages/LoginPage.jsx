import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './LoginPage.module.css'

export default function LoginPage() {
  const { login, error, loading, setError } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const result = await login(email, password)
    if (result.ok) navigate('/')
  }

  return (
    <div className={styles.root}>
      <div className={styles.left}>
        <div className={styles.leftBg} />
        <div className={styles.leftContent}>
          <div className={styles.leftLogo}>Aurum <span>✦</span> Ritual</div>
          <blockquote className={styles.quote}>
            "The ceremony begins before you open the bottle."
          </blockquote>
          <div className={styles.leftStats}>
            <div><span>94%</span><p>See results in 28 days</p></div>
            <div><span>4.9★</span><p>From 2,400+ reviews</p></div>
            <div><span>48+</span><p>Botanical actives</p></div>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.formWrap}>
          <div className={styles.mobileLogo}>Aurum <span>✦</span> Ritual</div>
          <p className={styles.eyebrow}>Welcome back</p>
          <h1 className={styles.heading}>Sign in to your<br /><em>Ritual</em></h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Email address</label>
              <input
                className={styles.input}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ritual@aurumritual.com"
                required
                autoFocus
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <div className={styles.passWrap}>
                <input
                  className={styles.input}
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className={styles.passToggle}
                  onClick={() => setShowPass(v => !v)}
                >
                  {showPass ? (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>
                  ) : (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <button className={styles.submitBtn} type="submit" disabled={loading}>
              {loading ? <span className={styles.spinner} /> : 'Enter the Ritual'}
            </button>
          </form>

          <div className={styles.divider}><span>or</span></div>

          <Link to="/register" className={styles.registerBtn}>
            Create a new account
          </Link>

          <div className={styles.demoHint}>
            <p className={styles.demoTitle}>Demo credentials</p>
            <p>ritual@aurumritual.com / ritual123</p>
            <p>admin@aurumritual.com / admin123</p>
          </div>

          <p className={styles.forgotWrap}>
            <a href="#" className={styles.forgot}>Forgot password?</a>
          </p>
        </div>
      </div>
    </div>
  )
}
