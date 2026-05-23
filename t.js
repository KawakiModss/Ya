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

  // POLA VISUAL (13-15)
  { cat: "Pola Visual", icon: "fa-solid fa-eye", q: "Jika MERAH → HIJAU → BIRU mengikuti pola pergantian warna primer, warna apa yang mengikuti setelah BIRU jika pola berulang?", opts: ["Kuning","Merah","Ungu","Oranye"], ans: 1 },
  { cat: "Pola Visual", icon: "fa-solid fa-eye", q: "Cermin sebuah huruf 'R' secara horizontal akan terlihat seperti huruf apa?", opts: ["R terbalik","Huruf yang tidak standar","Tetap R","Huruf K"], ans: 1 },
  { cat: "Pola Visual", icon: "fa-solid fa-eye", q: "Sebuah kubus memiliki 6 sisi. Jika setiap sisi dibagi menjadi 4 bagian, ada berapa bagian total?", opts: ["18","20","22","24"], ans: 3 },

  // BAHASA & VERBAL (16-20)
  { cat: "Verbal", icon: "fa-solid fa-spell-check", q: "Kata mana yang paling BERBEDA dari kelompoknya?", opts: ["Mawar","Melati","Anggrek","Mangga"], ans: 3 },
  { cat: "Verbal", icon: "fa-solid fa-spell-check", q: "Analogi: Buku : Perpustakaan = Lukisan : ?", opts: ["Kanvas","Museum","Seniman","Galeri"], ans: 3 },
  { cat: "Verbal", icon: "fa-solid fa-spell-check", q: "Manakah kata yang merupakan lawan kata dari 'Kontradiksi'?", opts: ["Persetujuan","Perbedaan","Konflik","Perdebatan"], ans: 0 },
  { cat: "Verbal", icon: "fa-solid fa-spell-check", q: "Jika 'Cepat' adalah antonim dari 'Lambat', maka antonim dari 'Boros' adalah?", opts: ["Hemat","Kaya","Pelit","Miskin"], ans: 0 },
  { cat: "Verbal", icon: "fa-solid fa-spell-check", q: "Lengkapi analogi: Dokter : Rumah Sakit = Hakim : ?", opts: ["Penjara","Pengadilan","Kantor Polisi","Kejaksaan"], ans: 1 },

  // BAHASA INDONESIA (21-25)
  { cat: "Bahasa Indo", icon: "fa-solid fa-language", q: "Kata 'sangat' dalam bahasa Indonesia termasuk jenis kata?", opts: ["Nomina","Verba","Adjektiva","Adverbia"], ans: 3 },
  { cat: "Bahasa Indo", icon: "fa-solid fa-language", q: "Manakah kalimat yang menggunakan ejaan yang tepat?", opts: ["Saya pergi ke pasar jam 2 sore","Saya pergi ke Pasar jam 2 sore","Saya pergi ke Pasar jam 2 Sore","saya pergi ke Pasar jam 2 sore"], ans: 0 },
  { cat: "Bahasa Indo", icon: "fa-solid fa-language", q: "Apa imbuhan yang tepat untuk kata 'dasar' menjadi 'mempunyai dasar'?", opts: ["ber-","me-","di-","ke-"], ans: 0 },
  { cat: "Bahasa Indo", icon: "fa-solid fa-language", q: "Sinonim dari kata 'kompleks' adalah?", opts: ["Sederhana","Rumit","Mudah","Lurus"], ans: 1 },
  { cat: "Bahasa Indo", icon: "fa-solid fa-language", q: "Kalimat pasif dari 'Ayah membeli mobil baru' adalah?", opts: ["Mobil baru dibeli ayah","Ayah membelikan mobil baru","Mobil baru membeli ayah","Dibeli ayah mobil baru"], ans: 0 },

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

  // ASTRONOMI (37-40)
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

  // KIMIA (47-48)
  { cat: "Kimia", icon: "fa-solid fa-flask", q: "Lambang kimia untuk Air adalah?", opts: ["O2","CO2","H2O","NaCl"], ans: 2 },
  { cat: "Kimia", icon: "fa-solid fa-flask", q: "Unsur dengan nomor atom 6 adalah?", opts: ["Oksigen","Karbon","Hidrogen","Nitrogen"], ans: 1 },

  // BIOLOGI (49-50)
  { cat: "Biologi", icon: "fa-solid fa-dna", q: "Organ yang berfungsi memompa darah adalah?", opts: ["Paru-paru","Hati","Jantung","Ginjal"], ans: 2 },
  { cat: "Biologi", icon: "fa-solid fa-dna", q: "Proses fotosintesis menghasilkan?", opts: ["Karbon dioksida","Oksigen","Nitrogen","Hidrogen"], ans: 1 }
];

