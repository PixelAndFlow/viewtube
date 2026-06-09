# server/routes/

This folder contains the API route handlers — the code that runs when the
React frontend makes a request to the backend. Each file groups related
routes together so the main index.js stays clean and easy to read.

## How routes work

When the React app needs data, it makes an HTTP request to a URL like:

  GET http://localhost:3001/api/videos

Express matches that URL to a route handler in one of these files, runs
the handler, queries the database, and sends back a JSON response.

## Files in this folder

### videos.js
Handles all requests for video data.

Routes defined here:

  GET /api/videos
    Returns all videos in the database as a JSON array.
    Used by: HomePage.jsx to populate the homepage feed.
    Response: [ { id, title, channel_name, upload_date, thumbnail_url,
                  video_url, view_count, duration }, ... ]

  GET /api/videos/:id
    Returns a single video matching the given ID.
    Used by: WatchPage.jsx to load the video player page.
    Response: { id, title, channel_name, upload_date, thumbnail_url,
                video_url, view_count, duration }
    Error: Returns 404 if no video with that ID exists.

### search.js
Handles search requests.

Routes defined here:

  GET /api/search?q=keyword
    Returns all videos whose title or channel_name contains the keyword.
    The search is case-insensitive.
    Used by: SearchResults.jsx when the user submits a search.
    Response: [ { id, title, channel_name, upload_date, thumbnail_url,
                  video_url, view_count, duration }, ... ]
    Returns an empty array [] if no videos match — never an error.

## Adding a new route file

1. Create a new file in this folder (e.g. channels.js)
2. Define your routes using Express Router
3. Export the router at the bottom of the file
4. Open server/index.js and register the new router with app.use()

## Example route file structure

  const express = require('express');
  const router  = express.Router();

  router.get('/', (req, res) => {
    // query the database and send back JSON
    res.json({ data: [] });
  });

  module.exports = router;
