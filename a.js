tailwind.config = {
            theme: {
                extend: {
                    colors: { dark: '#0f172a', surface: '#1e293b', accent: '#3b82f6', secondary: '#2563eb' },
                    fontFamily: { sans: ['Poppins', 'sans-serif'] },
                }
            }
        }

// =====================================================
// KONFIGURASI API DENGAN FALLBACK (PRIMARY + SECONDARY)
// =====================================================
const API_CONFIG = {
    primary: {
        name: 'NefuSoft',
        baseURL: 'https://dev.nefusoft.cloud',
        endpoints: {
            latest: '/latest?page=1',
            schedule: '/schedule',
            movies: '/movies',
            detail: '/detail?url=',
            episode: '/episode?url='
        }
    },
    secondary: {
        name: 'Subnime',
        baseURL: 'https://subnime.id',
        useProxy: true,
        proxyURL: 'https://api.allorigins.win/raw?url=',
        endpoints: {
            latest: '/',
            detail: '/anime/'
        }
    }
};

let CURRENT_API = 'primary';
let isLoadingGlobal = false;

function updateAPIBadge() {
    const badge = document.getElementById('api-badge');
    if (badge) {
        badge.innerText = `API: ${CURRENT_API.toUpperCase()} - ${API_CONFIG[CURRENT_API].name}`;
        badge.className = `api-badge ${CURRENT_API}`;
    }
}

