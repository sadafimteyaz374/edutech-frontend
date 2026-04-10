import React, { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      tempErrors.email = "Invalid email format";
    }

    if (!form.message.trim()) {
      tempErrors.message = "Message is required";
    } else if (form.message.length < 10) {
      tempErrors.message = "Message too short (min 10 chars)";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        if (response.ok) {
          setSent(true);
          setForm({ name: '', email: '', message: '' });
          setErrors({});
          setTimeout(() => setSent(false), 4000);
        } else {
          alert("Error saving to database");
        }
      } catch (err) {
        alert("Server not connected!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg,#f0f4ff 0%,#e8eeff 100%)',
        padding: '70px 80px', textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 14 }}>
          Contact <span style={{ color: '#2563EB' }}>Us</span>
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: 480, margin: '0 auto' }}>
          Have questions? Reach out anytime.
        </p>
      </section>

      <section className="contact-section">
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            {[
              { icon: '✉️', label: 'Email', value: 'sadafimteyaz014@gmail.com' },
              { icon: '📞', label: 'Phone', value: '+91 9142581206 | +91 9514373502' },
              { icon: '📍', label: 'Location', value: 'Hyderabad, Telangana 500032' },
            ].map((item, i) => (
              <div className="contact-item" key={i}>
                <div className="ci-icon">{item.icon}</div>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#1E3A8A', marginBottom: 2 }}>{item.label}</div>
                  <div>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-form-card">
            <h3>Send a Message</h3>
            {sent && (
              <div style={{
                background: '#d1fae5', color: '#065f46', padding: '12px 16px',
                borderRadius: 10, marginBottom: 16, fontSize: '0.9rem', fontWeight: 500
              }}>
                ✅ Message sent to Atlas!
              </div>
            )}
            <div>
              {/* Full Name */}
              <div className="form-field" style={{ marginBottom: 16 }}>
                <label>Full Name</label>
                <input
                  type="text" name="name" placeholder="Enter name first"
                  value={form.name} onChange={handleChange}
                  style={{ 
                    padding: '11px 14px', 
                    border: errors.name ? '1.5px solid #ef4444' : '1.5px solid #e5e7eb', 
                    borderRadius: 8, width: '100%', outline: 'none' 
                  }}
                />
                {errors.name && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.name}</span>}
              </div>

              {/* Email Address - Disabled until Name is filled */}
              <div className="form-field" style={{ marginBottom: 16, opacity: !form.name.trim() ? 0.6 : 1 }}>
                <label>Email Address</label>
                <input
                  type="email" name="email" placeholder="Enter email"
                  value={form.email} onChange={handleChange}
                  disabled={!form.name.trim()} // Sequential Lock
                  style={{ 
                    padding: '11px 14px', 
                    border: errors.email ? '1.5px solid #ef4444' : '1.5px solid #e5e7eb', 
                    borderRadius: 8, width: '100%', outline: 'none',
                    cursor: !form.name.trim() ? 'not-allowed' : 'text'
                  }}
                />
                {errors.email && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.email}</span>}
              </div>

              {/* Message - Disabled until Email is filled */}
              <div className="form-field" style={{ marginBottom: 20, opacity: !form.email.trim() ? 0.6 : 1 }}>
                <label>Message</label>
                <textarea
                  name="message" placeholder="Write your message..." rows={5}
                  value={form.message} onChange={handleChange}
                  disabled={!form.email.trim()} // Sequential Lock
                  style={{
                    padding: '11px 14px', 
                    border: errors.message ? '1.5px solid #ef4444' : '1.5px solid #e5e7eb', 
                    borderRadius: 8, width: '100%', outline: 'none',
                    cursor: !form.email.trim() ? 'not-allowed' : 'text'
                  }}
                />
                {errors.message && <span style={{ color: '#ef4444', fontSize: '0.75rem' }}>{errors.message}</span>}
              </div>

              <button
                className="btn-predict"
                onClick={handleSubmit}
                disabled={loading || !form.message.trim()}
                style={{ marginTop: 0, opacity: (loading || !form.message.trim()) ? 0.7 : 1 }}
              >
                {loading ? 'Sending...' : 'Send Message ✉️'}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;