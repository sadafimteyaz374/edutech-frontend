import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', course: '', year: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required.";
    if (email.length > 254) return "Email is too long.";
    
    const parts = email.split('@');
    if (parts.length !== 2) return "Invalid email format.";
    if (parts[0].length > 64) return "Local part of email is too long.";

    const strictEmailRegex = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_\-\.]+)[A-Za-z0-9]@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
    if (!strictEmailRegex.test(email)) return "Please enter a valid email address (e.g., name@domain.com).";

    const disposableDomains = ['mailinator.com', '10minutemail.com', 'tempmail.com'];
    const domain = parts[1].toLowerCase();
    if (disposableDomains.includes(domain)) return "Disposable email addresses are not allowed.";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.password) {
      setError('Name, email and password are required.');
      return;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(form.name)) {
      setError('Name should only contain letters.');
      return;
    }

    const emailError = validateEmail(form.email);
    if (emailError) {
      setError(emailError);
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.register(form);
      if (res.error) {
        setError(res.error);
      } else {
        login(res.user, res.token);
        navigate('/home');
      }
    } catch {
      setError('Unable to connect to database.');
    } finally {
      setLoading(false);
    }
  };

  const isNameValid = form.name.trim().length > 0 && /^[A-Za-z\s]+$/.test(form.name);
  const isEmailValid = /^(?!\.)(?!.*\.\.)([A-Za-z0-9_\-\.]+)[A-Za-z0-9]@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/.test(form.email);
  const isCourseFilled = form.course.trim().length > 0;
  const isYearFilled = form.year.trim().length > 0;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Boost your journey with EduTech</p>

        {error && <div className="error-msg" style={{ 
          backgroundColor: '#fee2e2', 
          color: '#dc2626', 
          padding: '10px', 
          borderRadius: '8px', 
          marginBottom: '15px', 
          fontSize: '0.85rem' 
        }}>{error}</div>}

        <div className="input-group">
          <span className="input-icon">👤</span>
          <input
            type="text" name="name" placeholder="Full Name"
            value={form.name} onChange={handleChange}
          />
        </div>
        
        <div className={`input-group ${!isNameValid ? 'disabled-input' : ''}`}>
          <span className="input-icon">✉</span>
          <input
            type="email" name="email" placeholder="Email Address"
            value={form.email} onChange={handleChange}
            disabled={!isNameValid}
          />
        </div>

        <div className={`input-group ${!isEmailValid ? 'disabled-input' : ''}`}>
          <span className="input-icon">🎓</span>
          <input
            type="text" name="course" placeholder="Course (e.g., B.Tech)"
            value={form.course} onChange={handleChange}
            disabled={!isEmailValid}
          />
        </div>

        <div className={`input-group ${!isCourseFilled ? 'disabled-input' : ''}`}>
          <span className="input-icon">📅</span>
          <input
            type="text" name="year" placeholder="Year (e.g., 2nd Year)"
            value={form.year} onChange={handleChange}
            disabled={!isCourseFilled}
          />
        </div>

        <div className={`input-group ${!isYearFilled ? 'disabled-input' : ''}`}>
          <span className="input-icon">🔒</span>
          <input
            type="password" name="password" placeholder="Password (min 6 characters)"
            value={form.password} onChange={handleChange}
            disabled={!isYearFilled}
          />
        </div>

        <button 
          className="btn-auth" 
          onClick={handleSubmit} 
          disabled={loading || !form.password || form.password.length < 6}
          style={{ 
            opacity: (loading || !form.password || form.password.length < 6) ? 0.7 : 1,
            cursor: (loading || !form.password || form.password.length < 6) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? <><span className="loading-spinner" />Creating account...</> : 'Create Account'}
        </button>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>

      <style>{`
        .disabled-input {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .disabled-input input {
          pointer-events: none;
        }
        .error-msg {
          border: 1px solid #fecdd3;
          animation: shake 0.2s ease-in-out;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default Register;