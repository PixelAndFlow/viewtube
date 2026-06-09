# client/src/pages/

This folder contains one file per full page in the app. Each page is a
React component that the router loads when the user navigates to a specific
URL. Pages are responsible for fetching the data they need and assembling
components into a complete view.

## Files in this folder

### HomePage.jsx
The main landing page shown when the user opens the app.
URL: /
Responsibilities:
- Fetches all videos from GET /api/videos on the backend
- Renders them as a grid of VideoCard components
- Shows a loading state while data is being fetched
- Shows an error message if the fetch fails

### SearchResults.jsx
The page shown after the user submits a search.
URL: /search?q=keyword
Responsibilities:
- Reads the search keyword from the URL query string
- Fetches matching videos from GET /api/search?q=keyword
- Renders results as VideoCard components
- Shows a "no results" message if nothing matches
- Allows the user to search again from this page

### WatchPage.jsx
The video player page shown when the user clicks a video.
URL: /watch/:id
Responsibilities:
- Reads the video ID from the URL parameter
- Fetches that video's data from GET /api/videos/:id
- Renders the VideoPlayer component with the video
- Displays the video title, channel name, and upload date
- Optionally renders a list of other videos alongside the player

### StarredPage.jsx
The saved videos page accessible from the navigation bar.
URL: /starred
Responsibilities:
- Reads the list of starred video IDs from localStorage
- Fetches the data for each starred video from the backend
- Renders them as VideoCard components
- Shows a "no starred videos yet" message if the list is empty
- Allows the user to unstar videos from this page

## Adding a new page

1. Create a new file in this folder (e.g. ChannelPage.jsx)
2. Build the page component
3. Open App.jsx and add a new Route pointing to the new page file
4. Add a link to the new page in NavBar.jsx if it needs to be navigable

## Naming convention

All page files use PascalCase and end with "Page" or describe what the
page shows: HomePage.jsx, WatchPage.jsx, SearchResults.jsx.
