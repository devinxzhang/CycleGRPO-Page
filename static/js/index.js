// Auto-playing multi-frame animation (PPT slides as frames), looping with crossfade.
document.querySelectorAll('.frame-anim').forEach(initFrameAnim);

function initFrameAnim(el) {
  const frames = Array.from(el.querySelectorAll('img'));
  if (frames.length < 2) { if (frames[0]) frames[0].classList.add('active'); return; }
  const interval = parseInt(el.dataset.interval || '1200', 10);
  let i = 0;
  frames.forEach((f, k) => f.classList.toggle('active', k === 0));
  setInterval(() => {
    frames[i].classList.remove('active');
    i = (i + 1) % frames.length;
    frames[i].classList.add('active');
  }, interval);
}

// Lightweight, dependency-free carousel: arrows + dots + mouse/touch drag + keyboard.
document.querySelectorAll('.carousel').forEach(initCarousel);

function initCarousel(root) {
  const track = root.querySelector('.carousel-track');
  const slides = Array.from(root.querySelectorAll('.carousel-slide'));
  const dotsWrap = root.querySelector('.carousel-dots');
  if (!track || slides.length === 0) return;

  let idx = 0;
  let startX = null, dragDX = 0, dragging = false;

  // build dot indicators
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'carousel-dot';
    d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    d.addEventListener('click', () => go(i));
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.children);

  function render(offset) {
    offset = offset || 0;
    track.style.transform = 'translateX(calc(' + (-idx * 100) + '% + ' + offset + 'px))';
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
  }
  function go(i) {
    idx = (i + slides.length) % slides.length;
    track.style.transition = 'transform .35s ease';
    render(0);
  }

  root.querySelector('.carousel-btn.prev').addEventListener('click', () => go(idx - 1));
  root.querySelector('.carousel-btn.next').addEventListener('click', () => go(idx + 1));

  // drag / swipe via pointer events
  track.addEventListener('pointerdown', (e) => {
    dragging = true; startX = e.clientX; dragDX = 0;
    track.style.transition = 'none';
    try { track.setPointerCapture(e.pointerId); } catch (_) {}
  });
  track.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    dragDX = e.clientX - startX;
    render(dragDX);
  });
  function endDrag() {
    if (!dragging) return;
    dragging = false;
    const threshold = root.clientWidth * 0.15;
    if (dragDX < -threshold) go(idx + 1);
    else if (dragDX > threshold) go(idx - 1);
    else go(idx);
  }
  track.addEventListener('pointerup', endDrag);
  track.addEventListener('pointercancel', endDrag);

  // keyboard (focus the carousel first; it has tabindex="0")
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(idx - 1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(idx + 1); }
  });

  render(0);
}