async function fetchWithTimeout(url, timeout = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

async function fetchWithFallback(endpoint, params = {}) {
    const config = API_CONFIG[CURRENT_API];
    
    try {
        let url = '';
        if (CURRENT_API === 'primary') {
            if (endpoint === 'detail') {
                url = `${config.baseURL}${config.endpoints.detail}${encodeURIComponent(params.url)}`;
            } else if (endpoint === 'episode') {
                url = `${config.baseURL}${config.endpoints.episode}${encodeURIComponent(params.url)}&reso=${params.reso || '720p'}`;
            } else {
                url = `${config.baseURL}${config.endpoints[endpoint]}`;
            }
            
            const response = await fetchWithTimeout(url);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return data;
        } 
        else {
            // SECONDARY API - Subnime via scraping
            if (endpoint === 'latest') {
                const proxyUrl = `${config.proxyURL}${encodeURIComponent(config.baseURL + config.endpoints.latest)}`;
                const response = await fetchWithTimeout(proxyUrl);
                const html = await response.text();
                return parseSubnimeHomepage(html);
            }
            else if (endpoint === 'detail') {
                const detailUrl = params.url.startsWith('http') ? params.url : config.baseURL + '/anime/' + params.url;
                const proxyUrl = `${config.proxyURL}${encodeURIComponent(detailUrl)}`;
                const response = await fetchWithTimeout(proxyUrl);
                const html = await response.text();
                return parseSubnimeDetail(html, detailUrl);
            }
            return { data: [] };
        }
    } catch (error) {
        console.error(`Error with ${CURRENT_API} API on ${endpoint}:`, error);
        
        if (CURRENT_API === 'primary') {
            console.warn('Switching to secondary API (Subnime)...');
            CURRENT_API = 'secondary';
            updateAPIBadge();
            showToast('⚠️ Primary API error, beralih ke server cadangan Subnime', 'warning');
            return fetchWithFallback(endpoint, params);
        }
        return { data: [] };
    }
}

function parseSubnimeHomepage(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const animeList = [];
    
    // Coba berbagai selector yang mungkin ada di Subnime
    const items = doc.querySelectorAll('.anime-list-item, .list-update-item, .item-anime, .col-anime');
    items.forEach((item, idx) => {
        if (idx >= 30) return;
        const titleElem = item.querySelector('h3, .title, a');
        let title = titleElem?.innerText?.trim() || '';
        if (!title) return;
        
        let linkElem = item.querySelector('a');
        let url = linkElem?.href || '';
        if (url && !url.startsWith('http')) url = 'https://subnime.id' + url;
        
        let imgElem = item.querySelector('img');
        let cover = imgElem?.src || '';
        if (cover && cover.startsWith('//')) cover = 'https:' + cover;
        
        animeList.push({
            judul: title,
            cover: cover || 'https://via.placeholder.com/300x400?text=No+Image',
            url: url,
            genre: []
        });
    });
    
    // Fallback kalau ga dapet
    if (animeList.length === 0) {
        const allLinks = doc.querySelectorAll('a');
        allLinks.forEach(link => {
            const text = link.innerText?.trim();
            if (text && text.length > 3 && text.length < 50 && link.href.includes('/anime/')) {
                animeList.push({
                    judul: text,
                    cover: '',
                    url: link.href,
                    genre: []
                });
            }
        });
    }
    
    return animeList;
}

function parseSubnimeDetail(html, originalUrl) {
    const parser = DOMParser ? new DOMParser() : { parseFromString: () => ({}) };
    const doc = parser.parseFromString(html, 'text/html');
    
    const title = doc.querySelector('h1')?.innerText || doc.querySelector('.entry-title')?.innerText || 'Unknown Title';
    const cover = doc.querySelector('img.attachment-large, img.wp-post-image, .anime-poster img')?.src || '';
    const sinopsis = doc.querySelector('.sinopsis, .description, .entry-content p')?.innerText || 'Tidak ada sinopsis';
    
    const episodes = [];
    const epLinks = doc.querySelectorAll('.eps-item a, .list-episode a, .episode-list a');
    epLinks.forEach((el, idx) => {
        episodes.push({
            url: el.href,
            ch: el.innerText.trim() || `Episode ${idx+1}`
        });
    });
    
    return {
        data: [{
            judul: title,
            cover: cover,
            sinopsis: sinopsis,
            chapter: episodes,
            rating: 'N/A',
            status: 'Ongoing'
        }]
    };
}

// ========================== KONFIGURASI & STATE ==========================
const SITE_URL = 'https://nime.tiyan.biz.id';
let latestData = [], scheduleData = [], moviesData = [], allAnime = [], animeListGrouped = {};
let currentPage = 'home', currentDay = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'][new Date().getDay()];
const DAY_ORDER = ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu'];
let currentBrowseKey = 'A', currentBrowsePage = 1, currentMoviesPage = 1;
const ITEMS_PER_PAGE = 10;
let isLoadingComplete = false;

// ========================== FUNGSI SEO ==========================
function updateMetaTagsSEO(title, description, image = 'https://cloud.tiyan.biz.id/nD6z.jpg', url = null) {
    document.title = title;
    const finalUrl = url || SITE_URL + '/';
    const metaUpdates = { 'description': description, 'og:title': title, 'og:description': description, 'og:image': image, 'og:url': finalUrl, 'twitter:title': title, 'twitter:description': description, 'twitter:image': image };
    for (let [name, content] of Object.entries(metaUpdates)) {
        let meta = document.querySelector(`meta[property="${name}"]`) || document.querySelector(`meta[name="${name}"]`);
        if (meta) meta.setAttribute('content', content);
    }
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', finalUrl);
}

function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-28 left-1/2 transform -translate-x-1/2 z-[1000] px-4 py-2 rounded-lg text-white text-sm font-medium ${type === 'warning' ? 'bg-orange-500' : 'bg-blue-600'} shadow-lg animate-bounce`;
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// ========================== AGREGASI DATA UNTUK BROWSING A-Z ==========================
async function loadAllData() {
    if (isLoadingGlobal) return;
    isLoadingGlobal = true;
    
    try {
        let latestResult, scheduleResult, moviesResult;
        
        if (CURRENT_API === 'primary') {
            [latestResult, scheduleResult, moviesResult] = await Promise.all([
                fetchWithFallback('latest'),
                fetchWithFallback('schedule').catch(() => ({ data: [] })),
                fetchWithFallback('movies').catch(() => [])
            ]);
            latestData = latestResult;
            scheduleData = scheduleResult.data || [];
            moviesData = moviesResult;
        } else {
            // Secondary API mode
            latestResult = await fetchWithFallback('latest');
            latestData = latestResult;
            scheduleData = [];
            moviesData = [];
        }
        
        if (scheduleData.length) scheduleData.sort((a,b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day));
        
        const mapAnime = new Map();
        const addAnime = (item) => { 
            if(item?.url && !mapAnime.has(item.url)) {
                mapAnime.set(item.url, { 
                    judul: item.judul || item.anime_name || 'Unknown', 
                    cover: item.cover || 'https://via.placeholder.com/300x400?text=No+Image', 
                    url: item.url, 
                    genre: item.genre || [] 
                });
            }
        };
        
        latestData.forEach(a => addAnime(a));
        moviesData.forEach(m => addAnime(m));
        if (scheduleData.length) {
            scheduleData.forEach(day => {
                day.animeList?.forEach(a => addAnime({ 
                    judul: a.anime_name, 
                    cover: a.cover, 
                    url: a.link, 
                    genre: [] 
                }));
            });
        }
        
        animeListGrouped = {};
        for (let anime of mapAnime.values()) {
            let firstChar = (anime.judul?.[0] || '#').toUpperCase();
            if (!/^[A-Z]$/.test(firstChar)) firstChar = '#';
            if (!animeListGrouped[firstChar]) animeListGrouped[firstChar] = [];
            animeListGrouped[firstChar].push(anime);
        }
        for (let key in animeListGrouped) animeListGrouped[key].sort((a,b) => a.judul.localeCompare(b.judul));
        allAnime = Array.from(mapAnime.values());
        isLoadingComplete = true;
        
        if (currentPage === 'browse') renderBrowsePage();
        if (currentPage === 'home') { renderLatest(); renderHomeSchedule(); }
        if (currentPage === 'movies') renderMovies();
        
        document.getElementById('browse-stats') && (document.getElementById('browse-stats').innerText = `Total: ${allAnime.length} anime`);
    } catch(e) { 
        console.error('Load data error:', e);
        showToast('Gagal memuat data, coba refresh', 'warning');
    } finally {
        isLoadingGlobal = false;
    }
}

// ========================== RENDER KOMPONEN ==========================
function renderHorizontalCards(list, container) {
    if(!list.length) { container.innerHTML = '<div class="w-full text-center py-10 text-gray-500">Tidak ada data</div>'; return; }
    let html = '';
    list.forEach(a => { 
        const safeUrl = a.url || '#';
        const safeCover = (a.cover||'').replace('?w=100','?w=300');
        html += `<div class="anime-card flex-shrink-0 w-32 cursor-pointer" onclick="loadDetail('${safeUrl.replace(/'/g, "\\'")}')">
            <div class="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg shadow-blue-500/20 bg-surface">
                <img class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" src="${safeCover}" alt="${a.judul}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400?text=Error'">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            </div>
            <div class="mt-2 px-1"><div class="text-xs font-medium line-clamp-2 leading-tight">${a.judul||'Unknown'}</div></div>
        </div>`; 
    });
    container.innerHTML = html;
}

function renderGridCard(a) { 
    const safeUrl = a.url || '#';
    return `<div class="anime-card cursor-pointer group" onclick="loadDetail('${safeUrl.replace(/'/g, "\\'")}')">
        <div class="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg shadow-blue-500/20 bg-surface">
            <img class="w-full h-full object-cover group-hover:scale-110 duration-500" src="${a.cover}" alt="${a.judul}" loading="lazy" onerror="this.src='https://via.placeholder.com/300x400?text=Error'">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
        </div>
        <div class="mt-2 px-1"><div class="text-sm font-medium line-clamp-2 leading-tight">${a.judul}</div></div>
    </div>`; 
}

function renderLatest() { 
    if(latestData.length) renderHorizontalCards(latestData.slice(0,15), document.getElementById('latest-container')); 
    else document.getElementById('latest-container').innerHTML = '<div class="text-center w-full text-gray-500">Gagal memuat</div>'; 
}

function renderHomeSchedule() {
    if(!scheduleData.length) { 
        // Fallback: tampilkan dari latestData
        if(latestData.length) {
            renderHorizontalCards(latestData.slice(0,10), document.getElementById('home-schedule'));
        } else {
            document.getElementById('home-schedule').innerHTML = '<div class="text-center w-full text-gray-500">Tidak ada jadwal</div>';
        }
        return; 
    }
    const todaySchedule = scheduleData.find(d => d.day === currentDay) || scheduleData[0];
    const items = todaySchedule?.animeList?.map(a => ({ judul: a.anime_name, cover: a.cover, url: a.link })) || [];
    renderHorizontalCards(items.slice(0,10), document.getElementById('home-schedule'));
}

function renderSchedulePage() { 
    if(!scheduleData.length) {
        document.getElementById('schedule-content').innerHTML = '<div class="text-center py-20 text-gray-500">Fitur jadwal tersedia di primary API</div>';
        return;
    }
    renderDayTabs(); 
    renderScheduleByDay(currentDay); 
}

function renderDayTabs() { 
    let html = ''; 
    scheduleData.forEach(d => { 
        const active = d.day === currentDay ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-surface text-gray-400'; 
        html += `<button class="px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:bg-blue-500/20 ${active}" onclick="selectDay('${d.day}')">${d.day}</button>`; 
    }); 
    document.getElementById('day-tabs').innerHTML = html; 
}

function renderScheduleByDay(day) { 
    const data = scheduleData.find(d => d.day === day); 
    if(!data) return; 
    let html = '<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">'; 
    data.animeList.forEach(a => { 
        html += renderGridCard({ judul: a.anime_name, cover: a.cover, url: a.link }); 
    }); 
    html += '</div>'; 
    document.getElementById('schedule-content').innerHTML = html; 
}

function renderMovies() { 
    const start = (currentMoviesPage-1)*ITEMS_PER_PAGE; 
    const items = moviesData.slice(start, start+ITEMS_PER_PAGE); 
    let html=''; 
    items.forEach(m=>html+=renderGridCard(m)); 
    document.getElementById('movies-container').innerHTML = html || '<div class="text-center py-20 text-gray-500 col-span-full">Tidak ada movie</div>'; 
    renderPaginationUI('movies-pagination', moviesData.length, currentMoviesPage, 'changeMoviesPage'); 
}

function renderBrowsePage() { 
    if(!isLoadingComplete) return; 
    const keys = Object.keys(animeListGrouped).sort(); 
    let navHtml=''; 
    keys.forEach(k=>{ 
        const active = k===currentBrowseKey ? 'bg-blue-500 text-white shadow-md shadow-blue-500/30' : 'bg-surface text-gray-400 hover:bg-blue-500/20'; 
        navHtml+=`<button class="w-10 h-10 flex items-center justify-center rounded-xl text-sm transition-all ${active}" onclick="selectBrowseKey('${k}')">${k}</button>`; 
    }); 
    document.getElementById('az-nav').innerHTML=navHtml; 
    renderBrowseContent(currentBrowseKey); 
}

function renderBrowseContent(key) { 
    const data = animeListGrouped[key] || []; 
    const start = (currentBrowsePage-1)*ITEMS_PER_PAGE; 
    const items = data.slice(start, start+ITEMS_PER_PAGE); 
    let html=''; 
    items.forEach(a=>html+=renderGridCard(a)); 
    document.getElementById('browse-container').innerHTML = html || '<div class="text-center py-20 text-gray-500 col-span-full">Tidak ada anime</div>'; 
    renderPaginationUI('browse-pagination', data.length, currentBrowsePage, 'changeBrowsePage'); 
}

function renderGenres() { 
    const genreSet = new Set(); 
    latestData.forEach(a => { 
        if(a.genre && Array.isArray(a.genre)) a.genre.forEach(g=>genreSet.add(g)); 
    }); 
    const sorted = Array.from(genreSet).sort(); 
    let html=''; 
    sorted.forEach(g=>{ 
        html+=`<button onclick="filterByGenre('${g}')" class="px-4 py-2 bg-surface hover:bg-blue-500 border border-blue-500/20 rounded-xl text-xs transition-all">${g}</button>`; 
    }); 
    document.getElementById('genre-list').innerHTML = html || '<div class="text-gray-500 text-sm italic">Memuat genre...</div>'; 
}

function filterByGenre(genre) { 
    document.getElementById('genre-title').classList.remove('hidden'); 
    document.getElementById('active-genre-name').innerText = genre; 
    const results = latestData.filter(a => a.genre && Array.isArray(a.genre) && a.genre.includes(genre)); 
    let html=''; 
    results.forEach(a=>html+=renderGridCard(a)); 
    document.getElementById('genre-container').innerHTML = html || '<div class="col-span-full text-center py-10 text-gray-500">Tidak ada data untuk genre ini</div>'; 
    window.scrollTo({ top: document.getElementById('genre-title').offsetTop - 100 }); 
}

function renderPaginationUI(containerId, totalItems, currentPageNum, onPageChangeName) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const container = document.getElementById(containerId);
    if (totalPages <= 1 || !container) { if(container) container.innerHTML = ''; return; }
    const goToPage = (newPage) => { let p = Math.min(totalPages, Math.max(1, parseInt(newPage))); if(onPageChangeName === 'changeBrowsePage') changeBrowsePage(p); else if(onPageChangeName === 'changeMoviesPage') changeMoviesPage(p); };
    const inputId = containerId+'-jump';
    container.innerHTML = `<button onclick="${onPageChangeName}(${currentPageNum-1})" ${currentPageNum===1?'disabled':''} class="flex items-center gap-1 px-4 py-2 rounded-xl bg-surface border border-blue-500/30 text-white disabled:opacity-30 hover:bg-blue-500 hover:border-blue-400 transition-all text-xs"><i data-lucide="chevron-left" class="w-4 h-4"></i><span>Kembali</span></button>
        <div class="flex items-center gap-1"><input type="number" id="${inputId}" class="pagination-input" value="${currentPageNum}" min="1" max="${totalPages}" step="1"><span class="text-xs text-gray-400">/ ${totalPages}</span><button class="pagination-go" onclick="const val=document.getElementById('${inputId}').value; ${onPageChangeName}(Math.min(${totalPages},Math.max(1,parseInt(val||'1'))))"><i data-lucide="chevrons-left-right" class="w-4 h-4"></i></button></div>
        <button onclick="${onPageChangeName}(${currentPageNum+1})" ${currentPageNum===totalPages?'disabled':''} class="flex items-center gap-1 px-4 py-2 rounded-xl bg-surface border border-blue-500/30 text-white disabled:opacity-30 hover:bg-blue-500 hover:border-blue-400 transition-all text-xs"><span>Selanjutnya</span><i data-lucide="chevron-right" class="w-4 h-4"></i></button>`;
    lucide.createIcons();
    document.getElementById(inputId)?.addEventListener('keypress', e => { if(e.key === 'Enter') { e.preventDefault(); const val = e.target.value; goToPage(val); } });
}

function changeBrowsePage(page) { 
    currentBrowsePage = page; 
    renderBrowseContent(currentBrowseKey); 
    window.scrollTo({ top: document.getElementById('page-browse').offsetTop - 100, behavior: 'smooth' }); 
}

function changeMoviesPage(page) { 
    currentMoviesPage = page; 
    renderMovies(); 
    window.scrollTo({ top: document.getElementById('page-movies').offsetTop - 100 }); 
}

function selectDay(day) { 
    currentDay = day; 
    renderDayTabs(); 
    renderScheduleByDay(day); 
}

function selectBrowseKey(key) { 
    currentBrowseKey = key; 
    currentBrowsePage = 1; 
    renderBrowseContent(key); 
}

// ========================== SEARCH ==========================
document.getElementById('search-input')?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    const container = document.getElementById('search-results');
    if(q.length < 2) { container.innerHTML = '<div class="text-center py-20 text-gray-500 col-span-full">Ketik minimal 2 huruf...</div>'; return; }
    const filtered = allAnime.filter(a => a.judul?.toLowerCase().includes(q));
    if(!filtered.length) { container.innerHTML = '<div class="text-center py-20 text-gray-500 col-span-full">Tidak ditemukan</div>'; return; }
    updateMetaTagsSEO(`Cari "${q}" - AnimeKita`, `Hasil pencarian untuk "${q}" di AnimeKita`, 'https://cloud.tiyan.biz.id/nD6z.jpg', `${SITE_URL}/search?q=${encodeURIComponent(q)}`);
    let html = ''; filtered.slice(0,50).forEach(a=>html+=renderGridCard(a)); container.innerHTML = html;
});

// ========================== PLAYER & DETAIL ==========================
async function loadDetail(url) {
    if (!url || url === '#') {
        showToast('URL tidak valid', 'warning');
        return;
    }
    openPlayer(); 
    const content = document.getElementById('player-content');
    content.innerHTML = '<div class="flex flex-col items-center justify-center py-20 gap-4"><div class="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div><div class="text-gray-400 text-sm">Menyiapkan konten...</div></div>';
    try {
        const result = await fetchWithFallback('detail', { url });
        let detail = result.data?.[0] || result.data || result;
        if(detail && detail.judul) {
            updateMetaTagsSEO(`${detail.judul || 'Anime'} - Nonton Streaming Sub Indo | AnimeKita`, detail.sinopsis?.substring(0,150) || `Nonton ${detail.judul} subtitle Indonesia`, detail.cover || 'https://cloud.tiyan.biz.id/nD6z.jpg', url);
            const eps = detail.chapter || [];
            let epHtml = '<div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">';
            eps.forEach(e => { 
                const epUrl = e.url || e.link || '#';
                epHtml += `<button class="bg-surface hover:bg-blue-500 hover:text-white border border-blue-500/20 py-2 rounded-xl text-xs transition-all" onclick="playEpisode('${epUrl.replace(/'/g, "\\'")}')">${e.ch || e.title || 'EP'}</button>`; 
            });
            epHtml += '</div>';
            content.innerHTML = `<div class="flex flex-col gap-6"><div id="video-container" class="-mt-4"><div class="bg-dark aspect-video flex flex-col items-center justify-center text-center gap-3 ring-1 ring-blue-500/30 rounded-xl"><i data-lucide="play" class="w-12 h-12 text-blue-500/20"></i><p class="text-xs text-gray-500 italic px-10">Pilih episode di bawah untuk memutar video</p></div></div><div class="px-6 flex flex-col gap-6"><div class="flex gap-4"><div class="w-28 flex-shrink-0 aspect-[3/4] rounded-xl overflow-hidden shadow-2xl shadow-blue-500/20"><img class="w-full h-full object-cover" src="${detail.cover||''}" onerror="this.src='https://via.placeholder.com/300x400?text=No+Image'"></div><div><h2 class="text-lg font-bold line-clamp-2 text-glow-blue">${detail.judul||'Unknown'}</h2><div class="flex gap-2 mt-2"><span class="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold"><i data-lucide="star" class="w-3 h-3 fill-blue-500 inline"></i> ${detail.rating||detail.score||'N/A'}</span><span class="bg-white/5 px-3 py-1 rounded-full text-[10px]">${detail.status||'Ongoing'}</span></div></div></div><div class="bg-white/5 rounded-2xl p-4 border border-blue-500/20"><h3 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Sinopsis</h3><div id="synopsis-text" class="text-xs text-gray-300 leading-relaxed line-clamp-3">${detail.sinopsis||'Tidak ada sinopsis.'}</div>${detail.sinopsis && detail.sinopsis.length > 120 ? `<button onclick="toggleSynopsis()" id="btn-synopsis" class="text-blue-400 text-[10px] font-bold mt-3 flex items-center gap-1">BACA SELENGKAPNYA <i data-lucide="chevron-down" class="w-3 h-3"></i></button>` : ''}</div><div class="bg-white/5 rounded-2xl p-4 border border-blue-500/20"><div class="flex justify-between mb-4"><h4 class="font-bold flex items-center gap-2 text-sm"><i data-lucide="play-circle" class="w-4 h-4 text-blue-500"></i> Daftar Episode</h4><span class="text-[10px] bg-blue-500/20 px-2 py-1 rounded-md text-blue-400">${eps.length} EPISODE</span></div>${epHtml}</div></div></div>`;
            lucide.createIcons();
        } else {
            throw new Error('Detail tidak lengkap');
        }
    } catch(e) { 
        console.error(e);
        content.innerHTML = '<div class="text-center py-20 text-red-400">Gagal memuat detail anime</div>'; 
    }
}

