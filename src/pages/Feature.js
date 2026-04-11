import React from 'react';

const Feature = () => {
  const features = [
    {
      title: 'Random Forest Classifier',
      desc: 'Our primary ensemble model that combines multiple decision trees to deliver the highest prediction accuracy.',
      tag: 'Core Model'
    },
    {
      title: '13-Point Feature Analysis',
      desc: 'Analyzes 13 distinct academic and socio-economic variables including grades, absences, and family background.',
      tag: 'Data Scope'
    },
    {
      title: 'Automated Data Mapping',
      desc: 'Converts categorical input into numerical formats automatically using advanced preprocessing pipelines.',
      tag: 'Preprocessing'
    },
    {
      title: 'Model Competition',
      desc: 'Simultaneously evaluates SVM, KNN, and Naive Bayes to ensure Random Forest remains the top performer.',
      tag: 'Optimization'
    },
    {
      title: 'Persistent Prediction Logs',
      desc: 'Securely stores every analysis in MongoDB database, allowing you to track performance trends over time.',
      tag: 'History'
    },
    {
      title: 'Secure Access Control',
      desc: 'Ensures student data privacy through industry-standard authentication and encrypted record handling.',
      tag: 'Security'
    },
  ];

  const models = [
    { name: 'Random Forest', acc: 82.28, color: '#FF6D00' }, 
    { name: 'SVM', acc: 81.01, color: '#2563EB' },
    { name: 'KNN', acc: 74.68, color: '#2563EB' },
    { name: 'Naive Bayes', acc: 72.15, color: '#2563EB' },
  ];

  const featureList = [
    { feat: 'G1', desc: 'Period 1 Grade' },
    { feat: 'Failures', desc: 'Past Failures' },
    { feat: 'Goout', desc: 'Social Activity' },
    { feat: 'Age', desc: 'Student Age' },
    { feat: 'Higher', desc: 'Higher Edu Goal' },
    { feat: 'Medu', desc: 'Mother Education' },
    { feat: 'Fedu', desc: 'Father Education' },
    { feat: 'Guardian', desc: 'Legal Guardian' },
    { feat: 'Schoolsup', desc: 'School Support' },
    { feat: 'Reason', desc: 'Choice Reason' },
    { feat: 'Romantic', desc: 'Relationship' },
    { feat: 'Paid', desc: 'Extra Classes' },
    { feat: 'Absences', desc: 'Days Missed' },
  ];

  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg,#f0f4ff 0%,#e8eeff 100%)',
        padding: '80px 20px', textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 16 }}>
          Features of <span style={{ color: '#2563EB' }}>EduTech</span>
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto' }}>
          Explore the sophisticated machine learning features driving our academic success predictions.
        </p>
      </section>

      <section style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 30, maxWidth: 1200, margin: '0 auto'
        }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: '#ffffff', border: '1px solid #e2e8f0',
              borderRadius: 20, padding: '30px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(37,99,235,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 15 }}>
                <span style={{
                  background: '#eff6ff', color: '#2563eb', padding: '4px 12px',
                  borderRadius: 20, fontSize: '0.75rem', fontWeight: 700
                }}>{f.tag}</span>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: 12, color: '#1e293b' }}>{f.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 20px', background: '#f8fafc' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#1e293b', marginBottom: 10 }}>Accuracy Comparison</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 40 }}>Validated against multi-model performance benchmarks</p>
        <div style={{ maxWidth: 750, margin: '0 auto', background: 'white', borderRadius: 24, padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
          {models.map((m, i) => (
            <div key={i} style={{ marginBottom: 25 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: '#334155' }}>
                  {m.name} {i === 0 && <span style={{ marginLeft: 10, background: '#fee2e2', color: '#dc2626', padding: '2px 8px', borderRadius: 10, fontSize: '0.65rem' }}>LEADER</span>}
                </span>
                <span style={{ fontWeight: 800, color: m.color }}>{m.acc}%</span>
              </div>
              <div style={{ height: 12, background: '#f1f5f9', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${m.acc}%`,
                  background: m.color === '#FF6D00' 
                    ? 'linear-gradient(90deg, #f59e0b, #d97706)' 
                    : 'linear-gradient(90deg, #3b82f6, #2563eb)',
                  borderRadius: 10,
                  transition: 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '80px 20px', background: 'white' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#1e293b', marginBottom: 10 }}>Processed Variables</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 40 }}>Our model integrates 13 key parameters for every prediction</p>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 16, maxWidth: 1100, margin: '0 auto'
        }}>
          {featureList.map((f, i) => (
            <div key={i} style={{
              background: '#f8fafc', borderRadius: 16, padding: '16px', textAlign: 'center',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ fontWeight: 800, color: '#2563eb', fontSize: '1rem', marginBottom: 4 }}>{f.feat}</div>
              <div style={{ color: '#475569', fontSize: '0.8rem', fontWeight: 500 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Feature;