# client/public/

This folder contains static files that are served directly by the browser
without being processed by React or Vite.

## What belongs here

- index.html — the single HTML file the browser loads. React injects the
  entire app into the <div id="root"> element inside this file. You rarely
  need to edit it directly.
- Favicon files — the small icon shown in the browser tab
- Any static images or assets that do not need to be imported into React
  components (background images, logos used in HTML, etc.)

## What does NOT belong here

- React components — those go in src/components/ or src/pages/
- JavaScript logic — that goes in src/
- Images imported inside React components — those go in src/assets/ (create
  this folder if needed) so Vite can optimize them

## index.html

The key line in index.html is:

  <div id="root"></div>

React mounts the entire application into this element. Everything you see
in the browser is rendered by React into this one div.
