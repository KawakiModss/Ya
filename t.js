// ============================================================
// 1. BACKGROUND ANIMATION (CANVAS)
// ============================================================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let W, H, dots = [];

function resizeCanvas() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Dot {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.r = Math.random() * 2 + 1;
    this.dx = (Math.random() - 0.5) * 0.4;
    this.dy = (Math.random() - 0.5) * 0.4;
    this.color = `hsla(${Math.random()*60 + 160}, 70%, 60%, ${Math.random()*0.3+0.1})`;
  }
  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

for (let i = 0; i < 120; i++) dots.push(new Dot());

function drawBg() {
  ctx.clearRect(0, 0, W, H);
  dots.forEach(d => { d.update(); d.draw(); });
  // draw lines
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x;
      const dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = `rgba(0,245,196,${0.06 * (1 - dist/150)})`;
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawBg);
}
drawBg();

// ============================================================
// 2. SOAL + ICON (SEMUA PAKE FONT AWESOME)
// ============================================================
const baseQuestions = [
  // LOGIKA (1-4)
  { cat: "Logika", icon: "fa-solid fa-sitemap", q: "Jika semua kucing adalah hewan, dan beberapa hewan adalah mamalia, manakah kesimpulan yang PASTI benar?", opts: ["Semua kucing adalah mamalia","Beberapa kucing mungkin mamalia","Tidak ada kucing yang mamalia","Semua mamalia adalah kucing"], ans: 1 },
  { cat: "Logika", icon: "fa-solid fa-sitemap", q: "A lebih tua dari B. B lebih tua dari C. D lebih muda dari C. Siapa yang paling tua?", opts: ["B","C","A","D"], ans: 2 },
  { cat: "Logika", icon: "fa-solid fa-sitemap", q: "Dalam sebuah barisan, setiap orang berdiri di antara dua orang lainnya kecuali yang ada di ujung. Jika ada 7 orang, berapa banyak yang berdiri di tepi?", opts: ["1","2","3","4"], ans: 1 },
  { cat: "Logika", icon: "fa-solid fa-sitemap", q: "Bila P maka Q. P adalah benar. Apa yang dapat disimpulkan?", opts: ["Q mungkin benar","Q pasti benar","Q pasti salah","Tidak dapat disimpulkan"], ans: 1 },
  
  // POLA ANGKA (5-8)
  { cat: "Pola Angka", icon: "fa-solid fa-hashtag", q: "Lanjutkan deret berikut: 2, 6, 12, 20, 30, ...", opts: ["38","40","42","44"], ans: 2 },
  { cat: "Pola Angka", icon: "fa-solid fa-hashtag", q: "Berapakah bilangan yang hilang? 1, 1, 2, 3, 5, 8, __, 21", opts: ["11","12","13","14"], ans: 2 },
  { cat: "Pola Angka", icon: "fa-solid fa-hashtag", q: "Deret: 3, 9, 27, 81, ... Bilangan selanjutnya adalah?", opts: ["162","243","324","405"], ans: 1 },
  { cat: "Pola Angka", icon: "fa-solid fa-hashtag", q: "Jika pola adalah: 4, 8, 16, 32, 64, maka bilangan ke-7 adalah?", opts: ["128","192","256","512"], ans: 2 },

  // MATEMATIKA (9-12)
  { cat: "Matematika", icon: "fa-solid fa-calculator", q: "Sebuah toko memberi diskon 25% dari harga Rp 800.000. Berapa harga setelah diskon?", opts: ["Rp 550.000","Rp 600.000","Rp 650.000","Rp 700.000"], ans: 1 },
  { cat: "Matematika", icon: "fa-solid fa-calculator", q: "Jika 5 pekerja menyelesaikan pekerjaan dalam 8 hari, berapa hari yang dibutuhkan 10 pekerja untuk menyelesaikan pekerjaan yang sama?", opts: ["2 hari","4 hari","6 hari","8 hari"], ans: 1 },
  { cat: "Matematika", icon: "fa-solid fa-calculator", q: "Berapakah nilai x jika 3x + 12 = 33?", opts: ["5","6","7","8"], ans: 2 },
  { cat: "Matematika", icon: "fa-solid fa-calculator", q: "Dua angka memiliki selisih 14 dan jumlah 64. Angka yang lebih kecil adalah?", opts: ["23","25","27","29"], ans: 1 },

  // POLA VISUAL (13-15) + ICON
  { cat: "Pola Visual", icon: "fa-solid fa-eye", q: "Perhatikan pola warna: <i class='fas fa-circle' style='color:#ff6b6b'></i> → <i class='fas fa-circle' style='color:#00f5c4'></i> → <i class='fas fa-circle' style='color:#7c6aff'></i>. Jika pola berulang, warna setelah biru adalah?", opts: ["Kuning","Merah","Ungu","Oranye"], ans: 1, icons: ['fa-solid fa-circle','fa-solid fa-circle','fa-solid fa-circle'] },
  { cat: "Pola Visual", icon: "fa-solid fa-eye", q: "Cermin huruf 'R' secara horizontal akan terlihat seperti?", opts: ["R terbalik","Huruf tidak standar","Tetap R","Huruf K"], ans: 1 },
  { cat: "Pola Visual", icon: "fa-solid fa-eye", q: "Sebuah kubus memiliki 6 sisi. Jika setiap sisi dibagi menjadi 4 bagian, total bagiannya?", opts: ["18","20","22","24"], ans: 3 },

  // BAHASA & VERBAL (16-20)
  { cat: "Verbal", icon: "fa-solid fa-spell-check", q: "Kata mana yang paling BERBEDA dari kelompoknya?", opts: ["Mawar","Melati","Anggrek","Mangga"], ans: 3 },
  { cat: "Verbal", icon: "fa-solid fa-spell-check", q: "Analogi: Buku : Perpustakaan = Lukisan : ?", opts: ["Kanvas","Museum","Seniman","Galeri"], ans: 3 },
  { cat: "Verbal", icon: "fa-solid fa-spell-check", q: "Lawan kata dari 'Kontradiksi' adalah?", opts: ["Persetujuan","Perbedaan","Konflik","Perdebatan"], ans: 0 },
  { cat: "Verbal", icon: "fa-solid fa-spell-check", q: "Antonim dari 'Boros' adalah?", opts: ["Hemat","Kaya","Pelit","Miskin"], ans: 0 },
  { cat: "Verbal", icon: "fa-solid fa-spell-check", q: "Dokter : Rumah Sakit = Hakim : ?", opts: ["Penjara","Pengadilan","Kantor Polisi","Kejaksaan"], ans: 1 },

  // BAHASA INDONESIA (21-25)
  { cat: "Bahasa Indo", icon: "fa-solid fa-language", q: "Kata 'sangat' dalam bahasa Indonesia termasuk jenis kata?", opts: ["Nomina","Verba","Adjektiva","Adverbia"], ans: 3 },
  { cat: "Bahasa Indo", icon: "fa-solid fa-language", q: "Kalimat dengan ejaan yang tepat?", opts: ["Saya pergi ke pasar jam 2 sore","Saya pergi ke Pasar jam 2 sore","Saya pergi ke Pasar jam 2 Sore","saya pergi ke Pasar jam 2 sore"], ans: 0 },
  { cat: "Bahasa Indo", icon: "fa-solid fa-language", q: "Imbuhan tepat untuk 'dasar' → 'mempunyai dasar'?", opts: ["ber-","me-","di-","ke-"], ans: 0 },
  { cat: "Bahasa Indo", icon: "fa-solid fa-language", q: "Sinonim dari 'kompleks' adalah?", opts: ["Sederhana","Rumit","Mudah","Lurus"], ans: 1 },
  { cat: "Bahasa Indo", icon: "fa-solid fa-language", q: "Kalimat pasif dari 'Ayah membeli mobil baru'?", opts: ["Mobil baru dibeli ayah","Ayah membelikan mobil baru","Mobil baru membeli ayah","Dibeli ayah mobil baru"], ans: 0 },

  // BAHASA INGGRIS (26-30)
  { cat: "English", icon: "fa-solid fa-flag-usa", q: "Which sentence is grammatically correct?", opts: ["She go to school yesterday","She went to school yesterday","She goes to school yesterday","She gone to school yesterday"], ans: 1 },
  { cat: "English", icon: "fa-solid fa-flag-usa", q: "What is the antonym of 'ancient'?", opts: ["Old","Modern","Historic","Aged"], ans: 1 },
  { cat: "English", icon: "fa-solid fa-flag-usa", q: "Choose the correct passive: 'The chef cooks the meal'", opts: ["The meal is cooked by the chef","The meal was cooked by the chef","The meal cooked by the chef","The meal has cooked by the chef"], ans: 0 },
  { cat: "English", icon: "fa-solid fa-flag-usa", q: "Which word means 'a person who writes books'?", opts: ["Author","Editor","Publisher","Printer"], ans: 0 },
  { cat: "English", icon: "fa-solid fa-flag-usa", q: "Complete: If I had studied harder, I ... passed the exam.", opts: ["will have","would have","would had","would has"], ans: 1 },

  // BAHASA JEPANG (31-33)
  { cat: "日本語", icon: "fa-solid fa-japan", q: "Apa arti dari 'こんにちは' (Konnichiwa)?", opts: ["Selamat pagi","Selamat siang","Selamat malam","Selamat tidur"], ans: 1 },
  { cat: "日本語", icon: "fa-solid fa-japan", q: "Huruf 'ありがとう' dibaca sebagai?", opts: ["Arigatou","Sayonara","Ohayou","Sumimasen"], ans: 0 },
  { cat: "日本語", icon: "fa-solid fa-japan", q: "Apa arti 'sakura'?", opts: ["Bunga matahari","Bunga sakura","Bunga mawar","Bunga melati"], ans: 1 },

  // BAHASA ARAB (34-36)
  { cat: "العربية", icon: "fa-solid fa-mosque", q: "Apa arti dari 'السلام عليكم' (Assalamu'alaikum)?", opts: ["Semoga keselamatan terlimpah padamu","Selamat pagi","Selamat datang","Terima kasih"], ans: 0 },
  { cat: "العربية", icon: "fa-solid fa-mosque", q: "Kata 'بسم الله' (Bismillah) artinya?", opts: ["Dengan nama Allah","Maha Suci Allah","Allah Maha Besar","Segala puji bagi Allah"], ans: 0 },
  { cat: "العربية", icon: "fa-solid fa-mosque", q: "Angka 5 dalam bahasa Arab adalah?", opts: ["واحد (Wahid)","اثنان (Itsnan)","ثلاثة (Tsalatsah)","خمسة (Khamsah)"], ans: 3 },

  // ASTRONOMI (37-40) + ICON
  { cat: "Astronomi", icon: "fa-solid fa-meteor", q: "Planet terbesar di tata surya kita adalah?", opts: ["Jupiter","Saturnus","Mars","Bumi"], ans: 0 },
  { cat: "Astronomi", icon: "fa-solid fa-meteor", q: "Benda langit yang mengelilingi planet disebut?", opts: ["Bintang","Komet","Satelit","Asteroid"], ans: 2 },
  { cat: "Astronomi", icon: "fa-solid fa-meteor", q: "Galaksi tempat Bumi berada bernama?", opts: ["Andromeda","Bimasakti","Triangulum","Sombrero"], ans: 1 },
  { cat: "Astronomi", icon: "fa-solid fa-meteor", q: "Fase bulan saat sisi yang diterangi matahari membentuk lingkaran penuh disebut?", opts: ["Bulan baru","Bulan sabit","Bulan purnama","Bulan separuh"], ans: 2 },

  // SEJARAH (41-43)
  { cat: "Sejarah", icon: "fa-solid fa-landmark", q: "Proklamasi Kemerdekaan Indonesia dibacakan pada tahun?", opts: ["1942","1943","1945","1946"], ans: 2 },
  { cat: "Sejarah", icon: "fa-solid fa-landmark", q: "Siapa penemu mesin uap?", opts: ["Isaac Newton","James Watt","Albert Einstein","Nikola Tesla"], ans: 1 },
  { cat: "Sejarah", icon: "fa-solid fa-landmark", q: "Perang dunia II berakhir pada tahun?", opts: ["1943","1944","1945","1946"], ans: 2 },

  // GEOGRAFI (44-46)
  { cat: "Geografi", icon: "fa-solid fa-globe-asia", q: "Gunung tertinggi di dunia adalah?", opts: ["Everest","Kilimanjaro","K2","Elbrus"], ans: 0 },
  { cat: "Geografi", icon: "fa-solid fa-globe-asia", q: "Benua terluas di dunia adalah?", opts: ["Afrika","Amerika","Asia","Antartika"], ans: 2 },
  { cat: "Geografi", icon: "fa-solid fa-globe-asia", q: "Samudra terbesar di Bumi adalah?", opts: ["Atlantik","Hindia","Arktik","Pasifik"], ans: 3 },

  // KIMIA (47-48) + ICON
  { cat: "Kimia", icon: "fa-solid fa-flask", q: "Lambang kimia untuk Air adalah?", opts: ["O2","CO2","H2O","NaCl"], ans: 2 },
  { cat: "Kimia", icon: "fa-solid fa-flask", q: "Unsur dengan nomor atom 6 adalah?", opts: ["Oksigen","Karbon","Hidrogen","Nitrogen"], ans: 1 },

  // BIOLOGI (49-50)
  { cat: "Biologi", icon: "fa-solid fa-dna", q: "Organ yang berfungsi memompa darah adalah?", opts: ["Paru-paru","Hati","Jantung","Ginjal"], ans: 2 },
  { cat: "Biologi", icon: "fa-solid fa-dna", q: "Proses fotosintesis menghasilkan?", opts: ["Karbon dioksida","Oksigen","Nitrogen","Hidrogen"], ans: 1 }
];

