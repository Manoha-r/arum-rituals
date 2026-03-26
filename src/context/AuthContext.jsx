import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY   = 'aurum_users'
const SESSION_KEY   = 'aurum_user'

// Seed demo accounts into localStorage on first load
function seedUsers() {
  const existing = getUsers()
  const seeds = [
    {
      id: 'demo-1',
      email: 'ritual@aurumritual.com',
      password: 'ritual123',
      firstName: 'Ritual',
      lastName: 'User',
      phone: '+1 555 000 0001',
      dob: '1990-06-15',
      gender: 'prefer-not',
      address: { line1: '123 Wellness Ave', city: 'New York', state: 'NY', zip: '10001', country: 'US' },
      skills: { shopifyThemes: true, liquidTemplating: true, cssCustomisation: true, appIntegration: false, conversionOptimisation: false, seoMetadata: true },
      role: 'customer',
      createdAt: '2024-01-10',
      avatar: '',
    },
    {
      id: 'demo-2',
      email: 'admin@aurumritual.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: '',
      phone: '+1 555 000 0002',
      dob: '1985-03-22',
      gender: 'male',
      address: { line1: '1 Admin Plaza', city: 'San Francisco', state: 'CA', zip: '94102', country: 'US' },
      skills: { shopifyThemes: true, liquidTemplating: true, cssCustomisation: true, appIntegration: true, conversionOptimisation: true, seoMetadata: true },
      role: 'admin',
      createdAt: '2023-08-01',
      avatar: '',
    },
  ]
  seeds.forEach(s => {
    if (!existing.find(u => u.email === s.email)) existing.push(s)
  })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
}

function getUsers() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [] } catch { return [] }
}
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

seedUsers()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)) } catch { return null }
  })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  // ── LOGIN ──────────────────────────────────────────────────────
  async function login(email, password) {
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 700))
    const users = getUsers()
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (found) {
      const { password: _pw, ...safe } = found
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(safe))
      setUser(safe); setLoading(false); return { ok: true }
    }
    setError('Incorrect email or password. Please try again.')
    setLoading(false); return { ok: false }
  }

  // ── REGISTER ───────────────────────────────────────────────────
  async function register(fields) {
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 800))
    const users = getUsers()
    if (users.find(u => u.email.toLowerCase() === fields.email.toLowerCase())) {
      setError('An account with this email already exists.')
      setLoading(false); return { ok: false }
    }
    const newUser = {
      id: `usr-${Date.now()}`,
      email: fields.email,
      password: fields.password,
      firstName: fields.firstName,
      lastName: fields.lastName,
      phone: fields.phone || '',
      dob: fields.dob || '',
      gender: fields.gender || '',
      address: {
        line1: fields.addressLine1 || '',
        city: fields.city || '',
        state: fields.state || '',
        zip: fields.zip || '',
        country: fields.country || 'US',
      },
      skills: {
        shopifyThemes:          !!fields.skillShopifyThemes,
        liquidTemplating:       !!fields.skillLiquid,
        cssCustomisation:       !!fields.skillCSS,
        appIntegration:         !!fields.skillApps,
        conversionOptimisation: !!fields.skillCRO,
        seoMetadata:            !!fields.skillSEO,
      },
      role: 'customer',
      createdAt: new Date().toISOString().split('T')[0],
      avatar: '',
    }
    users.push(newUser)
    saveUsers(users)
    const { password: _pw, ...safe } = newUser
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(safe))
    setUser(safe); setLoading(false); return { ok: true }
  }

  // ── UPDATE PROFILE ─────────────────────────────────────────────
  async function updateProfile(fields) {
    setLoading(true)
    await new Promise(r => setTimeout(r, 500))
    const users = getUsers()
    const idx   = users.findIndex(u => u.id === user.id)
    if (idx === -1) { setLoading(false); return { ok: false } }
    const updated = { ...users[idx], ...fields }
    users[idx] = updated
    saveUsers(users)
    const { password: _pw, ...safe } = updated
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(safe))
    setUser(safe); setLoading(false); return { ok: true }
  }

  // ── LOGOUT ─────────────────────────────────────────────────────
  function logout() {
    sessionStorage.removeItem(SESSION_KEY)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, error, loading, setError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
