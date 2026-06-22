import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ display: 'inline-block', background: '#f0fdf4', color: '#166534', padding: '4px 12px', borderRadius: '99px', fontSize: '13px', fontWeight: 500, marginBottom: '24px' }}>
        Built for IIT placement prep
      </div>
      <h1 style={{ fontSize: '52px', fontWeight: 700, color: '#111827', lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-1.5px' }}>
        Your personalised<br />placement roadmap
      </h1>
      <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '40px', lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 40px' }}>
        Connect your Codeforces and LeetCode profiles. Get a personalised DSA sheet for each target company based on your actual weak areas — not a generic list everyone gets.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <Link to="/signup" style={{ background: '#111827', color: '#fff', padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 500, fontSize: '15px' }}>
          Get started free
        </Link>
        <Link to="/experiences" style={{ background: '#fff', color: '#374151', padding: '12px 28px', borderRadius: '10px', textDecoration: 'none', fontWeight: 500, fontSize: '15px', border: '1px solid #e5e7eb' }}>
          Browse experiences
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '80px' }}>
        {[
          { icon: '🎯', title: 'Personalised sheets', desc: 'Not the same list for everyone. Your sheet is built around your specific weak topics.' },
          { icon: '📊', title: 'Gap analysis', desc: 'See exactly where you stand for each company — topic by topic with priority scores.' },
          { icon: '💬', title: 'Real experiences', desc: 'Round-by-round interview breakdowns submitted by students who actually went through it.' },
        ].map(f => (
          <div key={f.title} style={{ background: '#f9fafb', borderRadius: '12px', padding: '24px', textAlign: 'left', border: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '24px', marginBottom: '12px' }}>{f.icon}</div>
            <div style={{ fontWeight: 600, fontSize: '15px', color: '#111827', marginBottom: '8px' }}>{f.title}</div>
            <div style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
