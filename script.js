// INTERSECTION OBSERVER
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const bar = entry.target.querySelector?.('.skill-bar');
            if (bar) {
                const w = bar.getAttribute('data-width');
                bar.style.width = w + '%';
            }
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .slate-in, .slate-in-right, .tl-item, .skill-card').forEach(el => {
    observer.observe(el);
});

// NAV HIGHLIGHT
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
    });
    navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current ? 'var(--accent)' : '';
    });
});

// PARALLAX BG
window.addEventListener('scroll', () => {
    const hero = document.getElementById('hero');
    const orbs = hero.querySelectorAll('.bg-orb');
    const y = window.scrollY;
    orbs.forEach((o, i) => {
        o.style.transform = `translateY(${y * (i === 0 ? 0.3 : -0.2)}px)`;
    });
});

// GLITCH CURSOR
const cursor = document.createElement('div');
cursor.style.cssText = `position:fixed; width:8px; height:8px; background:var(--accent); border-radius:50%; pointer-events:none; z-index:99999; transform:translate(-50%,-50%); transition:transform 0.1s; box-shadow: 0 0 10px var(--accent);`;
document.body.appendChild(cursor);
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(3)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
});