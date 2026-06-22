import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCompanies } from '../services/api';

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanies().then(res => setCompanies(res.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: '80px', textAlign: 'center', color: '#6b7280' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Companies</h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>Pick a company to see its interview process and get a personalised prep sheet.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
        {companies.map(c => (
          <Link key={c.slug} to={`/companies/${c.slug}`} style={{ textDecoration: 'none' }}>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', height: '100%', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontWeight: 600, fontSize: '17px', color: '#111827' }}>{c.name}</span>
                <span style={{
                  fontSize: '12px', fontWeight: 500, padding: '3px 10px', borderRadius: '99px',
                  background: c.difficulty?.includes('High') ? '#fef2f2' : '#f0fdf4',
                  color: c.difficulty?.includes('High') ? '#dc2626' : '#16a34a',
                }}>
                  {c.difficulty}
                </span>
              </div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px' }}>{c.package_range}</p>
              <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>{c.rounds_count} interview rounds &middot; CG cutoff {c.cg_cutoff}+</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
