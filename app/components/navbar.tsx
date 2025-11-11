// app/components/navbar.tsx
'use client'

import { useState } from 'react'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar__inner">
          {/* Logo */}
          <a href="/" className="navbar__logo">
            OrcaTrading
          </a>

          {/* Desktop Navigation */}
          <div className="navbar__desktop">
            <div className="navbar__links">
              <a href="#products" className="navbar__link">Products</a>
              <a href="#pricing" className="navbar__link">Pricing</a>
            </div>
            
            <div className="navbar__auth">
              <a href="/login" className="btn btn--ghost btn--sm">
                Login
              </a>
              <a href="/signup" className="btn btn--primary btn--sm">
                Sign Up
              </a>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="navbar__hamburger"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              // X icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Hamburger icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="navbar__mobile">
            <a href="#products" className="navbar__mobile-link">
              Products
            </a>
            <a href="#pricing" className="navbar__mobile-link">
              Pricing
            </a>
            
            <div className="navbar__mobile-divider" />
            
            <a href="/login" className="btn btn--ghost" style={{ width: '100%' }}>
              Login
            </a>
            <a href="/signup" className="btn btn--primary" style={{ width: '100%' }}>
              Sign Up
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