async function playEpisode(url, reso='720p') {
    const vc = document.getElementById('video-container'); 
    if(!vc) return;
    vc.innerHTML = `<div class="flex justify-center items-center py-10"><div class="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div></div>`;
    try {
        let videoUrl = null;
        
        if (CURRENT_API === 'primary') {
            const res = await fetchWithFallback('episode', { url, reso });
            const streams = res.data?.[0]?.stream || [];
            const link = streams.find(s => s.link?.includes('.mp4')) || streams[0];
            videoUrl = link?.link;
        } else {
            // Secondary: coba ambil from iframe
            const proxyUrl = `${API_CONFIG.secondary.proxyURL}${encodeURIComponent(url)}`;
            const response = await fetchWithTimeout(proxyUrl);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const iframe = doc.querySelector('iframe');
            if (iframe && iframe.src) {
                videoUrl = iframe.src;
            } else {
                const video = doc.querySelector('video source');
                if (video) videoUrl = video.src;
            }
        }
        
        if(videoUrl) {
            vc.innerHTML = `<div class="rounded-2xl overflow-hidden bg-black shadow-2xl shadow-blue-500/20"><video class="w-full aspect-video" controls autoplay playsinline><source src="${videoUrl}" type="video/mp4"></video></div><div class="mt-2 text-[10px] text-gray-600 flex items-center gap-1 px-2"><i data-lucide="info" class="w-3 h-3"></i><span>Resolusi: <span class="text-blue-400">${reso}</span></span></div>`;
            lucide.createIcons(); 
            document.getElementById('player-sheet')?.scrollTo({ top: 0 });
        } else {
            vc.innerHTML = '<div class="bg-red-500/10 text-red-400 p-6 rounded-2xl text-center text-xs">Video tidak tersedia</div>';
        }
    } catch(e) { 
        console.error(e);
        vc.innerHTML = '<div class="bg-red-500/10 text-red-400 p-6 rounded-2xl text-center text-xs">Gagal memuat video</div>'; 
    }
}

