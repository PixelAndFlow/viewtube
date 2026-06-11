# ViewTube
- Mofazzal Hossain — Pair Programmer
A full-stack YouTube replica built as a web development assignment. Supports homepage video browsing, channel filtering, search, video playback via YouTube embed, starring/bookmarking videos, dark mode, and a fully responsive mobile layout.

## Features

- 69 videos across 9 channels (music, TED Talks, science, tech, cooking)
- Filter chips to browse by channel
- YouTube iframe video player
- Search by title or channel
- Star/bookmark videos — persisted in `localStorage`
- Dark mode toggle — persisted in `localStorage`
- Responsive layout (mobile bottom nav, collapsible search bar)

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 8, React Router v7 |
| Backend | Node.js, Express 5 |
| Database | SQLite via `better-sqlite3` |
| Styling | CSS custom properties, Google Fonts (Roboto) |
| Video | YouTube iframe embed |

## Prerequisites

- **Node.js v18 or higher** — [nodejs.org](https://nodejs.org) (LTS version recommended)
- **npm** — bundled with Node, no separate install needed

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/PixelAndFlow/viewtube.git
cd viewtube

# 2. Install and seed the backend
cd server
npm install
npm run seed

# 3. Install the frontend
cd ../client
npm install
```

> The seed step creates `server/db/viewtube.db` — this file is in `.gitignore` and must be generated locally by every contributor.

## Running

Open **two terminals**:

```bash
# Terminal 1 — backend (port 3001)
cd server
npm run dev

# Terminal 2 — frontend (port 5173)
cd client
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Pages

| URL | Description |
|---|---|
| `/` | Homepage — video grid with channel filter chips |
| `/watch/:id` | Video player with suggestions sidebar |
| `/search?q=` | Search results |
| `/starred` | Bookmarked videos |

## Project Structure

```
viewtube/
├── client/             # React frontend (Vite, port 5173)
│   └── src/
│       ├── components/ # NavBar, Sidebar, VideoCard, VideoPlayer
│       ├── context/    # StarredContext, ThemeContext
│       └── pages/      # HomePage, WatchPage, SearchResults, StarredPage
└── server/             # Express backend (port 3001)
    ├── db/
    │   ├── seed.js     # Populates the database with 69 sample videos
    │   └── schema.sql  # Table definitions
    └── routes/         # videos.js, search.js
```

## Notes

- The database (`*.db`) is excluded from the repo — run `npm run seed` after every fresh clone.
- Starred videos and dark mode preference are stored in browser `localStorage`, not the database.
- The Vite dev server proxies all `/api` requests to `localhost:3001`, so no CORS configuration is needed during development.

## Deploy online (share a public link)

ViewTube can be hosted for free so anyone can open it in a browser — no need to run it on your Mac.

### Recommended: [Render](https://render.com) (free)

1. Push your code to GitHub (`mofazzal-setup` branch).
2. Sign up at [render.com](https://render.com) with GitHub.
3. Click **New → Blueprint** and connect `PixelAndFlow/viewtube`.
4. Render reads `render.yaml` and deploys automatically.
5. When the deploy finishes, you get a URL like `https://viewtube-xxxx.onrender.com` — share that for your presentation.

**What happens on deploy:** Render builds the React app, starts the Express server, seeds the SQLite database if missing, and serves both the site and `/api` from one URL.

### Test production build locally

```bash
cd client && npm run build && cd ..
NODE_ENV=production npm start
```

Open [http://localhost:3001](http://localhost:3001) — same as the live site.

### Notes for live demo

- Free Render apps **sleep after ~15 min** of no traffic — first visit may take 30–60 seconds to wake up.
- Video playback still uses **YouTube embeds** — viewers need internet.
- Starred/history/progress data stays in each visitor's browser (`localStorage`), not on the server.
