# ViewTube — Project Context

Last updated: 2026-06-12

A full-stack YouTube replica built as a demo/portfolio project. The app lets users browse, search, and watch videos using YouTube embeds. All user state (starred, history, progress, subscriptions) lives in the browser. The database holds only the video catalogue.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Backend | Node.js + Express 5 |
| Database | SQLite via better-sqlite3 |
| Styling | Plain CSS with custom properties (no framework) |
| Routing | React Router v7 |
| State | React Context API + localStorage |

---

## Repository Layout

```
viewtube/
├── client/          React frontend (Vite)
├── server/          Express backend + SQLite
├── render.yaml      Render deployment blueprint
├── context.md       This file
└── README.md        Setup instructions
```

---

## Running Locally

```bash
# 1. Install dependencies
cd server && npm install && cd ../client && npm install && cd ..

# 2. Seed the database (required after every fresh clone)
cd server && npm run seed && cd ..

# 3. Start both servers (two terminals)
cd server && npm run dev      # http://localhost:3001
cd client && npm run dev      # http://localhost:5173
```

Open http://localhost:5173 in your browser.

---

## Pages

| URL | Page | Description |
|---|---|---|
| `/` | Home | Video grid with channel filters, category chips, sort, continue watching, recently watched |
| `/watch/:id` | Watch | YouTube embed, channel info, subscribe, star, related videos, mini player on scroll |
| `/search?q=` | Search | Full-text search across title and channel name |
| `/starred` | Starred | Videos the user has starred |
| `/history` | Watch History | Videos the user has watched, with clear option |
| `/trending` | Trending | Top 20 videos by view count |

---

## Data

- **69 videos** across **9 channels**: VEVO Music, Retro Hits, Pop Legends, Rock Classics, Urban Beats, TED Talks, Science & Space, Tech Today, World Kitchen
- The `.db` file is not in git — run `npm run seed` to generate it
- Seeding wipes and recreates all data

---

## localStorage Keys

| Key | What it stores |
|---|---|
| `viewtube_theme` | `"light"` or `"dark"` |
| `viewtube_starred` | JSON array of starred video IDs |
| `viewtube_recently_watched` | JSON array of last 5 watched video IDs |
| `viewtube_watch_history` | JSON array of `{ videoId, watchedAt }` entries |
| `viewtube_watch_progress` | JSON map of `videoId → { currentTime, duration, updatedAt }` |
| `viewtube_subscriptions` | JSON array of subscribed channel name strings |

`sessionStorage` key: `viewtube_playback_rate` — user's preferred playback speed (resets on tab close)

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/videos` | All videos, ordered by upload date descending |
| GET | `/api/videos/:id` | Single video by database ID |
| GET | `/api/search?q=` | Videos matching title or channel name (SQL LIKE) |

---

## Render Deployment

The app is configured to deploy to Render's free tier as a single web service (Express serves both the API and the built React app).

**Key files:**
- `render.yaml` — Render blueprint in the project root
- `server/.env.example` — template for local `.env`

**How it works on Render:**
- Build: installs deps and runs `vite build` in `client/`
- Start: `node db/seed.js && node index.js` — seeds the DB then starts Express
- `NODE_ENV=production` — enables static file serving and open CORS
- `DB_PATH=/tmp/viewtube.db` — writes SQLite to `/tmp/` (the only writable path on Render's free tier)
- Express serves `client/dist` as static files and catches all non-API routes with `/{*splat}` → `index.html`

**Important:** The database is ephemeral on Render's free tier — it resets on every redeploy. The auto-seed on startup handles this automatically.

**Local dev is unchanged** — `npm run dev` in both `client/` and `server/` still works as before. `DB_PATH` falls back to `server/db/viewtube.db` when the env var is not set.

---

## Key Design Decisions

- No user accounts — all personalisation is browser-local
- No YouTube Data API key — embeds use `youtube.com/embed/{id}`, thumbnails use `img.youtube.com/vi/{id}/hqdefault.jpg`
- Dark mode applied via `data-theme` attribute on `<html>` using CSS custom properties — zero runtime cost, no flash
- Watch progress cleared automatically at 95% completion so continue watching stays relevant
- Mini player activates when the video player scrolls out of view — keeps video playing while browsing related content
- All three DB-touching files (`seed.js`, `routes/videos.js`, `routes/search.js`) read `DB_PATH` from the environment with a local fallback — ensures they all open the same file in both dev and production

---

## Documentation

Full documentation lives in the `viewtube-docs` repository (sibling directory):

```
viewtube-docs/
├── architecture/    File structure, component map, API routes, database schema
├── decisions/       Decisions log with reasoning for every major choice
├── commands/        All commands to run the project
├── tech-stack/      Stack overview with versions and rationale
├── mvp/             MVP checklist
├── prd/             Product requirements document
└── ai-conversations/ Build session logs and context restore prompts
```
