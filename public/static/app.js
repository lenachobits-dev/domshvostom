/* ─── Reveal on scroll ────────────────────────────────────── */
const revealItems = document.querySelectorAll('.reveal-up')

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      revealObserver.unobserve(entry.target)
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
)

revealItems.forEach((item) => revealObserver.observe(item))


/* ═══════════════════════════════════════════════════════════
   DIRECTIONS SLIDER
   — drag-to-scroll мышью
   — стрелки prev/next (scroll на ширину карточки)
   — обновление disabled-состояния стрелок
   — tap-to-reveal на touch-устройствах
   ═══════════════════════════════════════════════════════════ */

const track    = document.getElementById('dir-track')
const btnPrev  = document.getElementById('dir-prev')
const btnNext  = document.getElementById('dir-next')

if (track && btnPrev && btnNext) {

  /* ── Ширина шага прокрутки = ширина первой карточки + gap ── */
  const getStep = () => {
    const card = track.querySelector('.dir-card')
    if (!card) return 320
    const gap = parseFloat(getComputedStyle(track).gap) || 20
    return card.offsetWidth + gap
  }

  /* ── Обновление disabled-состояния стрелок ──────────────── */
  const updateNav = () => {
    const maxScroll = track.scrollWidth - track.clientWidth
    btnPrev.disabled = track.scrollLeft <= 2
    btnNext.disabled = track.scrollLeft >= maxScroll - 2
  }

  track.addEventListener('scroll', updateNav, { passive: true })
  // начальное состояние
  updateNav()

  /* ── Стрелки: плавная прокрутка ─────────────────────────── */
  btnNext.addEventListener('click', () => {
    track.scrollBy({ left: getStep(), behavior: 'smooth' })
  })

  btnPrev.addEventListener('click', () => {
    track.scrollBy({ left: -getStep(), behavior: 'smooth' })
  })

  /* ── Drag-to-scroll мышью ───────────────────────────────── */
  let isDragging  = false
  let startX      = 0
  let scrollStart = 0
  let hasDragged  = false   // отличаем drag от клика

  track.addEventListener('mousedown', (e) => {
    isDragging  = true
    hasDragged  = false
    startX      = e.pageX
    scrollStart = track.scrollLeft
    track.style.userSelect = 'none'
  })

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return
    const dx = e.pageX - startX
    if (Math.abs(dx) > 4) hasDragged = true
    track.scrollLeft = scrollStart - dx
  })

  window.addEventListener('mouseup', () => {
    isDragging = false
    track.style.userSelect = ''
  })

  /* Предотвращаем переход по ссылке / клик после drag */
  track.addEventListener('click', (e) => {
    if (hasDragged) e.stopPropagation()
  }, true)
}


/* ── Tap-to-reveal на touch-устройствах ──────────────────── */
const isTouchOnly = () =>
  window.matchMedia('(hover: none) and (pointer: coarse)').matches

const dirCards = document.querySelectorAll('.dir-card')

dirCards.forEach((card) => {
  card.addEventListener('click', () => {
    if (!isTouchOnly()) return
    const isOpen = card.classList.contains('is-open')
    dirCards.forEach((c) => c.classList.remove('is-open'))
    if (!isOpen) card.classList.add('is-open')
  })
})

document.addEventListener('click', (e) => {
  if (!isTouchOnly()) return
  if (!e.target.closest('.dir-card')) {
    dirCards.forEach((c) => c.classList.remove('is-open'))
  }
})
