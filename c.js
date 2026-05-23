let currentFile = null;
let parsedData = { html: '', js: '', css: '' };

const dropZone   = document.getElementById('drop-zone');
const fileInput  = document.getElementById('file-input');
const fileInfo   = document.getElementById('file-info');
const fileNameEl = document.getElementById('file-name-display');
const fileSizeEl = document.getElementById('file-size-display');
const removeBtn  = document.getElementById('remove-file');
const convertBtn = document.getElementById('convert-btn');
const previewSec = document.getElementById('preview-section');
const downloadArea = document.getElementById('download-area');
const downloadLink = document.getElementById('download-link');
const toastEl    = document.getElementById('toast');
const toastMsg   = document.getElementById('toast-msg');
const toastIcon  = document.getElementById('toast-icon');

// Drag and Drop
dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('drag-over');
  const f = e.dataTransfer.files[0];
  if (f) handleFile(f);
});

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) handleFile(fileInput.files[0]);
});

removeBtn.addEventListener('click', resetAll);

function handleFile(file) {
  if (!file.name.match(/\.html?$/i)) {
    showToast('Only .html files are supported.', 'error'); return;
  }
  currentFile = file;
  fileNameEl.textContent = file.name;
  fileSizeEl.textContent = formatBytes(file.size);
  fileInfo.classList.add('visible');
  downloadArea.classList.remove('visible');
  downloadLink.href = '#';

  const reader = new FileReader();
  reader.onload = e => {
    parseHTML(e.target.result);
    convertBtn.disabled = false;
    previewSec.classList.add('visible');
  };
  reader.readAsText(file);
}

function parseHTML(source) {
  // Extract <style> blocks
  const cssBlocks = [];
  const noCSS = source.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, (_, c) => {
    cssBlocks.push(c.trim());
    return '';
  });

  // Extract <script> blocks (non-src)
  const jsBlocks = [];
  const noJS = noCSS.replace(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/gi, (_, c) => {
    if (c.trim()) jsBlocks.push(c.trim());
    return '';
  });

  // Remove leftover external script tags and link tags pointing nowhere
  let cleanHTML = noJS;

  // Inject <link> to style.css before </head>
  if (/<\/head>/i.test(cleanHTML)) {
    cleanHTML = cleanHTML.replace(/<\/head>/i, '  <link rel="stylesheet" href="style.css">\n</head>');
  } else {
    cleanHTML = '<link rel="stylesheet" href="style.css">\n' + cleanHTML;
  }

  // Inject <script src> before </body>
  if (/<\/body>/i.test(cleanHTML)) {
    cleanHTML = cleanHTML.replace(/<\/body>/i, '  <script src="script.js"><\/script>\n</body>');
  } else {
    cleanHTML = cleanHTML + '\n<script src="script.js"><\/script>';
  }

  parsedData.html = cleanHTML.trim();
  parsedData.css  = cssBlocks.join('\n\n').trim() || '/* No styles found */';
  parsedData.js   = jsBlocks.join('\n\n').trim()  || '// No scripts found';

  updatePreview();
}

function updatePreview() {
  document.getElementById('html-preview').textContent = truncate(parsedData.html, 400);
  document.getElementById('js-preview').textContent   = truncate(parsedData.js,   400);
  document.getElementById('css-preview').textContent  = truncate(parsedData.css,  400);

  document.getElementById('html-lines').textContent = countLines(parsedData.html) + ' lines';
  document.getElementById('js-lines').textContent   = countLines(parsedData.js)   + ' lines';
  document.getElementById('css-lines').textContent  = countLines(parsedData.css)  + ' lines';
}

convertBtn.addEventListener('click', async () => {
  if (!currentFile) return;
  convertBtn.disabled = true;
  convertBtn.innerHTML = '<div class="spinner"></div> Packaging...';

  try {
    const zip = new JSZip();
    zip.file('index.html', parsedData.html);
    zip.file('script.js',  parsedData.js);
    zip.file('style.css',  parsedData.css);

    const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
    const url  = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = 'convert.zip';
    document.getElementById('zip-meta').textContent =
      `index.html + script.js + style.css  —  ${formatBytes(blob.size)}`;

    downloadArea.classList.add('visible');
    showToast('convert.zip is ready to download.', 'success');
  } catch (err) {
    showToast('Failed to create ZIP: ' + err.message, 'error');
  }

  convertBtn.disabled = false;
  convertBtn.innerHTML = `
    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
      <polyline points="16 3 21 3 21 8"/>
      <line x1="4" y1="20" x2="21" y2="3"/>
      <polyline points="21 16 21 21 16 21"/>
      <line x1="15" y1="15" x2="21" y2="21"/>
    </svg>
    Split &amp; Package as convert.zip`;
});

function resetAll() {
  currentFile = null;
  parsedData  = { html: '', js: '', css: '' };
  fileInput.value = '';
  fileInfo.classList.remove('visible');
  previewSec.classList.remove('visible');
  downloadArea.classList.remove('visible');
  convertBtn.disabled = true;
  downloadLink.href = '#';
}

let toastTimer;
function showToast(msg, type = 'info') {
  toastMsg.textContent = msg;
  toastEl.className = 'toast ' + type + ' show';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

function formatBytes(b) {
  if (b < 1024) return b + ' B';
  if (b < 1048576) return (b / 1024).toFixed(1) + ' KB';
  return (b / 1048576).toFixed(1) + ' MB';
}

function countLines(s) { return s.split('\n').length; }
function truncate(s, n) { return s.length > n ? s.slice(0, n) + '\n…' : s; }