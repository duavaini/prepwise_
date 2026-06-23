import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await login(form);
      loginUser(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a12',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Inter', system-ui, sans-serif", position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.25) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: '400px', padding: '0 24px', position: 'relative' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
          Welcome back
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '32px' }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#a78bfa', fontWeight: 500, textDecoration: 'none' }}>Sign up</Link>
        </p>

        {error && (
          <div style={{
            background: 'rgba(220,38,38,0.1)', color: '#f87171',
            border: '1px solid rgba(220,38,38,0.3)',
            padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px',
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="email" placeholder="Email" value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={inputStyle} required />
          <input type="password" placeholder="Password" value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={inputStyle} required />
          <button type="submit" disabled={loading} style={btnStyle}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '12px 14px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px', fontSize: '15px',
  color: '#fff', outline: 'none',
};

const btnStyle = {
  padding: '12px',
  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
  color: '#fff', border: 'none',
  borderRadius: '8px', fontSize: '15px',
  fontWeight: 600, cursor: 'pointer',
  boxShadow: '0 0 20px rgba(124,58,237,0.4)',
};
