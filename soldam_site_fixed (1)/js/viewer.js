
function q(name){ const u = new URL(location.href); return u.searchParams.get(name); }
function swipe(el, onLeft, onRight){
  let x0=null;
  el.addEventListener('touchstart',e=>{x0=e.changedTouches[0].clientX},{passive:true});
  el.addEventListener('touchend',e=>{ if(x0===null) return; const dx=e.changedTouches[0].clientX - x0; 
    if(Math.abs(dx)>40){ dx<0 ? onLeft() : onRight() } x0=null; },{passive:true});
}
async function initViewer(){
  const id = q('id');
  const res = await fetch('data/photos.json?_='+Date.now());
  const {photos} = await res.json();
  let current = Math.max(0, photos.findIndex(p=>p.id===id));
  const img = document.querySelector('#viewerImage');
  const title = document.querySelector('#viewerTitle');
  const desc = document.querySelector('#viewerDesc');
  const tags = document.querySelector('#viewerTags');
  const counter = document.querySelector('#viewerCounter');
  function show(i){
    current = (i + photos.length) % photos.length;
    const p = photos[current];
    img.src = p.image; img.alt = p.title||'';
    title.textContent = p.title || 'Untitled';
    desc.textContent = p.description || '';
    tags.innerHTML = (p.tags||[]).map(t=>`<span class="tag">#${t}</span>`).join('');
    counter.textContent = (current+1)+' / '+photos.length;
    const hidden = document.querySelector('input[name="photoId"]'); if(hidden) hidden.value = p.id;
    if(window.loadComments) window.loadComments(p.id);
    history.replaceState(null,'','photo.html?id='+encodeURIComponent(p.id));
  }
  document.querySelector('#prevBtn').addEventListener('click',()=>show(current-1));
  document.querySelector('#nextBtn').addEventListener('click',()=>show(current+1));
  document.addEventListener('keydown',e=>{ if(e.key==='ArrowLeft') show(current-1); if(e.key==='ArrowRight') show(current+1) });
  swipe(document.querySelector('.image-wrap'), ()=>show(current+1), ()=>show(current-1));
  show(current<0?0:current);
}
document.addEventListener('DOMContentLoaded', initViewer);
