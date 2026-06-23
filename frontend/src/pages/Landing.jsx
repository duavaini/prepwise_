import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a12',
      color: '#fff',
      fontFamily: "'Inter', system-ui, sans-serif",
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Gradient blobs */}
      <div style={{
        position: 'absolute', top: '-120px', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.35) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '200px', left: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(16,185,129,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Hero */}
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '120px 24px 80px', textAlign: 'center', position: 'relative' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(124,58,237,0.15)',
          border: '1px solid rgba(124,58,237,0.4)',
          color: '#a78bfa',
          padding: '5px 14px', borderRadius: '99px',
          fontSize: '13px', fontWeight: 500, marginBottom: '32px',
          letterSpacing: '0.3px',
        }}>
          Built for IIT placement prep
        </div>

        <h1 style={{
          fontSize: '58px', fontWeight: 800,
          lineHeight: 1.1, letterSpacing: '-2px',
          marginBottom: '24px', color: '#fff',
        }}>
          Your personalised<br />
          <span style={{ color: '#a78bfa' }}>placement roadmap</span>
        </h1>

        <p style={{
          fontSize: '18px', color: '#9ca3af',
          lineHeight: 1.75, maxWidth: '500px',
          margin: '0 auto 44px',
        }}>
          Connect your Codeforces handle. Get a personalised DSA sheet for each target company based on your actual weak areas — not a generic list everyone gets.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/signup" style={{
            background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            color: '#fff', padding: '13px 32px',
            borderRadius: '10px', textDecoration: 'none',
            fontWeight: 600, fontSize: '15px',
            boxShadow: '0 0 24px rgba(124,58,237,0.4)',
          }}>
            Get started free →
          </Link>
        </div>
      </div>

      {/* Feature cards */}
      <div style={{
        maxWidth: '900px', margin: '0 auto',
        padding: '0 24px 100px',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px',
      }}>
        {[
          { icon: '🎯', title: 'Personalised sheets', desc: 'Your sheet is built around your specific weak topics, not a recycled list.' },
          { icon: '📊', title: 'Gap analysis', desc: 'See exactly where you stand for each company — topic by topic with priority scores.' },
          { icon: '⚡', title: 'CF-powered', desc: 'Pulls your Codeforces submission history to compute your real tag-wise solve rate.' },
        ].map(f => (
          <div key={f.title} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px', padding: '24px',
            textAlign: 'left',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ fontSize: '26px', marginBottom: '14px' }}>{f.icon}</div>
            <div style={{ fontWeight: 600, fontSize: '15px', color: '#f3f4f6', marginBottom: '8px' }}>{f.title}</div>
            <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.65 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
