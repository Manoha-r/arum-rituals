import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Layout from './components/Layout'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import CollectionsPage from './pages/CollectionsPage'
import ProductsPage from './pages/ProductsPage'
import OurStoryPage from './pages/OurStoryPage'
import IngredientsPage from './pages/IngredientsPage'
import ReviewsPage from './pages/ReviewsPage'
import AccountPage from './pages/AccountPage'
import NotFoundPage from './pages/NotFoundPage'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function PublicOnlyRoute({ children }) {
  const { user } = useAuth()
  return !user ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Routes>
          {/* Public: login + register only when logged out */}
          <Route path="/login" element={
            <PublicOnlyRoute><LoginPage /></PublicOnlyRoute>
          } />
          <Route path="/register" element={
            <PublicOnlyRoute><RegisterPage /></PublicOnlyRoute>
          } />

          {/* Protected: all store routes behind auth */}
          <Route path="/" element={
            <ProtectedRoute><Layout /></ProtectedRoute>
          }>
            <Route index              element={<HomePage />} />
            <Route path="collections" element={<CollectionsPage />} />
            <Route path="products"    element={<ProductsPage />} />
            <Route path="our-story"   element={<OurStoryPage />} />
            <Route path="ingredients" element={<IngredientsPage />} />
            <Route path="reviews"     element={<ReviewsPage />} />
            <Route path="account"     element={<AccountPage />} />
            <Route path="*"           element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </AuthProvider>
  )
}
