/* Progressive enhancement. All content and details work without JavaScript. */
(() => {
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if (!('IntersectionObserver' in window)) return;
  const visible = new Map();
  const setCurrent = id => links.forEach(link => {
    if (link.getAttribute('href') === '#' + id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => visible.set(entry.target.id, entry.isIntersecting));
    const active = sections.find(section => visible.get(section.id));
    setCurrent(active ? active.id : '');
  }, { rootMargin: '-18% 0px -48% 0px', threshold: 0 });
  sections.forEach(section => observer.observe(section));
})();
