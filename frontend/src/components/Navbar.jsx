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
    <nav style={{ borderBottom: '1px solid #e5e7eb', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fff', position: 'sticky', top: 0, zIndex: 100 }}>
      <Link to="/" style={{ fontWeight: 700, fontSize: '20px', color: '#111827', textDecoration: 'none', letterSpacing: '-0.5px' }}>
        Prepwise
      </Link>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/companies" style={linkStyle}>Companies</Link>
            <Link to="/experiences" style={linkStyle}>Experiences</Link>
            <Link to="/profile" style={linkStyle}>{user.name?.split(' ')[0]}</Link>
            <button onClick={handleLogout} style={btnStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/experiences" style={linkStyle}>Experiences</Link>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/signup" style={{ ...btnStyle, textDecoration: 'none', padding: '8px 16px', borderRadius: '8px', background: '#111827', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const linkStyle = { color: '#6b7280', textDecoration: 'none', fontSize: '14px' };
const btnStyle = { background: 'none', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '6px 14px', fontSize: '14px', cursor: 'pointer', color: '#374151' };
