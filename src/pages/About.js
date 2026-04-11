import React from 'react';

const About = () => {
  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)',
        padding: '80px 20px', textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 16 }}>
          About <span style={{ color: '#2563EB' }}>EduTech </span>
          <br></br>
          The student performance prediction system
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: 650, margin: '0 auto', lineHeight: '1.6' }}>
          Empowering educators with data-driven insights. Our platform utilizes advanced machine learning 
          to identify student potential and provide early academic support.
        </p>
      </section>

      <section style={{ padding: '80px 20px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem', color: '#1e293b', marginBottom: 20 }}>Our Mission</h2>
            <p style={{ color: '#475569', marginBottom: 15, lineHeight: '1.7' }}>
              The Student Performance Predictor was developed to transform raw educational data into 
              actionable intelligence. By analyzing complex variables ranging from academic grades 
              to social environment, we help bridge the gap between failure and success.
            </p>
            <p style={{ color: '#475569', marginBottom: 15, lineHeight: '1.7' }}>
              Our system evaluates 13 critical features, including G1 scores, past failures, and 
              family background. By comparing multiple algorithms, we ensure high-precision 
              forecasting to support student growth.
            </p>
            <p style={{ color: '#475569', lineHeight: '1.7' }}>
              We believe in proactive intervention. Identifying challenges before they manifest in final 
              results allows for targeted guidance that significantly improves academic outcomes.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              { num: '80%+', label: 'Accuracy Target' },
              { num: '13', label: 'Key Features Analyzed' },
              { num: '4', label: 'Algorithms Compared' },
              { num: 'Real-time', label: 'Instant Analysis' },
            ].map((s, i) => (
              <div key={i} style={{
                background: '#ffffff', padding: '30px 20px', borderRadius: '16px', 
                textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
                border: '1px solid #f1f5f9'
              }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2563EB', marginBottom: 5 }}>{s.num}</div>
                <div style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '80px 20px', background: '#f8fafc' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2.2rem', color: '#1e293b', marginBottom: 10 }}>How It Works</h2>
        <p style={{ textAlign: 'center', color: '#64748b', marginBottom: 50 }}>A structured approach to academic intelligence</p>
        
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24, maxWidth: 1100, margin: '0 auto'
        }}>
          {[
            { step: '01', title: 'Data Cleaning', desc: 'Removing null values and formatting student records for consistency.' },
            { step: '02', title: 'Feature Mapping', desc: 'Encoding categorical data like family support and social status into numerical values.' },
            { step: '03', title: 'Model Competition', desc: 'Evaluating SVM, Random Forest, and other algorithms to find the highest accuracy.' },
            { step: '04', title: 'Live Prediction', desc: 'Deploying the best-performing model to deliver instant pass/fail insights.' },
          ].map((s, i) => (
            <div key={i} style={{
              background: '#ffffff', borderRadius: 20, padding: '35px 25px', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: 45, height: 45, background: 'linear-gradient(135deg,#1e3a8a,#2563eb)',
                borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 800, fontSize: '0.9rem', marginBottom: 20
              }}>{s.step}</div>
              <h3 style={{ fontWeight: 700, marginBottom: 12, color: '#1e293b' }}>{s.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.6' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default About;