// SOAL GAMBAR + ICON (10 soal dengan base64 image + icon display)
const imageQuestions = [
  // Pola Visual - Icon
  { 
    cat: "Pola Visual", 
    icon: "fa-solid fa-eye", 
    q: "Perhatikan pola icon berikut:", 
    opts: ["<i class='fas fa-square' style='color:#00f5c4'></i>","<i class='fas fa-circle' style='color:#7c6aff'></i>","<i class='fas fa-square' style='color:#ff6b6b'></i>","<i class='fas fa-triangle' style='color:#f0a500'></i>"], 
    ans: 0,
    displayIcons: [
      '<i class="fas fa-square" style="color:#00f5c4;font-size:24px;"></i>',
      '<i class="fas fa-square" style="color:#00f5c4;font-size:24px;"></i>',
      '<i class="fas fa-circle" style="color:#7c6aff;font-size:24px;"></i>',
      '<i class="fas fa-square" style="color:#00f5c4;font-size:24px;"></i>',
      '<i class="fas fa-square" style="color:#00f5c4;font-size:24px;"></i>',
      '<i class="fas fa-circle" style="color:#7c6aff;font-size:24px;"></i>',
      '<i class="fas fa-square" style="color:#00f5c4;font-size:24px;"></i>',
      '<i class="fas fa-square" style="color:#00f5c4;font-size:24px;"></i>',
      '<i class="fas fa-question" style="color:#ff6b6b;font-size:24px;"></i>'
    ]
  },
  { 
    cat: "Pola Visual", 
    icon: "fa-solid fa-eye", 
    q: "Icon mana yang berbeda?", 
    opts: ["<i class='fas fa-sun' style='color:#f0a500'></i>","<i class='fas fa-moon' style='color:#7c6aff'></i>","<i class='fas fa-star' style='color:#f0a500'></i>","<i class='fas fa-fire' style='color:#ff6b6b'></i>"], 
    ans: 3,
    displayIcons: [
      '<i class="fas fa-sun" style="color:#f0a500;font-size:24px;"></i>',
      '<i class="fas fa-moon" style="color:#7c6aff;font-size:24px;"></i>',
      '<i class="fas fa-star" style="color:#f0a500;font-size:24px;"></i>',
      '<i class="fas fa-fire" style="color:#ff6b6b;font-size:24px;"></i>'
    ]
  },
  { 
    cat: "Pola Visual", 
    icon: "fa-solid fa-eye", 
    q: "Lanjutkan pola icon:", 
    opts: ["<i class='fas fa-circle' style='color:#00f5c4'></i>","<i class='fas fa-square' style='color:#7c6aff'></i>","<i class='fas fa-circle' style='color:#ff6b6b'></i>","<i class='fas fa-square' style='color:#f0a500'></i>"], 
    ans: 0,
    displayIcons: [
      '<i class="fas fa-circle" style="color:#00f5c4;font-size:24px;"></i>',
      '<i class="fas fa-square" style="color:#ff6b6b;font-size:24px;"></i>',
      '<i class="fas fa-circle" style="color:#00f5c4;font-size:24px;"></i>',
      '<i class="fas fa-square" style="color:#ff6b6b;font-size:24px;"></i>',
      '<i class="fas fa-circle" style="color:#00f5c4;font-size:24px;"></i>',
      '<i class="fas fa-square" style="color:#ff6b6b;font-size:24px;"></i>',
      '<i class="fas fa-circle" style="color:#00f5c4;font-size:24px;"></i>',
      '<i class="fas fa-square" style="color:#ff6b6b;font-size:24px;"></i>',
      '<i class="fas fa-question" style="color:#ff6b6b;font-size:24px;"></i>'
    ]
  },
  
  // Astronomi - Icon
  { 
    cat: "Astronomi", 
    icon: "fa-solid fa-meteor", 
    q: "Planet mana yang memiliki cincin?", 
    opts: ["Jupiter","Saturnus","Mars","Venus"], 
    ans: 1,
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='60'%3E%3Ccircle cx='40' cy='30' r='20' fill='%23f0a500'/%3E%3Cellipse cx='40' cy='30' rx='35' ry='8' fill='none' stroke='%2300f5c4' stroke-width='3'/%3E%3Ctext x='80' y='38' font-size='20' fill='%235a6080'%3EPlanet?%3C/text%3E%3C/svg%3E" 
  },
  { 
    cat: "Astronomi", 
    icon: "fa-solid fa-meteor", 
    q: "Benda langit ini adalah?", 
    opts: ["Komet","Bintang","Planet","Asteroid"], 
    ans: 0,
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='60'%3E%3Ccircle cx='30' cy='30' r='5' fill='%23fff'/%3E%3Cpath d='M35,30 L90,25 L100,30 L90,35 Z' fill='%2300f5c4' opacity='0.7'/%3E%3Ctext x='110' y='38' font-size='20' fill='%235a6080'%3EObjek?%3C/text%3E%3C/svg%3E" 
  },

  // Matematika - Gambar
  { 
    cat: "Matematika", 
    icon: "fa-solid fa-calculator", 
    q: "Berapa luas persegi dengan sisi 7 cm?", 
    opts: ["14 cm²","28 cm²","49 cm²","56 cm²"], 
    ans: 2,
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='80'%3E%3Crect x='20' y='20' width='60' height='60' fill='none' stroke='%2300f5c4' stroke-width='3'/%3E%3Ctext x='35' y='55' font-size='20' fill='%235a6080'%3E7 cm%3C/text%3E%3C/svg%3E" 
  },
  
  // Kimia - Gambar
  { 
    cat: "Kimia", 
    icon: "fa-solid fa-flask", 
    q: "Struktur molekul air adalah?", 
    opts: ["Linear","Bentuk V","Segitiga","Tetrahedral"], 
    ans: 1,
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='80'%3E%3Ccircle cx='60' cy='40' r='15' fill='%23ff6b6b' opacity='0.6'/%3E%3Ccircle cx='100' cy='20' r='10' fill='%2300f5c4' opacity='0.6'/%3E%3Ccircle cx='100' cy='60' r='10' fill='%2300f5c4' opacity='0.6'/%3E%3Cline x1='65' y1='35' x2='95' y2='25' stroke='%235a6080' stroke-width='2'/%3E%3Cline x1='65' y1='45' x2='95' y2='55' stroke='%235a6080' stroke-width='2'/%3E%3C/svg%3E" 
  },

  // Biologi - Gambar
  { 
    cat: "Biologi", 
    icon: "fa-solid fa-dna", 
    q: "Organ ini berfungsi untuk?", 
    opts: ["Memompa darah","Mencerna makanan","Bernapas","Menyaring darah"], 
    ans: 0,
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='80'%3E%3Cpath d='M50,40 Q70,20 90,40 Q110,60 130,40 Q150,20 170,40' fill='none' stroke='%23ff6b6b' stroke-width='8'/%3E%3C/svg%3E" 
  },

  // Logika - Gambar
  { 
    cat: "Logika", 
    icon: "fa-solid fa-sitemap", 
    q: "Berapa segitiga pada gambar ini?", 
    opts: ["4","6","8","10"], 
    ans: 2,
    img: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='80'%3E%3Cpolygon points='100,10 40,70 160,70' fill='none' stroke='%2300f5c4' stroke-width='3'/%3E%3Cpolygon points='100,25 55,70 145,70' fill='none' stroke='%237c6aff' stroke-width='2'/%3E%3C/svg%3E" 
  },
  
  // Icon Pattern - tambahan
  { 
    cat: "Pola Visual", 
    icon: "fa-solid fa-eye", 
    q: "Icon manakah yang cocok untuk melengkapi pola?", 
    opts: ["<i class='fas fa-arrow-up' style='color:#00f5c4'></i>","<i class='fas fa-arrow-down' style='color:#7c6aff'></i>","<i class='fas fa-arrow-left' style='color:#ff6b6b'></i>","<i class='fas fa-arrow-right' style='color:#f0a500'></i>"], 
    ans: 0,
    displayIcons: [
      '<i class="fas fa-arrow-up" style="color:#00f5c4;font-size:24px;"></i>',
      '<i class="fas fa-arrow-down" style="color:#7c6aff;font-size:24px;"></i>',
      '<i class="fas fa-arrow-up" style="color:#00f5c4;font-size:24px;"></i>',
      '<i class="fas fa-arrow-down" style="color:#7c6aff;font-size:24px;"></i>',
      '<i class="fas fa-arrow-up" style="color:#00f5c4;font-size:24px;"></i>',
      '<i class="fas fa-question" style="color:#ff6b6b;font-size:24px;"></i>'
    ]
  }
];

