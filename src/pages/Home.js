import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  const featureGuide = [
    { title: 'First Period Grade (G1)', range: '0 - 20', desc: 'Your initial academic score. This serves as the primary baseline for the prediction model.' },
    { title: 'Past Class Failures', range: '0 - 4', desc: 'Number of previously failed subjects. A value of 0 indicates a consistent passing record.' },
    { title: 'Social Integration', range: '1 - 5', desc: 'Frequency of going out with friends. 1 represents very low activity, while 5 represents very high.' },
    { title: 'Student Age', range: '15 - 22', desc: 'Current age of the student, used to analyze maturity-based learning patterns.' },
    { title: 'Higher Education', range: 'Yes / No', desc: 'Indicates if the student is personally motivated to pursue university or higher studies.' },
    { title: "Mother's Education", range: '0 - 4', desc: "Level of mother's education: 0 (None), 1 (Primary), 2 (5th-9th), 3 (Secondary), 4 (Higher)." },
    { title: "Father's Education", range: '0 - 4', desc: "Level of father's education: 0 (None), 1 (Primary), 2 (5th-9th), 3 (Secondary), 4 (Higher)." },
    { title: 'Guardian Type', range: 'Category', desc: 'Specifies the primary legal guardian for the student (Mother, Father, or Other).' },
    { title: 'School Support', range: 'Yes / No', desc: 'Whether the student receives additional educational assistance from the institution.' },
    { title: 'Enrollment Reason', range: '0 - 3', desc: 'Reason for school choice: 0 (Home proximity), 1 (Reputation), 2 (Course), 3 (Other).' },
    { title: 'Relationship Status', range: 'Yes / No', desc: 'Indicates if the student is currently in any personal commitments, impacting focus and time.' },
    { title: 'Paid Tutoring', range: 'Yes / No', desc: 'Whether the student attends extra paid classes or private coaching for the subject.' },
    { title: 'Total Absences', range: '0 - 93', desc: 'The total number of school days missed. Higher absenteeism increases the risk of failure.' },
  ];

  const guestFeatures = [
    { icon: '🧠', title: 'Predictive Analysis', desc: 'Forecast your academic results using advanced algorithms.' },
    { icon: '📊', title: 'Instant Insights', desc: 'Generate results in real time with constructive performance feedback.' },
    { icon: '🔒', title: 'Encrypted Data', desc: 'Your personal and academic records are protected with high security.' },
    { icon: '📈', title: 'Trend Monitoring', desc: 'Maintain a secure history of your predictions to track improvement.' },
  ];

  if (isLoggedIn) {
    return (
      <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Inter", sans-serif' }}>
        <section style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '800', color: '#1e293b', marginBottom: '15px' }}>
            Welcome back, <span style={{ color: '#4f46e5' }}>{user?.name || 'Student'}</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '850px', margin: '0 auto', lineHeight: '1.6' }}>
            The AI Predictor engine is ready. The system has been trained on 13 key performance indicators. 
            Please review the parameters below to ensure the data you enter is accurate.
          </p>
        </section>

        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#1e293b', fontSize: '1.8rem' }}>
          Understanding the 13 Input Features
        </h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginBottom: '50px' 
        }}>
          {featureGuide.map((item, i) => (
            <div key={i} style={{ 
              background: '#fff', padding: '20px', borderRadius: '16px', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: '1rem', fontWeight: '700' }}>{item.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '10px' }}>
                  {item.desc}
                </p>
              </div>
              <div style={{ 
                alignSelf: 'flex-start', background: '#e0e7ff', color: '#4338ca', 
                padding: '3px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' 
              }}>
                Input Range: {item.range}
              </div>
            </div>
          ))}
        </div>

        <div style={{ 
          textAlign: 'center', background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', 
          padding: '50px 30px', borderRadius: '24px', color: 'white'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>Ready to test the model?</h2>
          <p style={{ opacity: 0.9, marginBottom: '30px' }}>Providing accurate data helps the model achieve a prediction accuracy of 80% or higher.</p>
          <button 
            style={{ 
              background: 'white', color: '#4f46e5', border: 'none', padding: '16px 45px', 
              borderRadius: '12px', fontWeight: '800', cursor: 'pointer', fontSize: '1.1rem'
            }}
            onClick={() => navigate('/predict')}
          >
            Go to Predictor Engine →
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Predict Your<br /><span>Academic Performance</span><br />with AI Precision</h1>
          <p>EduTech analyzes academic factors, socio-economic background, and study habits to provide performance insights.</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => navigate('/register')}>Get Started</button>
            <Link to="/about"><button className="btn-outline">Learn More</button></Link>
          </div>
        </div>
        <div className="hero-image">
          <div style={{ width: 420, height: 380, background: 'linear-gradient(135deg, #7092ef 0%, #dbeafe 100%)', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: '5rem' }}>🎓</div>
            <p style={{ fontWeight: 700, color: '#1E3A8A' }}>EduTech </p>
            <p style={{ fontWeight: 700, color: '#1E3A8A' }}>Student Performance Prediction System </p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose EduTech?</h2>
        <div className="features-grid">
          {guestFeatures.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;