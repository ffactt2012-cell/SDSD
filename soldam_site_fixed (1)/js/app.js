
async function loadGallery(){
  const grid = document.querySelector('#galleryGrid');
  if(!grid) return;
  const res = await fetch('data/photos.json?_=' + Date.now());
  const data = await res.json();
  const photos = data.photos || [];
  grid.innerHTML = photos.map(p => `
    <a class="card" href="photo.html?id=${encodeURIComponent(p.id)}" aria-label="${p.title}">
      <img class="thumb" src="${p.image}" alt="${p.title}"/>
      <div class="meta">
        <div>${p.title||'Untitled'}</div>
        <span class="badge">${(p.tags||[])[0] || 'Photo'}</span>
      </div>
    </a>
  `).join('');
}
document.addEventListener('DOMContentLoaded', loadGallery);
