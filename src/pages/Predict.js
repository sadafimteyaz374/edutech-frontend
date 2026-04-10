import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const FEATURES = [
  { key: 'G1', label: 'First Period Grade (G1)', type: 'number', min: 0, max: 20, placeholder: '0 - 20', hint: 'Grade (0 to 20)' },
  { key: 'failures', label: 'Past Class Failures', type: 'number', min: 0, max: 4, placeholder: '0 - 4', hint: 'Past failures (0 to 4)' },
  { key: 'goout', label: 'Going Out with Friends', type: 'number', min: 1, max: 5, placeholder: '1-5', hint: '1=low, 5=high' },
  { key: 'age', label: 'Student Age', type: 'number', min: 15, max: 22, placeholder: '15 - 22', hint: 'Age' },
  { key: 'higher', label: 'Wants Higher Education?', type: 'select', options: [{ value: '', label: 'Select...' }, { value: '1', label: 'Yes' }, { value: '0', label: 'No' }], hint: 'Pursue higher studies?' },
  { key: 'Medu', label: "Mother's Education Level", type: 'number', min: 0, max: 4, placeholder: '0 - 4', hint: '0=none, 4=higher' },
  { key: 'Fedu', label: "Father's Education Level", type: 'number', min: 0, max: 4, placeholder: '0 - 4', hint: '0=none, 4=higher' },
  { key: 'guardian', label: 'Guardian', type: 'select', options: [{ value: '', label: 'Select...' }, { value: '0', label: 'Father' }, { value: '1', label: 'Mother' }, { value: '2', label: 'Other' }], hint: 'Guardian type' },
];

const Predict = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const handleSubmit = async () => {
    if (!studentName.trim()) {
      setError('Please enter the student name.');
      return;
    }
    
    // Ensure all features are filled
    for (const f of FEATURES) {
      if (formData[f.key] === undefined || formData[f.key] === '') {
        setError(`Please fill: ${f.label}`);
        return;
      }
    }

    setLoading(true);
    try {
      const payload = { student_name: studentName, ...formData };
      // API Call: Ye data Atlas ke 'predictions' collection mein save karega
      const res = await api.predict(payload, token);
      
      if (res.error) {
        setError(res.error);
      } else {
        navigate('/result', { state: res });
      }
    } catch {
      setError('Connection failed. Make sure Flask and Atlas are connected.');
    } finally {
      setLoading(false);
    }
  };

  // Logic: Jab tak student name nahi hoga, academic factors lock rahenge
  const isNameFilled = studentName.trim().length > 0;

  return (
    <div className="predict-page">
      <div className="predict-container">
        <div className="predict-header">
          <h2>Student Performance Prediction</h2>
          <p>Results will be saved to your dashboard history</p>
        </div>

        <div className="predict-card">
          {error && <div className="error-msg">{error}</div>}

          <h3>Student Information</h3>
          <div className="form-field full-width" style={{ marginBottom: 24 }}>
            <label>Student Name</label>
            <input
              type="text"
              placeholder="First, enter student name"
              value={studentName}
              onChange={(e) => { setStudentName(e.target.value); setError(''); }}
            />
          </div>

          <h3 style={{ opacity: !isNameFilled ? 0.5 : 1 }}>Academic & Social Factors</h3>
          <div className={`form-grid ${!isNameFilled ? 'locked-section' : ''}`}>
            {FEATURES.map((f) => (
              <div className="form-field" key={f.key}>
                <label title={f.hint}>{f.label}</label>
                {f.type === 'select' ? (
                  <select
                    value={formData[f.key] || ''}
                    disabled={!isNameFilled}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                  >
                    {f.options.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    min={f.min} max={f.max}
                    placeholder={f.placeholder}
                    value={formData[f.key] || ''}
                    disabled={!isNameFilled}
                    onChange={(e) => handleChange(f.key, e.target.value)}
                  />
                )}
                <span style={{ fontSize: '0.74rem', color: '#9ca3af' }}>{f.hint}</span>
              </div>
            ))}
          </div>

          <button 
            className="btn-predict" 
            onClick={handleSubmit} 
            disabled={loading || !isNameFilled}
            style={{ marginTop: 30, opacity: (loading || !isNameFilled) ? 0.7 : 1 }}
          >
            {loading ? <><span className="loading-spinner" />Processing...</> : '🎯 Predict & Save to DB'}
          </button>
        </div>
      </div>

      <style>{`
        .locked-section {
          opacity: 0.4;
          pointer-events: none;
          filter: grayscale(1);
        }
      `}</style>
    </div>
  );
};

export default Predict;