'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function PackagesPage() {
  const { user } = useAuth();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookedIds, setBookedIds] = useState(new Set());
  const [toast, setToast] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(null);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      // Seed DB and fetch packages
      await fetch('https://travel-x2dx.onrender.com/api/seed', { 
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      const pkgRes = await fetch('https://travel-x2dx.onrender.com/api/packages', { 
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' }
      });
      const pkgData = await pkgRes.json();

      if (pkgData.packages) setPackages(pkgData.packages);

      // Only fetch bookings if user is logged in
      if (user) {
        const bookingRes = await fetch('https://travel-x2dx.onrender.com/api/bookings', { 
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        if (bookingRes.ok) {
          const bookingData = await bookingRes.json();
          if (bookingData.bookings) {
            setBookedIds(new Set(bookingData.bookings.map(b => b.packageId)));
          }
        }
      } else {
        // Clear booked IDs if no user
        setBookedIds(new Set());
      }
    } catch (err) {
      console.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleBook = async (pkg) => {
    if (!user) {
      showToast('Please login to book a package!', 'error');
      return;
    }

    setBookingLoading(pkg._id);

    try {
      const res = await fetch('https://travel-x2dx.onrender.com/api/bookings', { 
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: pkg._id,
          packageTitle: pkg.title,
          packagePrice: pkg.price,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast(data.error || 'Failed to book', 'error');
        return;
      }

      setBookedIds(prev => new Set([...prev, pkg._id]));
      showToast(`🎉 ${pkg.title} booked successfully!`, 'success');
    } catch (err) {
      showToast('Network error. Please try again.', 'error');
    } finally {
      setBookingLoading(null);
    }
  };

  return (
    <>
      <div className="page-header" id="packages-header">
        <h1>Travel Packages</h1>
        <p>Find your perfect getaway from our curated collection</p>
      </div>

      <section className="section" id="packages-section">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div className="spinner" style={{ width: 48, height: 48, borderWidth: 3 }}></div>
            <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              Loading incredible destinations...
            </p>
          </div>
        ) : packages.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏝️</p>
            <h3 style={{ marginBottom: '0.5rem' }}>No packages available yet</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Check back soon for amazing destinations!</p>
          </div>
        ) : (
          <div className="packages-grid">
            {packages.map((pkg) => {
              const isBooked = bookedIds.has(pkg._id);
              const isLoadingThis = bookingLoading === pkg._id;

              return (
                <div className="package-card" key={pkg._id} id={`package-${pkg._id}`}>
                  <div className="package-card-image">
                    <img src={pkg.imageUrl} alt={pkg.title} />
                    {pkg.featured && <div className="package-card-badge">⭐ Featured</div>}
                  </div>
                  <div className="package-card-body">
                    <div className="package-card-destination">📍 {pkg.destination}</div>
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
                      {isBooked ? (
                        <div className="booked-badge">✅ Booked</div>
                      ) : (
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleBook(pkg)}
                          disabled={isLoadingThis}
                        >
                          {isLoadingThis ? <span className="spinner"></span> : 'Book Now'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Toast notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`} id="toast-notification">
          {toast.message}
        </div>
      )}
    </>
  );
}
