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


/* ═══════════════════════════════════════════════════════════
   PAW STORY — Scroll-driven storytelling (блок 4)
   Desktop: sticky + IntersectionObserver + scroll progress
   Mobile:  tap-to-advance с кнопками
   ═══════════════════════════════════════════════════════════ */
;(function () {

  const block     = document.getElementById('paw-section')
  const sticky    = block && block.querySelector('.paw-sticky')
  const content   = block && block.querySelector('.paw-content')
  const progressBar = document.getElementById('paw-progress-bar')

  if (!block || !sticky || !content) return

  // Шаги: heel (0) + toe-1..toe-4 (1..4)
  const STEPS = ['heel', 'toe-1', 'toe-2', 'toe-3', 'toe-4']
  const TOTAL_STORY_STEPS = 4  // только toe-1..4

  let currentStep = 0  // 0 = heel

  /* ────────────────────────────────────────────────────────
     Утилиты
  ──────────────────────────────────────────────────────── */

  const getPanel  = (key) => content.querySelector(`[data-panel="${key}"]`)
  const getToe    = (key) => block.querySelector(`.paw-zone[data-zone="${key}"]`)
  const getDot    = (step) => block.querySelector(`.paw-dot[data-step="${step}"]`)
  const getHeel   = ()    => block.querySelector('.paw-heel')

  // Обновить прогресс-бар (0..1)
  const setProgress = (ratio) => {
    if (progressBar) progressBar.style.width = `${Math.round(ratio * 100)}%`
  }

  // Переключить видимую панель
  const showPanel = (key) => {
    const panels = content.querySelectorAll('.paw-panel')
    panels.forEach((p) => {
      if (p.dataset.panel === key) {
        p.classList.add('is-active')
        p.removeAttribute('aria-hidden')
        p.classList.remove('is-leaving')
      } else if (p.classList.contains('is-active')) {
        p.classList.add('is-leaving')
        p.classList.remove('is-active')
        p.setAttribute('aria-hidden', 'true')
        // Убираем is-leaving после анимации
        const t = p
        setTimeout(() => t.classList.remove('is-leaving'), 320)
      } else {
        p.classList.remove('is-leaving')
        p.setAttribute('aria-hidden', 'true')
      }
    })
  }

  // Обновить состояние SVG + точки для шага
  const updateVisuals = (step) => {
    // Heel — активна только при step === 0
    const heel = getHeel()
    if (heel) heel.classList.toggle('is-active', step === 0)

    // Пальцы 1..4
    for (let i = 1; i <= 4; i++) {
      const toe = getToe(`toe-${i}`)
      if (!toe) continue
      toe.classList.toggle('is-active', i === step)
      toe.classList.toggle('is-done',   i < step)
    }

    // Точки прогресса
    for (let i = 1; i <= 4; i++) {
      const dot = getDot(i)
      if (!dot) continue
      dot.classList.toggle('is-active', i === step)
      dot.classList.toggle('is-done',   i < step)
    }
  }

  // Активировать шаг (0..4)
  const activateStep = (step, noAnim) => {
    if (step < 0 || step > 4) return
    currentStep = step

    const key = STEPS[step]
    if (!noAnim) {
      showPanel(key)
    } else {
      // Без анимации (мобиль init)
      const panels = content.querySelectorAll('.paw-panel')
      panels.forEach((p) => {
        const active = p.dataset.panel === key
        p.classList.toggle('is-active', active)
        if (active) p.removeAttribute('aria-hidden')
        else p.setAttribute('aria-hidden', 'true')
      })
    }

    updateVisuals(step)

    // Прогресс: 0 на heel, 1/4..4/4 на шагах
    const ratio = step === 0 ? 0 : step / TOTAL_STORY_STEPS
    setProgress(ratio)

    // Флаг "история началась" — скрываем scroll-hint
    if (step > 0) block.classList.add('story-started')

    // Обновить мобильные кнопки
    updateMobileNav(step)
  }

  /* ────────────────────────────────────────────────────────
     DESKTOP: Sticky scroll progress
     Читаем прокрученную долю внутри .paw-block и
     переключаем шаги пропорционально.
  ──────────────────────────────────────────────────────── */

  const isMobile = () => window.innerWidth <= 768

  const handleScroll = () => {
    if (isMobile()) return

    const rect      = block.getBoundingClientRect()
    const blockH    = block.offsetHeight
    const vpH       = window.innerHeight

    // scrolled: сколько проскроллено внутри блока (0..blockH-vpH)
    const scrolled  = -rect.top
    const scrollMax = blockH - vpH

    if (scrolled < 0 || scrollMax <= 0) {
      // Ещё не дошли до блока
      activateStep(0)
      return
    }

    if (scrolled >= scrollMax) {
      // Прошли весь блок — все шаги done
      activateStep(4)
      return
    }

    // ratio: 0 → 1 по всему диапазону блока
    const ratio = scrolled / scrollMax

    // Разбиваем на 5 зон: heel(0..0.10) + 4 × 0.225 = 0.90
    let step = 0
    if      (ratio < 0.10) step = 0
    else if (ratio < 0.325) step = 1
    else if (ratio < 0.55)  step = 2
    else if (ratio < 0.775) step = 3
    else                    step = 4

    if (step !== currentStep) activateStep(step)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  // Инициализация при загрузке
  handleScroll()

  /* ────────────────────────────────────────────────────────
     MOBILE: tap-to-advance
  ──────────────────────────────────────────────────────── */

  // Добавляем DOM-элементы мобильной навигации динамически
  // (чтобы не загрязнять десктоп DOM)
  const injectMobileNav = () => {
    if (block.querySelector('.paw-mobile-nav')) return  // уже есть

    const nav = document.createElement('div')
    nav.className = 'paw-mobile-nav'
    nav.innerHTML = `
      <button class="paw-mobile-btn paw-mobile-btn--prev" aria-label="Предыдущий шаг" disabled>
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <span class="paw-mobile-counter">0 / 4</span>
      <button class="paw-mobile-btn paw-mobile-btn--next" aria-label="Следующий шаг">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="1.8"
            stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    `

    // Вставляем после .paw-content
    const stage = block.querySelector('.paw-stage')
    if (stage) stage.appendChild(nav)

    nav.querySelector('.paw-mobile-btn--prev').addEventListener('click', () => {
      if (currentStep > 0) activateStep(currentStep - 1)
    })
    nav.querySelector('.paw-mobile-btn--next').addEventListener('click', () => {
      if (currentStep < 4) activateStep(currentStep + 1)
    })
  }

  const updateMobileNav = (step) => {
    const btnPrev    = block.querySelector('.paw-mobile-btn--prev')
    const btnNext    = block.querySelector('.paw-mobile-btn--next')
    const counter    = block.querySelector('.paw-mobile-counter')
    if (!btnPrev) return

    btnPrev.disabled = step === 0
    btnNext.disabled = step === 4
    if (counter) counter.textContent = `${step === 0 ? 0 : step} / 4`
  }

  // Инициализация с учётом мобиля
  const init = () => {
    if (isMobile()) {
      injectMobileNav()
      activateStep(0, true)
    } else {
      activateStep(0, true)
    }
  }

  init()

  // Переинициализация при resize (desktop↔mobile)
  let lastMobile = isMobile()
  window.addEventListener('resize', () => {
    const nowMobile = isMobile()
    if (nowMobile !== lastMobile) {
      lastMobile = nowMobile
      if (nowMobile) injectMobileNav()
      activateStep(currentStep, true)
    }
    if (!nowMobile) handleScroll()
  }, { passive: true })

  /* ────────────────────────────────────────────────────────
     Dot-клики (desktop + mobile)
  ──────────────────────────────────────────────────────── */
  block.querySelectorAll('.paw-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      const step = parseInt(dot.dataset.step, 10)
      if (!isNaN(step)) {
        activateStep(step)

        // На десктопе: скроллим к соответствующей позиции блока
        if (!isMobile()) {
          const ratio = step === 0 ? 0.05 : (step - 1) / TOTAL_STORY_STEPS + 0.15
          const blockH = block.offsetHeight
          const vpH    = window.innerHeight
          const targetY = block.offsetTop + ratio * (blockH - vpH)
          window.scrollTo({ top: targetY, behavior: 'smooth' })
        }
      }
    })
  })

})()
