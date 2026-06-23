import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      padding: '0 32px', height: '60px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'rgba(10,10,18,0.9)',
      backdropFilter: 'blur(12px)',
      position: 'sticky', top: 0, zIndex: 100,
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <Link to="/" style={{ fontWeight: 700, fontSize: '20px', color: '#fff', textDecoration: 'none', letterSpacing: '-0.5px' }}>
        Prepwise
      </Link>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/companies" style={linkStyle}>Companies</Link>
            <Link to="/profile" style={linkStyle}>{user.name?.split(' ')[0]}</Link>
            <button onClick={handleLogout} style={btnStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={signupBtnStyle}>Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: '#9ca3af', textDecoration: 'none', fontSize: '14px', fontWeight: 500,
};

const btnStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px', padding: '6px 14px',
  fontSize: '14px', cursor: 'pointer', color: '#9ca3af',
};

const signupBtnStyle = {
  background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
  color: '#fff', textDecoration: 'none',
  padding: '8px 18px', borderRadius: '8px',
  fontSize: '14px', fontWeight: 600,
  boxShadow: '0 0 16px rgba(124,58,237,0.35)',
};
