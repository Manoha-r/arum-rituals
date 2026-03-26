import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './RegisterPage.module.css'

const STEPS = ['Account', 'Profile', 'Address', 'Skills']

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'IN', name: 'India' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'SG', name: 'Singapore' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'Other', name: 'Other' },
]

const SKILLS_LIST = [
  { key: 'skillShopifyThemes',  label: 'Shopify Theme Customisation',       desc: 'Dawn, Prestige, Impulse, custom Liquid sections' },
  { key: 'skillLiquid',         label: 'Liquid Templating',                  desc: 'Dynamic product, collection & metafield rendering' },
  { key: 'skillCSS',            label: 'CSS / Responsive Design',             desc: 'Mobile-first layouts, animations, CSS variables' },
  { key: 'skillApps',           label: 'App Integration',                     desc: 'Judge.me, Klaviyo, Vitals, Smile.io, ReConvert' },
  { key: 'skillCRO',            label: 'Conversion Rate Optimisation',         desc: 'A/B testing, trust signals, checkout flows' },
  { key: 'skillSEO',            label: 'SEO & Metadata',                       desc: 'Schema markup, meta titles, sitemaps, alt text' },
]

const EXPERIENCE_LEVELS = [
  { value: '',         label: 'Select experience level' },
  { value: 'beginner', label: 'Beginner (< 1 year)' },
  { value: 'junior',   label: 'Junior (1–2 years)' },
  { value: 'mid',      label: 'Mid-level (2–4 years)' },
  { value: 'senior',   label: 'Senior (4+ years)' },
  { value: 'expert',   label: 'Expert / Lead (6+ years)' },
]

