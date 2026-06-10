<?php
// HIROKO PHP ENGINE
// Gak ada perubahan struktur HTML - cuma upgrade ke PHP

// Optional: set header biar browser gak cache (biar fresh)
header("Content-Type: text/html; charset=UTF-8");
header("Cache-Control: no-cache, must-revalidate");

// Optional: kalau mau tambahin variable PHP di HTML nanti
$page_title = "Kawaki — My Profile";
$current_year = date("Y");
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" type="image/jpeg" href="https://files.catbox.moe/1bdpm6.jpg">
<link rel="shortcut icon" type="image/jpeg" href="https://files.catbox.moe/1bdpm6.jpg">
<title><?php echo $page_title; ?></title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@300;400;500;600;700&family=Share+Tech+Mono&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

  <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="noise-layer"></div>
<div class="scanlines-layer"></div>

<!-- NAV -->
<nav>
    <a href="#hero" class="nav-logo">KAWAKIOFFICIAL</a>
    <ul class="nav-links">
        <li><a href="#about">Tentang</a></li>
        <li><a href="#karya">Karya</a></li>
        <li><a href="#perjalanan">Perjalanan</a></li>
        <li><a href="#keahlian">Keahlian</a></li>
        <li><a href="#galeri">Galeri</a></li>
        <li><a href="#sosmed">Kontak</a></li>
    </ul>
</nav>

<!-- HERO -->
<section id="hero">
    <div class="bg-grid"></div>
    <div class="bg-orb bg-orb-1"></div>
    <div class="bg-orb bg-orb-2"></div>
    <div class="hero-content">
        <div class="hero-badge">
            <i class="fa-solid fa-circle" style="font-size:6px;animation:badgePulse 1s infinite;"></i> PROFIL AKTIF — KAWAKI BLUE SHADOW
        </div>
        <div class="hero-avatar">
            <img src="https://files.catbox.moe/r5fyvm.jpg">
        </div>
        <h1 class="hero-name">KA<span>WA</span>KI</h1>
        <p class="hero-subtitle">Shadow Official &bull; Creator &bull; Developer</p>
    </div>
    <div class="scroll-indicator">
        <i class="fa-solid fa-chevron-down fa-lg"></i>
        <span>SCROLL</span>
    </div>
</section>

<!-- ABOUT -->
<div id="about">
    <div class="about-inner">
        <div class="about-img-wrap slate-in">
            <img src="https://files.catbox.moe/y7kqg2.jpg" alt="Kawaki Character" onerror="this.src='https://i.pinimg.com/originals/47/81/6d/47816d5e39e3e2b9b3e3d2e4e5c3e5c3.jpg'">
        </div>
        <div class="about-text slate-in-right">
            <div class="section-label">IDENTITAS</div>
            <h2 class="section-title">SIAPA<br>KAWAKI?</h2>
            <p><strong>Kawaki</strong> adalah seorang kreator digital dan developer yang dikenal dengan identitas online <strong>"Kawaki Shadow"</strong>. Aktif di dunia maya dengan berbagai karya digital, mulai dari pengembangan web hingga konten kreatif di media sosial.</p>
            <p><strong>Kawaki adalah seorang siswa jurusan TKJ (Teknik Komputer dan Jaringan)</strong> dan masih berstatus siswa. Meskipun aktif di dunia digital, ia tetap menjalani pendidikan dengan serius dan mengintegrasikan ilmu TKJ ke dalam setiap proyeknya.</p>
            <p>Nama <strong>Kawaki</strong> terinspirasi dari karakter ikonik dalam anime <strong>Boruto: Naruto Next Generations</strong> — sosok yang kuat, misterius, dan penuh determinasi. Karakter tersebut mencerminkan semangat dan kepribadian sang kreator.</p>
            <p>Dengan passion di bidang <strong>desain, teknologi, dan seni digital</strong>, Kawaki terus berkarya dan membangun presence online yang kuat lewat berbagai platform digital.</p>
            <div class="stats-row">
                <div class="stat-card reveal d1"><div class="num">2+</div><div class="label">Tahun Aktif</div></div>
                <div class="stat-card reveal d2"><div class="num">3+</div><div class="label">Platform</div></div>
                <div class="stat-card reveal d3"><div class="num">100%</div><div class="label">Passion</div></div>
            </div>
        </div>
    </div>
