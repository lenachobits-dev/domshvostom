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
  // DRAG_THRESHOLD: движение меньше порога — считаем кликом, не drag'ом
  const DRAG_THRESHOLD = 8   // px

  let pointerId   = null
  let startX      = 0
  let startScroll = 0
  let dragDelta   = 0
  let isDragging  = false

  track.addEventListener('pointerdown', (e) => {
    // Только основная кнопка мыши или тач
    if (e.button !== 0 && e.pointerType === 'mouse') return

    // Кнопку toggle НЕ перехватываем — пусть браузер обрабатывает её click
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
      track.scrollLeft = startScroll - dragDelta
    }
  }, { passive: true })

  const endDrag = (e) => {
    if (e.pointerId !== pointerId) return
    pointerId = null
    track.classList.remove('is-dragging')

    if (isDragging) {
      isDragging = false
      // Флаг: сразу после drag — следующий click-event игнорируем
      track._suppressNextClick = true
      setTimeout(() => { track._suppressNextClick = false }, 120)
    }
  }

  track.addEventListener('pointerup',     endDrag, { passive: true })
  track.addEventListener('pointercancel', endDrag, { passive: true })

  /* ═══════════════════════════════════════════════════════════
     КАРТОЧКИ: открытие/закрытие
     — toggle-кнопка: клик → открыть/закрыть карточку
     — клик по карточке (не по toggle): открыть/закрыть
     — drag НЕ открывает карточку (порог 8px)
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

  // ── Клик по toggle-кнопке ───────────────────────────────
  // Вешаем ОТДЕЛЬНЫЙ listener на каждую кнопку.
  // stopPropagation() не даёт event всплыть до card-listener,
  // иначе toggleCard вызвался бы дважды (открыл и сразу закрыл).
  cards.forEach((card) => {
    const toggleBtn = card.querySelector('.dir-card__toggle')
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        // Если после drag — тоже игнорируем
        if (track._suppressNextClick) return
        toggleCard(card)
      })
    }
  })

  // ── Клик по карточке (вне toggle-кнопки) ───────────────
  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      // Если был drag — выходим
      if (track._suppressNextClick) return
      // Клик по toggle уже обработан выше и остановлен stopPropagation
      // Сюда доходят только клики по остальной части карточки
      toggleCard(card)
    })
  })

  // ── Клик вне трека — закрываем все ─────────────────────
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#dir-track')) {
      closeAll()
    }
  })

})()
