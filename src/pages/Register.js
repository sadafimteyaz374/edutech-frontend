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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final Validation before sending to Atlas
    if (!form.name || !form.email || !form.password) {
      setError('Name, email and password are required.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      // Yeh aapke Flask ke /api/register route ko hit karega
      const res = await api.register(form);
      if (res.error) {
        setError(res.error);
      } else {
        login(res.user, res.token);
        navigate('/predict');
      }
    } catch {
      setError('Unable to connect to Atlas. Check if Flask is running.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check sequence
  const isNameFilled = form.name.trim().length > 0;
  const isEmailFilled = form.email.trim().length > 0 && form.email.includes('@');
  const isCourseFilled = form.course.trim().length > 0;
  const isYearFilled = form.year.trim().length > 0;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Boost your journey with StudentPredict AI</p>

        {error && <div className="error-msg">{error}</div>}

        {/* 1. Full Name - Always Enabled */}
        <div className="input-group">
          <span className="input-icon">👤</span>
          <input
            type="text" name="name" placeholder="Full Name"
            value={form.name} onChange={handleChange}
          />
        </div>

        {/* 2. Email - Locked until Name is entered */}
        <div className={`input-group ${!isNameFilled ? 'disabled-input' : ''}`}>
          <span className="input-icon">✉</span>
          <input
            type="email" name="email" placeholder="Email"
            value={form.email} onChange={handleChange}
            disabled={!isNameFilled}
          />
        </div>

        {/* 3. Course - Locked until Email is entered */}
        <div className={`input-group ${!isEmailFilled ? 'disabled-input' : ''}`}>
          <span className="input-icon">🎓</span>
          <input
            type="text" name="course" placeholder="Course (e.g., B.Tech)"
            value={form.course} onChange={handleChange}
            disabled={!isEmailFilled}
          />
        </div>

        {/* 4. Year - Locked until Course is entered */}
        <div className={`input-group ${!isCourseFilled ? 'disabled-input' : ''}`}>
          <span className="input-icon">📅</span>
          <input
            type="text" name="year" placeholder="Year (e.g., 2nd Year)"
            value={form.year} onChange={handleChange}
            disabled={!isCourseFilled}
          />
        </div>

        {/* 5. Password - Locked until Year is entered */}
        <div className={`input-group ${!isYearFilled ? 'disabled-input' : ''}`}>
          <span className="input-icon">🔒</span>
          <input
            type="password" name="password" placeholder="Password"
            value={form.password} onChange={handleChange}
            disabled={!isYearFilled}
          />
        </div>

        <button 
          className="btn-auth" 
          onClick={handleSubmit} 
          disabled={loading || !form.password || form.password.length < 6}
          style={{ opacity: (loading || !form.password) ? 0.7 : 1 }}
        >
          {loading ? <><span className="loading-spinner" />Creating account...</> : 'Create Account'}
        </button>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>

      {/* Chota sa CSS fix inline agar aapki CSS file me nahi hai */}
      <style>{`
        .disabled-input {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .disabled-input input {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default Register;