function openPlayer() { 
    if(document.getElementById('sidebar').classList.contains('translate-x-0')) toggleSidebar(); 
    closeProfile(); 
    document.getElementById('player-sheet').classList.add('open'); 
    document.getElementById('overlay').classList.add('opacity-100','visible'); 
    document.body.style.overflow = 'hidden'; 
}

function closePlayer() { 
    document.getElementById('player-sheet').classList.remove('open'); 
    if(!document.getElementById('profile-sheet').classList.contains('open')) { 
        document.getElementById('overlay').classList.remove('opacity-100','visible'); 
        document.body.style.overflow = ''; 
    } 
    const vid = document.querySelector('video'); 
    if(vid) vid.pause(); 
}

function openProfile() { 
    if(document.getElementById('sidebar').classList.contains('translate-x-0')) toggleSidebar(); 
    closePlayer(); 
    document.getElementById('profile-sheet').classList.add('open'); 
    document.getElementById('overlay').classList.add('opacity-100','visible'); 
    document.body.style.overflow = 'hidden'; 
    lucide.createIcons(); 
}

function closeProfile() { 
    document.getElementById('profile-sheet').classList.remove('open'); 
    if(!document.getElementById('player-sheet').classList.contains('open')) { 
        document.getElementById('overlay').classList.remove('opacity-100','visible'); 
        document.body.style.overflow = ''; 
    } 
}

