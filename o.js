const ADMIN_PASSWORD = 'KawakiHIROX9';
let prompts = [];
let isAdmin = false;
let activeFilter = 'all';

function save() { localStorage.setItem('kawaki_prompts', JSON.stringify(prompts)); }
function load() { const raw = localStorage.getItem('kawaki_prompts'); if (raw) prompts = JSON.parse(raw); }

function render() {
  let filtered = prompts;
  if (activeFilter !== 'all') filtered = filtered.filter(p => p.platform === activeFilter);
  const search = document.getElementById('searchInput').value.toLowerCase();
  if (search) filtered = filtered.filter(p => p.title.toLowerCase().includes(search) || p.content.toLowerCase().includes(search));
  
  document.getElementById('totalCount').innerText = prompts.length;
  document.getElementById('platformCount').innerText = new Set(prompts.map(p=>p.platform)).size;
  
  const platforms = [...new Set(prompts.map(p=>p.platform))];
  let filterHtml = `<button class="filter-tab ${activeFilter==='all'?'active':''}" onclick="setFilter('all')">Semua (${prompts.length})</button>`;
  platforms.forEach(pl => {
    let count = prompts.filter(p=>p.platform===pl).length;
    filterHtml += `<button class="filter-tab ${activeFilter===pl?'active':''}" onclick="setFilter('${pl}')">${pl} (${count})</button>`;
  });
  document.getElementById('filterWrap').innerHTML = filterHtml;
  
  if (!filtered.length) {
    document.getElementById('promptGrid').innerHTML = `<div class="empty-state"><div class="empty-icon"><i class="fa-solid fa-box-open"></i></div><h3>Belum ada prompt</h3><p>Mulai tambahkan prompt pertamamu sekarang</p><button class="btn btn-primary" onclick="openAddModal()"><i class="fa-solid fa-plus"></i> Tambah Prompt</button></div>`;
    return;
  }
  
  document.getElementById('promptGrid').innerHTML = filtered.map(p => `
    <div class="prompt-card">
      <div class="card-header"><div class="card-platform"><div class="platform-icon"><i class="fa-solid fa-robot"></i></div><div><div class="card-title">${escapeHtml(p.title)}</div><div class="platform-name">${p.platform}</div></div></div>${isAdmin ? `<button class="card-menu-btn" onclick="deletePrompt('${p.id}')"><i class="fa-solid fa-trash-can"></i></button>` : ''}</div>
      <div class="card-body">${escapeHtml(p.content)}</div>
      <div class="card-footer"><span class="card-date"><i class="fa-regular fa-clock"></i> ${new Date(p.date).toLocaleDateString()}</span><div class="card-actions"><button class="icon-btn copy" onclick="copyPrompt('${p.id}')"><i class="fa-solid fa-copy"></i></button><button class="icon-btn" onclick="viewPrompt('${p.id}')"><i class="fa-solid fa-eye"></i></button></div></div>
    </div>
  `).join('');
}

function setFilter(f) { activeFilter = f; render(); }
function savePrompt() {
  const title = document.getElementById('addTitle').value.trim();
  const platform = document.getElementById('addPlatform').value;
  const content = document.getElementById('addContent').value.trim();
  if (!title || !platform || !content) { toast('Isi semua field!', 'error'); return; }
  prompts.unshift({ id: Date.now().toString(), title, platform, content, date: new Date().toISOString() });
  save(); render(); closeModal('addModal'); toast('Prompt tersimpan');
}
function deletePrompt(id) { if (!isAdmin) return; prompts = prompts.filter(p => p.id !== id); save(); render(); toast('Terhapus'); }
function copyPrompt(id) { const p = prompts.find(p=>p.id===id); if(p) { navigator.clipboard.writeText(p.content); toast('Copas!'); } }
function copyFromView() { const txt = document.getElementById('viewContent').value; navigator.clipboard.writeText(txt); toast('Prompt disalin'); }
function viewPrompt(id) { const p = prompts.find(p=>p.id===id); if(p) { document.getElementById('viewTitle').innerText = p.title; document.getElementById('viewPlatform').innerText = p.platform; document.getElementById('viewContent').value = p.content; openModal('viewModal'); } }
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); if(id==='adminModal') document.getElementById('adminError').style.display='none'; }
function openAddModal() { document.getElementById('addTitle').value=''; document.getElementById('addPlatform').value=''; document.getElementById('addContent').value=''; openModal('addModal'); }
function openAdminModal() { if(isAdmin) { logoutAdmin(); return; } openModal('adminModal'); document.getElementById('adminPass').value=''; document.getElementById('adminError').style.display='none'; setTimeout(()=>document.getElementById('adminPass')?.focus(), 100); }
function checkAdmin() { if(document.getElementById('adminPass').value === ADMIN_PASSWORD) { isAdmin=true; closeModal('adminModal'); document.getElementById('adminBadge').style.display='block'; toast('Admin mode ON'); render(); } else { document.getElementById('adminError').style.display='flex'; } }
function logoutAdmin() { isAdmin=false; document.getElementById('adminBadge').style.display='none'; toast('Logout'); render(); }
function toast(msg) { const el=document.createElement('div'); el.className='toast'; el.innerHTML=`<i class="fa-solid fa-circle-check"></i> ${msg}`; document.getElementById('toastContainer').appendChild(el); setTimeout(()=>el.remove(),2500); }
function escapeHtml(s) { return s.replace(/[&<>]/g, function(m){ if(m==='&') return '&amp;'; if(m==='<') return '&lt;'; if(m==='>') return '&gt;'; return m;}); }
document.querySelectorAll('.modal-overlay').forEach(o=>{ o.addEventListener('click',e=>{ if(e.target===o) o.classList.remove('open'); }); });
document.getElementById('searchInput').addEventListener('input',()=>render());
load(); render();