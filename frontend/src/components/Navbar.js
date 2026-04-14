'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
      router.refresh();
    } catch (err) {
      console.error('Logout failed');
    }
  };

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          <span className="logo-icon">✈️</span>
          <span className="logo-gradient">Wanderlust</span>
        </Link>

        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          id="nav-toggle"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          <li><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link href="/packages" onClick={() => setMenuOpen(false)}>Packages</Link></li>
          <li><Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
          {user && (
            <li style={{ display: 'none' }}>
              <Link href="/packages" className="mobile-only" onClick={() => setMenuOpen(false)}>
                My Bookings
              </Link>
            </li>
          )}
        </ul>

        <div className={`navbar-auth ${menuOpen ? 'open' : ''}`}>
          {user ? (
            <>
              <div className="navbar-user">
                <div className="user-avatar">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user.username}</span>
              </div>
              <button className="btn btn-sm btn-secondary" onClick={handleLogout} id="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-sm btn-secondary" id="login-btn">
                Login
              </Link>
              <Link href="/signup" className="btn btn-sm btn-primary" id="signup-btn">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
