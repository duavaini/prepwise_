-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  cf_handle VARCHAR(100),
  lc_handle VARCHAR(100),
  target_companies TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  difficulty VARCHAR(50),
  cg_cutoff FLOAT,
  package_range VARCHAR(100),
  rounds_count INTEGER,
  rounds_breakdown JSONB,
  topic_weightage JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS problems (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  difficulty VARCHAR(50) NOT NULL,
  topic_tags TEXT[] NOT NULL,
  company_slugs TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  company_id INTEGER REFERENCES companies(id) ON DELETE CASCADE,
  role VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  result VARCHAR(50) NOT NULL CHECK (result IN ('selected', 'rejected', 'ongoing')),
  rounds JSONB NOT NULL,
  upvotes INTEGER DEFAULT 0,
  is_anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experience_upvotes (
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  experience_id INTEGER REFERENCES experiences(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, experience_id)
);

CREATE TABLE IF NOT EXISTS user_analysis_cache (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  company_slug VARCHAR(100) NOT NULL,
  analysis_data JSONB NOT NULL,
  generated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, company_slug)
);
