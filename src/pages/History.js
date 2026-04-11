import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';

const StudentHistory = () => {
    const { token, user } = useAuth();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                if (!user?.email || !token) return;
                const res = await api.getHistory(user.email, token);
                
                // Backend response check
                if (Array.isArray(res)) {
                    setHistory(res);
                } else {
                    setHistory([]);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [user, token]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px', fontFamily: 'Inter, sans-serif' }}>
                <p style={{ color: '#64748b', fontWeight: '500' }}>Loading history...</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '60px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
            <div style={{ maxWidth: '850px', margin: '0 auto' }}>
                
                <div style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '1.8rem', color: '#1e293b', fontWeight: '800' }}>Prediction Logs</h2>
                    <p style={{ color: '#64748b', fontSize: '0.95rem' }}>Recent academic performance analysis</p>
                </div>

                <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 4px 25px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                    {history.length === 0 ? (
                        <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
                            <p>No records found in database.</p>
                        </div>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#fcfdfe', borderBottom: '2px solid #f1f5f9' }}>
                                    <th style={{ padding: '18px 20px', textAlign: 'left', color: '#475569', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Student Name</th>
                                    <th style={{ padding: '18px 20px', textAlign: 'center', color: '#475569', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Result</th>
                                    <th style={{ padding: '18px 20px', textAlign: 'right', color: '#475569', fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase' }}>Date & Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((item, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #f1f5f9', transition: '0.2s' }}>
                                        {/* Name - Handles student_name field */}
                                        <td style={{ padding: '18px 20px', fontWeight: '600', color: '#1e293b' }}>
                                            {item.student_name || 'Anonymous'}
                                        </td>

                                        {/* Result - Handles prediction field */}
                                        <td style={{ padding: '18px 20px', textAlign: 'center' }}>
                                            <span style={{ 
                                                padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800',
                                                backgroundColor: String(item.prediction).toLowerCase() === 'pass' ? '#dcfce7' : '#fee2e2',
                                                color: String(item.prediction).toLowerCase() === 'pass' ? '#15803d' : '#b91c1c'
                                            }}>
                                                {String(item.prediction || 'N/A').toUpperCase()}
                                            </span>
                                        </td>

                                        {/* Timestamp - Handles timestamp field */}
                                        <td style={{ padding: '18px 20px', textAlign: 'right', color: '#64748b', fontSize: '0.85rem' }}>
                                            {item.timestamp ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                                    <span style={{ fontWeight: '500', color: '#475569' }}>
                                                        {new Date(item.timestamp).toLocaleDateString('en-GB')}
                                                    </span>
                                                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                            ) : '---'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentHistory;