const pool = require('../config/db');

const getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, cf_handle, lc_handle, target_companies, created_at FROM users WHERE id = $1',
      [req.user.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  const { cfHandle, lcHandle, targetCompanies } = req.body;
  try {
    const result = await pool.query(
      `UPDATE users SET cf_handle = $1, lc_handle = $2, target_companies = $3
       WHERE id = $4 RETURNING id, name, email, cf_handle, lc_handle, target_companies`,
      [cfHandle || null, lcHandle || null, targetCompanies || [], req.user.id]
    );
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getProfile, updateProfile };
