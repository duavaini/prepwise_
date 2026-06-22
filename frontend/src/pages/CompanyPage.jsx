import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCompany, getExperiences } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function CompanyPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const [company, setCompany] = useState(null);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    getCompany(slug).then(res => setCompany(res.data));
    getExperiences({ companySlug: slug }).then(res => setExperiences(res.data)).catch(() => {});
  }, [slug]);

  if (!company) return <div style={{ padding: '80px', textAlign: 'center', color: '#6b7280' }}>Loading...</div>;

  const topics = Object.entries(company.topic_weightage || {}).sort((a, b) => b[1] - a[1]);

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: 0 }}>{company.name}</h1>
        <span style={{ fontSize: '13px', fontWeight: 500, padding: '4px 12px', borderRadius: '99px', background: '#f9fafb', color: '#374151', border: '1px solid #e5e7eb' }}>
          {company.package_range}
        </span>
      </div>
      <p style={{ color: '#6b7280', marginBottom: '24px' }}>{company.difficulty} difficulty &middot; CG cutoff {company.cg_cutoff}+ &middot; {company.rounds_count} rounds</p>

      {user ? (
        <Link to={`/analysis/${slug}`} style={{ display: 'inline-block', background: '#111827', color: '#fff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 500, fontSize: '15px', marginBottom: '32px' }}>
          Get my personalised sheet for {company.name}
        </Link>
      ) : (
        <Link to="/login" style={{ display: 'inline-block', background: '#111827', color: '#fff', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 500, fontSize: '15px', marginBottom: '32px' }}>
          Login to get your personalised sheet
        </Link>
      )}

      <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Interview rounds</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
        {(company.rounds_breakdown || []).map((r, i) => (
          <div key={i} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', padding: '14px 16px' }}>
            <div style={{ fontWeight: 500, fontSize: '14px', color: '#111827', marginBottom: '4px' }}>Round {r.round}: {r.type}</div>
            <div style={{ fontSize: '13px', color: '#6b7280' }}>{r.desc}</div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>What gets tested most</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
        {topics.map(([topic, weight]) => (
          <span key={topic} style={{ fontSize: '13px', padding: '6px 12px', borderRadius: '99px', background: '#f9fafb', border: '1px solid #e5e7eb', color: '#374151' }}>
            {topic.replace(/_/g, ' ')} &middot; {weight}%
          </span>
        ))}
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Interview experiences</h2>
      {experiences.length === 0 ? (
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>No experiences shared yet for {company.name}. Be the first!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {experiences.slice(0, 5).map(exp => (
            <div key={exp.id} style={{ border: '1px solid #e5e7eb', borderRadius: '10px', padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#6b7280', marginBottom: '4px' }}>
                <span>{exp.role} &middot; {exp.year}</span>
                <span style={{ fontWeight: 500, color: exp.result === 'selected' ? '#16a34a' : exp.result === 'rejected' ? '#dc2626' : '#6b7280' }}>{exp.result}</span>
              </div>
              <div style={{ fontSize: '13px', color: '#9ca3af' }}>by {exp.author_name} &middot; {exp.upvotes} upvotes</div>
            </div>
          ))}
        </div>
      )}
      <Link to="/experiences" style={{ display: 'inline-block', marginTop: '12px', fontSize: '13px', color: '#111827', fontWeight: 500 }}>View all experiences &rarr;</Link>
    </div>
  );
}