export default function RegisterPage() {
  const { register, error, loading, setError } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [localError, setLocalError] = useState('')

  const [form, setForm] = useState({
    // Step 0 — Account
    email: '', password: '', confirmPassword: '', agreeTerms: false,
    // Step 1 — Profile
    firstName: '', lastName: '', phone: '', dob: '', gender: '', experience: '', bio: '',
    // Step 2 — Address
    addressLine1: '', addressLine2: '', city: '', state: '', zip: '', country: 'US',
    // Step 3 — Skills
    skillShopifyThemes: false, skillLiquid: false, skillCSS: false,
    skillApps: false, skillCRO: false, skillSEO: false,
  })

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    setLocalError('')
    setError('')
  }

  // ── Per-step validation ──────────────────────────────────────
  function validateStep() {
    if (step === 0) {
      if (!form.email)            return 'Email address is required.'
      if (!/\S+@\S+\.\S+/.test(form.email)) return 'Please enter a valid email.'
      if (!form.password)         return 'Password is required.'
      if (form.password.length < 8) return 'Password must be at least 8 characters.'
      if (form.password !== form.confirmPassword) return 'Passwords do not match.'
      if (!form.agreeTerms)       return 'You must agree to the Terms & Privacy Policy.'
    }
    if (step === 1) {
      if (!form.firstName.trim()) return 'First name is required.'
      if (!form.lastName.trim())  return 'Last name is required.'
      if (!form.phone.trim())     return 'Phone number is required.'
    }
    if (step === 2) {
      if (!form.addressLine1.trim()) return 'Street address is required.'
      if (!form.city.trim())      return 'City is required.'
      if (!form.zip.trim())       return 'Postcode / ZIP is required.'
    }
    return null
  }

  function nextStep() {
    const err = validateStep()
    if (err) { setLocalError(err); return }
    setLocalError('')
    setStep(s => s + 1)
    window.scrollTo(0, 0)
  }

  function prevStep() { setStep(s => s - 1); setLocalError(''); setError('') }

  async function handleSubmit(e) {
    e.preventDefault()
    const result = await register(form)
    if (result.ok) navigate('/')
  }

  const displayError = localError || error

  // ── Eye icon ──────────────────────────────────────────────────
  const EyeIcon = ({ open }) => open
    ? <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22"/></svg>
    : <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>

  return (
    <div className={styles.root}>
      {/* Left panel */}
      <div className={styles.left}>
        <div className={styles.leftBg} />
        <div className={styles.leftContent}>
          <div className={styles.leftLogo}>Aurum <span>✦</span> Ritual</div>
          <div className={styles.leftHeading}>
            Begin your<br /><em>ritual journey.</em>
          </div>
          <ul className={styles.perks}>
            {[
              ['✦', 'Exclusive member pricing on every product'],
              ['◎', 'Early access to new formulations'],
              ['❋', 'Free delivery on orders over ₹120'],
              ['★', 'Ritual points on every purchase'],
              ['◈', 'Personalised wellness recommendations'],
            ].map(([icon, text]) => (
              <li key={text}><span>{icon}</span>{text}</li>
            ))}
          </ul>
          <div className={styles.leftFooter}>Already a member?&ensp;<Link to="/login">Sign in →</Link></div>
        </div>
      </div>

      {/* Right panel */}
      <div className={styles.right}>
        <div className={styles.formWrap}>
          <div className={styles.mobileLogo}>Aurum <span>✦</span> Ritual</div>

          {/* Step progress */}
          <div className={styles.stepProgress}>
            {STEPS.map((label, i) => (
              <React.Fragment key={label}>
                <div className={`${styles.stepDot} ${i < step ? styles.stepDone : i === step ? styles.stepActive : ''}`}>
                  {i < step
                    ? <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                    : i + 1}
                </div>
                <div className={`${styles.stepLabel} ${i === step ? styles.stepLabelActive : ''}`}>{label}</div>
                {i < STEPS.length - 1 && <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ''}`} />}
              </React.Fragment>
            ))}
          </div>

          <p className={styles.eyebrow}>Step {step + 1} of {STEPS.length}</p>
          <h1 className={styles.heading}>
            {step === 0 && <>Create your <em>account</em></>}
            {step === 1 && <>Tell us about <em>yourself</em></>}
            {step === 2 && <>Your <em>delivery address</em></>}
            {step === 3 && <>Your <em>skills & expertise</em></>}
          </h1>

          {displayError && <div className={styles.errorBanner}>{displayError}</div>}

          <form onSubmit={step === STEPS.length - 1 ? handleSubmit : e => { e.preventDefault(); nextStep() }}>

            {/* ── STEP 0: Account ── */}
            {step === 0 && (
              <div className={styles.fields}>
                <div className={styles.field}>
                  <label className={styles.label}>Email address <span className={styles.req}>*</span></label>
                  <input className={styles.input} type="email" value={form.email}
                    onChange={e => set('email', e.target.value)}
                    placeholder="you@example.com" autoFocus required />
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Password <span className={styles.req}>*</span></label>
                    <div className={styles.passWrap}>
                      <input className={styles.input} type={showPass ? 'text' : 'password'}
                        value={form.password} onChange={e => set('password', e.target.value)}
                        placeholder="Min. 8 characters" required />
                      <button type="button" className={styles.passToggle} onClick={() => setShowPass(v => !v)}>
                        <EyeIcon open={showPass} />
                      </button>
                    </div>
                    {form.password && (
                      <div className={styles.strengthRow}>
                        <div className={styles.strengthBar}>
                          {[1,2,3,4].map(n => (
                            <div key={n} className={`${styles.strengthSeg} ${
                              form.password.length >= n * 3 && n <= 2 ? styles.strengthWeak :
                              form.password.length >= 8 && n <= 3    ? styles.strengthGood :
                              form.password.length >= 12              ? styles.strengthStrong : ''
                            }`} />
                          ))}
                        </div>
                        <span className={styles.strengthLabel}>
                          {form.password.length < 6 ? 'Too short' : form.password.length < 8 ? 'Weak' : form.password.length < 12 ? 'Good' : 'Strong'}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Confirm password <span className={styles.req}>*</span></label>
                    <div className={styles.passWrap}>
                      <input className={styles.input} type={showConfirm ? 'text' : 'password'}
                        value={form.confirmPassword} onChange={e => set('confirmPassword', e.target.value)}
                        placeholder="Repeat password" required />
                      <button type="button" className={styles.passToggle} onClick={() => setShowConfirm(v => !v)}>
                        <EyeIcon open={showConfirm} />
                      </button>
                    </div>
                    {form.confirmPassword && form.password !== form.confirmPassword && (
                      <span className={styles.fieldError}>Passwords don't match</span>
                    )}
                    {form.confirmPassword && form.password === form.confirmPassword && form.password.length >= 8 && (
                      <span className={styles.fieldOk}>✓ Passwords match</span>
                    )}
                  </div>
                </div>

                <label className={styles.checkRow}>
                  <input type="checkbox" checked={form.agreeTerms} onChange={e => set('agreeTerms', e.target.checked)} />
                  <span>I agree to the <a href="#" className={styles.inlineLink}>Terms of Service</a> and <a href="#" className={styles.inlineLink}>Privacy Policy</a> <span className={styles.req}>*</span></span>
                </label>

                <label className={styles.checkRow}>
                  <input type="checkbox" checked={form.marketingOptIn} onChange={e => set('marketingOptIn', e.target.checked)} />
                  <span>Subscribe to new products, ritual guides, and exclusive offers</span>
                </label>
              </div>
            )}

            {/* ── STEP 1: Profile ── */}
            {step === 1 && (
              <div className={styles.fields}>
                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>First name <span className={styles.req}>*</span></label>
                    <input className={styles.input} type="text" value={form.firstName}
                      onChange={e => set('firstName', e.target.value)} placeholder="Jane" autoFocus required />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Last name <span className={styles.req}>*</span></label>
                    <input className={styles.input} type="text" value={form.lastName}
                      onChange={e => set('lastName', e.target.value)} placeholder="Smith" required />
                  </div>
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Phone number <span className={styles.req}>*</span></label>
                    <input className={styles.input} type="tel" value={form.phone}
                      onChange={e => set('phone', e.target.value)} placeholder="+1 555 123 4567" required />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Date of birth</label>
                    <input className={styles.input} type="date" value={form.dob}
                      onChange={e => set('dob', e.target.value)}
                      max={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Gender</label>
                    <select className={styles.select} value={form.gender} onChange={e => set('gender', e.target.value)}>
                      <option value="">Prefer not to say</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="nonbinary">Non-binary</option>
                      <option value="prefer-not">Prefer not to say</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Experience level</label>
                    <select className={styles.select} value={form.experience} onChange={e => set('experience', e.target.value)}>
                      {EXPERIENCE_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Short bio <span className={styles.optional}>(optional)</span></label>
                  <textarea className={styles.textarea} value={form.bio}
                    onChange={e => set('bio', e.target.value)}
                    placeholder="Tell us about yourself — your background, interests, or what brings you to Aurum Ritual..."
                    rows={3} maxLength={300} />
                  <span className={styles.charCount}>{form.bio.length} / 300</span>
                </div>
              </div>
            )}

            {/* ── STEP 2: Address ── */}
            {step === 2 && (
              <div className={styles.fields}>
                <div className={styles.field}>
                  <label className={styles.label}>Street address <span className={styles.req}>*</span></label>
                  <input className={styles.input} type="text" value={form.addressLine1}
                    onChange={e => set('addressLine1', e.target.value)}
                    placeholder="123 Wellness Avenue" autoFocus required />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Apartment, suite, etc. <span className={styles.optional}>(optional)</span></label>
                  <input className={styles.input} type="text" value={form.addressLine2}
                    onChange={e => set('addressLine2', e.target.value)}
                    placeholder="Apt 4B" />
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>City <span className={styles.req}>*</span></label>
                    <input className={styles.input} type="text" value={form.city}
                      onChange={e => set('city', e.target.value)} placeholder="New York" required />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>State / Province</label>
                    <input className={styles.input} type="text" value={form.state}
                      onChange={e => set('state', e.target.value)} placeholder="NY" />
                  </div>
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Postcode / ZIP <span className={styles.req}>*</span></label>
                    <input className={styles.input} type="text" value={form.zip}
                      onChange={e => set('zip', e.target.value)} placeholder="10001" required />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Country</label>
                    <select className={styles.select} value={form.country} onChange={e => set('country', e.target.value)}>
                      {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className={styles.infoBox}>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
                  Your address is used for order delivery only. You can update it anytime in your account.
                </div>
              </div>
            )}

            {/* ── STEP 3: Skills ── */}
            {step === 3 && (
              <div className={styles.fields}>
                <p className={styles.skillsIntro}>
                  Select every area you're confident working in. This helps us personalise your Aurum Ritual experience and, if you're applying for a role, gives our team a clear picture of your strengths.
                </p>

                <div className={styles.skillsGrid}>
                  {SKILLS_LIST.map(skill => (
                    <label
                      key={skill.key}
                      className={`${styles.skillCard} ${form[skill.key] ? styles.skillCardActive : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={form[skill.key]}
                        onChange={e => set(skill.key, e.target.checked)}
                        className={styles.skillCheck}
                      />
                      <div className={styles.skillCardCheck}>
                        {form[skill.key] && (
                          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                        )}
                      </div>
                      <div className={styles.skillCardContent}>
                        <div className={styles.skillCardLabel}>{skill.label}</div>
                        <div className={styles.skillCardDesc}>{skill.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className={styles.skillsSummary}>
                  <span className={styles.skillsBadge}>
                    {Object.values({ a: form.skillShopifyThemes, b: form.skillLiquid, c: form.skillCSS, d: form.skillApps, e: form.skillCRO, f: form.skillSEO }).filter(Boolean).length}
                    &nbsp;/ 6 skills selected
                  </span>
                  <span className={styles.skillsNote}>You can update these anytime in your Account settings.</span>
                </div>
              </div>
            )}

            {/* ── Navigation buttons ── */}
            <div className={styles.navRow}>
              {step > 0 && (
                <button type="button" className={styles.backBtn} onClick={prevStep}>
                  ← Back
                </button>
              )}
              <button
                type="submit"
                className={styles.nextBtn}
                disabled={loading}
                style={{ marginLeft: step === 0 ? 'auto' : undefined }}
              >
                {loading
                  ? <span className={styles.spinner} />
                  : step === STEPS.length - 1 ? 'Create my account' : `Continue →`}
              </button>
            </div>
          </form>

          <p className={styles.loginLink}>
            Already have an account?&ensp;<Link to="/login" className={styles.loginAnchor}>Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
