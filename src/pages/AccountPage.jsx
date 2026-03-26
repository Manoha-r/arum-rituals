import React, { useState, useContext } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { products } from '../data/products'
import { ModalContext } from '../components/Layout'
import { useCart } from '../context/CartContext'
import styles from './AccountPage.module.css'

const ORDER_HISTORY = [
  { id:'#AR-10245', date:'12 Mar 2025', status:'Delivered', items:['Luminary Renewal Serum · 60ml','Deep Sleep Magnesium Mist · 100ml'], total: 149+42 },
  { id:'#AR-09871', date:'18 Feb 2025', status:'Delivered', items:['Midnight Recovery Oil · 30ml','Adaptogen Focus Blend · 90 caps'], total: 118+139 },
  { id:'#AR-09210', date:'04 Jan 2025', status:'Delivered', items:['The Morning Ritual Kit'], total: 219 },
]

const TABS = ['Overview','Orders','Wishlist','Settings']

const SKILLS_LIST = [
  { key: 'shopifyThemes',          label: 'Shopify Theme Customisation',       desc: 'Dawn, Prestige, Impulse, custom Liquid sections' },
  { key: 'liquidTemplating',       label: 'Liquid Templating',                  desc: 'Dynamic product, collection & metafield rendering' },
  { key: 'cssCustomisation',       label: 'CSS / Responsive Design',             desc: 'Mobile-first layouts, animations, CSS variables' },
  { key: 'appIntegration',         label: 'App Integration',                     desc: 'Judge.me, Klaviyo, Vitals, Smile.io, ReConvert' },
  { key: 'conversionOptimisation', label: 'Conversion Rate Optimisation',         desc: 'A/B testing, trust signals, checkout flows' },
  { key: 'seoMetadata',            label: 'SEO & Metadata',                       desc: 'Schema markup, meta titles, sitemaps, alt text' },
]

