// Footer component
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand */}
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'white' }}>EduTech</span>
          </div>
          <p>EduTech helps you assess student performance using real-time ML-powered predictions. Practice smarter, predict earlier, improve faster.</p>
          
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/feature">Features</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Get in Touch</h4>
          <div className="footer-contact-item">
            <span>✉</span> sadafimteyaz014@gmail.com
          </div>
          <div className="footer-contact-item">
            <span>📞</span> +91 9142581206
            <span>📞</span> +91 9514373502
          </div>
          <div className="footer-contact-item">
            <span>📍</span> Gachibowli, Hyderabad 500032
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 StudentPerformancePredictionSystem EduTech AI. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
