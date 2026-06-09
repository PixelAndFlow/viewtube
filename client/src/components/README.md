# client/src/components/

This folder contains reusable UI pieces that appear on more than one page.
A component is built once here and imported wherever it is needed. If you
need to change how something looks or behaves, you change it in one file
and every page that uses it updates automatically.

## Rule of thumb

If a UI element appears on more than one page, it belongs here.
If it only ever appears on one specific page, it can live in that page file.

## Files in this folder

### NavBar.jsx
The navigation bar displayed at the top of every page in the app.
Contains: the ViewTube logo (links to homepage), the search input bar,
and a link to the Starred Videos page.
Used in: App.jsx — rendered once so it appears on all pages automatically.

### VideoCard.jsx
A single video thumbnail card displayed in any grid of videos.
Shows: thumbnail image, video title, channel name, upload date, and a
star icon the user can click to save or unsave the video.
Contains: the star/unstar logic using localStorage.
Used in: HomePage.jsx, SearchResults.jsx, StarredPage.jsx, and the
suggested videos list in WatchPage.jsx.

### VideoPlayer.jsx
The embedded video player with playback controls.
Contains: the YouTube iframe embed (or HTML5 video element), play/pause,
seek bar, volume control, and timestamp display.
Used in: WatchPage.jsx.

## Adding a new component

1. Create a new file in this folder named in PascalCase (e.g. FilterBar.jsx)
2. Build and export the component
3. Import it into whichever page or component needs it

## Naming convention

All component files use PascalCase: NavBar.jsx, VideoCard.jsx, VideoPlayer.jsx.
This is the React standard and makes it easy to tell components apart from
regular JavaScript files.
