// Node script to generate a JSON file with the list of song filenames in the 'songs' folder
// All code and comments in English

const fs = require('fs');
const path = require('path');

const songsDir = path.join(__dirname, 'songs');
const outputFile = path.join(__dirname, 'songs.json');

// Read all Markdown files in the songs directory
const songFiles = fs.readdirSync(songsDir)
  .filter(file => file.endsWith('.md'))
  .sort(); // Sort alphabetically

// Write the list to songs.json
fs.writeFileSync(outputFile, JSON.stringify(songFiles, null, 2), 'utf8');

console.log('songs.json created with the following files:');
console.log(songFiles);
