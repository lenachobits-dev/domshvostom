/* ═══════════════════════════════════════════════════════════
   SCROLL RESTORATION — всегда начинаем с верха страницы
   ─────────────────────────────────────────────────────────
   Мобильные браузеры (Safari, Chrome Android) запоминают
   позицию скролла и восстанавливают её при перезагрузке.
   Отключаем это поведение и явно скроллим в 0,0.
   ═══════════════════════════════════════════════════════════ */
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
/* Сброс до top при каждой загрузке страницы */
window.scrollTo(0, 0)

/* ═══════════════════════════════════════════════════════════
   HERO VIDEO — мобильный src-swap + надёжный autoplay
   ─────────────────────────────────────────────────────────
   Стратегия:
   1. В HTML один <source> с desktop-src (дефолт)
   2. На мобиле (<= 768px) JS меняет src на mobile-файл
      и вызывает video.load() — без этого браузер не
      подхватит новый src
   3. После load() явно вызываем play() — Safari на iOS
      требует явного вызова даже при muted+autoplay
   4. Fallback на touchstart — на случай если политика
      браузера заблокировала autoplay
   ═══════════════════════════════════════════════════════════ */
;(function () {
  const video = document.getElementById('hero-video')
  const src   = document.getElementById('hero-video-src')
  if (!video || !src) return

  const isMobileViewport = window.matchMedia('(max-width: 768px)').matches

  /* Функция попытки воспроизведения с fallback */
  function tryPlay () {
    const p = video.play()
    if (p && typeof p.then === 'function') {
      p.catch(function () {
        /* Autoplay заблокирован — ждём первого касания */
        function onTouch () {
          video.play().catch(function () {})
        }
        document.addEventListener('touchstart', onTouch, { once: true })
        document.addEventListener('click',      onTouch, { once: true })
      })
    }
  }

  if (isMobileViewport) {
    /* Меняем src на мобильный файл (1.1 MB, isom/mp41, H.264 Baseline 3.0) */
    src.setAttribute('src', '/static/hero-bg-mobile.mp4')
    /* load() сбрасывает состояние и начинает загрузку нового src */
    video.load()
    /* canplaythrough — файл достаточно загружен для непрерывного воспроизведения.
       Используем addEventListener без once чтобы поймать даже если он стреляет
       повторно (Safari quirk) */
    video.addEventListener('canplaythrough', function handler () {
      video.removeEventListener('canplaythrough', handler)
      tryPlay()
    })
    /* Дополнительно: если canplaythrough не стреляет, пробуем через loadeddata */
    video.addEventListener('loadeddata', function handler () {
      video.removeEventListener('loadeddata', handler)
      tryPlay()
    })
  } else {
    /* Desktop: файл уже прописан в HTML, просто запускаем */
    tryPlay()
  }
})()

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

  /* Закрывать при клике на ссылку + smooth scroll без хэша в URL */
  nav.querySelectorAll('.site-nav__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault()
      /* Закрываем меню */
      btn.classList.remove('is-open')
      nav.classList.remove('is-open')
      btn.setAttribute('aria-expanded', 'false')
      btn.setAttribute('aria-label', 'Открыть меню')
      /* Скроллим к секции без изменения URL */
      const targetId = link.getAttribute('href').replace('#', '')
      const target = document.getElementById(targetId)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
        /* Не меняем URL — хэш не попадает в историю */
      }
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
   Desktop + Mobile: sticky + scroll progress
   На мобиле: та же 550vh высота, position: sticky — 
   пальцы активируются при скролле как на десктопе.
   ═══════════════════════════════════════════════════════════ */
