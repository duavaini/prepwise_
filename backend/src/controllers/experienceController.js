const pool = require('../config/db');

const getExperiences = async (req, res) => {
  const { companySlug, year, result } = req.query;

  try {
    let query = `
      SELECT e.*, c.name as company_name, c.slug as company_slug,
             u.name as author_name
      FROM experiences e
      JOIN companies c ON e.company_id = c.id
      JOIN users u ON e.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (companySlug) {
      params.push(companySlug);
      query += ` AND c.slug = $${params.length}`;
    }
    if (year) {
      params.push(year);
      query += ` AND e.year = $${params.length}`;
    }
    if (result) {
      params.push(result);
      query += ` AND e.result = $${params.length}`;
    }

    query += ' ORDER BY e.upvotes DESC, e.created_at DESC LIMIT 50';

    const res2 = await pool.query(query, params);

    const experiences = res2.rows.map(exp => ({
      ...exp,
      author_name: exp.is_anonymous ? 'Anonymous' : exp.author_name
    }));

    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const submitExperience = async (req, res) => {
  const { companySlug, role, year, result, rounds, isAnonymous } = req.body;
  const userId = req.user.id;

  if (!companySlug || !role || !year || !result || !rounds?.length)
    return res.status(400).json({ error: 'All fields required' });

  try {
    const companyResult = await pool.query('SELECT id FROM companies WHERE slug = $1', [companySlug]);
    if (companyResult.rows.length === 0)
      return res.status(404).json({ error: 'Company not found' });

    const company = companyResult.rows[0];

    const newExp = await pool.query(
      `INSERT INTO experiences (user_id, company_id, role, year, result, rounds, is_anonymous)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [userId, company.id, role, year, result, JSON.stringify(rounds), isAnonymous || false]
    );

    res.status(201).json(newExp.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const upvoteExperience = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const existing = await pool.query(
      'SELECT * FROM experience_upvotes WHERE user_id = $1 AND experience_id = $2',
      [userId, id]
    );

    if (existing.rows.length > 0) {
      await pool.query(
        'DELETE FROM experience_upvotes WHERE user_id = $1 AND experience_id = $2',
        [userId, id]
      );
      await pool.query('UPDATE experiences SET upvotes = upvotes - 1 WHERE id = $1', [id]);
      return res.json({ upvoted: false });
    }

    await pool.query(
      'INSERT INTO experience_upvotes (user_id, experience_id) VALUES ($1, $2)',
      [userId, id]
    );
    await pool.query('UPDATE experiences SET upvotes = upvotes + 1 WHERE id = $1', [id]);
    res.json({ upvoted: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getExperiences, submitExperience, upvoteExperience };
