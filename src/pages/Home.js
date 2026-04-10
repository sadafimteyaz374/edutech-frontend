// Home Page - Hero + Features sections
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const features = [
    { icon: '🧠', title: 'ML-Powered Prediction', desc: 'Uses SVM algorithm trained on real student data with 83%+ accuracy to predict pass or fail.' },
    { icon: '📊', title: 'Instant Results', desc: 'Get predictions in seconds with confidence scores and personalized feedback messages.' },
    { icon: '🔒', title: 'Secure & Private', desc: 'Your data is stored securely. Only you can access your prediction history.' },
    { icon: '📈', title: 'Track Progress', desc: 'View your prediction history to monitor trends and performance over time.' },
  ];

  return (
    <>
      
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Predict Your<br />
            <span>Academic Performance</span><br />
            with AI Confidence
          </h1>
          <p>
            StudentPredict AI analyzes key academic factors grades, study habits, family background
            and more. To help you understand your performance before exams arrive.
          </p>
          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate(isLoggedIn ? '/predict' : '/register')}
            >
              Get Started 
            </button>
            <Link to="/about">
              <button className="btn-outline">Learn More</button>
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <div style={{
            width: 420, height: 380,
            background: 'linear-gradient(135deg, #7092ef 0%, #dbeafe 100%)',
            borderRadius: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 16, boxShadow: '0 16px 60px rgba(30,58,138,0.12)'
          }}>
            <div style={{ fontSize: '5rem' }}>🎓</div>
            <div style={{ textAlign: 'center', padding: '0 32px' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1E3A8A' }}>Smart Academic Predictions</p>
              <p style={{ fontSize: '0.88rem', color: '#6b7280', marginTop: 6 }}>8 key features · SVM algorithm · 83%+ accuracy</p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              {['📚 Study', '📝 Grades', '👨‍👩‍👧 Family'].map(tag => (
                <span key={tag} style={{
                  background: 'white', padding: '5px 12px', borderRadius: 20,
                  fontSize: '0.78rem', fontWeight: 600, color: '#2563EB',
                  boxShadow: '0 2px 8px rgba(30,58,138,0.12)'
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why EduTech?</h2>
        <p className="section-subtitle">Built with real student data and proven machine learning algorithms</p>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #8a9fd6 0%, #2563EB 100%)',
        padding: '60px 80px', textAlign: 'center', color: 'white'
      }}>
        
      </section>
    </>
  );
};

export default Home;