// Gabungkan semua soal
const allQuestions = [...baseQuestions, ...imageQuestions];

// ============================================================
// 3. FUNGSI UTAMA
// ============================================================
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleOptions(question) {
  const indices = [0, 1, 2, 3];
  shuffleArray(indices);
  const newOpts = indices.map(i => question.opts[i]);
  let newAns = indices.findIndex(i => i === question.ans);
  return { ...question, opts: newOpts, ans: newAns };
}

let questions = [];
let userName = '';
let currentQ = 0;
let score = 0;
let wrong = 0;
let unanswered = 0;
let timerInterval;
let timeLeft = 30;
let answered = false;
let userAnswers = [];

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById('screen-' + id);
  el.classList.remove('active');
  void el.offsetWidth;
  el.classList.add('active');
}

function startTest() {
  const input = document.getElementById('name-input').value.trim();
  if (!input) {
    const inp = document.getElementById('name-input');
    inp.style.borderColor = 'var(--accent3)';
    inp.style.boxShadow = '0 0 0 6px rgba(255,107,107,0.15)';
    inp.placeholder = 'Nama tidak boleh kosong!';
    setTimeout(() => {
      inp.style.borderColor = '';
      inp.style.boxShadow = '';
      inp.placeholder = 'Masukkan nama kamu...';
    }, 1800);
    return;
  }
  userName = input;
  
  // SHUFFLE TOTAL SETIAP START
  let shuffledBase = shuffleArray([...allQuestions]);
  questions = shuffledBase.slice(0, 50).map(q => shuffleOptions(q));
  
  currentQ = 0;
  score = 0;
  wrong = 0;
  unanswered = 0;
  userAnswers = [];
  
  showScreen('quiz');
  document.getElementById('display-name').textContent = userName;
  loadQuestion();
}

