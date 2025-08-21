// All code and comments in English
// Handles loading song list and lyrics, navigation, and swipe detection

// Helper to fetch JSON file
async function fetchSongsList() {
  const res = await fetch('songs.json');
  return res.json();
}

// Load marked.js Markdown parser
function loadMarked(callback) {
  if (window.marked) return callback();
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
  script.onload = callback;
  document.head.appendChild(script);
}

// Helper to fetch Markdown and parse
async function fetchSongMarkdown(filename) {
  const res = await fetch(`songs/${filename}`);
  return res.text();
}

// Parse Markdown: get title and verses, render <br> for line endings
function parseMarkdown(md) {
  const lines = md.split('\n');
  const title = lines[0].replace(/^# /, '').trim();
  let verses = [];
  let currentVerse = [];
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') {
      if (currentVerse.length) {
        verses.push(currentVerse.join('<br>'));
        currentVerse = [];
      }
    } else {
      currentVerse.push(lines[i]);
    }
  }
  if (currentVerse.length) verses.push(currentVerse.join('<br>'));
  return { title, verses };
}

// Render song list on index.html
async function renderSongList() {
  const listElem = document.getElementById('song-list');
  if (!listElem) return;
  const songs = await fetchSongsList();
  listElem.innerHTML = '';
  songs.forEach(filename => {
    const name = filename.replace(/\.md$/, '').replace(/-/g, ' ');
    const item = document.createElement('a');
    item.className = 'list-group-item list-group-item-action';
    item.href = `song.html?song=${encodeURIComponent(filename)}`;
    item.textContent = name;
    listElem.appendChild(item);
  });
}

// Render lyrics on song.html
async function renderSongLyrics() {
  const params = new URLSearchParams(window.location.search);
  const songFile = params.get('song');
  if (!songFile) return;
  const md = await fetchSongMarkdown(songFile);
  loadMarked(() => {
    // Use marked to parse Markdown
    // Remove first line (title) from Markdown before rendering lyrics
    const mdLines = md.split('\n');
    const titleMatch = mdLines[0].match(/^#\s*(.*)/);
    const title = titleMatch ? titleMatch[1].trim() : '';
    document.title = title;
    const titleHeader = document.getElementById('song-title-header');
    if (titleHeader) titleHeader.textContent = title;
    const lyricsElem = document.getElementById('lyrics');
    if (lyricsElem) {
      const lyricsMd = mdLines.slice(1).join('\n');
      const html = marked.parse(lyricsMd);
      lyricsElem.innerHTML = html;
  // Styling is now handled in styles.css
    }
  });
  // Set up navigation buttons
  const backTop = document.getElementById('back-top');
  const backBottom = document.getElementById('back-bottom');
  [backTop, backBottom].forEach(btn => {
    if (btn) btn.onclick = () => window.location.href = 'index.html';
  });
  // Swipe right to go back (ignore multi-touch gestures)
  let touchStartX = null;
  let touchStartCount = 0;
  document.body.addEventListener('touchstart', e => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartCount = 1;
    } else {
      touchStartX = null;
      touchStartCount = e.touches.length;
    }
  });
  document.body.addEventListener('touchend', e => {
    if (touchStartX !== null && touchStartCount === 1 && e.changedTouches.length === 1) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (dx > 50) window.location.href = 'index.html';
    }
    touchStartX = null;
    touchStartCount = 0;
  });
}

// Detect which page and render
if (document.getElementById('song-list')) {
  renderSongList();
} else if (document.getElementById('lyrics')) {
  renderSongLyrics();
}
