# Aurum Ritual — Luxury Wellness Storefront

A production-grade React + Vite storefront for a luxury wellness brand. Built with React Router v6, CSS Modules, and zero external UI dependencies.

---

## ✦ Features

- **Auth-protected routes** — login gate with session persistence, demo credentials included
- **7 full pages** — Home, Collections, Products, Our Story, Ingredients, Reviews, Account
- **Cart system** — add/remove/quantity, subtotal, free shipping progress bar
- **Product modal** — quick view with variant selection and add-to-bag
- **Products page** — live search, price range filter, sort by featured/price/rating
- **Collections page** — filterable by category (Skincare, Supplements, Body, Bundles, Refills)
- **Ingredients page** — expandable cards with clinical detail, filterable by type
- **Reviews page** — star rating breakdown, filterable by product
- **Account page** — tabbed dashboard (Overview, Orders, Wishlist, Settings)
- **Responsive** — mobile-first layout, collapsible nav, optimised for all screen sizes

---

## ⚡ Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Routing | React Router DOM v6 |
| Styling | CSS Modules (zero Tailwind, zero Styled Components) |
| State | React Context (Auth + Cart) |
| Fonts | Cormorant Garamond + DM Sans (Google Fonts) |
| Images | Unsplash (placeholder, swap with real assets) |

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/aurum-ritual.git
cd aurum-ritual

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Demo Login Credentials

| Email | Password | Role |
|---|---|---|
| ritual@aurumritual.com | ritual123 | Customer |
| admin@aurumritual.com | admin123 | Admin |

---

## 📁 Project Structure

```
aurum-ritual/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Router + protected routes
│   ├── styles/
│   │   └── global.css        # Design tokens + shared styles
│   ├── context/
│   │   ├── AuthContext.jsx   # Login/logout/session state
│   │   └── CartContext.jsx   # Cart add/remove/qty state
│   ├── data/
│   │   └── products.js       # 10 products + review data
│   ├── components/
│   │   ├── Layout.jsx        # Header, footer, modal context
│   │   ├── Layout.module.css
│   │   ├── CartSidebar.jsx   # Slide-in cart panel
│   │   ├── CartSidebar.module.css
│   │   ├── ProductModal.jsx  # Quick-view modal
│   │   ├── ProductModal.module.css
│   │   └── ProductCard.jsx   # Reusable product tile
│   └── pages/
│       ├── LoginPage.jsx     # Split-panel auth screen
│       ├── HomePage.jsx      # Hero + trust + collections + products
│       ├── CollectionsPage.jsx
│       ├── ProductsPage.jsx  # Search + filter + sort
│       ├── OurStoryPage.jsx  # Timeline + values + founder
│       ├── IngredientsPage.jsx
│       ├── ReviewsPage.jsx
│       └── AccountPage.jsx   # Tabbed dashboard
```

---

## 🎨 Design System

### Color Tokens (in `global.css`)

```css
--obsidian:  #1C1917   /* Primary — backgrounds, text */
--oro:       #C9A84C   /* Accent — CTAs, highlights */
--oro-lt:    #E8D49A   /* Light gold — on dark surfaces */
--alabaster: #F5F0E8   /* Page background */
--ivory:     #FFFFFF   /* Card backgrounds */
--stone:     #6B6560   /* Secondary text */
--sage:      #3A7C6A   /* Success, eco, clean-label */
--border:    #E2DDD4   /* Borders */
```

### Typography

- **Display / Headings** — Cormorant Garamond (Google Fonts, serif)
- **Body / UI** — DM Sans (Google Fonts, sans-serif)

---

## 🛒 Replacing Demo Data

All product data lives in `src/data/products.js`. To connect a real backend:

1. Replace the static array with an API fetch in each page component
2. Swap `AuthContext` login logic with your real auth endpoint
3. Replace Unsplash image URLs with your CDN paths

---

## 📦 Shopify Integration

To deploy this as a Shopify theme:
- Convert `.jsx` components to Liquid sections with equivalent logic
- Replace `CartContext` with Shopify `cart.js` AJAX API calls
- Map `products.js` schema to Shopify product metafields
- Use Shopify's Online Store 2.0 theme architecture for section blocks

---

## 🔒 Security Notes

- Session stored in `sessionStorage` (clears on tab close)
- No credentials ever hardcoded in production — replace demo users with API auth
- All routes are protected behind the auth guard

---

## 📄 License

MIT — free to use for commercial and personal projects.