function loadQuestion() {
  answered = false;
  clearInterval(timerInterval);
  timeLeft = 30;

  const q = questions[currentQ];
  document.getElementById('q-current').textContent = currentQ + 1;
  document.getElementById('progress-bar').style.width = ((currentQ / 50) * 100) + '%';
  document.getElementById('q-category-text').textContent = q.cat;
  document.getElementById('q-category').querySelector('i').className = q.icon;
  document.getElementById('question-text').textContent = q.q;
  document.getElementById('btn-next').classList.remove('visible');

  // Display Icons (jika ada)
  const iconDisplay = document.getElementById('question-icon-display');
  if (q.displayIcons) {
    iconDisplay.innerHTML = q.displayIcons.join(' ');
    iconDisplay.style.display = 'flex';
  } else {
    iconDisplay.style.display = 'none';
  }

  // Gambar
  const imgEl = document.getElementById('question-image');
  if (q.img) {
    imgEl.src = q.img;
    imgEl.style.display = 'block';
  } else {
    imgEl.style.display = 'none';
  }

  const timer = document.getElementById('timer-display');
  timer.textContent = '30';
  timer.classList.remove('urgent');

  const container = document.getElementById('options-container');
  container.innerHTML = '';
  const letters = ['A','B','C','D'];
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span><span>${opt}</span>`;
    btn.onclick = () => selectAnswer(i, btn);
    container.appendChild(btn);
  });

  timerInterval = setInterval(() => {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft <= 10) timer.classList.add('urgent');
    else timer.classList.remove('urgent');
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (!answered) autoSkip();
    }
  }, 1000);
}

function selectAnswer(index, btn) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const q = questions[currentQ];
  const allBtns = document.querySelectorAll('.option-btn');

  allBtns.forEach(b => b.disabled = true);
  allBtns[q.ans].classList.add('correct');

  if (index === q.ans) {
    score++;
  } else {
    wrong++;
    btn.classList.add('wrong');
  }

  userAnswers.push(index);
  document.getElementById('btn-next').classList.add('visible');
}

function autoSkip() {
  if (answered) return;
  answered = true;
  unanswered++;
  const q = questions[currentQ];
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach(b => b.disabled = true);
  allBtns[q.ans].classList.add('correct');
  userAnswers.push(-1);
  document.getElementById('btn-next').classList.add('visible');
}

function nextQuestion() {
  currentQ++;
  if (currentQ >= questions.length) {
    showResult();
  } else {
    loadQuestion();
  }
}

function showResult() {
  clearInterval(timerInterval);
  showScreen('result');

  const totalAttempted = score + wrong;
  const pct = totalAttempted > 0 ? score / totalAttempted : 0;
  const iq = Math.round(70 + pct * 75);
  const accPct = totalAttempted > 0 ? Math.round((score / totalAttempted) * 100) : 0;

  document.getElementById('result-name').textContent = userName;
  document.getElementById('stat-correct').textContent = score;
  document.getElementById('stat-wrong').textContent = wrong;
  document.getElementById('stat-unanswered').textContent = unanswered;
  document.getElementById('stat-pct').textContent = accPct + '%';

  let cat, color, desc;
  if (iq >= 140) {
    cat = 'Genius'; color = '#00f5c4'; desc = 'Kecerdasan sangat luar biasa! Kamu termasuk dalam kelompok 0.1% individu dengan kemampuan kognitif tertinggi di dunia.';
  } else if (iq >= 130) {
    cat = 'Sangat Cerdas'; color = '#7c6aff'; desc = 'Kecerdasan di atas rata-rata yang signifikan. Kemampuan analitik dan pemecahan masalahmu sangat tajam dan cepat.';
  } else if (iq >= 120) {
    cat = 'Superior'; color = '#a78bfa'; desc = 'Kemampuan kognitifmu berada di atas mayoritas populasi. Kamu memiliki kapasitas belajar dan berpikir yang sangat baik.';
  } else if (iq >= 110) {
    cat = 'Di Atas Rata-rata'; color = '#38bdf8'; desc = 'Kamu berada di atas rata-rata dalam hal kecerdasan. Dengan latihan konsisten, potensimu akan semakin berkembang.';
  } else if (iq >= 90) {
    cat = 'Rata-rata'; color = '#f0a500'; desc = 'Skor IQ rata-rata populasi umum. Kecerdasan bisa diasah — teruslah belajar dan berlatih setiap hari!';
  } else {
    cat = 'Berkembang'; color = '#ff6b6b'; desc = 'Masih ada banyak ruang untuk berkembang. Latihan rutin dan kebiasaan membaca dapat meningkatkan kemampuan kognitifmu secara signifikan.';
  }

  const badge = document.getElementById('iq-badge');
  badge.style.color = color;
  badge.style.borderColor = color;
  badge.style.background = `${color}18`;
  document.getElementById('iq-cat-text').textContent = cat;
  document.getElementById('result-desc').textContent = desc;

  const circumference = 2 * Math.PI * 80;
  const fill = document.getElementById('iq-ring-fill');
  const fillPct = Math.min(pct, 1);
  fill.style.stroke = color;
  fill.style.strokeDasharray = circumference;
  fill.style.strokeDashoffset = circumference;

  setTimeout(() => {
    fill.style.strokeDashoffset = circumference * (1 - fillPct);
  }, 300);

  const iqDisplay = document.getElementById('iq-display');
  let startIQ = 70;
  const endIQ = iq;
  const dur = 1800;
  const startTime = performance.now();
  function animIQ(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / dur, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    iqDisplay.textContent = Math.round(startIQ + (endIQ - startIQ) * ease);
    if (progress < 1) requestAnimationFrame(animIQ);
  }
  setTimeout(() => requestAnimationFrame(animIQ), 400);

  const scalePct = Math.min(Math.max(((iq - 70) / 75) * 100, 0), 100);
  setTimeout(() => {
    document.getElementById('scale-marker').style.left = scalePct + '%';
  }, 600);

  if (score >= 35) triggerConfetti();
}

function triggerConfetti() {
  const wrap = document.getElementById('confettiWrap');
  wrap.innerHTML = '';
  const colors = ['#00f5c4','#7c6aff','#ff6b6b','#f0a500','#fff','#38bdf8'];
  for (let i = 0; i < 100; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    const left = Math.random() * 100;
    const delay = Math.random() * 1.5;
    const dur = 2 + Math.random() * 2.5;
    const size = 6 + Math.random() * 10;
    p.style.cssText = `
      left:${left}vw; top:0;
      width:${size}px; height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      border-radius:${Math.random()>0.5 ? '50%' : '3px'};
      transform: rotate(${Math.random()*360}deg);
    `;
    wrap.appendChild(p);
  }
  setTimeout(() => { wrap.innerHTML = ''; }, 6000);
}

function retryTest() {
  // SHUFFLE LAGI
  let shuffledBase = shuffleArray([...allQuestions]);
  questions = shuffledBase.slice(0, 50).map(q => shuffleOptions(q));
  
  currentQ = 0;
  score = 0;
  wrong = 0;
  unanswered = 0;
  userAnswers = [];
  showScreen('quiz');
  document.getElementById('display-name').textContent = userName;
  loadQuestion();
}

function goWelcome() {
  clearInterval(timerInterval);
  showScreen('welcome');
}

document.getElementById('name-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') startTest();
});