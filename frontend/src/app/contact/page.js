'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <>
      <div className="page-header" id="contact-header">
        <h1>Get In Touch</h1>
        <p>We&apos;d love to hear from you. Reach out for any questions or inquiries.</p>
      </div>

      <div className="contact-section" id="contact-section">
        <div className="contact-grid">
          {/* Left Column - Info */}
          <div className="contact-info">
            <h1>Let&apos;s Plan Your <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Dream Trip</span></h1>
            <p>
              Whether you have a question about our packages, need help planning a custom trip,
              or just want to say hello — our team is here to help you every step of the way.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-item-icon">📍</div>
                <div className="contact-item-text">
                  <h3>Our Office</h3>
                  <p>123 Travel Street, Adventure City, AC 10001</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">📧</div>
                <div className="contact-item-text">
                  <h3>Email Us</h3>
                  <p>hello@wanderlust.travel</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">📞</div>
                <div className="contact-item-text">
                  <h3>Call Us</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-item-icon">⏰</div>
                <div className="contact-item-text">
                  <h3>Working Hours</h3>
                  <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-form-card" id="contact-form-card">
            <h2>Send us a Message</h2>

            {submitted && (
              <div className="form-success">
                🎉 Message sent successfully! We&apos;ll get back to you within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-name">Full Name</label>
                <input
                  className="form-input"
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-email">Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Subject</label>
                <input
                  className="form-input"
                  type="text"
                  id="contact-subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Message</label>
                <textarea
                  className="form-input"
                  id="contact-message"
                  name="message"
                  placeholder="Tell us about your dream trip..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
                id="contact-submit-btn"
              >
                Send Message ✈️
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
