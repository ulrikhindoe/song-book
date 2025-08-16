// All code and comments in English
// Handles loading song list and lyrics, navigation, and swipe detection

// Helper to fetch JSON file
async function fetchSongsList() {
  const res = await fetch('songs.json');
  return res.json();
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
  const { title, verses } = parseMarkdown(md);
  document.title = title;
  const titleHeader = document.getElementById('song-title-header');
  if (titleHeader) titleHeader.textContent = title;
  const lyricsElem = document.getElementById('lyrics');
  if (lyricsElem) {
    lyricsElem.innerHTML = verses.map(v => `<p style='color:black;'>${v}</p>`).join('');
  }
  // Set up navigation buttons
  const backTop = document.getElementById('back-top');
  const backBottom = document.getElementById('back-bottom');
  [backTop, backBottom].forEach(btn => {
    if (btn) btn.onclick = () => window.location.href = 'index.html';
  });
  // Swipe right to go back
  let touchStartX = null;
  document.body.addEventListener('touchstart', e => {
    if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
  });
  document.body.addEventListener('touchend', e => {
    if (touchStartX !== null && e.changedTouches.length === 1) {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (dx > 50) window.location.href = 'index.html';
      touchStartX = null;
    }
  });
}

// Detect which page and render
if (document.getElementById('song-list')) {
  renderSongList();
} else if (document.getElementById('lyrics')) {
  renderSongLyrics();
}
