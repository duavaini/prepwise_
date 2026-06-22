import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProfile, getCompanies } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getProfile().then(res => setProfile(res.data));
    getCompanies().then(res => setCompanies(res.data));
  }, []);

  if (!profile) return <div style={{ padding: '80px', textAlign: 'center', color: '#6b7280' }}>Loading...</div>;

  const hasHandle = profile.cf_handle || profile.lc_handle;
  const targets = companies.filter(c => (profile.target_companies || []).includes(c.slug));

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Welcome back, {user?.name?.split(' ')[0]}</h1>
      <p style={{ color: '#6b7280', marginBottom: '28px' }}>Here's where you stand for your target companies.</p>

      {!hasHandle && (
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '10px', padding: '14px 16px', marginBottom: '24px', fontSize: '14px', color: '#92400e' }}>
          Add your Codeforces handle in your <Link to="/profile" style={{ color: '#92400e', fontWeight: 600 }}>profile</Link> to unlock personalised analysis.
        </div>
      )}

      {targets.length === 0 ? (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', textAlign: 'center', marginBottom: '24px' }}>
          <p style={{ color: '#6b7280', marginBottom: '12px' }}>You haven't picked any target companies yet.</p>
          <Link to="/profile" style={{ color: '#111827', fontWeight: 500, fontSize: '14px' }}>Pick target companies &rarr;</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {targets.map(c => (
            <div key={c.slug} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontWeight: 600, fontSize: '16px', color: '#111827', marginBottom: '4px' }}>{c.name}</div>
              <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '14px' }}>{c.package_range}</div>
              <Link to={hasHandle ? `/analysis/${c.slug}` : '/profile'} style={{ fontSize: '13px', fontWeight: 500, color: '#111827', textDecoration: 'none' }}>
                {hasHandle ? 'View prep sheet' : 'Add CF handle first'} &rarr;
              </Link>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '12px' }}>
        <Link to="/companies" style={{ flex: 1, textAlign: 'center', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '14px', textDecoration: 'none', color: '#374151', fontSize: '14px', fontWeight: 500 }}>
          Browse all companies
        </Link>
        <Link to="/experiences" style={{ flex: 1, textAlign: 'center', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '14px', textDecoration: 'none', color: '#374151', fontSize: '14px', fontWeight: 500 }}>
          Read interview experiences
        </Link>
      </div>
    </div>
  );
}
