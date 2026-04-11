import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const FEATURES = [
  { key: 'G1', label: 'First Period Grade (G1)', type: 'number', min: 0, max: 20, placeholder: '0 - 20', hint: 'Grade in the first period (0 to 20)' },
  { key: 'failures', label: 'Past Class Failures', type: 'number', min: 0, max: 4, placeholder: '0 - 4', hint: 'Number of past class failures (0 to 4)' },
  { key: 'goout', label: 'Going Out with Friends', type: 'number', min: 1, max: 5, placeholder: '1 - 5', hint: 'Frequency of going out (1: low, 5: high)' },
  { key: 'age', label: 'Student Age', type: 'number', min: 15, max: 22, placeholder: '15 - 22', hint: 'Age of the student' },
  { key: 'higher', label: 'Wants Higher Education?', type: 'select', options: [{ value: '', label: 'Select...' }, { value: '1', label: 'Yes' }, { value: '0', label: 'No' }], hint: 'Plans for university studies.' },
  { key: 'Medu', label: "Mother's Education Level", type: 'number', min: 0, max: 4, placeholder: '0 - 4', hint: '0: none to 4: higher ed' },
  { key: 'Fedu', label: "Father's Education Level", type: 'number', min: 0, max: 4, placeholder: '0 - 4', hint: '0: none to 4: higher ed' },
  { key: 'guardian', label: 'Guardian', type: 'select', options: [{ value: '', label: 'Select...' }, { value: '0', label: 'Father' }, { value: '1', label: 'Mother' }, { value: '2', label: 'Other' }], hint: "Primary caretaker" },
  { key: 'schoolsup', label: 'Extra School Support', type: 'select', options: [{ value: '', label: 'Select...' }, { value: '1', label: 'Yes' }, { value: '0', label: 'No' }], hint: 'Additional educational support' },
  { key: 'reason', label: 'Reason to Choose School', type: 'number', min: 0, max: 3, placeholder: '0 - 3', hint: '0: home, 1: reputation, 2: course, 3: other' },
  { key: 'romantic', label: 'Any commitments?', type: 'select', options: [{ value: '', label: 'Select...' }, { value: '1', label: 'Yes' }, { value: '0', label: 'No' }], hint: 'In a romantic relationship?' },
  { key: 'paid', label: 'Extra Paid Classes?', type: 'select', options: [{ value: '', label: 'Select...' }, { value: '1', label: 'Yes' }, { value: '0', label: 'No' }], hint: 'Additional subject classes' },
  { key: 'absences', label: 'Number of Absences', type: 'number', min: 0, max: 93, placeholder: '0 - 93', hint: 'Total school absences' },
];

const Predict = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setError('');
  };

  const isFieldDisabled = (index) => {
    if (!studentName.trim()) return true; 
    if (index === 0) return false; 
    
    const previousFieldKey = FEATURES[index - 1].key;
    const previousValue = formData[previousFieldKey];
    
    return previousValue === undefined || previousValue === '';
  };

  const handleSubmit = async () => {
    if (!studentName.trim()) {
      setError('Please provide the Student Name to proceed.');
      return;
    }

    for (const f of FEATURES) {
      const val = formData[f.key];
      if (val === undefined || val === '') {
        setError(`Incomplete Field: Please specify ${f.label}`);
        return;
      }
    }

    setLoading(true);
    try {
      const payload = { 
        student_name: studentName, 
        email: user?.email, 
        ...formData 
      };
      
      const res = await api.predict(payload, token);
      
      if (res.error) {
        setError(res.error);
      } else {
        navigate('/result', { state: { ...res, studentName } });
      }
    } catch {
      setError('Server Error: Failed to generate prediction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '60px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
          
          <h3 style={{ fontSize: '1.2rem', color: '#334155', marginBottom: '15px', borderLeft: '4px solid #4f46e5', paddingLeft: '12px' }}>Student Identity</h3>
          <div style={{ marginBottom: '35px' }}>
             <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>Full Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '2px solid #e2e8f0', marginTop: '8px' }}
              value={studentName}
              onChange={(e) => { setStudentName(e.target.value); setError(''); }}
            />
          </div>

          <h3 style={{ fontSize: '1.2rem', color: '#334155', marginBottom: '20px', borderLeft: '4px solid #4f46e5', paddingLeft: '12px' }}>Academic & Social Indicators</h3>
          
          {error && (
            <div style={{ padding: '12px', color: '#b91c1c', backgroundColor: '#fef2f2', borderRadius: '8px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid #fee2e2' }}>
              {error}
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
            {FEATURES.map((f, index) => {
              const disabled = isFieldDisabled(index);
              return (
                <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: '8px', opacity: disabled ? 0.4 : 1, transition: 'opacity 0.3s' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#475569' }}>{f.label}</label>
                  {f.type === 'select' ? (
                    <select
                      disabled={disabled}
                      style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', cursor: disabled ? 'not-allowed' : 'pointer', backgroundColor: disabled ? '#f1f5f9' : '#fff' }}
                      value={formData[f.key] || ''}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                    >
                      {f.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  ) : (
                    <input
                      disabled={disabled}
                      type="number"
                      placeholder={disabled ? "Complete previous field" : f.placeholder}
                      style={{ padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', cursor: disabled ? 'not-allowed' : 'auto', backgroundColor: disabled ? '#f1f5f9' : '#fff' }}
                      value={formData[f.key] || ''}
                      onChange={(e) => handleChange(f.key, e.target.value)}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <button 
            onClick={handleSubmit} 
            disabled={loading || !studentName.trim() || Object.keys(formData).length < FEATURES.length}
            style={{ 
              width: '100%', marginTop: '40px', padding: '16px', borderRadius: '14px', 
              backgroundColor: '#4f46e5', color: '#fff', border: 'none', fontWeight: '700',
              cursor: (loading || !studentName.trim() || Object.keys(formData).length < FEATURES.length) ? 'not-allowed' : 'pointer',
              opacity: (loading || !studentName.trim() || Object.keys(formData).length < FEATURES.length) ? 0.5 : 1
            }}
          >
            {loading ? 'Analyzing & Saving...' : '🎯 Predict & Save Performance →'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Predict;