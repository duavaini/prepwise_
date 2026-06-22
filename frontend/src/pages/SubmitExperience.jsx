import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompanies, submitExperience } from '../services/api';

const emptyRound = { type: '', description: '' };

export default function SubmitExperience() {
  const [companies, setCompanies] = useState([]);
  const [form, setForm] = useState({ companySlug: '', role: '', year: new Date().getFullYear(), result: 'selected', isAnonymous: false });
  const [rounds, setRounds] = useState([{ ...emptyRound }]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { getCompanies().then(res => setCompanies(res.data)); }, []);

  const updateRound = (i, field, value) => {
    setRounds(rs => rs.map((r, idx) => idx === i ? { ...r, [field]: value } : r));
  };

  const addRound = () => setRounds(rs => [...rs, { ...emptyRound }]);
  const removeRound = (i) => setRounds(rs => rs.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.companySlug) return setError('Select a company');
    if (rounds.some(r => !r.type || !r.description)) return setError('Fill in all round details');

    setLoading(true);
    try {
      await submitExperience({ ...form, year: Number(form.year), rounds });
      navigate('/experiences');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 24px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '4px' }}>Share your experience</h1>
      <p style={{ color: '#6b7280', marginBottom: '28px' }}>Help other students prep better. Add round-by-round details.</p>

      {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select value={form.companySlug} onChange={e => setForm({ ...form, companySlug: e.target.value })} style={{ ...inputStyle, flex: 2 }} required>
            <option value="">Select company</option>
            {companies.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
          </select>
          <input type="number" placeholder="Year" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} style={{ ...inputStyle, flex: 1 }} required />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <input type="text" placeholder="Role (e.g. SDE Intern)" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ ...inputStyle, flex: 2 }} required />
          <select value={form.result} onChange={e => setForm({ ...form, result: e.target.value })} style={{ ...inputStyle, flex: 1 }}>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
            <option value="ongoing">Ongoing</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Rounds</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {rounds.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <input type="text" placeholder="e.g. Online Assessment" value={r.type} onChange={e => updateRound(i, 'type', e.target.value)} style={{ ...inputStyle, flex: 1 }} />
                <textarea placeholder="What happened in this round?" value={r.description} onChange={e => updateRound(i, 'description', e.target.value)} style={{ ...inputStyle, flex: 2, resize: 'vertical', minHeight: '40px' }} />
                {rounds.length > 1 && <button type="button" onClick={() => removeRound(i)} style={removeBtn}>&times;</button>}
              </div>
            ))}
          </div>
          <button type="button" onClick={addRound} style={addBtn}>+ Add round</button>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#374151' }}>
          <input type="checkbox" checked={form.isAnonymous} onChange={e => setForm({ ...form, isAnonymous: e.target.checked })} />
          Post anonymously
        </label>

        <button type="submit" disabled={loading} style={btnStyle}>{loading ? 'Submitting...' : 'Submit experience'}</button>
      </form>
    </div>
  );
}

const inputStyle = { padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
const btnStyle = { padding: '12px', background: '#111827', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 500, cursor: 'pointer' };
const addBtn = { marginTop: '8px', fontSize: '13px', padding: '6px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fff', color: '#374151', cursor: 'pointer' };
const removeBtn = { padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fff', color: '#dc2626', cursor: 'pointer', fontSize: '16px' };
