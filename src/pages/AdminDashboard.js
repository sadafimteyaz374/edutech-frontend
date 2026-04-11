import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [uRes, cRes, pRes] = await Promise.all([
        fetch('https://edutech-backend-1-yq0u.onrender.com/api/admin/users'),
        fetch('https://edutech-backend-1-yq0u.onrender.com/api/admin/contacts'),
        fetch('https://edutech-backend-1-yq0u.onrender.com/api/admin/predictions') 
      ]);
      const uData = await uRes.json();
      const cData = await cRes.json();
      const pData = await pRes.json();

      setUsers(uData.users || []);
      setContacts(cData.contacts || []);
      setPredictions(pData.predictions || []);
    } catch (err) { 
      console.error("Fetch error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchData(); }, []);

  const deleteRecord = async (endpoint, payload) => {
    if (window.confirm("Are you sure you want to delete this record permanently?")) {
      await fetch(`https://edutech-backend-1-yq0u.onrender.com/api/admin/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      fetchData();
    }
  };

  const styles = {
    wrapper: { backgroundColor: '#f1f5f9', minHeight: '100vh', padding: '40px 20px', fontFamily: '"Inter", sans-serif' },
    container: { maxWidth: '1200px', margin: '0 auto' },
    header: { marginBottom: '30px' },
    card: { background: 'white', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', marginBottom: '30px', overflow: 'hidden', border: '1px solid #e2e8f0' },
    cardHeader: { padding: '15px 25px', color: 'white', fontWeight: '700', display: 'flex', justifyContent: 'space-between' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '12px 25px', backgroundColor: '#f8fafc', color: '#64748b', fontSize: '11px', textTransform: 'uppercase' },
    td: { padding: '15px 25px', borderBottom: '1px solid #f1f5f9', fontSize: '14px', color: '#334155' },
    btn: { padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', border: '1px solid #fecdd3', backgroundColor: '#fff1f2', color: '#e11d48', fontSize: '12px', fontWeight: '600' },
    statusBadge: (pass) => ({
      padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '800',
      backgroundColor: pass ? '#dcfce7' : '#fee2e2',
      color: pass ? '#166534' : '#991b1b'
    })
  };

  if (loading) return <div style={{textAlign:'center', marginTop:'100px'}}>Loading Control Panel...</div>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={{color: '#1e293b', fontSize: '28px', fontWeight: '800'}}>Admin Dashboard</h1>
          <p style={{color: '#64748b'}}>Managing EduTech Infrastructure</p>
        </div>

        {/* SECTION: USER MANAGEMENT */}
        <div style={styles.card}>
          <div style={{...styles.cardHeader, backgroundColor: '#2563eb'}}>
            <span>User Accounts</span>
            <span>{users.length} Total</span>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>User Details</th>
                <th style={styles.th}>Academic</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td style={styles.td}>
                    <div style={{fontWeight:'700'}}>{u.name}</div>
                    <div style={{fontSize:'12px', color:'#94a3b8'}}>{u.email}</div>
                  </td>
                  <td style={styles.td}>{u.course} (Year {u.year})</td>
                  <td style={styles.td}>
                    <button onClick={() => deleteRecord('delete_user', { email: u.email })} style={styles.btn}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.card}>
          <div style={{...styles.cardHeader, backgroundColor: '#10b981'}}>
            <span>System Predictions</span>
            <span>Recent Activity</span>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Student Email</th>
                <th style={styles.th}>Result</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((p, i) => (
                <tr key={i}>
                  <td style={styles.td}>{p.email}</td>
                  <td style={styles.td}>
                    <span style={styles.statusBadge(p.result === 'Pass')}>
                      {p.result.toUpperCase()}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => deleteRecord('delete_prediction', { id: p._id })} style={styles.btn}>Clear</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={styles.card}>
          <div style={{...styles.cardHeader, backgroundColor: '#f43f5e'}}>
            <span>Support Messages</span>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Sender</th>
                <th style={styles.th}>Message Content</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr key={i}>
                  <td style={styles.td}>
                    <strong>{c.name}</strong><br/>
                    <small>{c.email}</small>
                  </td>
                  <td style={styles.td}>
                    <div style={{fontSize:'13px', background:'#fff5f5', padding:'10px', borderRadius:'8px', borderLeft:'3px solid #f43f5e'}}>
                      {c.message}
                    </div>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => deleteRecord('delete_contact', { email: c.email, timestamp: c.timestamp })} style={styles.btn}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
