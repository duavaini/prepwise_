import { useState, useEffect } from 'react';
import { getProfile, updateProfile, getCompanies } from '../services/api';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({ cfHandle: '', lcHandle: '', targetCompanies: [] });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getProfile().then(res => {
      setProfile(res.data);
      setForm({
        cfHandle: res.data.cf_handle || '',
        lcHandle: res.data.lc_handle || '',
        targetCompanies: res.data.target_companies || [],
      });
    });
    getCompanies().then(res => setCompanies(res.data));
  }, []);

  const toggleCompany = (slug) => {
    setForm(f => ({
      ...f,
      targetCompanies: f.targetCompanies.includes(slug)
        ? f.targetCompanies.filter(s => s !== slug)
        : [...f.targetCompanies, slug],
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true); setMessage('');
    try {
      const res = await updateProfile(form);
      setProfile(res.data);
      setMessage('Saved');
    } catch {
      setMessage('Failed to save');
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(''), 2000);
    }
  };

  if (!profile) return <div style={{ padding: '80px', textAlign: 'center', color: '#6b7280' }}>Loading...</div>;

  return (
    <div style={{ maxWidth: '560px', margin: '40px auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>{profile.name}</h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>{profile.email}</p>

      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label style={labelStyle}>Codeforces handle</label>
          <input type="text" placeholder="e.g. tourist" value={form.cfHandle} onChange={e => setForm({ ...form, cfHandle: e.target.value })} style={inputStyle} />
          <p style={hintStyle}>Used to analyse your solved problems and generate personalised sheets.</p>
        </div>

        <div>
          <label style={labelStyle}>LeetCode username (optional)</label>
          <input type="text" placeholder="e.g. johndoe123" value={form.lcHandle} onChange={e => setForm({ ...form, lcHandle: e.target.value })} style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Target companies</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
            {companies.map(c => (
              <button
                type="button"
                key={c.slug}
                onClick={() => toggleCompany(c.slug)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  border: form.targetCompanies.includes(c.slug) ? '1px solid #111827' : '1px solid #e5e7eb',
                  background: form.targetCompanies.includes(c.slug) ? '#111827' : '#fff',
                  color: form.targetCompanies.includes(c.slug) ? '#fff' : '#374151',
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={saving} style={btnStyle}>{saving ? 'Saving...' : 'Save changes'}</button>
        {message && <p style={{ fontSize: '13px', color: message === 'Saved' ? '#16a34a' : '#dc2626', textAlign: 'center' }}>{message}</p>}
      </form>
    </div>
  );
}

const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '6px' };
const hintStyle = { fontSize: '12px', color: '#9ca3af', marginTop: '6px' };
const inputStyle = { width: '100%', padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' };
const btnStyle = { padding: '12px', background: '#111827', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 500, cursor: 'pointer' };