</div>

<!-- KARYA -->
<section id="karya">
    <div class="section-label reveal">HASIL KARYA</div>
    <h2 class="section-title reveal">PROYEK<br>UNGGULAN</h2>
    <div class="karya-grid">
        <a href="hiroko.html" class="karya-card">
            <img class="karya-img" src="https://files.catbox.moe/0z6em5.jpg">
            <div class="karya-overlay"></div>
            <div class="karya-info">
                <span class="karya-tag"><i class="fa-solid fa-globe fa-xs"></i> WEBSITE</span>
                <div class="karya-title">HIROKO</div>
                <div class="karya-desc">Website resmi Hiroko AI MultiFungsi</div>
            </div>
            <div class="karya-arrow"><i class="fa-solid fa-arrow-right"></i></div>
        </a>
        <a href="convert.html" class="karya-card">
            <img class="karya-img" src="https://files.catbox.moe/qse3np.jpg">
            <div class="karya-overlay"></div>
            <div class="karya-info">
                <span class="karya-tag"><i class="fa-solid fa-arrows-spin fa-xs"></i> TOOLS</span>
                <div class="karya-title">CONVERT</div>
                <div class="karya-desc">Tools untuk mengubah file html menjadi < HTML,CSS,JS ></div>
            </div>
            <div class="karya-arrow"><i class="fa-solid fa-arrow-right"></i></div>
        </a>
        <a href="tesiq.html" class="karya-card">
            <img class="karya-img" src="https://files.catbox.moe/k886u7.jpg">
            <div class="karya-overlay"></div>
            <div class="karya-info">
                <span class="karya-tag"><i class="fa-solid fa-arrows-spin fa-xs"></i> AKADEMIK</span>
                <div class="karya-title">TES IQ</div>
                <div class="karya-desc">Tes kemampuan akademik untuk menentukan hasilmu</div>
            </div>
            <div class="karya-arrow"><i class="fa-solid fa-arrow-right"></i></div>
        </a>
        <a href="https://www.mediafire.com/file/u99rvx95dm8p0lz/HirokoWa_.zip/file" class="karya-card">
            <img class="karya-img" src="https://files.catbox.moe/1ojqvy.jpg">
            <div class="karya-overlay"></div>
            <div class="karya-info">
                <span class="karya-tag"><i class="fa-solid fa-arrows-spin fa-xs"></i> APLIKASI</span>
                <div class="karya-title">HIROKOWA</div>
                <div class="karya-desc">Suatu aplikasi seperti WhatsApp dan memiliki kemampuan seperti WhatsApp gb</div>
            </div>
            <div class="karya-arrow"><i class="fa-solid fa-arrow-right"></i></div>
        </a>
        <a href="product.html" class="karya-card">
            <img class="karya-img" src="https://files.catbox.moe/ombrje.jpg">
            <div class="karya-overlay"></div>
            <div class="karya-info">
                <span class="karya-tag"><i class="fa-solid fa-arrows-spin fa-xs"></i> PRODUCT</span>
                <div class="karya-title">MY STORE</div>
                <div class="karya-desc">Ini adalah website barang product yang di jual oleh kawaki</div>
            </div>
            <div class="karya-arrow"><i class="fa-solid fa-arrow-right"></i></div>
        </a>
        <a href="promt.html" class="karya-card">
            <img class="karya-img" src="https://files.catbox.moe/4k209m.jpg">
            <div class="karya-overlay"></div>
            <div class="karya-info">
                <span class="karya-tag"><i class="fa-solid fa-arrows-spin fa-xs"></i> TOOLS</span>
                <div class="karya-title">PROMT JB</div>
                <div class="karya-desc">Kumpulan promt jailbreak yang di koleksi oleh pengguna</div>
            </div>
            <div class="karya-arrow"><i class="fa-solid fa-arrow-right"></i></div>
        </a>
        <a href="anime.html" class="karya-card">
            <img class="karya-img" src="https://files.catbox.moe/b76cjx.jpg">
            <div class="karya-overlay"></div>
            <div class="karya-info">
                <span class="karya-tag"><i class="fa-solid fa-arrows-spin fa-xs"></i> TOOLS</span>
                <div class="karya-title">ANIME</div>
                <div class="karya-desc">Tempat nonton anime dan nobar anime bersama teman</div>
            </div>
            <div class="karya-arrow"><i class="fa-solid fa-arrow-right"></i></div>
        </a>
    </div>
</section>

<!-- PERJALANAN -->
<div id="perjalanan">
    <div class="perjalanan-inner">
        <div class="section-label reveal">TIMELINE</div>
        <h2 class="section-title reveal">PERJALANAN<br>KAWAKI</h2>
        <div class="timeline">
            <div class="tl-item"><div class="tl-dot"></div><div class="tl-year">— AWAL —</div><div class="tl-heading">MULAI BERKARYA</div><div class="tl-body">Kawaki memulai perjalanannya di dunia digital. Tertarik dengan dunia anime, desain, dan teknologi, ia mulai membangun identitas online-nya.</div></div>
            <div class="tl-item"><div class="tl-dot"></div><div class="tl-year">— BERKEMBANG —</div><div class="tl-heading">MEMBANGUN KONTEN</div><div class="tl-body">Aktif membuat konten di berbagai platform. Mulai dari TikTok dengan konten anime dan digital art, hingga membangun komunitas lewat Telegram dan WhatsApp.</div></div>
            <div class="tl-item"><div class="tl-dot"></div><div class="tl-year">— SEKARANG —</div><div class="tl-heading">SHADOW OFFICIAL</div><div class="tl-body">Kawaki kini dikenal sebagai <strong>Kawaki Shadow Official</strong> — seorang kreator dengan identitas yang kuat, aktif berkarya di dunia digital dan terus mengembangkan proyek-proyek baru.</div></div>
            <div class="tl-item"><div class="tl-dot"></div><div class="tl-year">— MENDATANG —</div><div class="tl-heading">PROYEK BARU</div><div class="tl-body">Rencana pengembangan lebih banyak karya digital, website, dan konten kreatif. Kawaki terus bertumbuh dan berevolusi.</div></div>
        </div>
    </div>
</div>

<!-- KEAHLIAN -->
<section id="keahlian">
    <div class="section-label reveal">SKILL SET</div>
    <h2 class="section-title reveal">KEAHLIAN<br>UTAMA</h2>
    <div class="skills-grid">
        <div class="skill-card d1"><div class="skill-icon"><i class="fa-solid fa-code"></i></div><div class="skill-name">Web Development</div><div class="skill-desc">Membangun website dan aplikasi web dengan teknologi modern dan tampilan yang menarik.</div><div class="skill-bar-wrap"><div class="skill-bar" data-width="85"></div></div></div>
        <div class="skill-card d2"><div class="skill-icon"><i class="fa-solid fa-pen-nib"></i></div><div class="skill-name">Digital Design</div><div class="skill-desc">Menciptakan desain visual yang estetis, mulai dari UI/UX hingga digital artwork bertema anime.</div><div class="skill-bar-wrap"><div class="skill-bar" data-width="90"></div></div></div>
        <div class="skill-card d3"><div class="skill-icon"><i class="fa-solid fa-video"></i></div><div class="skill-name">Content Creation</div><div class="skill-desc">Membuat konten video, edit, dan storytelling untuk platform TikTok dan media sosial lainnya.</div><div class="skill-bar-wrap"><div class="skill-bar" data-width="88"></div></div></div>
        <div class="skill-card d1"><div class="skill-icon"><i class="fa-brands fa-discord"></i></div><div class="skill-name">Community Builder</div><div class="skill-desc">Membangun dan mengelola komunitas online yang solid dan berdampak di berbagai platform.</div><div class="skill-bar-wrap"><div class="skill-bar" data-width="80"></div></div></div>
        <div class="skill-card d2"><div class="skill-icon"><i class="fa-solid fa-paint-roller"></i></div><div class="skill-name">Anime Artwork</div><div class="skill-desc">Karya seni digital bertema anime dengan gaya visual yang unik dan khas karakter shadow.</div><div class="skill-bar-wrap"><div class="skill-bar" data-width="92"></div></div></div>
        <div class="skill-card d3"><div class="skill-icon"><i class="fa-solid fa-bolt"></i></div><div class="skill-name">Branding</div><div class="skill-desc">Membangun brand identity yang kuat dan konsisten di seluruh platform digital yang digunakan.</div><div class="skill-bar-wrap"><div class="skill-bar" data-width="83"></div></div></div>
    </div>