;(function () {

  const block     = document.getElementById('paw-section')
  const sticky    = block && block.querySelector('.paw-sticky')
  const content   = block && block.querySelector('.paw-content')
  const progressBar = document.getElementById('paw-progress-bar')

  if (!block || !sticky || !content) return

  // Шаги: heel (0) + toe-1..toe-4 (1..4)
  const STEPS = ['heel', 'toe-1', 'toe-2', 'toe-3', 'toe-4']
  const TOTAL_STORY_STEPS = 4

  let currentStep = 0

  /* ────────────────────────────────────────────────────────
     Утилиты
  ──────────────────────────────────────────────────────── */

  const getToe  = (key) => block.querySelector(`.paw-zone[data-zone="${key}"]`)
  const getDot  = (step) => block.querySelector(`.paw-dot[data-step="${step}"]`)
  const getHeel = ()     => block.querySelector('.paw-heel')

  const setProgress = (ratio) => {
    if (progressBar) progressBar.style.width = `${Math.round(ratio * 100)}%`
  }

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
        const t = p
        setTimeout(() => t.classList.remove('is-leaving'), 320)
      } else {
        p.classList.remove('is-leaving')
        p.setAttribute('aria-hidden', 'true')
      }
    })
  }

  const updateVisuals = (step) => {
    const heel = getHeel()
    if (heel) heel.classList.toggle('is-active', step === 0)

    for (let i = 1; i <= 4; i++) {
      const toe = getToe(`toe-${i}`)
      if (!toe) continue
      toe.classList.toggle('is-active', i === step)
      toe.classList.toggle('is-done',   i < step)
    }

    for (let i = 1; i <= 4; i++) {
      const dot = getDot(i)
      if (!dot) continue
      dot.classList.toggle('is-active', i === step)
      dot.classList.toggle('is-done',   i < step)
    }
  }

  const activateStep = (step, noAnim) => {
    if (step < 0 || step > 4) return
    currentStep = step

    const key = STEPS[step]
    if (!noAnim) {
      showPanel(key)
    } else {
      const panels = content.querySelectorAll('.paw-panel')
      panels.forEach((p) => {
        const active = p.dataset.panel === key
        p.classList.toggle('is-active', active)
        if (active) p.removeAttribute('aria-hidden')
        else p.setAttribute('aria-hidden', 'true')
      })
    }

    updateVisuals(step)

    const ratio = step === 0 ? 0 : step / TOTAL_STORY_STEPS
    setProgress(ratio)

    if (step > 0) block.classList.add('story-started')
  }

  /* ────────────────────────────────────────────────────────
     Scroll-driven: работает на desktop И mobile
     Блок занимает 550vh, sticky прикрепляет на экране.
     Читаем прокрученную долю и переключаем шаги.
  ──────────────────────────────────────────────────────── */

  const handleScroll = () => {
    const rect      = block.getBoundingClientRect()
    const blockH    = block.offsetHeight
    const vpH       = window.innerHeight

    const scrolled  = -rect.top
    const scrollMax = blockH - vpH

    if (scrolled < 0 || scrollMax <= 0) {
      activateStep(0)
      return
    }

    if (scrolled >= scrollMax) {
      activateStep(4)
      return
    }

    const ratio = scrolled / scrollMax

    // heel(0..0.10) + 4 зоны по ~0.225
    let step = 0
    if      (ratio < 0.10)  step = 0
    else if (ratio < 0.325) step = 1
    else if (ratio < 0.55)  step = 2
    else if (ratio < 0.775) step = 3
    else                    step = 4

    if (step !== currentStep) activateStep(step)
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  activateStep(0, true)
  handleScroll()

  window.addEventListener('resize', () => {
    handleScroll()
  }, { passive: true })

  /* ────────────────────────────────────────────────────────
     Dot-клики — прокручиваем к нужной позиции блока
  ──────────────────────────────────────────────────────── */
  block.querySelectorAll('.paw-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      const step = parseInt(dot.dataset.step, 10)
      if (!isNaN(step)) {
        const ratio = step === 0 ? 0.05 : (step - 1) / TOTAL_STORY_STEPS + 0.15
        const blockH = block.offsetHeight
        const vpH    = window.innerHeight
        const targetY = block.offsetTop + ratio * (blockH - vpH)
        window.scrollTo({ top: targetY, behavior: 'smooth' })
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

  const imgEl      = document.getElementById('yuliana-img')
  const titleEl    = document.getElementById('yuliana-title')
  const quoteEl    = document.getElementById('yuliana-quote')
  const textBox    = document.getElementById('yuliana-text')
  const btnPrev    = document.getElementById('yuliana-prev')
  const btnNext    = document.getElementById('yuliana-next')
  const pawsEl     = slider.querySelector('.yuliana-pawprints')

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

  /* ── Генерация лапок по дуге (порт SC generateArcPaws) ──── */
  const generateArcPaws = (cx, cy, r, startAngle, endAngle, count, sizeBase = 28, sizeVar = 8) => {
    const paws = []
    for (let i = 0; i < count; i++) {
      const t = count > 1 ? i / (count - 1) : 0.5
      const angle = startAngle + (endAngle - startAngle) * t
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      const rotation = angle * (180 / Math.PI) + 90
      const size = Math.round((sizeBase + Math.sin(i * 1.5) * sizeVar) * 10) / 10
      paws.push({ left: `${x}%`, top: `${y}%`, rotation, size })
    }
    return paws
  }

  const pawConfigs = [
    generateArcPaws(78, 18, 40, -0.5 * Math.PI, 0.7 * Math.PI, 4),
    generateArcPaws(30, 95, 42,  0.6 * Math.PI, 1.6 * Math.PI, 4),
    generateArcPaws(60,  5, 35,  0,              0.9 * Math.PI, 4),
    generateArcPaws(88, 55, 42,  0.1 * Math.PI,  1.0 * Math.PI, 4),
  ]

  /* SVG лапки (порт SC PawPrint) */
  const pawSVG = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <ellipse cx="12" cy="16" rx="5.5" ry="4.2"/>
    <ellipse cx="4.8" cy="8.5" rx="2.8" ry="3.5" transform="rotate(-18,4.8,8.5)"/>
    <ellipse cx="9.8" cy="5.8" rx="2.8" ry="3.8" transform="rotate(-5,9.8,5.8)"/>
    <ellipse cx="14.2" cy="5.8" rx="2.8" ry="3.8" transform="rotate(5,14.2,5.8)"/>
    <ellipse cx="19.2" cy="8.5" rx="2.8" ry="3.5" transform="rotate(18,19.2,8.5)"/>
  </svg>`

  const renderPaws = (idx) => {
    if (!pawsEl) return
    const config = pawConfigs[idx] || []
    pawsEl.innerHTML = config.map(p =>
      `<span class="yuliana-paw" style="left:${p.left};top:${p.top};transform:rotate(${p.rotation}deg)">${pawSVG(p.size)}</span>`
    ).join('')
  }

  let current = 0
  let timer = null

  const setSlide = (i) => {
    current = (i + slides.length) % slides.length
    const s = slides[current]
    if (imgEl)   { imgEl.src = s.img; imgEl.alt = s.alt }
    if (titleEl) titleEl.textContent = s.title
    if (quoteEl) quoteEl.textContent = s.quote
    renderPaws(current)
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

  // Инициализация — рендерим лапки для первого слайда
  renderPaws(0)
  startTimer()
})()