function toggleSidebar() { 
    const sb = document.getElementById('sidebar'); 
    const ov = document.getElementById('overlay'); 
    if(sb.classList.contains('translate-x-0')) { 
        sb.classList.remove('translate-x-0'); 
        sb.classList.add('-translate-x-full'); 
        if(!document.getElementById('player-sheet').classList.contains('open') && !document.getElementById('profile-sheet').classList.contains('open')) 
            ov.classList.remove('opacity-100','visible'); 
    } else { 
        if(document.getElementById('player-sheet').classList.contains('open')) closePlayer(); 
        if(document.getElementById('profile-sheet').classList.contains('open')) closeProfile(); 
        sb.classList.remove('-translate-x-full'); 
        sb.classList.add('translate-x-0'); 
        ov.classList.add('opacity-100','visible'); 
    } 
}

function scrollToTop() { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
}

window.onscroll = function() { 
    const btn = document.getElementById('scroll-top'); 
    if(document.documentElement.scrollTop>300) { 
        btn.classList.remove('opacity-0','invisible','translate-y-10'); 
        btn.classList.add('opacity-100','visible','translate-y-0'); 
    } else { 
        btn.classList.add('opacity-0','invisible','translate-y-10'); 
        btn.classList.remove('opacity-100','visible','translate-y-0'); 
    } 
};

