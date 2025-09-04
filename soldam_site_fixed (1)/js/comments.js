
const KEY='localComments:';
function _get(id){ try{ return JSON.parse(localStorage.getItem(KEY+id)||'[]'); }catch(e){ return [] } }
function _push(id, c){ const a=_get(id); a.unshift(c); localStorage.setItem(KEY+id, JSON.stringify(a)); }
function render(list){
  const el=document.querySelector('#commentsList'); if(!el) return;
  el.innerHTML = (list||[]).map(c=>`
    <div class="comment">
      <div><span class="author">${c.name||'Guest'}</span> <span class="date">${new Date(c.date||Date.now()).toLocaleString()}</span></div>
      <div>${(c.message||'').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>')}</div>
    </div>
  `).join('') || '<div class="comment"><em>Be the first to comment.</em></div>';
}
async function loadComments(photoId){
  try{
    const r = await fetch('/.netlify/functions/comments?photoId='+encodeURIComponent(photoId), {cache:'no-store'});
    if(r.ok){ const d = await r.json(); if(Array.isArray(d)&&d.length){ render(d); return; } }
  }catch(e){}
  render(_get(photoId));
}
window.loadComments = loadComments;
document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.querySelector('#commentForm'); if(!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const fd=new FormData(form); const payload=Object.fromEntries(fd.entries());
    const c={name:payload.name||'Guest',message:payload.message||'',date:new Date().toISOString()};
    _push(payload.photoId, c); loadComments(payload.photoId);
    fetch('/', {method:'POST', headers:{'Content-Type':'application/x-www-form-urlencoded'}, body:new URLSearchParams(Object.entries(payload)).toString()}).catch(()=>{});
    form.reset();
  });
});
