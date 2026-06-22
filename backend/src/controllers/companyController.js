const pool = require('../config/db');

const getAllCompanies = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM companies ORDER BY name');
    res.json(result.rows);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

const getCompany = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM companies WHERE slug = $1', [req.params.slug]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Company not found' });
    res.json(result.rows[0]);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAllCompanies, getCompany };
