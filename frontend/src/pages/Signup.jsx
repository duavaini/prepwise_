import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await signup(form);
      loginUser(res.data.token, res.data.user);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '80px auto', padding: '0 24px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>Create account</h1>
      <p style={{ color: '#6b7280', marginBottom: '32px' }}>Already have an account? <Link to="/login" style={{ color: '#111827', fontWeight: 500 }}>Login</Link></p>
      {error && <div style={{ background: '#fef2f2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <input type="text" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} required />
        <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} required />
        <input type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={inputStyle} required minLength={6} />
        <button type="submit" disabled={loading} style={btnStyle}>{loading ? 'Creating account...' : 'Sign up'}</button>
      </form>
      <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '16px', textAlign: 'center' }}>After signup, add your CF/LC handles in your profile to enable analysis.</p>
    </div>
  );
}

const inputStyle = { padding: '12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '15px', outline: 'none' };
const btnStyle = { padding: '12px', background: '#111827', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '15px', fontWeight: 500, cursor: 'pointer' };
