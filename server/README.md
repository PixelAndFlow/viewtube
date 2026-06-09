# server/

This folder contains the entire Node.js/Express backend. Everything here
runs on the server (your local machine during development). It is responsible
for handling API requests from the React frontend, querying the database,
and returning data as JSON.

## How it works

The Express app listens for HTTP requests from the React frontend. When a
request comes in (for example, GET /api/videos), the matching route handler
queries the SQLite database and sends back a JSON response. The React app
reads that response and renders the data on screen.

## Folder contents

  db/              Database schema and seed script
  routes/          API route handlers — one file per feature area
  index.js         Express app entry point — starts the server
  package.json     Backend dependencies and run scripts

## Key commands (run from inside the server/ folder)

  npm install       Install all dependencies listed in package.json
  node index.js     Start the Express server on port 3001
  node db/seed.js   Reset and reseed the database with sample video data

## Ports

The backend runs on port 3001 by default.
The frontend (React) runs on port 5173.
Both must be running at the same time during development.

## CORS

The server is configured with CORS (Cross-Origin Resource Sharing) to allow
the React frontend on port 5173 to make requests to the backend on port 3001.
Without this, the browser would block the requests as a security measure.