</section>

<!-- GALERI -->
<div id="galeri">
    <div class="galeri-inner">
        <div class="section-label reveal">VISUAL</div>
        <h2 class="section-title reveal">GALERI<br>INSPIRASI</h2>
        <div class="gallery-grid reveal">
            <div class="gal-item"><img src="https://files.catbox.moe/3d1i10.jpg" alt="Kawaki Anime 1" onerror="this.src='https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&q=80'" style="min-height:312px;"><div class="gal-overlay"><i class="fa-solid fa-expand"></i></div></div>
            <div class="gal-item"><img src="https://files.catbox.moe/yoyopf.jpg" alt="Kawaki Anime 2" onerror="this.src='https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&q=80'"><div class="gal-overlay"><i class="fa-solid fa-expand"></i></div></div>
            <div class="gal-item"><img src="https://files.catbox.moe/v6v85p.jpg" alt="Kawaki Anime 3" onerror="this.src='https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&q=80'"><div class="gal-overlay"><i class="fa-solid fa-expand"></i></div></div>
            <div class="gal-item"><img src="https://files.catbox.moe/gi5igi.jpg" alt="Kawaki Anime 4" onerror="this.src='https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=400&q=80'"><div class="gal-overlay"><i class="fa-solid fa-expand"></i></div></div>
            <div class="gal-item"><img src="https://files.catbox.moe/6fou49.jpg" alt="Kawaki Anime 5" onerror="this.src='https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80'"><div class="gal-overlay"><i class="fa-solid fa-expand"></i></div></div>
        </div>
    </div>
</div>

<!-- QUOTE -->
<section id="quote">
    <span class="quote-mark">"</span>
    <p class="quote-text reveal">KEKUATAN SEJATI BUKAN DARI TUBUHMU, TAPI DARI TEKADMU UNTUK TERUS BANGKIT</p>
    <p class="quote-author reveal">— KAWAKI SHADOW —</p>
</section>

<!-- SOSMED -->
<section id="sosmed">
    <div class="section-label reveal">KONTAK & SOSIAL</div>
    <h2 class="section-title reveal">TEMUKAN<br>KAWAKI</h2>
    <div class="sosmed-grid">
        <a href="https://wa.me/36304487128" target="_blank" class="sosmed-card wa reveal d1"><div class="sosmed-icon"><i class="fa-brands fa-whatsapp"></i></div><div class="sosmed-platform">WhatsApp</div><div class="sosmed-handle">+36 30 448 7128</div><span class="sosmed-btn"><i class="fa-brands fa-whatsapp"></i> Chat Sekarang</span></a>
        <a href="https://t.me/youknowkawaki" target="_blank" class="sosmed-card tg reveal d2"><div class="sosmed-icon"><i class="fa-brands fa-telegram"></i></div><div class="sosmed-platform">Telegram</div><div class="sosmed-handle">@youknowkawaki</div><span class="sosmed-btn"><i class="fa-brands fa-telegram"></i> Hubungi di Telegram</span></a>
        <a href="https://tiktok.com/@kawakishadow" target="_blank" class="sosmed-card tt reveal d3"><div class="sosmed-icon"><i class="fa-brands fa-tiktok"></i></div><div class="sosmed-platform">TikTok</div><div class="sosmed-handle">@kawakishadow</div><span class="sosmed-btn"><i class="fa-brands fa-tiktok"></i> Follow Sekarang</span></a>
    </div>
</section>

<!-- FOOTER -->
<footer>
    <span class="footer-logo">thank you for supporting me</span>
    <div class="footer-tagline">By Kawaki Shadow Official — Creator & Developer</div>
    <div class="footer-divider"></div>
    <div class="footer-copy">&#47;&#47; KAWAKI SHADOW — ALL RIGHTS RESERVED &#47;&#47; BUILT WITH PASSION &copy; <?php echo $current_year; ?></div>
</footer>

  <script src="script.js"></script>
</body>
</html>