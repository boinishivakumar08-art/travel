'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    seedAndFetch();
  }, []);

  const seedAndFetch = async () => {
    try {
      // Seed the database first
      await fetch(process.env.NEXT_PUBLIC_API_URL + '/seed', { credentials: 'include' });
      // Then fetch packages
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/packages', { credentials: 'include' });
      const data = await res.json();
      if (data.packages) {
        setFeaturedPackages(data.packages.filter(p => p.featured).slice(0, 4));
      }
    } catch (err) {
      console.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero" id="hero-section">
        <div className="hero-bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            🌟 Award-Winning Travel Experiences
          </div>

          <h1 className="hero-title">
            Explore The World&apos;s <br />
            <span className="highlight">Most Beautiful</span> Places
          </h1>

          <p className="hero-subtitle">
            Discover handpicked destinations, luxury stays, and unforgettable adventures.
            Let us craft the journey of your dreams with personalized travel packages.
          </p>

          <div className="hero-buttons">
            <Link href="/packages" className="btn btn-primary btn-lg" id="hero-explore-btn">
              Explore Packages ✨
            </Link>
            <Link href="/contact" className="btn btn-secondary btn-lg" id="hero-contact-btn">
              Contact Us
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Travelers</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Destinations</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">4.9</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="hero-stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" id="features-section">
        <div className="section-header">
          <div className="section-label">Why Choose Us</div>
          <h2 className="section-title">Travel With Confidence</h2>
          <p className="section-subtitle">
            We go beyond ordinary vacations to craft extraordinary journeys
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Curated Destinations</h3>
            <p>Handpicked locations around the globe, from hidden gems to iconic landmarks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3>Premium Experience</h3>
            <p>Luxury accommodations, private tours, and exclusive access to local culture</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>Safe & Secure</h3>
            <p>Travel with peace of mind with our 24/7 support and comprehensive coverage</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Value</h3>
            <p>Competitive pricing with no hidden fees. Price match guarantee on all packages</p>
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="section" id="featured-section">
        <div className="section-header">
          <div className="section-label">Featured Trips</div>
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle">
            Explore our most loved travel packages chosen by thousands of travelers
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="spinner" style={{ width: 40, height: 40, borderWidth: 3 }}></div>
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading amazing destinations...</p>
          </div>
        ) : (
          <>
            <div className="packages-grid">
              {featuredPackages.map((pkg) => (
                <div className="package-card" key={pkg._id}>
                  <div className="package-card-image">
                    <img src={pkg.imageUrl} alt={pkg.title} />
                    <div className="package-card-badge">⭐ Featured</div>
                  </div>
                  <div className="package-card-body">
                    <div className="package-card-destination">
                      📍 {pkg.destination}
                    </div>
                    <h3 className="package-card-title">{pkg.title}</h3>
                    <p className="package-card-desc">{pkg.description}</p>
                    <div className="package-card-meta">
                      <div className="package-card-duration">🕐 {pkg.duration}</div>
                      <div className="package-card-rating">⭐ {pkg.rating}</div>
                    </div>
                    <div className="package-card-footer">
                      <div className="package-card-price">
                        ${pkg.price} <span>/ person</span>
                      </div>
                      <Link href="/packages" className="btn btn-sm btn-primary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <Link href="/packages" className="btn btn-primary btn-lg" id="view-all-btn">
                View All Packages →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '5rem 2rem',
        textAlign: 'center',
        background: 'var(--gradient-card)',
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
      }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, marginBottom: '1rem' }}>
          Ready for Your Next Adventure?
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: 500, margin: '0 auto 2rem' }}>
          Join thousands of happy travelers and start exploring the world today.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/signup" className="btn btn-primary btn-lg">
            Get Started Free 🚀
          </Link>
          <Link href="/contact" className="btn btn-secondary btn-lg">
            Talk to Us
          </Link>
        </div>
      </section>
    </>
  );
}
