// Result Page - Shows prediction outcome with personalized message
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [barWidth, setBarWidth] = useState(0);

  const result = location.state;

  // Redirect if no result data
  useEffect(() => {
    if (!result) {
      navigate('/predict');
      return;
    }
    // Animate confidence bar
    setTimeout(() => setBarWidth(result.confidence || 0), 200);
  }, [result, navigate]);

  if (!result) return null;

  const isPass = result.prediction === 'Pass';

  return (
    <div className="result-page">
      <div className="result-card">
        {/* Icon */}
        <div className={`result-icon ${isPass ? 'pass' : 'fail'}`}>
          {isPass ? '🎉' : '📚'}
        </div>

        {/* Badge */}
        <div className={`result-badge ${isPass ? 'pass' : 'fail'}`}>
          {isPass ? '✅ PASS' : '❌ FAIL'}
        </div>

        {/* Heading */}
        <h2>
          {isPass
            ? `Congratulations, ${result.student_name}!`
            : `Keep Going, ${result.student_name}!`}
        </h2>

        {/* Message */}
        <p style={{ color: isPass ? '#065f46' : '#991b1b', fontWeight: 500, fontSize: '1.02rem' }}>
          {result.message}
        </p>

        {/* Additional encouragement */}
        <p style={{ marginTop: 8, fontSize: '0.92rem' }}>
          {isPass
            ? 'Your hard work and dedication have paid off. Continue to maintain your performance and aim even higher!'
            : 'Don\'t be discouraged. Analyze your weak areas, create a study plan, seek help from teachers, and give it your best effort. You can do it!'}
        </p>

        {/* Confidence Bar */}
        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 500 }}>
              Model Confidence
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: isPass ? '#16a34a' : '#dc2626' }}>
              {result.confidence?.toFixed(1)}%
            </span>
          </div>
          <div className="confidence-bar">
            <div
              className="confidence-fill"
              style={{
                width: `${barWidth}%`,
                background: isPass
                  ? 'linear-gradient(90deg,#16a34a,#22c55e)'
                  : 'linear-gradient(90deg,#dc2626,#f87171)'
              }}
            />
          </div>
        </div>

        {/* Tips */}
        {!isPass && (
          <div style={{
            background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 12,
            padding: '16px 20px', marginTop: 20, textAlign: 'left'
          }}>
            <p style={{ fontWeight: 600, color: '#c2410c', marginBottom: 8, fontSize: '0.9rem' }}>
              💡 Tips to Improve:
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Attend all classes regularly',
                'Reduce social outings during exam season',
                'Seek help from teachers or tutors',
                'Create a daily study schedule',
                'Review first period topics thoroughly'
              ].map((tip, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: '#9a3412', marginBottom: 5 }}>
                  ▸ {tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="result-actions">
          <button
            className="btn-primary"
            onClick={() => navigate('/predict')}
          >
            🔄 Predict Again
          </button>
          <Link to="/">
            <button className="btn-outline">🏠 Back to Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Result;