function toggleSynopsis() { 
    const text = document.getElementById('synopsis-text'); 
    const btn = document.getElementById('btn-synopsis'); 
    if(text.classList.contains('line-clamp-3')) { 
        text.classList.remove('line-clamp-3'); 
        btn.innerHTML = `SEMBUNYIKAN <i data-lucide="chevron-up" class="w-3 h-3"></i>`; 
    } else { 
        text.classList.add('line-clamp-3'); 
        btn.innerHTML = `BACA SELENGKAPNYA <i data-lucide="chevron-down" class="w-3 h-3"></i>`; 
    } 
    lucide.createIcons(); 
}

function switchPage(page) { 
    currentPage = page; 
    document.querySelectorAll('.page').forEach(p=>{p.classList.add('hidden');p.classList.remove('active');}); 
    document.getElementById(`page-${page}`)?.classList.remove('hidden'); 
    document.getElementById(`page-${page}`)?.classList.add('active','fade-in'); 
    document.querySelectorAll('.nav-btn').forEach(btn=>{ 
        if(btn.dataset.page===page){
            btn.classList.add('text-blue-500');
            btn.classList.remove('text-gray-400');
        } else {
            btn.classList.remove('text-blue-500');
            btn.classList.add('text-gray-400');
        } 
    }); 
    document.getElementById('search-container').style.display = page==='search'?'block':'none'; 
    if(page==='home') { 
        if(latestData.length){renderLatest();renderHomeSchedule();} 
        else loadAllData();
    } else if(page==='schedule') renderSchedulePage(); 
    else if(page==='movies') renderMovies(); 
    else if(page==='browse' && isLoadingComplete) renderBrowsePage(); 
    else if(page==='genres') renderGenres(); 
    if(page!=='search') updateMetaTagsSEO('AnimeKita - Streaming Anime Sub Indo Gratis','Nonton anime subtitle Indonesia gratis terbaru setiap hari!'); 
    window.scrollTo({top:0}); 
}

// ========================== INIT ==========================
window.onload = async () => { 
    lucide.createIcons(); 
    updateAPIBadge();
    await loadAllData(); 
    switchPage('home'); 
};

window.switchPage = switchPage; 
window.loadDetail = loadDetail; 
window.playEpisode = playEpisode; 
window.closePlayer = closePlayer; 
window.closeProfile = closeProfile; 
window.openProfile = openProfile; 
window.toggleSidebar = toggleSidebar; 
window.selectDay = selectDay; 
window.selectBrowseKey = selectBrowseKey; 
window.changeBrowsePage = changeBrowsePage; 
window.changeMoviesPage = changeMoviesPage; 
window.scrollToTop = scrollToTop; 
window.filterByGenre = filterByGenre; 
window.toggleSynopsis = toggleSynopsis;

if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(e=>console.log));
console.log('✅ AnimeKita with Dual API Fallback (Primary + Subnime) - Blue Theme');