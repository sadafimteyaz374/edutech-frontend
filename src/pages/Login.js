import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setLoading(true);
    try {
      // Yeh Flask backend ke /api/login route se data verify karega
      const res = await api.login(form);
      if (res.error) {
        setError(res.error);
      } else {
        login(res.user, res.token);
        navigate('/predict');
      }
    } catch {
      setError('Unable to connect to server. Please check your Atlas connection.');
    } finally {
      setLoading(false);
    }
  };

  // Logic: Jab tak valid email na ho, password lock rahega
  const isEmailEntered = form.email.trim().length > 0 && form.email.includes('@');

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome back!</h2>
        <p className="auth-subtitle">Please Log in to your account</p>

        {error && <div className="error-msg">{error}</div>}

        {/* 1. Email Address - Always Enabled */}
        <div className="input-group">
          <span className="input-icon">✉</span>
          <input
            type="email" 
            name="email" 
            placeholder="Email Address"
            value={form.email} 
            onChange={handleChange}
          />
        </div>

        {/* 2. Password - Locked until Email is entered */}
        <div className={`input-group ${!isEmailEntered ? 'disabled-input' : ''}`}>
          <span className="input-icon">🔒</span>
          <input
            type="password" 
            name="password" 
            placeholder="Password"
            value={form.password} 
            onChange={handleChange}
            disabled={!isEmailEntered}
            onKeyDown={(e) => e.key === 'Enter' && isEmailEntered && handleSubmit(e)}
          />
        </div>

        <button 
          className="btn-auth" 
          onClick={handleSubmit} 
          disabled={loading || !form.password}
          style={{ opacity: (loading || !form.password) ? 0.7 : 1 }}
        >
          {loading ? <><span className="loading-spinner" />Logging in...</> : 'Login'}
        </button>

        <div className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
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
      `}</style>
    </div>
  );
};

export default Login;