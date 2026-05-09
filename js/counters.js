/* ── ANIMATED COUNTERS ── */
function animateCounter(el, target, suffix, duration) {
  if (!el) return;
  let start = 0;
  const step = target / (duration / 16);
  function update() {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start).toLocaleString() + suffix;
    if (start < target) requestAnimationFrame(update);
  }
  update();
}

const statEl = document.getElementById('stat1');
if (statEl) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(document.getElementById('stat1'), 2000, '+', 1800);
        animateCounter(document.getElementById('stat2'), 5,    '+', 1200);
        animateCounter(document.getElementById('stat3'), 30,   '+', 1500);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(statEl.closest('.hero-stats') || statEl.closest('.hc-stats') || statEl);
}

/* ── BAR CHART ANIMATION (hero panel — kept for other pages) ── */
const bars    = document.querySelectorAll('.hp-bar');
const heights = [40, 60, 45, 80, 55, 90, 70, 100];
if (bars.length) {
  setInterval(() => {
    bars.forEach((bar, i) => {
      const jitter = Math.floor(Math.random() * 20) - 10;
      bar.style.height = Math.max(15, Math.min(100, heights[i] + jitter)) + '%';
    });
  }, 1800);
}

/* ── LIVE CLIENT COUNTER ── */
setInterval(() => {
  const el = document.getElementById('activeClients');
  if (el) {
    const delta = Math.floor(Math.random() * 10) - 4;
    el.textContent = (1847 + delta).toLocaleString();
  }
}, 3000);