export default function AccountPage() {
  const { user, logout, updateProfile } = useAuth()
  const { setModalProduct } = useContext(ModalContext)
  const { addToCart } = useCart()
  const navigate = useNavigate()
  const [tab, setTab] = useState('Overview')
  const [wishlist] = useState([products[0], products[1], products[7]])

  // Settings form state seeded from current user
  const [profileForm, setProfileForm] = useState({
    firstName:    user?.firstName  || user?.name?.split(' ')[0] || '',
    lastName:     user?.lastName   || user?.name?.split(' ')[1] || '',
    email:        user?.email      || '',
    phone:        user?.phone      || '',
    dob:          user?.dob        || '',
    gender:       user?.gender     || '',
    bio:          user?.bio        || '',
    addressLine1: user?.address?.line1 || '',
    city:         user?.address?.city  || '',
    state:        user?.address?.state || '',
    zip:          user?.address?.zip   || '',
    country:      user?.address?.country || 'US',
  })
  const [skills, setSkills] = useState({
    shopifyThemes:          user?.skills?.shopifyThemes          ?? false,
    liquidTemplating:       user?.skills?.liquidTemplating       ?? false,
    cssCustomisation:       user?.skills?.cssCustomisation       ?? false,
    appIntegration:         user?.skills?.appIntegration         ?? false,
    conversionOptimisation: user?.skills?.conversionOptimisation ?? false,
    seoMetadata:            user?.skills?.seoMetadata            ?? false,
  })
  const [saveStatus, setSaveStatus] = useState('')
  const [saving, setSaving] = useState(false)

  function setP(k, v) { setProfileForm(f => ({ ...f, [k]: v })); setSaveStatus('') }
  function setSkill(k, v) { setSkills(s => ({ ...s, [k]: v })); setSaveStatus('') }

  async function handleSaveProfile(e) {
    e.preventDefault()
    setSaving(true)
    await updateProfile({
      firstName: profileForm.firstName,
      lastName:  profileForm.lastName,
      phone:     profileForm.phone,
      dob:       profileForm.dob,
      gender:    profileForm.gender,
      bio:       profileForm.bio,
      address: {
        line1:   profileForm.addressLine1,
        city:    profileForm.city,
        state:   profileForm.state,
        zip:     profileForm.zip,
        country: profileForm.country,
      },
      skills,
    })
    setSaving(false)
    setSaveStatus('saved')
    setTimeout(() => setSaveStatus(''), 3000)
  }

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const initials = [user?.firstName || '', user?.lastName || '']
    .map(s => s[0] || '').join('').toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'

  const fullName = user?.firstName
    ? `${user.firstName} ${user.lastName || ''}`.trim()
    : user?.name || 'Member'

  const skillCount = Object.values(skills).filter(Boolean).length

  return (
    <div>
      {/* Header */}
      <div className={styles.pageHead}>
        <div className={styles.pageHeadInner}>
          <div className={styles.avatarCircle}>{initials}</div>
          <div>
            <div className={styles.eyebrow}>My account</div>
            <h1 className={styles.pageTitle}>Welcome, {user?.firstName || fullName.split(' ')[0]}.</h1>
            <div className={styles.memberSince}>
              Member since {user?.createdAt || 'January 2024'} ·&nbsp;
              {user?.role === 'admin' ? '⬡ Admin' : '✦ Ritual Member'}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabBar}>
        {TABS.map(t => (
          <button key={t}
            className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
            onClick={() => setTab(t)}
          >{t}</button>
        ))}
      </div>

      <div className="page-section" style={{ paddingTop: '40px' }}>

        {/* ── OVERVIEW ── */}
        {tab === 'Overview' && (
          <div className={styles.overviewGrid}>
            <div className={styles.statCard}><div className={styles.statIcon}>📦</div><div className={styles.statNum}>{ORDER_HISTORY.length}</div><div className={styles.statLabel}>Total orders</div></div>
            <div className={styles.statCard}><div className={styles.statIcon}>💰</div><div className={styles.statNum}>₹{ORDER_HISTORY.reduce((s,o)=>s+o.total,0)}</div><div className={styles.statLabel}>Lifetime spend</div></div>
            <div className={styles.statCard}><div className={styles.statIcon}>♡</div><div className={styles.statNum}>{wishlist.length}</div><div className={styles.statLabel}>Wishlist items</div></div>
            <div className={styles.statCard}><div className={styles.statIcon}>✦</div><div className={styles.statNum}>Gold</div><div className={styles.statLabel}>Ritual tier</div></div>
            <div className={styles.recentOrders}>
              <h3 className={styles.sectionHead}>Recent orders</h3>
              {ORDER_HISTORY.slice(0,2).map(o => (
                <div key={o.id} className={styles.orderRow}>
                  <div><div className={styles.orderId}>{o.id}</div><div className={styles.orderItems}>{o.items.join(' · ')}</div></div>
                  <div className={styles.orderRight}><div className={styles.orderStatus}>{o.status}</div><div className={styles.orderTotal}>₹{o.total}</div></div>
                </div>
              ))}
            </div>

            {/* Skills overview */}
            <div className={styles.skillsOverview}>
              <h3 className={styles.sectionHead}>Skill profile</h3>
              <div className={styles.skillPills}>
                {SKILLS_LIST.map(s => (
                  <span key={s.key} className={`${styles.skillPill} ${skills[s.key] ? styles.skillPillActive : ''}`}>
                    {skills[s.key] && <span className={styles.skillPillCheck}>✓</span>}
                    {s.label}
                  </span>
                ))}
              </div>
              <p className={styles.skillsEditHint}>
                {skillCount} / 6 skills marked ·{' '}
                <button className={styles.inlineBtn} onClick={() => setTab('Settings')}>Edit in Settings →</button>
              </p>
            </div>
          </div>
        )}

        {/* ── ORDERS ── */}
        {tab === 'Orders' && (
          <div className={styles.ordersWrap}>
            <h2 className={styles.sectionTitle}>Order History</h2>
            {ORDER_HISTORY.map(o => (
              <div key={o.id} className={styles.orderCard}>
                <div className={styles.orderCardHead}>
                  <div><span className={styles.orderId}>{o.id}</span><span className={styles.orderDate}>{o.date}</span></div>
                  <div className={styles.orderCardRight}><span className={styles.orderStatus}>{o.status}</span><span className={styles.orderTotal}>₹{o.total}</span></div>
                </div>
                <div className={styles.orderCardItems}>
                  {o.items.map(item => <div key={item} className={styles.orderItem}><div className={styles.orderItemDot} />{item}</div>)}
                </div>
                <button className={styles.reorderBtn}>Reorder</button>
              </div>
            ))}
          </div>
        )}

        {/* ── WISHLIST ── */}
        {tab === 'Wishlist' && (
          <div className={styles.wishlistWrap}>
            <h2 className={styles.sectionTitle}>Saved Items</h2>
            {wishlist.length === 0 ? (
              <div className={styles.emptyWishlist}>
                <div className={styles.emptyIcon}>♡</div>
                <p>Your wishlist is empty.</p>
              </div>
            ) : (
              <div className={styles.wishGrid}>
                {wishlist.map(p => (
                  <div key={p.id} className={styles.wishCard}>
                    <div
                      className={styles.wishImg}
                      onClick={() => setModalProduct(p)}
                      title="Quick view"
                    >
                      <img src={p.img} alt={p.alt} />
                      <div className={styles.wishImgOverlay}>Quick View</div>
                    </div>
                    <div className={styles.wishInfo}>
                      <div className={styles.wishMeta}>
                        <span className={`prod-badge badge-${p.badgeType}`} style={{ position:'static', display:'inline-block', marginBottom:'6px' }}>{p.badge}</span>
                      </div>
                      <div className={styles.wishName}>{p.name}</div>
                      <div className={styles.wishDesc}>{p.shortDesc}</div>
                      <div className={styles.wishPriceRow}>
                        <span className={styles.wishPrice}>₹{p.price}</span>
                        {p.compare && <span className={styles.wishCompare}>₹{p.compare}</span>}
                      </div>
                      <div className={styles.wishStars}>
                        {'★'.repeat(5)}
                        <span className={styles.wishReviews}>({p.reviews})</span>
                      </div>
                      <div className={styles.wishActions}>
                        <button
                          className={styles.wishAtc}
                          onClick={() => {
                            addToCart(p, p.variants[0])
                          }}
                        >
                          Add to Bag
                        </button>
                        <button
                          className={styles.wishView}
                          onClick={() => setModalProduct(p)}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── SETTINGS ── */}
        {tab === 'Settings' && (
          <form className={styles.settingsWrap} onSubmit={handleSaveProfile}>
            <div className={styles.settingsTopRow}>
              <h2 className={styles.sectionTitle}>Account Settings</h2>
              <div className={styles.saveRow}>
                {saveStatus === 'saved' && <span className={styles.savedMsg}>✓ Changes saved</span>}
                <button type="submit" className={styles.saveBtn} disabled={saving}>
                  {saving ? 'Saving…' : 'Save all changes'}
                </button>
              </div>
            </div>

            <div className={styles.settingsGrid}>
              {/* ── Personal details ── */}
              <div className={styles.settingsCard}>
                <h3 className={styles.settingsHead}>Personal details</h3>
                <div className={styles.sfRow}>
                  <div className={styles.sf}>
                    <label className={styles.sfLabel}>First name</label>
                    <input className={styles.sfInput} type="text" value={profileForm.firstName} onChange={e => setP('firstName', e.target.value)} placeholder="Jane" />
                  </div>
                  <div className={styles.sf}>
                    <label className={styles.sfLabel}>Last name</label>
                    <input className={styles.sfInput} type="text" value={profileForm.lastName} onChange={e => setP('lastName', e.target.value)} placeholder="Smith" />
                  </div>
                </div>
                <div className={styles.sf}>
                  <label className={styles.sfLabel}>Email address</label>
                  <input className={styles.sfInput} type="email" value={profileForm.email} readOnly style={{ opacity: .6, cursor: 'not-allowed' }} title="Email cannot be changed" />
                </div>
                <div className={styles.sfRow}>
                  <div className={styles.sf}>
                    <label className={styles.sfLabel}>Phone number</label>
                    <input className={styles.sfInput} type="tel" value={profileForm.phone} onChange={e => setP('phone', e.target.value)} placeholder="+1 555 123 4567" />
                  </div>
                  <div className={styles.sf}>
                    <label className={styles.sfLabel}>Date of birth</label>
                    <input className={styles.sfInput} type="date" value={profileForm.dob} onChange={e => setP('dob', e.target.value)} max={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>
                <div className={styles.sf}>
                  <label className={styles.sfLabel}>Gender</label>
                  <select className={styles.sfSelect} value={profileForm.gender} onChange={e => setP('gender', e.target.value)}>
                    <option value="">Prefer not to say</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="nonbinary">Non-binary</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                </div>
                <div className={styles.sf}>
                  <label className={styles.sfLabel}>Bio <span className={styles.sfOptional}>(optional)</span></label>
                  <textarea className={styles.sfTextarea} value={profileForm.bio} onChange={e => setP('bio', e.target.value)} rows={3} maxLength={300} placeholder="Tell us about yourself…" />
                  <span className={styles.sfCharCount}>{profileForm.bio.length} / 300</span>
                </div>
              </div>

              {/* ── Delivery address ── */}
              <div className={styles.settingsCard}>
                <h3 className={styles.settingsHead}>Delivery address</h3>
                <div className={styles.sf}>
                  <label className={styles.sfLabel}>Street address</label>
                  <input className={styles.sfInput} type="text" value={profileForm.addressLine1} onChange={e => setP('addressLine1', e.target.value)} placeholder="123 Wellness Avenue" />
                </div>
                <div className={styles.sfRow}>
                  <div className={styles.sf}>
                    <label className={styles.sfLabel}>City</label>
                    <input className={styles.sfInput} type="text" value={profileForm.city} onChange={e => setP('city', e.target.value)} placeholder="New York" />
                  </div>
                  <div className={styles.sf}>
                    <label className={styles.sfLabel}>State / Province</label>
                    <input className={styles.sfInput} type="text" value={profileForm.state} onChange={e => setP('state', e.target.value)} placeholder="NY" />
                  </div>
                </div>
                <div className={styles.sfRow}>
                  <div className={styles.sf}>
                    <label className={styles.sfLabel}>Postcode / ZIP</label>
                    <input className={styles.sfInput} type="text" value={profileForm.zip} onChange={e => setP('zip', e.target.value)} placeholder="10001" />
                  </div>
                  <div className={styles.sf}>
                    <label className={styles.sfLabel}>Country</label>
                    <select className={styles.sfSelect} value={profileForm.country} onChange={e => setP('country', e.target.value)}>
                      {[['US','United States'],['GB','United Kingdom'],['CA','Canada'],['AU','Australia'],['IN','India'],['DE','Germany'],['FR','France'],['SG','Singapore'],['AE','UAE'],['Other','Other']].map(([c,n]) => (
                        <option key={c} value={c}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Skills section ── */}
            <div className={`${styles.settingsCard} ${styles.skillsCard}`}>
              <div className={styles.skillsCardHead}>
                <div>
                  <h3 className={styles.settingsHead}>Skills & expertise</h3>
                  <p className={styles.skillsCardDesc}>Check every area you're confident working in. Used for personalisation and role applications.</p>
                </div>
                <span className={styles.skillCountBadge}>{skillCount} / 6 selected</span>
              </div>
              <div className={styles.skillsEditGrid}>
                {SKILLS_LIST.map(s => (
                  <label key={s.key} className={`${styles.skillEditCard} ${skills[s.key] ? styles.skillEditActive : ''}`}>
                    <input type="checkbox" className={styles.skillHiddenCheck}
                      checked={skills[s.key]} onChange={e => setSkill(s.key, e.target.checked)} />
                    <div className={styles.skillEditBox}>
                      {skills[s.key] && <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>}
                    </div>
                    <div>
                      <div className={styles.skillEditLabel}>{s.label}</div>
                      <div className={styles.skillEditDesc}>{s.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* ── Notification prefs ── */}
            <div className={styles.settingsCard}>
              <h3 className={styles.settingsHead}>Notification preferences</h3>
              {['Order updates & shipping notifications','New product launches & restock alerts','Ritual guides & editorial content','Exclusive member offers & early access'].map(pref => (
                <label key={pref} className={styles.prefRow}>
                  <input type="checkbox" defaultChecked className={styles.prefCheck} />
                  <span>{pref}</span>
                </label>
              ))}
            </div>

            <div className={styles.dangerZone}>
              <h3 className={styles.dangerHead}>Danger zone</h3>
              <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
                Sign out of Aurum Ritual
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
