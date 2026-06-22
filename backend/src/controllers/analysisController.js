const pool = require('../config/db');
const { getCFSubmissions, getCFUserInfo, getLCStats, analyzeCFSubmissions } = require('../services/cpService');
const { generatePersonalisedSheet } = require('../services/personalisationService');

const analyzeProfile = async (req, res) => {
  const { companySlug } = req.params;
  const userId = req.user.id;

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    const user = userResult.rows[0];

    if (!user.cf_handle && !user.lc_handle) {
      return res.status(400).json({ error: 'Please add your CF or LC handle in your profile first' });
    }

    const companyResult = await pool.query('SELECT * FROM companies WHERE slug = $1', [companySlug]);
    if (companyResult.rows.length === 0)
      return res.status(404).json({ error: 'Company not found' });
    const company = companyResult.rows[0];

    const problemsResult = await pool.query(
      'SELECT * FROM problems WHERE $1 = ANY(company_slugs)',
      [companySlug]
    );
    const allProblems = problemsResult.rows;

    let tagStats = {};
    let cfUserInfo = null;
    let lcStats = null;

    if (user.cf_handle) {
      try {
        const [submissions, userInfo] = await Promise.all([
          getCFSubmissions(user.cf_handle),
          getCFUserInfo(user.cf_handle)
        ]);
        tagStats = analyzeCFSubmissions(submissions);
        cfUserInfo = userInfo;
      } catch (err) {
        console.error('CF fetch error:', err.message);
      }
    }

    if (user.lc_handle) {
      try {
        lcStats = await getLCStats(user.lc_handle);
      } catch (err) {
        console.error('LC fetch error:', err.message);
      }
    }

    const analysis = generatePersonalisedSheet(tagStats, company, allProblems);

    const fullResult = {
      ...analysis,
      cfUserInfo,
      lcStats,
      company: {
        name: company.name,
        slug: company.slug,
        difficulty: company.difficulty,
        cg_cutoff: company.cg_cutoff,
        package_range: company.package_range,
        rounds_count: company.rounds_count,
        rounds_breakdown: company.rounds_breakdown,
      }
    };

    await pool.query(
      `INSERT INTO user_analysis_cache (user_id, company_slug, analysis_data)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, company_slug)
       DO UPDATE SET analysis_data = $3, generated_at = NOW()`,
      [userId, companySlug, JSON.stringify(fullResult)]
    );

    res.json(fullResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Analysis failed' });
  }
};

const getCachedAnalysis = async (req, res) => {
  const { companySlug } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      'SELECT * FROM user_analysis_cache WHERE user_id = $1 AND company_slug = $2',
      [userId, companySlug]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: 'No cached analysis found' });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { analyzeProfile, getCachedAnalysis };
