const questions = [
  // LOGIKA
  {
    cat: "Logika", icon: "fa-solid fa-sitemap",
    q: "Jika semua kucing adalah hewan, dan beberapa hewan adalah mamalia, manakah kesimpulan yang PASTI benar?",
    opts: ["Semua kucing adalah mamalia","Beberapa kucing mungkin mamalia","Tidak ada kucing yang mamalia","Semua mamalia adalah kucing"],
    ans: 1
  },
  {
    cat: "Logika", icon: "fa-solid fa-sitemap",
    q: "A lebih tua dari B. B lebih tua dari C. D lebih muda dari C. Siapa yang paling tua?",
    opts: ["B","C","A","D"],
    ans: 2
  },
  {
    cat: "Logika", icon: "fa-solid fa-sitemap",
    q: "Dalam sebuah barisan, setiap orang berdiri di antara dua orang lainnya kecuali yang ada di ujung. Jika ada 7 orang, berapa banyak yang berdiri di tepi?",
    opts: ["1","2","3","4"],
    ans: 1
  },
  {
    cat: "Logika", icon: "fa-solid fa-sitemap",
    q: "Bila P maka Q. P adalah benar. Apa yang dapat disimpulkan?",
    opts: ["Q mungkin benar","Q pasti benar","Q pasti salah","Tidak dapat disimpulkan"],
    ans: 1
  },

  // POLA ANGKA
  {
    cat: "Pola Angka", icon: "fa-solid fa-hashtag",
    q: "Lanjutkan deret berikut: 2, 6, 12, 20, 30, ...",
    opts: ["38","40","42","44"],
    ans: 2
  },
  {
    cat: "Pola Angka", icon: "fa-solid fa-hashtag",
    q: "Berapakah bilangan yang hilang? 1, 1, 2, 3, 5, 8, __, 21",
    opts: ["11","12","13","14"],
    ans: 2
  },
  {
    cat: "Pola Angka", icon: "fa-solid fa-hashtag",
    q: "Deret: 3, 9, 27, 81, ... Bilangan selanjutnya adalah?",
    opts: ["162","243","324","405"],
    ans: 1
  },
  {
    cat: "Pola Angka", icon: "fa-solid fa-hashtag",
    q: "Jika pola adalah: 4, 8, 16, 32, 64, maka bilangan ke-7 adalah?",
    opts: ["128","192","256","512"],
    ans: 2
  },

  // MATEMATIKA
  {
    cat: "Matematika", icon: "fa-solid fa-calculator",
    q: "Sebuah toko memberi diskon 25% dari harga Rp 800.000. Berapa harga setelah diskon?",
    opts: ["Rp 550.000","Rp 600.000","Rp 650.000","Rp 700.000"],
    ans: 1
  },
  {
    cat: "Matematika", icon: "fa-solid fa-calculator",
    q: "Jika 5 pekerja menyelesaikan pekerjaan dalam 8 hari, berapa hari yang dibutuhkan 10 pekerja untuk menyelesaikan pekerjaan yang sama?",
    opts: ["2 hari","4 hari","6 hari","8 hari"],
    ans: 1
  },
  {
    cat: "Matematika", icon: "fa-solid fa-calculator",
    q: "Berapakah nilai x jika 3x + 12 = 33?",
    opts: ["5","6","7","8"],
    ans: 2
  },
  {
    cat: "Matematika", icon: "fa-solid fa-calculator",
    q: "Dua angka memiliki selisih 14 dan jumlah 64. Angka yang lebih kecil adalah?",
    opts: ["23","25","27","29"],
    ans: 1
  },

  // POLA VISUAL
  {
    cat: "Pola Visual", icon: "fa-solid fa-eye",
    q: "Jika MERAH → HIJAU → BIRU mengikuti pola pergantian warna primer, warna apa yang mengikuti setelah BIRU jika pola berulang?",
    opts: ["Kuning","Merah","Ungu","Oranye"],
    ans: 1
  },
  {
    cat: "Pola Visual", icon: "fa-solid fa-eye",
    q: "Cermin sebuah huruf 'R' secara horizontal akan terlihat seperti huruf apa?",
    opts: ["R terbalik","Huruf yang tidak standar","Tetap R","Huruf K"],
    ans: 1
  },
  {
    cat: "Pola Visual", icon: "fa-solid fa-eye",
    q: "Sebuah kubus memiliki 6 sisi. Jika setiap sisi dibagi menjadi 4 bagian, ada berapa bagian total?",
    opts: ["18","20","22","24"],
    ans: 3
  },

  // BAHASA & VERBAL
  {
    cat: "Verbal", icon: "fa-solid fa-spell-check",
    q: "Kata mana yang paling BERBEDA dari kelompoknya?",
    opts: ["Mawar","Melati","Anggrek","Mangga"],
    ans: 3
  },
  {
    cat: "Verbal", icon: "fa-solid fa-spell-check",
    q: "Analogi: Buku : Perpustakaan = Lukisan : ?",
    opts: ["Kanvas","Museum","Seniman","Galeri"],
    ans: 3
  },
  {
    cat: "Verbal", icon: "fa-solid fa-spell-check",
    q: "Manakah kata yang merupakan lawan kata dari 'Kontradiksi'?",
    opts: ["Persetujuan","Perbedaan","Konflik","Perdebatan"],
    ans: 0
  },
  {
    cat: "Verbal", icon: "fa-solid fa-spell-check",
    q: "Jika 'Cepat' adalah antonim dari 'Lambat', maka antonim dari 'Boros' adalah?",
    opts: ["Hemat","Kaya","Pelit","Miskin"],
    ans: 0
  },
  {
    cat: "Verbal", icon: "fa-solid fa-spell-check",
    q: "Lengkapi analogi: Dokter : Rumah Sakit = Hakim : ?",
    opts: ["Penjara","Pengadilan","Kantor Polisi","Kejaksaan"],
    ans: 1
  }
];

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
  document.getElementById('progress-bar').style.width = ((currentQ / 20) * 100) + '%';
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

  // IQ calculation
  const pct = score / 20;
  const iq = Math.round(70 + pct * 75);
  const wrong = 20 - score;
  const accPct = Math.round((score / 20) * 100);

  document.getElementById('result-name').textContent = userName;
  document.getElementById('stat-correct').textContent = score;
  document.getElementById('stat-wrong').textContent = wrong;
  document.getElementById('stat-pct').textContent = accPct + '%';

  // IQ category
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

  // Animate IQ ring
  const circumference = 2 * Math.PI * 80;
  const fill = document.getElementById('iq-ring-fill');
  const fillPct = Math.min(pct, 1);
  fill.style.stroke = color;
  fill.style.strokeDasharray = circumference;
  fill.style.strokeDashoffset = circumference;

  setTimeout(() => {
    fill.style.strokeDashoffset = circumference * (1 - fillPct);
  }, 300);

  // Animate IQ number
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

  // Scale marker position
  // IQ 70 = 0%, 145 = 100%
  const scalePct = Math.min(Math.max(((iq - 70) / 75) * 100, 0), 100);
  setTimeout(() => {
    document.getElementById('scale-marker').style.left = scalePct + '%';
  }, 600);

  // Confetti if good score
  if (score >= 14) triggerConfetti();

  // Particles
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

// Enter key on name input
document.getElementById('name-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') startTest();
});