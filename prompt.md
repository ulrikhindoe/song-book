
# Application Requirements

Create an application called **Cancioneiro de Forró** that displays a collection of song lyrics for sing-alongs. The project should include four main files: `index.html`, `song.html`, `script.js`, and `styles.css`.

Each song is stored in a Markdown file inside a folder named `songs`. The Markdown format is:

- The first line is a level 1 header (`#`) with the song title.
- Each verse is separated by a blank line
- When rendered as HTML the line endings in the verses must be rendered as br elements.

## General Requirements

- All text shown to users must be in **Portuguese**.
- All code and comments in the code must be in English
- Create a Node script that I can run myself to create a json file with the files names of the songs. Use the result json to get the list of songs. 
- Use Bootstrap for responsive design. Link to:
  - `bootstrap.min.css`
  - `bootstrap.bundle.min.js`
- Use `background.jpeg` as the background image on both pages. Adjust the black areas to light grey so text is easy to read.

## Page Details

### `index.html`
- Page title: "Cancioneiro de Forró"
- Display a list of all songs, sorted alphabetically.
- Each song is a link to its lyrics page.

### `song.html`
- Page title: the song's name.
- Show the song lyrics, formatted.
- Include buttons on the top and in the bommom to return to the song list.
- Swiping right should also return to the song list.
- Make the song title and versions in black text.
