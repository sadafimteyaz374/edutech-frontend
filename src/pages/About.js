// About Page
import React from 'react';

const About = () => {
  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)',
        padding: '70px 80px', textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 14 }}>
          About <span style={{ color: '#2563EB' }}>StudentPredict AI</span>
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto' }}>
          We combine cutting-edge machine learning with real educational data to help students and educators
          make informed decisions about academic performance.
        </p>
      </section>

      {/* Main Content */}
      <section className="about-section">
        <div className="about-grid">
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              StudentPredict AI was built to bridge the gap between academic data and actionable insights.
              Using the UCI Student Performance Dataset and advanced machine learning algorithms, our system
              predicts whether a student is likely to pass or fail based on key academic and social factors.
            </p>
            <p>
              Our SVM-based model achieves over 83% accuracy by analyzing 8 carefully selected features
              including first-period grades, study habits, family background, and social behavior.
            </p>
            <p>
              We believe early intervention is key. By identifying at-risk students before final exams,
              educators can provide targeted support that makes a real difference.
            </p>
          </div>
          <div className="about-stats">
            {[
              { num: '83%+', label: 'Prediction Accuracy' },
              { num: '395', label: 'Training Records' },
              { num: '8', label: 'Key Features Used' },
              { num: '4', label: 'ML Algorithms Tested' },
            ].map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-number">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '70px 80px', background: 'white' }}>
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">Our ML pipeline in 4 simple steps</p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 24, maxWidth: 1000, margin: '0 auto'
        }}>
          {[
            { step: '01', title: 'Data Collection', desc: 'Student academic and social data is collected and cleaned' },
            { step: '02', title: 'Feature Selection', desc: '8 most correlated features automatically selected via heatmap analysis' },
            { step: '03', title: 'Model Training', desc: 'SVM, KNN, Random Forest & Naive Bayes trained and evaluated' },
            { step: '04', title: 'Prediction', desc: 'Best model (SVM) predicts pass/fail with confidence score' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#bcc1cb', borderRadius: 16, padding: '28px 22px', textAlign: 'center', color:'black'
            }}>
              <div style={{
                width: 48, height: 48, background: 'linear-gradient(135deg,#1E3A8A,#2563EB)',
                borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 800, fontSize: '1rem', margin: '0 auto 14px'
              }}>{s.step}</div>
              <h3 style={{ fontWeight: 600, marginBottom: 8, fontSize: '1rem' }}>{s.title}</h3>
              <p style={{ color: '#383b3b', fontSize: '0.88rem' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default About;
