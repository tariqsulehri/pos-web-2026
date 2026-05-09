/* ── HERO CAROUSEL ─────────────────────────────────────────────────────── */
(function () {
  const track    = document.getElementById('hcTrack');
  const dotsEl   = document.getElementById('hcDots');
  const prevBtn  = document.getElementById('hcPrev');
  const nextBtn  = document.getElementById('hcNext');
  const progress = document.getElementById('hcProgress');
  const carousel = document.querySelector('.hero-carousel');

  if (!track) return;

  const slides   = track.querySelectorAll('.hc-slide');
  const dots     = dotsEl ? dotsEl.querySelectorAll('.hc-dot') : [];
  const total    = slides.length;
  let current    = 0, timer;
  const INTERVAL = 5500;

  function resetProgress() {
    if (!progress) return;
    progress.classList.remove('running');
    progress.style.transition = 'none';
    progress.style.width = '0';
    void progress.offsetWidth;
    progress.style.transition = '';
    progress.classList.add('running');
  }

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + total) % total;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
    track.style.transform = `translateX(-${current * 100}%)`;
    resetProgress();
  }

  function startAuto() { timer = setInterval(() => goTo(current + 1), INTERVAL); }
  function stopAuto()  { clearInterval(timer); }

  prevBtn?.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  nextBtn?.addEventListener('click', () => { stopAuto(); goTo(current + 1); startAuto(); });
  dots.forEach(d => d.addEventListener('click', () => {
    stopAuto(); goTo(+d.dataset.slide); startAuto();
  }));

  carousel?.addEventListener('mouseenter', stopAuto);
  carousel?.addEventListener('mouseleave', startAuto);

  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 48) goTo(current + (dx < 0 ? 1 : -1));
    startAuto();
  }, { passive: true });

  document.addEventListener('keydown', e => {
    if (!carousel) return;
    if (e.key === 'ArrowLeft')  { stopAuto(); goTo(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { stopAuto(); goTo(current + 1); startAuto(); }
  });

  goTo(0);
  startAuto();
})();


/* ── TESTIMONIAL CAROUSEL ──────────────────────────────────────────────── */
(function () {
  const track  = document.getElementById('testiTrack');
  const dotsEl = document.getElementById('testiDots');
  if (!track) return;

  const items  = Array.from(track.children);
  let cur = 0, totalPages, dotEls = [], timer;

  function perPage() {
    return window.innerWidth >= 960 ? 3 : window.innerWidth >= 600 ? 2 : 1;
  }

  function build() {
    const pp   = perPage();
    const ctnW = track.parentElement?.offsetWidth || 0;
    const iW   = ctnW / pp;

    items.forEach(el => {
      el.style.flex    = `0 0 ${iW}px`;
      el.style.minWidth = `${iW}px`;
    });

    totalPages = Math.ceil(items.length / pp);
    cur        = Math.min(cur, totalPages - 1);

    if (dotsEl) {
      dotsEl.innerHTML = '';
      dotEls = [];
      for (let i = 0; i < totalPages; i++) {
        const d = document.createElement('button');
        d.className = 'hc-dot' + (i === cur ? ' active' : '');
        d.addEventListener('click', () => { clearInterval(timer); show(i); loop(); });
        dotsEl.appendChild(d);
        dotEls.push(d);
      }
    }
    show(cur);
  }

  function show(n) {
    cur = (n + totalPages) % totalPages;
    const ctnW = track.parentElement?.offsetWidth || 0;
    track.style.transform = `translateX(-${cur * ctnW}px)`;
    dotEls.forEach((d, i) => d.classList.toggle('active', i === cur));
  }

  function loop() { timer = setInterval(() => show(cur + 1), 6500); }

  document.getElementById('testiPrev')?.addEventListener('click', () => { clearInterval(timer); show(cur - 1); loop(); });
  document.getElementById('testiNext')?.addEventListener('click', () => { clearInterval(timer); show(cur + 1); loop(); });

  build();
  loop();
  window.addEventListener('resize', () => { clearInterval(timer); build(); loop(); });
})();
