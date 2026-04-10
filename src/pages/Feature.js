// Feature Page - Showcases AI features
import React from 'react';

const Feature = () => {
  const features = [
    {
      title: 'SVM Algorithm',
      desc: 'Support Vector Machine delivers 83%+ accuracy on student pass/fail classification.',
      tag: 'Core Model'
    },
    {
      title: 'Correlation Heatmap',
      desc: 'Automatically identifies the 8 most impactful features from 30+ variables using Pearson correlation analysis.no manual selection needed.',
      tag: 'Feature Selection'
    },
    {
      title: 'Multi-Model Comparison',
      desc: 'Trains and evaluates SVM, KNN, Random Forest, and Naive Bayes simultaneously, then selects the highest-accuracy model automatically.',
      tag: 'Model Selection'
    },
    {
      title: 'Confidence Score',
      desc: 'Every prediction includes a confidence percentage so students understand how certain the model is about their predicted outcome.',
      tag: 'Explainability'
    },
    {
      title: 'Prediction History',
      desc: 'All predictions are saved to your account so you can track changes over time and monitor academic improvement.',
      tag: 'Persistence'
    },
    {
      title: 'Secure Authentication',
      desc: 'Password hashing and token-based authentication keep your data safe. Only you can access your prediction records.',
      tag: 'Security'
    },
  ];

  const models = [
    { name: 'SVM', acc: 83.5, color: '#FF6D00' },
    { name: 'KNN', acc: 77.2, color: '#2563EB' },
    { name: 'Random Forest', acc: 77.2, color: '#2563EB' },
    { name: 'Naive Bayes', acc: 75.9, color: '#2563EB' },
  ];

  return (
    <>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg,#f0f4ff 0%,#e8eeff 100%)',
        padding: '70px 80px', textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 14 }}>
          <span style={{ color: '#2563EB' }}>Features</span>
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: 520, margin: '0 auto' }}>
          Explore the machine learning capabilities that power EduTech accurate performance predictions.
        </p>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '70px 80px', background: 'white' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 28, maxWidth: 1100, margin: '0 auto'
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: '#d1d6e2', border: '1.5px solid #e8eeff',
              borderRadius: 16, padding: '28px 26px',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(30,58,138,0.10)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                <span style={{ fontSize: '2rem' }}>{f.icon}</span>
                <span style={{
                  background: '#dbeafe', color: '#1d4ed8', padding: '3px 10px',
                  borderRadius: 20, fontSize: '0.75rem', fontWeight: 600
                }}>{f.tag}</span>
              </div>
              <h3 style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: '#43474f', fontSize: '0.88rem', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Model Accuracy Chart */}
      <section style={{ padding: '60px 80px', background: '#f0f4ff' }}>
        <h2 className="section-title">Model Accuracy Comparison</h2>
        <p className="section-subtitle">Results on the UCI Student Performance dataset</p>
        <div style={{ maxWidth: 700, margin: '40px auto 0', background: 'white', borderRadius: 18, padding: '36px 40px', boxShadow: '0 4px 24px rgba(30,58,138,0.08)' }}>
          {models.map((m, i) => (
            <div key={i} style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                  {i === 0 && <span style={{ background: '#fff3e0', color: '#FF6D00', padding: '2px 9px', borderRadius: 12, fontSize: '0.72rem', fontWeight: 700 }}>BEST</span>}
                  {m.name}
                </span>
                <span style={{ fontWeight: 700, color: m.color }}>{m.acc}%</span>
              </div>
              <div style={{ height: 14, background: '#f0f4ff', borderRadius: 8, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${m.acc}%`,
                  background: m.color === '#FF6D00'
                    ? 'linear-gradient(90deg,#FF6D00,#FF8F00)'
                    : 'linear-gradient(90deg,#1E3A8A,#2563EB)',
                  borderRadius: 8,
                  transition: 'width 1s ease'
                }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Features Info */}
      <section style={{ padding: '60px 80px', background: 'white' }}>
        <h2 className="section-title">Selected Features</h2>
        <p className="section-subtitle">8 features automatically selected via correlation analysis</p>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 30
        }}>
          {[
            { feat: 'G1', desc: 'First Period Grade' },
            { feat: 'failures', desc: 'Past Failures' },
            { feat: 'goout', desc: 'Social Activity' },
            { feat: 'age', desc: 'Student Age' },
            { feat: 'higher', desc: 'Wants Higher Edu.' },
            { feat: 'Medu', desc: "Mother's Education" },
            { feat: 'Fedu', desc: "Father's Education" },
            { feat: 'guardian', desc: 'Guardian Type' },
          ].map((f, i) => (
            <div key={i} style={{
              background: '#f0f4ff', borderRadius: 12, padding: '14px 22px', textAlign: 'center',
              border: '1.5px solid #dbeafe', minWidth: 140
            }}>
              <div style={{ fontWeight: 700, color: '#1d4ed8', fontSize: '1rem', marginBottom: 4 }}>{f.feat}</div>
              <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Feature;
