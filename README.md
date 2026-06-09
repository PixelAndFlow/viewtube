# ViewTube

A full-stack YouTube replica built with React, Node.js/Express, and SQLite.
Supports homepage browsing, video search, video playback, and starred video
saving.

## Tech Stack

- Frontend: React (Vite)
- Backend: Node.js with Express
- Database: SQLite
- Video playback: YouTube iframe embed

## Setup Instructions

1. Clone the repository
   git clone https://github.com/yourusername/viewtube.git
   cd viewtube

2. Install backend dependencies
   cd server
   npm install

3. Set up and seed the database
   node db/seed.js

4. Install frontend dependencies
   cd ../client
   npm install

5. Start the backend (in one terminal window)
   cd server
   node index.js

6. Start the frontend (in a second terminal window)
   cd client
   npm run dev

7. Open your browser to http://localhost:5173

## Folder Structure

  client/     React frontend
  server/     Node.js/Express backend, database, and API routes

## Notes

- The backend runs on port 3001 by default
- The frontend runs on port 5173 by default
- Starred videos are saved in browser localStorage — no login required
- All video data is seeded locally — no live API connection needed
