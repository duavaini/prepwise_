# Prepwise

A personalised placement prep platform. Enter your Codeforces (and optionally LeetCode)
handle, pick a target company, and get a problem sheet that's actually built around
*your* weak topics and *that company's* interview pattern — not the same generic sheet
everyone gets. Also includes a company-wise interview experience feed.

## How it works

1. You add your CF handle in your profile.
2. For any company, "Analyse my profile" pulls your CF submission history, computes
   a tag-wise solve rate + average difficulty per topic (graphs, DP, trees, etc.).
3. Each company has a topic weightage (how much it tests each topic, based on real
   interview patterns).
4. The personalisation engine combines your gaps with the company's weightage to
   produce a priority-ordered problem sheet — weak + high-weight topics first.

## Tech stack

- **Frontend**: React + Vite, react-router, recharts (radar chart for topic strengths)
- **Backend**: Node + Express, MVC structure (routes / controllers / services)
- **Database**: PostgreSQL (designed for Supabase free tier)
- **Auth**: JWT
- **External APIs**: Codeforces public API, LeetCode GraphQL (best-effort)

## Project structure

```
prepwise/
├── backend/
│   └── src/
│       ├── config/        # db connection, schema.sql, seed.sql, seed-problems.sql
│       ├── controllers/    # request handlers
│       ├── middleware/     # JWT auth middleware
│       ├── routes/         # express routers
│       ├── services/       # cpService (CF/LC), personalisationService (the algorithm)
│       └── server.js
└── frontend/
    └── src/
        ├── pages/           # Landing, Login, Signup, Dashboard, Companies,
        │                    # CompanyPage, AnalysisResult, Experiences,
        │                    # SubmitExperience, Profile
        ├── components/      # Navbar
        ├── context/         # AuthContext (JWT stored in localStorage)
        └── services/api.js  # axios client
```

## Setup

### 1. Database (Supabase free tier)

1. Create a project at supabase.com
2. Open the SQL editor and run, in order:
   - `backend/src/config/schema.sql`
   - `backend/src/config/seed.sql` (6 companies with topic weightages)
   - `backend/src/config/seed-problems.sql` (~78 problems tagged by topic/difficulty)
3. Copy your connection string (Project Settings → Database → Connection string)

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in DATABASE_URL (from Supabase) and a random JWT_SECRET
npm run dev
```

Runs on `http://localhost:5000`.

### 3. Frontend

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api (default is fine for local dev)
npm run dev
```

Runs on `http://localhost:5173`.

## Deployment

- **Frontend** → Vercel (root directory: `frontend`)
- **Backend** → Render (root directory: `backend`, start command `npm start`)
- Set `FRONTEND_URL` on the backend to your deployed frontend URL (for CORS)
- Set `VITE_API_URL` on the frontend to your deployed backend URL + `/api`

## Extending it

- Add more companies/problems by inserting rows into `companies` and `problems`
- Add more topics: extend `TOPIC_TAG_MAP` in `cpService.js` and add matching
  `topic_weightage` keys when inserting companies
- The personalisation algorithm lives entirely in `personalisationService.js` —
  this is the part worth explaining in interviews
