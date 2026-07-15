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
   ═══════════════════════════════════════════════════════════ */

;(function () {
  const track   = document.getElementById('dir-track')
  const btnPrev = document.getElementById('dir-prev')
  const btnNext = document.getElementById('dir-next')

  if (!track || !btnPrev || !btnNext) return

  /* ── Утилиты ────────────────────────────────────────────── */

  // Ширина одного шага (карточка + gap)
  const getStep = () => {
    const card = track.querySelector('.dir-card')
    if (!card) return 320
    const style = getComputedStyle(track)
    const gap   = parseFloat(style.columnGap || style.gap) || 20
    return card.offsetWidth + gap
  }

  // Обновление disabled-состояния стрелок
  const updateNav = () => {
    const max = track.scrollWidth - track.clientWidth
    btnPrev.disabled = track.scrollLeft <= 1
    btnNext.disabled = track.scrollLeft >= max - 1
  }

  track.addEventListener('scroll', updateNav, { passive: true })
  // Небольшая задержка — дать DOM отрисоваться
  requestAnimationFrame(updateNav)

  /* ── Стрелки ────────────────────────────────────────────── */
  btnNext.addEventListener('click', () => {
    track.scrollBy({ left: getStep(), behavior: 'smooth' })
  })
  btnPrev.addEventListener('click', () => {
    track.scrollBy({ left: -getStep(), behavior: 'smooth' })
  })

  /* ── Drag-to-scroll ─────────────────────────────────────── */
  // Используем pointerId для надёжного захвата
  const DRAG_THRESHOLD = 6   // px — ниже порога → считаем кликом

  let pointerId   = null
  let startX      = 0
  let startScroll = 0
  let dragDelta   = 0
  let isDragging  = false

  track.addEventListener('pointerdown', (e) => {
    // Только основная кнопка мыши или тач
    if (e.button !== 0 && e.pointerType === 'mouse') return
    // Игнорируем нажатия на кнопку toggle, чтобы не мешать открытию
    if (e.target.closest('.dir-card__toggle')) return

    pointerId   = e.pointerId
    startX      = e.clientX
    startScroll = track.scrollLeft
    dragDelta   = 0
    isDragging  = false

    track.setPointerCapture(e.pointerId)
    track.classList.remove('is-dragging')
  }, { passive: true })

  track.addEventListener('pointermove', (e) => {
    if (e.pointerId !== pointerId) return

    dragDelta = e.clientX - startX

    if (!isDragging && Math.abs(dragDelta) > DRAG_THRESHOLD) {
      isDragging = true
      track.classList.add('is-dragging')
    }

    if (isDragging) {
      // Прямое присвоение scrollLeft — без momentum, без рывков
      track.scrollLeft = startScroll - dragDelta
    }
  }, { passive: true })

  const endDrag = (e) => {
    if (e.pointerId !== pointerId) return
    pointerId = null
    track.classList.remove('is-dragging')

    // Если реально тащили — не даём клику сработать
    if (isDragging) {
      isDragging = false
      // Небольшая задержка чтобы pointerup → click не сработал
      track._suppressNextClick = true
      setTimeout(() => { track._suppressNextClick = false }, 120)
    }
  }

  track.addEventListener('pointerup',     endDrag, { passive: true })
  track.addEventListener('pointercancel', endDrag, { passive: true })

  // Подавляем клик после drag
  track.addEventListener('click', (e) => {
    if (track._suppressNextClick) {
      e.stopPropagation()
      e.preventDefault()
    }
  }, true)

  /* ═══════════════════════════════════════════════════════════
     КАРТОЧКИ: открытие/закрытие по клику (+ иконка или сама карточка)
     — Hover на десктопе работает через CSS, не через JS
     — Клик/тап даёт persistent открытое состояние
     ═══════════════════════════════════════════════════════════ */

  const cards = Array.from(track.querySelectorAll('.dir-card'))

  const closeAll = () => {
    cards.forEach((c) => {
      c.classList.remove('is-open')
      const btn = c.querySelector('.dir-card__toggle')
      if (btn) {
        btn.setAttribute('aria-expanded', 'false')
        btn.setAttribute('aria-label', 'Раскрыть описание')
      }
    })
  }

  const toggleCard = (card) => {
    const isOpen = card.classList.contains('is-open')
    closeAll()
    if (!isOpen) {
      card.classList.add('is-open')
      const btn = card.querySelector('.dir-card__toggle')
      if (btn) {
        btn.setAttribute('aria-expanded', 'true')
        btn.setAttribute('aria-label', 'Закрыть описание')
      }
    }
  }

  cards.forEach((card) => {
    // Клик по всей карточке (или по кнопке toggle внутри неё)
    card.addEventListener('click', (e) => {
      // Если был drag — выходим (клик подавлен выше, но дополнительная защита)
      if (track._suppressNextClick) return
      toggleCard(card)
    })
  })

  // Клик вне трека — закрываем все
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#dir-track')) {
      closeAll()
    }
  })

})()
