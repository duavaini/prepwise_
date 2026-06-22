import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import { runAnalysis, getCachedAnalysis } from '../services/api';

const statusColor = { strong: '#16a34a', moderate: '#d97706', weak: '#dc2626' };

export default function AnalysisResult() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [running, setRunning] = useState(false);

  const load = async (fresh = false) => {
    setError('');
    if (fresh) setRunning(true); else setLoading(true);
    try {
      if (fresh) {
        const res = await runAnalysis(slug);
        setData(res.data);
      } else {
        try {
          const cached = await getCachedAnalysis(slug);
          setData(cached.data.analysis_data);
        } catch {
          const res = await runAnalysis(slug);
          setData(res.data);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Analysis failed');
    } finally {
      setLoading(false);
      setRunning(false);
    }
  };

  useEffect(() => { load(false); }, [slug]);

  if (loading) return <div style={{ padding: '80px', textAlign: 'center', color: '#6b7280' }}>Analysing your profile...</div>;

  if (error) {
    return (
      <div style={{ maxWidth: '500px', margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <p style={{ color: '#dc2626', marginBottom: '16px' }}>{error}</p>
        <Link to="/profile" style={{ color: '#111827', fontWeight: 500, fontSize: '14px' }}>Go to profile to add your CF handle &rarr;</Link>
      </div>
    );
  }

  if (!data) return null;

  const radarData = data.topicAnalysis.map(t => ({
    topic: t.topic.replace(/_/g, ' '),
    score: t.userScore,
    priority: t.priority,
  }));

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#111827', margin: 0 }}>{data.companyName} prep sheet</h1>
        <button onClick={() => load(true)} disabled={running} style={refreshBtn}>{running ? 'Refreshing...' : 'Refresh analysis'}</button>
      </div>
      <p style={{ color: '#6b7280', marginBottom: '28px' }}>
        Based on your Codeforces submissions
        {data.cfUserInfo ? <> &middot; rating {data.cfUserInfo.rating || 'unrated'}</> : null}.
        {' '}{data.summary.totalProblems} problems recommended, ~{data.summary.estimatedDays} days.
      </p>

      <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', marginBottom: '28px' }}>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={radarData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="topic" tick={{ fontSize: 12, fill: '#6b7280' }} />
            <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10, fill: '#9ca3af' }} />
            <Radar name="Your strength" dataKey="score" stroke="#111827" fill="#111827" fillOpacity={0.15} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Topic breakdown</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
        {data.topicAnalysis.map(t => (
          <div key={t.topic} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '12px 16px' }}>
            <div>
              <div style={{ fontWeight: 500, fontSize: '14px', color: '#111827', textTransform: 'capitalize' }}>{t.topic.replace(/_/g, ' ')}</div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>{t.solved} solved &middot; avg rating {t.avgDifficulty || '—'} &middot; company weight {t.companyWeight}%</div>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 500, padding: '4px 10px', borderRadius: '99px', color: statusColor[t.status], background: '#f9fafb', border: `1px solid ${statusColor[t.status]}33`, textTransform: 'capitalize' }}>
              {t.status}
            </span>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>Your personalised problem sheet</h2>
      <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '12px' }}>Ordered by what {data.companyName} tests most and where you're weakest.</p>
      {data.problems.length === 0 ? (
        <p style={{ color: '#9ca3af', fontSize: '14px' }}>No problems matched yet — seed data may be limited for this company.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {data.problems.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '12px 16px' }}>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '14px', color: '#111827' }}>{p.title}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'capitalize' }}>{p.reason.replace(/_/g, ' ')} &middot; {p.platform}</div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: 500, padding: '4px 10px', borderRadius: '99px', background: '#f9fafb', border: '1px solid #e5e7eb', color: '#374151' }}>
                  {p.difficulty}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

const refreshBtn = { fontSize: '13px', padding: '8px 14px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fff', color: '#374151', cursor: 'pointer' };
