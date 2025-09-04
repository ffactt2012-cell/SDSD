
async function loadBoard(){
  const list = document.querySelector('#postList'); if(!list) return;
  const res = await fetch('data/posts.json?_='+Date.now()); const data = await res.json();
  const posts = (data.posts||[]).sort((a,b)=> new Date(b.date)-new Date(a.date));
  list.innerHTML = posts.map(p=>`
    <a class="post-item" href="post.html?id=${encodeURIComponent(p.id)}">
      <div class="title">${p.title}</div>
      <div class="date">${new Date(p.date).toLocaleString()}</div>
    </a>
  `).join('');
}
async function loadPost(){
  const id = new URL(location.href).searchParams.get('id');
  const el = document.querySelector('#postContent'); if(!el) return;
  const r = await fetch('data/posts.json?_='+Date.now()); const {posts} = await r.json();
  const p = posts.find(x=>x.id===id) || posts[0];
  if(!p){ el.innerHTML='<p>Post not found.</p>'; return; }
  document.querySelector('#postTitle').textContent = p.title;
  document.querySelector('#postDate').textContent = new Date(p.date).toLocaleString();
  el.innerHTML = window.md ? md(p.content||'') : (p.content||'');
  const att = document.querySelector('#postAttachments');
  att.innerHTML = (p.attachments||[]).map(f=>`<li><a href="${f}" target="_blank" rel="noopener">${f.split('/').pop()}</a></li>`).join('');
}
document.addEventListener('DOMContentLoaded', ()=>{ loadBoard(); loadPost(); });
