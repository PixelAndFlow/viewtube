# server/db/

This folder contains everything related to the database — the schema that
defines the table structure and the seed script that fills it with sample data.

## Files in this folder

### schema.sql
Defines the database tables using SQL CREATE TABLE statements. Run this
file once when setting up the database for the first time on a new machine.
It creates all the tables ViewTube needs to store and retrieve video data.

Current tables defined:
- videos — stores all video records with the following columns:
    id            Unique identifier for each video (auto-incremented)
    title         The video title displayed on cards and the player page
    channel_name  The name of the channel that uploaded the video
    upload_date   The date the video was uploaded (used for display)
    thumbnail_url URL of the video thumbnail image shown on cards
    video_url     URL or embed ID of the actual video for the player
    view_count    Number of views displayed on the video card
    duration      Length of the video displayed on the card

How to run:
  From the server/ folder: node db/seed.js (seed.js runs schema first)
  Or directly with SQLite: sqlite3 viewtube.db < db/schema.sql

### seed.js
Populates the database with realistic sample video data. Running this script
drops all existing data and reloads the tables from scratch. Use it when
setting up for the first time or when the database gets into a broken state.

The seeded dataset contains:
- At least 5 distinct channels
- At least 40 videos distributed across those channels
- Upload dates spanning at least 90 days

How to run:
  From the server/ folder: node db/seed.js

Warning: this deletes all existing data. Do not run it if you have data
you want to keep.

## Database file location

SQLite creates a single database file (viewtube.db) in the server/ folder
when the app first connects to it. This file is listed in .gitignore and
is never pushed to GitHub. Each developer runs seed.js to create their own
local copy.