// ========== FITUR RANDOM SHUFFLE ==========
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleOptions(question) {
  // buat array index [0,1,2,3] lalu acak
  const indices = [0, 1, 2, 3];
  shuffleArray(indices);
  const newOpts = indices.map(i => question.opts[i]);
  // cari index baru dari jawaban benar
  let newAns = indices.findIndex(i => i === question.ans);
  return {
    ...question,
    opts: newOpts,
    ans: newAns
  };
}

let questions = []; // bakal diisi random setiap start

let userName = '';
let currentQ = 0;
let score = 0;
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
    inp.style.boxShadow = '0 0 0 4px rgba(255,107,107,0.15)';
    inp.placeholder = 'Nama tidak boleh kosong!';
    setTimeout(() => {
      inp.style.borderColor = '';
      inp.style.boxShadow = '';
      inp.placeholder = 'Masukkan nama kamu...';
    }, 1800);
    return;
  }
  userName = input;
  
  // --- RANDOMIZE TOTAL ---
  // 1. Copy base questions
  let shuffledBase = [...baseQuestions];
  // 2. Acak urutan soal
  shuffledBase = shuffleArray(shuffledBase);
  // 3. Untuk setiap soal, acak opsi jawaban
  questions = shuffledBase.map(q => shuffleOptions(q));
  
  currentQ = 0;
  score = 0;
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
    btn.classList.remove('selected');
  } else {
    btn.classList.add('wrong');
  }

  userAnswers.push(index);
  document.getElementById('btn-next').classList.add('visible');
}

function autoSkip() {
  if (answered) return;
  answered = true;
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

  const pct = score / 50;
  const iq = Math.round(70 + pct * 75);
  const wrong = 50 - score;
  const accPct = Math.round((score / 50) * 100);

  document.getElementById('result-name').textContent = userName;
  document.getElementById('stat-correct').textContent = score;
  document.getElementById('stat-wrong').textContent = wrong;
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

  spawnParticles();
}

function triggerConfetti() {
  const wrap = document.getElementById('confettiWrap');
  wrap.innerHTML = '';
  const colors = ['#00f5c4','#7c6aff','#ff6b6b','#f0a500','#fff','#38bdf8'];
  for (let i = 0; i < 80; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    const left = Math.random() * 100;
    const delay = Math.random() * 1.5;
    const dur = 2 + Math.random() * 2;
    const size = 6 + Math.random() * 8;
    p.style.cssText = `
      left:${left}vw; top:0;
      width:${size}px; height:${size}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      border-radius:${Math.random()>0.5 ? '50%' : '3px'};
    `;
    wrap.appendChild(p);
  }
  setTimeout(() => { wrap.innerHTML = ''; }, 5000);
}

function spawnParticles() {
  const bg = document.getElementById('particleBg');
  bg.innerHTML = '';
  const colors = ['#00f5c4','#7c6aff','#ff6b6b'];
  for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 4 + Math.random() * 8;
    const left = Math.random() * 100;
    const dur = 6 + Math.random() * 8;
    const delay = Math.random() * 6;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${dur}s;
      animation-delay:${delay}s;
    `;
    bg.appendChild(p);
  }
}

function retryTest() {
  document.getElementById('particleBg').innerHTML = '';
  
  // RANDOMIZE LAGI SAAT COBA LAGI
  let shuffledBase = [...baseQuestions];
  shuffledBase = shuffleArray(shuffledBase);
  questions = shuffledBase.map(q => shuffleOptions(q));
  
  currentQ = 0;
  score = 0;
  userAnswers = [];
  showScreen('quiz');
  document.getElementById('display-name').textContent = userName;
  loadQuestion();
}

function goWelcome() {
  document.getElementById('particleBg').innerHTML = '';
  clearInterval(timerInterval);
  showScreen('welcome');
}

document.getElementById('name-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') startTest();
});