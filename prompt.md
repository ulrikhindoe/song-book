
# Application Requirements


Create an application called **Vem cantar Forró** that displays a collection of song lyrics for sing-alongs. The project includes four main files: `index.html`, `song.html`, `script.js`, and `styles.css`.

## Features

- All song lyrics are stored in Markdown files in the `songs` folder.
- The app uses a Markdown parser (marked.js) to support italics, bold, and other formatting.
- All lyrics formatting (font size, weight, color, spacing) is handled in `styles.css`.
- Responsive design is provided by Bootstrap.
- Background uses `background.jpeg` with a light grey overlay for readability.
- All user-facing text is in Portuguese; all code and comments are in English.
- A Node.js script (`generate-songs-json.js`) generates `songs.json` with the list of song files.


### Markdown format for songs
- The first line is a level 1 header (`#`) with the song title.
- Each verse is separated by a blank line.
- Markdown formatting (italics, bold, etc.) is supported.


## General Requirements
- All text shown to users is in **Portuguese**.
- All code and comments are in English.
- Node script (`generate-songs-json.js`) creates `songs.json` for the song list.
- Uses Bootstrap for responsive design (`bootstrap.min.css`, `bootstrap.bundle.min.js`).
- Uses `background.jpeg` as the background image with a light grey overlay for readability.

## Page Details


### `index.html`
- Page title: "Vem cantar Forró!"
- Displays a list of all songs, sorted alphabetically.
- Each song is a link to its lyrics page.
- Each song button is slightly transparent so the background can be seen.


### `song.html`
- Page title: the song's name.
- Shows the song lyrics, formatted with Markdown (italics, bold, etc.).
- Includes buttons at the top and bottom to return to the song list.
- Swiping right with a single finger returns to the song list (multi-finger gestures like pinch-to-zoom do not trigger navigation).
- Song title and verses are in black text.
- Lyrics font size is 0.9rem and font weight is 600.
- Vertical space between verses is minimal for a compact look.
