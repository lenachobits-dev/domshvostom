/* ═══════════════════════════════════════════════════════════
   SITE HEADER — бургер-меню + активный пункт навигации
   ═══════════════════════════════════════════════════════════ */
;(function () {
  const btn   = document.getElementById('menu-btn')
  const nav   = document.getElementById('site-nav')
  if (!btn || !nav) return

  const NAV_ITEMS = [
    { href: '#about-section' },
    { href: '#directions-section' },
    { href: '#grant-section' },
    { href: '#territory-section' },
    { href: '#postcard-section' },
    { href: '#founder-section' },
    { href: '#acquainted-section' },
  ]

  /* --- Toggle меню --- */
  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('is-open')
    nav.classList.toggle('is-open', isOpen)
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
    btn.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню')
  })

  /* Закрывать при клике на ссылку */
  nav.querySelectorAll('.site-nav__link').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('is-open')
      nav.classList.remove('is-open')
      btn.setAttribute('aria-expanded', 'false')
      btn.setAttribute('aria-label', 'Открыть меню')
    })
  })

  /* Закрывать при клике вне шапки */
  document.addEventListener('click', (e) => {
    const header = document.getElementById('site-header')
    if (header && !header.contains(e.target)) {
      btn.classList.remove('is-open')
      nav.classList.remove('is-open')
      btn.setAttribute('aria-expanded', 'false')
      btn.setAttribute('aria-label', 'Открыть меню')
    }
  })

  /* --- Активный пункт по скроллу --- */
  const links = Array.from(nav.querySelectorAll('.site-nav__link'))

  const updateActive = () => {
    const probe = window.innerHeight / 3
    let current = ''
    NAV_ITEMS.forEach(item => {
      const el = document.querySelector(item.href)
      if (!el) return
      if (el.getBoundingClientRect().top <= probe) current = item.href
    })
    links.forEach(link => {
      link.classList.toggle('is-active', link.getAttribute('href') === current)
    })
  }

  let ticking = false
  window.addEventListener('scroll', () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => { updateActive(); ticking = false })
  }, { passive: true })
  window.addEventListener('resize', updateActive)
  updateActive()
})()

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

  // Обновить состояние кнопок мобильной навигации
  const updateMobileNav = (step) => {
    const btnPrev = block.querySelector('.paw-mobile-btn--prev')
    const btnNext = block.querySelector('.paw-mobile-btn--next')
    const counter = block.querySelector('.paw-mobile-counter')
    if (!btnPrev) return
    btnPrev.disabled = step === 0
    btnNext.disabled = step === 4
    if (counter) counter.textContent = `${step === 0 ? 0 : step} / 4`
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

/* ═══════════════════════════════════════════════════════════
   SCROLL SLIDESHOW — блок 9
   ═══════════════════════════════════════════════════════════ */
;(function () {
  const wrapper = document.querySelector('.scroll-slideshow')
  if (!wrapper) return

  const slides = Array.from(wrapper.querySelectorAll('.scroll-slideshow-slide'))
  if (!slides.length) return

  // Показываем первый слайд сразу
  slides[0].style.opacity = '1'

  const handleScroll = () => {
    const rect = wrapper.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const totalScroll = rect.height - windowHeight
    if (totalScroll <= 0) return

    const p = Math.max(0, Math.min(1, -rect.top / totalScroll))
    const exactIndex = p * (slides.length - 1)
    const ci = Math.min(Math.floor(exactIndex), slides.length - 1)
    const ni = Math.min(ci + 1, slides.length - 1)
    const blend = exactIndex - ci

    slides.forEach((slide, i) => {
      if (i === ci) {
        slide.style.opacity = '1'
        slide.style.clipPath = ''
        slide.style.zIndex = '1'
      } else if (i === ni && ci !== ni) {
        slide.style.opacity = '1'
        const hidden = (1 - blend) * 100
        slide.style.clipPath = `inset(${hidden}% 0 0 0)`
        slide.style.zIndex = '2'
      } else {
        slide.style.opacity = '0'
        slide.style.clipPath = ''
        slide.style.zIndex = '0'
      }
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})()

/* ═══════════════════════════════════════════════════════════
   FACILITY CARDS — reveal on scroll (блок 8)
   ═══════════════════════════════════════════════════════════ */
;(function () {
  const cards = document.querySelectorAll('.editorial-card')
  if (!cards.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const card = entry.target
        const i = Number(card.dataset.index) || 0
        card.style.setProperty('--reveal-delay', `${i * 100}ms`)
        card.classList.add('is-visible')
        observer.unobserve(card)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )

  cards.forEach((card) => observer.observe(card))
})()

/* ═══════════════════════════════════════════════════════════
   YULIANA SLIDER — блок 13
   ═══════════════════════════════════════════════════════════ */
;(function () {
  const slider = document.getElementById('yuliana-slider')
  if (!slider) return

  const imgEl   = document.getElementById('yuliana-img')
  const titleEl = document.getElementById('yuliana-title')
  const quoteEl = document.getElementById('yuliana-quote')
  const textBox = document.getElementById('yuliana-text')
  const btnPrev = document.getElementById('yuliana-prev')
  const btnNext = document.getElementById('yuliana-next')

  const slides = [
    {
      img: '/assets/vtroem.jpg',
      alt: 'Юлиана с командой',
      title: 'Об открытости проекта',
      quote: 'Мой принцип — абсолютная открытость, доверие и сопричастность. Каждый, кто нас поддерживает, не «жертвует деньги» — он инвестирует в результат, который можно увидеть, потрогать и ощутить. Возможность приехать в любой момент и проверить. Доверие и репутация — мой главный и самый дорогой актив.',
    },
    {
      img: '/assets/lapka.jpg',
      alt: 'Лапка собаки',
      title: 'О своём месте',
      quote: 'Моё место — быть «мостиком». Между отчаянием и надеждой. Между человеком, который хочет выбросить собаку, и собакой, которая хочет жить. Когда я нашла это место во «вселенском механизме», ушла суета. Я перестала метаться. Я перестала бояться, что у меня не получится.',
    },
    {
      img: '/assets/obiyatiya.jpeg',
      alt: 'Объятия с собакой',
      title: 'О выборе',
      quote: 'Я не люблю слово «жертва». Оно пахнет несчастьем и жалостью. Я не жертвовала — я выбирала. Каждый раз осознанно, с открытыми глазами.',
    },
    {
      img: '/assets/siluet.jpg',
      alt: 'Силуэт на закате',
      title: 'О главных учителях',
      quote: 'Нас с детства учат люди. Родители — как правильно. Учителя — как думать. Книги — как жить. Но мои главные учителя оказались с хвостами. И говорят они глазами. Иногда — молчанием. Иногда — внезапным тёплым носом, уткнувшимся в ладонь в тот момент, когда ты готов развалиться.',
    },
  ]

  let current = 0
  let timer = null

  const setSlide = (i) => {
    current = (i + slides.length) % slides.length
    const s = slides[current]
    if (imgEl)   { imgEl.src = s.img; imgEl.alt = s.alt }
    if (titleEl) titleEl.textContent = s.title
    if (quoteEl) quoteEl.textContent = s.quote
    // Перезапуск анимации
    if (textBox) {
      textBox.style.animation = 'none'
      textBox.offsetHeight // reflow
      textBox.style.animation = ''
    }
  }

  const startTimer = () => {
    clearInterval(timer)
    timer = setInterval(() => setSlide(current + 1), 6000)
  }

  if (btnPrev) btnPrev.addEventListener('click', () => { setSlide(current - 1); startTimer() })
  if (btnNext) btnNext.addEventListener('click', () => { setSlide(current + 1); startTimer() })

  startTimer()
})()
