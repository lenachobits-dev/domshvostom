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
  {
    threshold: 0.12,
    rootMargin: '0px 0px -8% 0px'
  }
)

revealItems.forEach((item) => revealObserver.observe(item))


/* ─── Direction cards: tap-to-reveal on touch devices ───────
   На десктопе работает CSS :hover.
   На touch-устройствах тап переключает класс .is-open.
   Тап вне карточки закрывает все открытые карточки.
───────────────────────────────────────────────────────────── */
const isTouchDevice = () =>
  window.matchMedia('(hover: none) and (pointer: coarse)').matches

const dirCards = document.querySelectorAll('.dir-card')

dirCards.forEach((card) => {
  card.addEventListener('click', (e) => {
    if (!isTouchDevice()) return

    const isAlreadyOpen = card.classList.contains('is-open')

    // Закрываем все карточки
    dirCards.forEach((c) => c.classList.remove('is-open'))

    // Открываем текущую, если была закрыта
    if (!isAlreadyOpen) {
      card.classList.add('is-open')
    }
  })
})

// Тап вне карточек — закрываем все
document.addEventListener('click', (e) => {
  if (!isTouchDevice()) return
  if (!e.target.closest('.dir-card')) {
    dirCards.forEach((c) => c.classList.remove('is-open'))
  }
})
