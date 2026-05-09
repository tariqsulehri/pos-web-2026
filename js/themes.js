/* ── THEME SWITCHER ─────────────────────────────────────────────────────── */
(function () {
  const html   = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const panel  = document.getElementById('themePanel');
  const opts   = document.querySelectorAll('.theme-opt');

  const ICONS = { dark: '◑', light: '◌', midnight: '●', aurora: '◈' };
  const saved = localStorage.getItem('pos-theme') || 'dark';

  setTheme(saved);

  toggle?.addEventListener('click', e => {
    e.stopPropagation();
    panel?.classList.toggle('open');
  });

  document.addEventListener('click', () => panel?.classList.remove('open'));
  panel?.addEventListener('click', e => e.stopPropagation());

  opts.forEach(opt => opt.addEventListener('click', () => {
    setTheme(opt.dataset.theme);
    panel?.classList.remove('open');
  }));

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('pos-theme', theme);
    opts.forEach(o => o.classList.toggle('active', o.dataset.theme === theme));
    if (toggle) {
      const icon = toggle.querySelector('.theme-icon');
      if (icon) icon.textContent = ICONS[theme] ?? '◑';
    }
  }
})();
