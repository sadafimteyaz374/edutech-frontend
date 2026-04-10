import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [uRes, cRes] = await Promise.all([
        fetch('http://127.0.0.1:5000/api/admin/users'),
        fetch('http://127.0.0.1:5000/api/admin/contacts')
      ]);
      const uData = await uRes.json();
      const cData = await cRes.json();
      setUsers(uData.users || []);
      setContacts(cData.contacts || []);
    } catch (err) { console.error("Fetch error:", err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, []);

  const deleteUser = async (email) => {
    if (window.confirm(`Are you sure you want to delete ${email}?`)) {
      await fetch(`http://127.0.0.1:5000/api/admin/delete_user/${email}`, { method: 'DELETE' });
      fetchData();
    }
  };

  const deleteMsg = async (email, time) => {
    if (window.confirm("Delete this inquiry permanently?")) {
      await fetch('http://127.0.0.1:5000/api/admin/delete_contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, timestamp: time })
      });
      fetchData();
    }
  };

  // --- REFINED THEME STYLES ---
  const styles = {
    wrapper: { backgroundColor: '#f8fafc', minHeight: '100vh', padding: '50px 20px', fontFamily: '"Inter", "Segoe UI", sans-serif' },
    container: { maxWidth: '1100px', margin: '0 auto' },
    titleSection: { marginBottom: '40px', borderLeft: '5px solid #4f46e5', paddingLeft: '20px' },
    mainTitle: { fontSize: '32px', fontWeight: '800', color: '#1e293b', margin: '0' },
    subTitle: { color: '#64748b', fontSize: '15px', marginTop: '5px' },
    card: { background: 'white', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)', marginBottom: '40px', border: '1px solid #e2e8f0', overflow: 'hidden' },
    cardHeader: { padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9' },
    blueHeader: { backgroundColor: '#4f46e5', color: 'white' },
    roseHeader: { backgroundColor: '#f43f5e', color: 'white' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { textAlign: 'left', padding: '15px 25px', backgroundColor: '#f8fafc', color: '#64748b', textTransform: 'uppercase', fontSize: '12px', fontWeight: '700', letterSpacing: '0.05em' },
    td: { padding: '18px 25px', borderBottom: '1px solid #f1f5f9', color: '#334155', fontSize: '14px' },
    deleteBtn: { backgroundColor: '#fff1f2', color: '#e11d48', border: '1px solid #fecdd3', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '600', transition: '0.2s' },
    badge: { backgroundColor: '#eef2ff', color: '#4f46e5', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '700' },
    userText: { fontWeight: '600', color: '#1e293b' },
    emailText: { color: '#94a3b8', fontSize: '12px' },
    messageBox: { backgroundColor: '#fdf2f2', padding: '10px', borderRadius: '8px', marginTop: '8px', borderLeft: '3px solid #f43f5e', fontStyle: 'italic', fontSize: '13px' }
  };

  if (loading) return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh', color:'#4f46e5', fontWeight:'bold'}}>
      <div className="animate-spin" style={{marginRight:'10px'}}>⚙️</div> Loading Admin Panel...
    </div>
  );

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        
        <div style={styles.titleSection}>
          <h1 style={styles.mainTitle}>Admin Control Center</h1>
          <p style={styles.subTitle}>Monitor users and platform inquiries in real-time.</p>
        </div>

        {/* REGISTERED USERS */}
        <div style={styles.card}>
          <div style={{...styles.cardHeader, ...styles.blueHeader}}>
            <span style={{fontSize: '18px'}}>👤 Student Records</span>
            <span style={{fontSize: '13px', opacity: '0.9'}}>{users.length} Registered</span>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Operations</th>
                <th style={styles.th}>Basic Info</th>
                <th style={styles.th}>Academic Details</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td style={styles.td}>
                    <button 
                      onClick={() => deleteUser(u.email)} 
                      style={styles.deleteBtn}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#fecdd3'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#fff1f2'}
                    >
                      Delete
                    </button>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.userText}>{u.name}</div>
                    <div style={styles.emailText}>{u.email}</div>
                  </td>
                  <td style={styles.td}>
                    <span style={styles.badge}>{u.course}</span>
                    <span style={{marginLeft:'10px', color:'#64748b', fontSize:'12px'}}>Year {u.year}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CONTACT MESSAGES */}
        <div style={styles.card}>
          <div style={{...styles.cardHeader, ...styles.roseHeader}}>
            <span style={{fontSize: '18px'}}>📩 Support Inquiries</span>
          </div>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Action</th>
                <th style={styles.th}>Feedback Details</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c, i) => (
                <tr key={i}>
                  <td style={styles.td}>
                    <button 
                      onClick={() => deleteMsg(c.email, c.timestamp)} 
                      style={styles.deleteBtn}
                    >
                      Remove
                    </button>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.userText}>{c.name} <small style={styles.emailText}>({c.email})</small></div>
                    <div style={styles.messageBox}>
                      "{c.message}"
                    </div>
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