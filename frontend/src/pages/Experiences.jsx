import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getExperiences, getCompanies, upvoteExperience } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Experiences() {
  const { user } = useAuth();
  const [experiences, setExperiences] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [filters, setFilters] = useState({ companySlug: '', year: '', result: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCompanies().then(res => setCompanies(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (filters.companySlug) params.companySlug = filters.companySlug;
    if (filters.year) params.year = filters.year;
    if (filters.result) params.result = filters.result;
    getExperiences(params).then(res => setExperiences(res.data)).finally(() => setLoading(false));
  }, [filters]);

  const handleUpvote = async (id) => {
    if (!user) return;
    await upvoteExperience(id);
    setExperiences(exps => exps.map(e => e.id === id ? { ...e, upvotes: e.upvotes + 1 } : e));
  };

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: 0 }}>Interview experiences</h1>
        {user && <Link to="/experiences/submit" style={{ background: '#111827', color: '#fff', padding: '10px 18px', borderRadius: '8px', textDecoration: 'none', fontWeight: 500, fontSize: '14px' }}>Share yours</Link>}
      </div>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>Round-by-round experiences shared by students who actually went through it.</p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <select value={filters.companySlug} onChange={e => setFilters({ ...filters, companySlug: e.target.value })} style={selectStyle}>
          <option value="">All companies</option>
          {companies.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        <select value={filters.year} onChange={e => setFilters({ ...filters, year: e.target.value })} style={selectStyle}>
          <option value="">All years</option>
          {[2026, 2025, 2024, 2023].map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <select value={filters.result} onChange={e => setFilters({ ...filters, result: e.target.value })} style={selectStyle}>
          <option value="">All results</option>
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
          <option value="ongoing">Ongoing</option>
        </select>
      </div>

      {loading ? (
        <p style={{ color: '#9ca3af' }}>Loading...</p>
      ) : experiences.length === 0 ? (
        <p style={{ color: '#9ca3af' }}>No experiences found. {user && <Link to="/experiences/submit" style={{ color: '#111827' }}>Be the first to share one</Link>}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {experiences.map(exp => (
            <div key={exp.id} style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: '#111827' }}>{exp.company_name} &middot; {exp.role}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>{exp.year} &middot; by {exp.author_name}</div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 500, padding: '4px 10px', borderRadius: '99px', textTransform: 'capitalize', color: exp.result === 'selected' ? '#16a34a' : exp.result === 'rejected' ? '#dc2626' : '#6b7280', background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                  {exp.result}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
                {(exp.rounds || []).map((r, i) => (
                  <div key={i} style={{ fontSize: '13px', color: '#374151' }}>
                    <span style={{ fontWeight: 500 }}>Round {i + 1} ({r.type}):</span> {r.description}
                  </div>
                ))}
              </div>
              <button onClick={() => handleUpvote(exp.id)} disabled={!user} style={upvoteBtn}>
                &uarr; {exp.upvotes} helpful
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const selectStyle = { padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', color: '#374151', background: '#fff' };
const upvoteBtn = { fontSize: '13px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fff', color: '#374151', cursor: 'pointer' };
