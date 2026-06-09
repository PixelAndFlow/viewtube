# client/

This folder contains the entire React frontend. Everything here runs in
the user's browser. It is responsible for all the UI — what the user sees,
clicks, and interacts with.

## How it works

The React app is a single-page application. When the user opens the app,
the browser loads one HTML file (public/index.html) and React takes over
from there — rendering pages, handling navigation, and fetching data from
the backend API without ever reloading the full page.

## Folder contents

  public/           Static files served directly by the browser
  src/              All React source code
  src/components/   Reusable UI pieces used across multiple pages
  src/pages/        One file per full page in the app
  src/App.jsx       Defines all routes and renders the NavBar
  src/index.js      Entry point — mounts the React app into index.html
  package.json      Frontend dependencies and run scripts

## Key commands (run from inside the client/ folder)

  npm install       Install all dependencies listed in package.json
  npm run dev       Start the development server at http://localhost:5173
  npm run build     Build the app for production (output goes to dist/)

## How the frontend talks to the backend

The React app makes HTTP requests to the Express backend running on port 3001.
For example, when the homepage loads it calls:

  GET http://localhost:3001/api/videos

The backend returns a JSON array of video objects, and React renders them
as video cards on the page.
