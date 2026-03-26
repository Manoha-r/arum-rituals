import React, { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import CartSidebar from './CartSidebar'
import ProductModal from './ProductModal'
import styles from './Layout.module.css'

export const ModalContext = React.createContext(null)

export default function Layout() {
  const { user, logout } = useAuth()
  const { count, isOpen, setIsOpen } = useCart()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalProduct, setModalProduct] = useState(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const navLinks = [
    { to: '/collections', label: 'Collections' },
    { to: '/products', label: 'Products' },
    { to: '/our-story', label: 'Our Story' },
    { to: '/ingredients', label: 'Ingredients' },
    { to: '/reviews', label: 'Reviews' },
  ]

  return (
    <ModalContext.Provider value={{ modalProduct, setModalProduct }}>
      <div className={styles.root}>
        {/* Announcement */}
        <div className={styles.announce}>
          Free delivery on orders over ₹120 · Use code RITUAL10 for 10% off
        </div>

        {/* Header */}
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
          <NavLink to="/" className={styles.logo}>
            Aurum <span className={styles.logoMark}>✦</span> Ritual
          </NavLink>

          <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
            {navLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <NavLink to="/account" className={styles.accountBtn}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>
              </svg>
              <span className={styles.accountName}>{user?.name?.split(' ')[0]}</span>
            </NavLink>

            <button className={styles.cartBtn} onClick={() => setIsOpen(true)}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0"/>
              </svg>
              {count > 0 && <span className={styles.cartCount}>{count}</span>}
            </button>

            <button className={styles.logoutBtn} onClick={handleLogout}>
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
              </svg>
            </button>

            <button className={styles.menuToggle} onClick={() => setMenuOpen(v => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className={styles.main}>
          <Outlet />
        </main>

        {/* Cart Sidebar */}
        <CartSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* Product Modal */}
        {modalProduct && (
          <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
        )}

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerTop}>
            <div className={styles.footerBrand}>
              <div className={styles.footerLogo}>Aurum <span>✦</span> Ritual</div>
              <p>Science-led luxury wellness rituals. Formulated for those who treat self-care as ceremony, not routine.</p>
            </div>
            <div>
              <div className={styles.footerColHead}>Shop</div>
              <ul>
                {['Skincare','Supplements','Body Care','Bundles','Gifting','Subscribe & Save'].map(l => (
                  <li key={l}><NavLink to="/products">{l}</NavLink></li>
                ))}
              </ul>
            </div>
            <div>
              <div className={styles.footerColHead}>Help</div>
              <ul>
                {['FAQ','Shipping & Returns','Track My Order','Contact Us'].map(l => (
                  <li key={l}><a href="#">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className={styles.footerColHead}>Company</div>
              <ul>
                {['Our Story','Ingredients','Sustainability','Press'].map(l => (
                  <li key={l}><NavLink to="/our-story">{l}</NavLink></li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <span>© 2025 Aurum Ritual. All rights reserved.</span>
            <div className={styles.footerLegal}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
            <div className={styles.payIcons}>
              {['VISA','MC','AMEX','PP'].map(p => <span key={p} className={styles.payIcon}>{p}</span>)}
            </div>
          </div>
        </footer>
      </div>
    </ModalContext.Provider>
  )
}
