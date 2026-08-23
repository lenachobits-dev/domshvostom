import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/styles/*', serveStatic({ root: './public' }))
app.use('/static/*', serveStatic({ root: './public' }))
app.use('/assets/*', serveStatic({ root: './public' }))

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Дом с Хвостом</title>
  <meta name="description" content="АНО Дом с Хвостом — центр реабилитации бездомных животных в Уфе." />
  <link rel="icon" type="image/svg+xml" href="/static/paw-logo.svg" />
  <meta property="og:image" content="/static/pc-dog-cards.jpg" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Nunito+Sans:wght@400;600&family=Nunito:wght@800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
  <link rel="stylesheet" href="/styles/colors.css" />
  <link rel="stylesheet" href="/styles/typography.css" />
  <link rel="stylesheet" href="/styles/motion.css" />
  <link rel="stylesheet" href="/styles/globals.css" />
</head>
<body>
  <main id="main-content">
    <section id="hero-section" class="hero-block reveal-up">
      <video class="hero-video"
        autoplay muted loop playsinline webkit-playsinline
        preload="auto"
        poster="/static/hero-poster.jpg"
        aria-hidden="true"
        disableRemotePlayback
        x-webkit-airplay="deny">
        <source src="/static/hero-bg-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
        <source src="/static/hero-bg.mp4" type="video/mp4" />
      </video>
      <div class="hero-overlay"></div>

      <div class="hero-content shell">
        <div class="hero-text">
          <h1>Место, где животные снова начинают доверять человеку</h1>
          <p class="lead">
            АНО «Дом с Хвостом» — центр реабилитации животных в Уфе. Мы лечим,
            восстанавливаем и даём шанс на новую жизнь тем, кто оказался в беде.
          </p>

          <div class="hero-actions">
            <button class="btn btn-accent" type="button">Помочь проекту</button>
            <button class="btn btn-secondary" type="button">Стать волонтёром</button>
          </div>
        </div>

        <ul class="hero-facts">
          <li class="hero-fact">
            <span class="hero-fact__icon"><i class="fas fa-heart"></i></span>
            <span class="hero-fact__text">Больше 5 лет реальной помощи животным</span>
          </li>
          <li class="hero-fact">
            <span class="hero-fact__icon"><i class="fas fa-home"></i></span>
            <span class="hero-fact__text">Действующий приют</span>
          </li>
          <li class="hero-fact">
            <span class="hero-fact__icon"><i class="fas fa-stethoscope"></i></span>
            <span class="hero-fact__text">Развитие ветеринарного и грумерского направления</span>
          </li>
          <li class="hero-fact">
            <span class="hero-fact__icon"><i class="fas fa-seedling"></i></span>
            <span class="hero-fact__text">Строительство нового эко-системного Центра «Территория Добрых Дел»</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Trust block: отображается только на мобиле, дублирует факты из hero -->
    <section class="trust-block" aria-label="Наши достижения">
      <ul class="trust-list shell">
        <li class="trust-item">
          <span class="trust-item__icon"><i class="fas fa-heart"></i></span>
          <span class="trust-item__text">Больше 5 лет реальной помощи животным</span>
        </li>
        <li class="trust-item">
          <span class="trust-item__icon"><i class="fas fa-home"></i></span>
          <span class="trust-item__text">Действующий приют</span>
        </li>
        <li class="trust-item">
          <span class="trust-item__icon"><i class="fas fa-stethoscope"></i></span>
          <span class="trust-item__text">Развитие ветеринарного и грумерского направления</span>
        </li>
        <li class="trust-item">
          <span class="trust-item__icon"><i class="fas fa-seedling"></i></span>
          <span class="trust-item__text">Строительство нового эко-системного Центра «Территория Добрых Дел»</span>
        </li>
      </ul>
    </section>

    <section id="about-section" class="about-block reveal-up">
      <div class="about-inner shell">

        <div class="about-text">
          <p class="about-overline">О проекте</p>
          <h2 class="about-heading">Не просто приют —<br>целая система помощи</h2>

          <div class="about-body">
            <p>«Дом с Хвостом» вырос из многолетней волонтёрской работы в системный проект помощи бездомным животным. Сегодня это не только спасение животного, но и реабилитация, социализация, ветеринарная помощь, уход, поиск дома и развитие инфраструктуры, которая позволяет помогать качественно и в долгую.</p>
            <p>Мы верим, что животному недостаточно просто выжить. Ему нужны безопасность, восстановление, забота, адаптация и шанс снова поверить человеку. Именно поэтому мы строим не временное решение, а устойчивую модель помощи.</p>
          </div>

          <p class="about-accent">Люди. Животные. Добрые дела. Каждый день.</p>
        </div>

        <div class="about-visual reveal-soft-delay">
          <figure class="about-figure">
            <img
              src="/static/about-bg.jpg"
              alt="Фотографии животных и людей на верёвке — атмосфера праздника «Дом с Хвостом»"
              class="about-img"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

      </div>
    </section>



    <section id="directions-section" class="directions-block reveal-up">
      <div class="directions-header shell">
        <div class="directions-header__text">
          <p class="directions-overline">Что мы делаем</p>
          <h2 class="directions-heading">Направления нашей работы</h2>
        </div>
        <div class="directions-nav" aria-label="Навигация по карточкам">
          <button class="dir-nav-btn dir-nav-btn--prev" id="dir-prev" aria-label="Предыдущие карточки" disabled>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="dir-nav-btn dir-nav-btn--next" id="dir-next" aria-label="Следующие карточки">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="directions-track-wrap">
        <ul class="directions-track" id="dir-track">

          <li class="dir-card">
            <div class="dir-card__media">
              <img src="/static/dir-1.jpg" alt="Волонтёр с собакой у деревянного домика"
                class="dir-card__img" loading="lazy" decoding="async"
                style="object-position: center 35%;" />
            </div>
            <div class="dir-card__overlay"></div>
            <div class="dir-card__body">
              <h3 class="dir-card__title">Помощь в трудных случаях</h3>
              <p class="dir-card__desc">Берём в работу сложные случаи, когда животному действительно нужна помощь, а у приюта есть возможность обеспечить уход, восстановление и сопровождение.</p>
            </div>
          </li>

          <li class="dir-card">
            <div class="dir-card__media">
              <img src="/static/dir-2.jpg" alt="Девушка играет с радостной собакой в саду"
                class="dir-card__img" loading="lazy" decoding="async"
                style="object-position: center 40%;" />
            </div>
            <div class="dir-card__overlay"></div>
            <div class="dir-card__body">
              <h3 class="dir-card__title">Лечение и восстановление</h3>
              <p class="dir-card__desc">Организуем ветеринарную помощь, диагностику, восстановление после травм и болезней.</p>
            </div>
          </li>

          <li class="dir-card">
            <div class="dir-card__media">
              <img src="/static/dir-3.jpg" alt="Человек с табличкой и собака на поводке"
                class="dir-card__img" loading="lazy" decoding="async"
                style="object-position: center 25%;" />
            </div>
            <div class="dir-card__overlay"></div>
            <div class="dir-card__body">
              <h3 class="dir-card__title">Уход и социализация</h3>
              <p class="dir-card__desc">Помогаем животным снова почувствовать безопасность, привыкнуть к человеку и подготовиться к жизни в семье.</p>
            </div>
          </li>

          <li class="dir-card">
            <div class="dir-card__media">
              <img src="/static/dir-4.jpg" alt="Чёрная собака даёт лапу человеку"
                class="dir-card__img" loading="lazy" decoding="async"
                style="object-position: center 30%;" />
            </div>
            <div class="dir-card__overlay"></div>
            <div class="dir-card__body">
              <h3 class="dir-card__title">Поиск дома</h3>
              <p class="dir-card__desc">Рассказываем истории наших подопечных, знакомим их с будущими хозяевами и помогаем обрести дом.</p>
            </div>
          </li>

          <li class="dir-card">
            <div class="dir-card__media">
              <img src="/static/dir-5.jpg" alt="Голова собаки рядом с рукой, держащей синий поводок"
                class="dir-card__img" loading="lazy" decoding="async"
                style="object-position: center 45%;" />
            </div>
            <div class="dir-card__overlay"></div>
            <div class="dir-card__body">
              <h3 class="dir-card__title">Развитие устойчивой системы</h3>
              <p class="dir-card__desc">Создаём инфраструктуру, которая позволит помогать не разово, а системно и качественно.</p>
            </div>
          </li>

        </ul>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         БЛОК 4 — Проект, который уже работает
         ═══════════════════════════════════════════════════════ -->
    <section id="trust-section" class="trust-numbers-block reveal-up">
      <div class="trust-numbers-bg" aria-hidden="true"></div>
      <div class="trust-numbers-overlay" aria-hidden="true"></div>
      <div class="trust-numbers-content shell">
        <p class="trust-numbers-overline">Цифры и факты</p>
        <h2 class="trust-numbers-heading">Проект, который уже работает</h2>
        <p class="trust-numbers-desc">
          АНО «Дом с Хвостом» — это не просто приют, а системная помощь животным.
          За цифрами — реальные судьбы, ежедневный труд и развитие инфраструктуры,
          которая работает каждый день.
        </p>
        <ul class="trust-numbers-stats">
          <li class="trust-numbers-stat">
            <span class="trust-numbers-stat__number">5+</span>
            <span class="trust-numbers-stat__label">лет помощи животным</span>
          </li>
          <li class="trust-numbers-stat">
            <span class="trust-numbers-stat__number">2021</span>
            <span class="trust-numbers-stat__label">официальная регистрация АНО</span>
          </li>
          <li class="trust-numbers-stat">
            <span class="trust-numbers-stat__number">80+</span>
            <span class="trust-numbers-stat__label">хвостиков проживают в приюте</span>
          </li>
          <li class="trust-numbers-stat">
            <span class="trust-numbers-stat__number">9 га</span>
            <span class="trust-numbers-stat__label">земли под развитие проекта «Территория Добрых Дел»</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         БЛОК 5 — Грантовая поддержка
         ═══════════════════════════════════════════════════════ -->
    <section id="grant-section" class="grant-block reveal-up">
      <div class="grant-inner shell">
        <p class="grant-overline">Оснащение для заботы</p>
        <h2 class="grant-heading">Грантовая поддержка</h2>
        <div class="grant-visual">
          <figure class="grant-figure">
            <img class="grant-img" src="/static/vet.jpg" alt="Ветеринарное оборудование" loading="lazy" decoding="async" />
          </figure>
        </div>
        <div class="grant-body">
          <p class="grant-desc">
            Благодаря поддержке гранта Главы Республики Башкортостан при содействии Фонда грантов проект
            получил возможность усилить свою практическую базу. Эти средства были направлены на закупку
            оборудования для ветеринарной помощи и груминга — того, что ежедневно влияет на качество
            жизни животных, скорость восстановления и уровень ухода.
          </p>
          <p class="grant-desc">
            Это не формальная поддержка на бумаге, а конкретные инструменты, которые уже работают
            на благо животных: ветеринарное оборудование, инвентарь для процедур, техника и оснащение
            для санитарно-гигиенического ухода.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         БЛОК 6 — Пространство комплексной помощи (scroll story)
         ═══════════════════════════════════════════════════════ -->
    <section id="paw-section" class="paw-block" aria-label="Пространство комплексной помощи">

      <!-- Sticky-контейнер: фиксируется пока идёт прокрутка истории -->
      <div class="paw-sticky">

        <!-- Заголовок секции -->
        <div class="paw-header shell">
          <p class="paw-overline">Наши возможности</p>
          <h2 class="paw-heading">Пространство комплексной помощи</h2>
          <p class="paw-subheading">От лечения до ухода — всё, что помогает животному восстановиться</p>
        </div>

        <!-- Основной layout: SVG лапа + контент -->
        <div class="paw-stage shell">

          <!-- SVG Лапа -->
          <div class="paw-illustration" aria-hidden="true">
            <svg class="paw-svg" viewBox="0 0 400 460" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <!-- Мягкий тёплый фильтр тени -->
                <filter id="paw-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="rgba(102,115,90,0.18)" />
                </filter>
                <filter id="paw-shadow-active" x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="8" stdDeviation="20" flood-color="rgba(181,79,69,0.28)" />
                </filter>
              </defs>

              <!-- ── ПЯТКА (heel) — центральная часть лапы ── -->
              <g class="paw-zone paw-heel" data-zone="heel">
                <ellipse cx="200" cy="320" rx="110" ry="100"
                  class="paw-shape paw-heel__shape"
                  fill="#e8e3d8" stroke="#c8c2b0" stroke-width="1.5"/>
                <!-- Текстура — мягкие засечки -->
                <ellipse cx="200" cy="340" rx="68" ry="52"
                  fill="rgba(102,115,90,0.07)" />
              </g>

              <!-- ── ПАЛЕЦ 1 (левый дальний) ── -->
              <g class="paw-zone paw-toe paw-toe--1" data-zone="toe-1" data-step="1">
                <ellipse cx="82" cy="175" rx="42" ry="52"
                  class="paw-shape"
                  fill="#e8e3d8" stroke="#c8c2b0" stroke-width="1.5"
                  transform="rotate(-18 82 175)"/>
                <ellipse cx="82" cy="175" rx="26" ry="32"
                  class="paw-toe__inner"
                  fill="rgba(102,115,90,0.07)"
                  transform="rotate(-18 82 175)"/>
              </g>

              <!-- ── ПАЛЕЦ 2 (левый ближний) ── -->
              <g class="paw-zone paw-toe paw-toe--2" data-zone="toe-2" data-step="2">
                <ellipse cx="152" cy="138" rx="42" ry="54"
                  class="paw-shape"
                  fill="#e8e3d8" stroke="#c8c2b0" stroke-width="1.5"
                  transform="rotate(-6 152 138)"/>
                <ellipse cx="152" cy="138" rx="26" ry="34"
                  class="paw-toe__inner"
                  fill="rgba(102,115,90,0.07)"
                  transform="rotate(-6 152 138)"/>
              </g>

              <!-- ── ПАЛЕЦ 3 (правый ближний) ── -->
              <g class="paw-zone paw-toe paw-toe--3" data-zone="toe-3" data-step="3">
                <ellipse cx="248" cy="138" rx="42" ry="54"
                  class="paw-shape"
                  fill="#e8e3d8" stroke="#c8c2b0" stroke-width="1.5"
                  transform="rotate(6 248 138)"/>
                <ellipse cx="248" cy="138" rx="26" ry="34"
                  class="paw-toe__inner"
                  fill="rgba(102,115,90,0.07)"
                  transform="rotate(6 248 138)"/>
              </g>

              <!-- ── ПАЛЕЦ 4 (правый дальний) ── -->
              <g class="paw-zone paw-toe paw-toe--4" data-zone="toe-4" data-step="4">
                <ellipse cx="318" cy="175" rx="42" ry="52"
                  class="paw-shape"
                  fill="#e8e3d8" stroke="#c8c2b0" stroke-width="1.5"
                  transform="rotate(18 318 175)"/>
                <ellipse cx="318" cy="175" rx="26" ry="32"
                  class="paw-toe__inner"
                  fill="rgba(102,115,90,0.07)"
                  transform="rotate(18 318 175)"/>
              </g>

              <!-- ── Декоративные линии соединения пальцев с пяткой ── -->
              <path d="M 108 220 Q 100 250 120 270" stroke="#c8c2b0" stroke-width="1" opacity="0.5" fill="none"/>
              <path d="M 168 192 Q 168 240 168 265" stroke="#c8c2b0" stroke-width="1" opacity="0.5" fill="none"/>
              <path d="M 232 192 Q 232 240 232 265" stroke="#c8c2b0" stroke-width="1" opacity="0.5" fill="none"/>
              <path d="M 292 220 Q 300 250 280 270" stroke="#c8c2b0" stroke-width="1" opacity="0.5" fill="none"/>

              <!-- ── Номера шагов на пальцах ── -->
              <text x="82" y="180" text-anchor="middle" class="paw-toe-num" font-size="14" fill="rgba(102,115,90,0.5)" font-family="Nunito, sans-serif" font-weight="800" transform="rotate(-18 82 180)">1</text>
              <text x="152" y="143" text-anchor="middle" class="paw-toe-num" font-size="14" fill="rgba(102,115,90,0.5)" font-family="Nunito, sans-serif" font-weight="800">2</text>
              <text x="248" y="143" text-anchor="middle" class="paw-toe-num" font-size="14" fill="rgba(102,115,90,0.5)" font-family="Nunito, sans-serif" font-weight="800">3</text>
              <text x="318" y="180" text-anchor="middle" class="paw-toe-num" font-size="14" fill="rgba(102,115,90,0.5)" font-family="Nunito, sans-serif" font-weight="800" transform="rotate(18 318 180)">4</text>

              <!-- ── Центральный символ на пятке ── -->
              <text x="200" y="330" text-anchor="middle" font-size="32" font-family="Nunito, sans-serif">🐾</text>
            </svg>
          </div>

          <!-- Контентная зона: пятка + 4 шага -->
          <div class="paw-content">

            <!-- Пятка — вводный текст, всегда виден -->
            <div class="paw-panel paw-panel--heel is-active" data-panel="heel">
              <div class="paw-panel__inner">
                <p class="paw-panel__overline">Комплексный подход</p>
                <h3 class="paw-panel__title">Каждое животное получает полный цикл заботы</h3>
                <p class="paw-panel__text">
                  В нашем центре мы не ограничиваемся одной помощью. Каждый подопечный проходит
                  через все этапы — от первичной диагностики до полного восстановления.
                  Прокрутите вниз, чтобы узнать о каждом направлении.
                </p>
                <!-- Индикатор прокрутки -->
                <div class="paw-scroll-hint">
                  <span>Прокрутите вниз</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Шаг 1 — Диагностика -->
            <div class="paw-panel paw-panel--step" data-panel="toe-1" data-step="1" aria-hidden="true">
              <div class="paw-panel__inner">
                <div class="paw-panel__step-badge">
                  <span class="paw-panel__step-num">01</span>
                  <span class="paw-panel__step-label">Шаг первый</span>
                </div>
                <h3 class="paw-panel__title">Диагностика и контроль состояния</h3>
                <p class="paw-panel__text">
                  Точная картина здоровья с первого дня. Весы, тонометр, пульсоксиметр,
                  микроскоп и диагностическое освещение позволяют нам не упустить ни одной
                  детали — и вовремя скорректировать лечение.
                </p>
                <ul class="paw-panel__list">
                  <li><i class="fas fa-check-circle"></i> Весы и тонометр</li>
                  <li><i class="fas fa-check-circle"></i> Пульсоксиметр</li>
                  <li><i class="fas fa-check-circle"></i> Микроскоп</li>
                  <li><i class="fas fa-check-circle"></i> Диагностическое освещение</li>
                </ul>
              </div>
            </div>

            <!-- Шаг 2 — Лечение -->
            <div class="paw-panel paw-panel--step" data-panel="toe-2" data-step="2" aria-hidden="true">
              <div class="paw-panel__inner">
                <div class="paw-panel__step-badge">
                  <span class="paw-panel__step-num">02</span>
                  <span class="paw-panel__step-label">Шаг второй</span>
                </div>
                <h3 class="paw-panel__title">Лечение и поддержка</h3>
                <p class="paw-panel__text">
                  Современное оборудование для интенсивной терапии. Инфузионный насос,
                  кислородный концентратор и камера оксигенации обеспечивают поддержку
                  жизненно важных функций даже в самых сложных случаях.
                </p>
                <ul class="paw-panel__list">
                  <li><i class="fas fa-check-circle"></i> Инфузионный насос</li>
                  <li><i class="fas fa-check-circle"></i> Кислородный концентратор</li>
                  <li><i class="fas fa-check-circle"></i> Камера оксигенации</li>
                  <li><i class="fas fa-check-circle"></i> Медицинский штатив</li>
                </ul>
              </div>
            </div>

            <!-- Шаг 3 — Процедуры -->
            <div class="paw-panel paw-panel--step" data-panel="toe-3" data-step="3" aria-hidden="true">
              <div class="paw-panel__inner">
                <div class="paw-panel__step-badge">
                  <span class="paw-panel__step-num">03</span>
                  <span class="paw-panel__step-label">Шаг третий</span>
                </div>
                <h3 class="paw-panel__title">Процедуры и клиническая работа</h3>
                <p class="paw-panel__text">
                  Профессиональное пространство для ежедневных процедур. Ветеринарный стол
                  со специальным освещением, носилки для безопасной транспортировки и
                  ультразвуковой скалер для стоматологии.
                </p>
                <ul class="paw-panel__list">
                  <li><i class="fas fa-check-circle"></i> Ветеринарный стол и светильник</li>
                  <li><i class="fas fa-check-circle"></i> Носилки</li>
                  <li><i class="fas fa-check-circle"></i> Ультразвуковой скалер</li>
                  <li><i class="fas fa-check-circle"></i> Специальный резиновый коврик</li>
                </ul>
              </div>
            </div>

            <!-- Шаг 4 — Уход -->
            <div class="paw-panel paw-panel--step" data-panel="toe-4" data-step="4" aria-hidden="true">
              <div class="paw-panel__inner">
                <div class="paw-panel__step-badge">
                  <span class="paw-panel__step-num">04</span>
                  <span class="paw-panel__step-label">Шаг четвёртый</span>
                </div>
                <h3 class="paw-panel__title">Уход и реабилитация</h3>
                <p class="paw-panel__text">
                  Полное восстановление требует комфорта и тепла. Груминг-стол, ванна,
                  фен-компрессор и матрац с подогревом создают среду, в которой животное
                  расслабляется и набирается сил.
                </p>
                <ul class="paw-panel__list">
                  <li><i class="fas fa-check-circle"></i> Груминг-стол и стул грумера</li>
                  <li><i class="fas fa-check-circle"></i> Ванна и фен-компрессор</li>
                  <li><i class="fas fa-check-circle"></i> Машинка и ножницы</li>
                  <li><i class="fas fa-check-circle"></i> Матрац с подогревом</li>
                </ul>
              </div>
            </div>

          </div><!-- /.paw-content -->
        </div><!-- /.paw-stage -->

        <!-- Индикатор прогресса — 4 точки -->
        <div class="paw-progress" aria-hidden="true">
          <div class="paw-progress__track">
            <div class="paw-progress__bar" id="paw-progress-bar"></div>
          </div>
          <div class="paw-progress__dots">
            <button class="paw-dot" data-step="1" aria-label="Шаг 1: Диагностика"></button>
            <button class="paw-dot" data-step="2" aria-label="Шаг 2: Лечение"></button>
            <button class="paw-dot" data-step="3" aria-label="Шаг 3: Процедуры"></button>
            <button class="paw-dot" data-step="4" aria-label="Шаг 4: Уход"></button>
          </div>
        </div>

      </div><!-- /.paw-sticky -->
    </section>

    <!-- ═══════════════════════════════════════════════════════
         БЛОК 7 — Территория Добрых Дел
         ═══════════════════════════════════════════════════════ -->
    <section id="territory-section" class="territory-block reveal-up">
      <div class="territory-header shell">
        <p class="territory-overline">Новый проект</p>
        <h2 class="territory-heading">Территория Добрых Дел</h2>
        <p class="territory-subheading">Первый в России самоокупаемый экосистемный центр помощи животным</p>
      </div>

      <div class="territory-grid">
        <div class="territory-row shell">
          <div class="territory-image-wrap">
            <figure class="territory-figure">
              <img src="/static/doska.jpg" alt="Доска почёта проекта Территория Добрых Дел"
                class="territory-img" loading="lazy" decoding="async" />
              <div class="territory-img-overlay"></div>
            </figure>
          </div>
          <div class="territory-text">
            <p class="territory-text-content">
              Следующий большой шаг проекта — создание нового центра «Территория Добрых Дел».
              Это пространство, где будет комфортно и животным, и людям. Пространство,
              в котором помощь строится не на выживании от сбора к сбору, а на продуманной
              системе, рассчитанной на годы вперёд.
            </p>
          </div>
        </div>

        <div class="territory-row territory-row--reverse shell">
          <div class="territory-image-wrap">
            <figure class="territory-figure">
              <img src="/static/promo.jpg" alt="Промо-изображение территории центра"
                class="territory-img" loading="lazy" decoding="async" />
              <div class="territory-img-overlay"></div>
            </figure>
          </div>
          <div class="territory-text">
            <p class="territory-text-content">
              Проект развивается на участке площадью 9 гектаров в Благовещенском районе Башкортостана.
              Центр рассчитан на 350 собак, 150 кошек и десятки диких животных и птиц. Здесь будут
              созданы условия для лечения, адаптации, социализации, проживания, реабилитации
              и безопасной жизни.
            </p>
          </div>
        </div>

        <div class="territory-row shell">
          <div class="territory-image-wrap">
            <figure class="territory-figure">
              <img src="/static/white.jpeg" alt="Архитектурный план центра Территория Добрых Дел"
                class="territory-img" loading="lazy" decoding="async" />
              <div class="territory-img-overlay"></div>
            </figure>
          </div>
          <div class="territory-text">
            <p class="territory-text-content">
              Концепция центра построена вокруг принципа «самоокупаемость + социальная миссия».
              Часть услуг будет коммерческой, а выручка направляться на уставную деятельность —
              помощь животным.
            </p>
          </div>
        </div>
      </div>

      <div class="territory-epilogue shell">
        <p class="territory-epilogue-text">
          Мы создаём место, где добро — не разовая акция, а среда. Место, где можно помогать
          системно. Место, где животные и люди возвращают друг другу доверие и смысл.
        </p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         БЛОК 8 — TerritoryIntro: тёмный parallax-блок (как в SC)
         ═══════════════════════════════════════════════════════ -->
    <section class="territory-intro-block" id="facility-section">
      <div class="territory-intro-bg" aria-hidden="true"></div>
      <div class="territory-intro-content shell">
        <h2 class="territory-intro-heading">
          Что появится на Территории Добрых Дел
        </h2>
        <p class="territory-intro-text">
          Центр будет застраиваться постепенно. На территории запланированы не
          только пространства для животных, но и инфраструктура, которая поможет
          проекту стать устойчивым и самоокупаемым.
        </p>
      </div>
    </section>

    <!-- Separator -->
    <div class="territory-intro-separator">
      <p class="territory-intro-separator-text">
        Листайте ниже, чтобы ознакомиться с проектом
      </p>
    </div>

    <!-- ═══════════════════════════════════════════════════════
         БЛОК 9 — Scroll-slideshow объектов территории
         ═══════════════════════════════════════════════════════ -->
    <section class="scroll-slideshow" id="slideshow-section" aria-label="Что появится на Территории Добрых Дел">
      <div class="scroll-slideshow-sticky">
        <div class="scroll-slideshow-slide" data-slide="0">
          <div class="scroll-slideshow-bg" style="background-image:url('/assets/vet-clinic.jpg')"></div>
          <div class="scroll-slideshow-overlay"></div>
          <div class="scroll-slideshow-content">
            <h2 class="scroll-slideshow-title">Ветеринарная клиника</h2>
            <p class="scroll-slideshow-desc">Помощь, диагностика, восстановление</p>
          </div>
        </div>
        <div class="scroll-slideshow-slide" data-slide="1">
          <div class="scroll-slideshow-bg" style="background-image:url('/assets/rehab-center.jpg')"></div>
          <div class="scroll-slideshow-overlay"></div>
          <div class="scroll-slideshow-content">
            <h2 class="scroll-slideshow-title">Реабилитация и адаптация</h2>
            <p class="scroll-slideshow-desc">Мягкое возвращение животных к жизни рядом с человеком</p>
          </div>
        </div>
        <div class="scroll-slideshow-slide" data-slide="2">
          <div class="scroll-slideshow-bg" style="background-image:url('/assets/tourist-zone.jpg')"></div>
          <div class="scroll-slideshow-overlay"></div>
          <div class="scroll-slideshow-content">
            <h2 class="scroll-slideshow-title">Туристическая зона</h2>
            <p class="scroll-slideshow-desc">Пространство для гостей, друзей и поддержки проекта</p>
          </div>
        </div>
        <div class="scroll-slideshow-slide" data-slide="3">
          <div class="scroll-slideshow-bg" style="background-image:url('/assets/dog-park.jpg')"></div>
          <div class="scroll-slideshow-overlay"></div>
          <div class="scroll-slideshow-content">
            <h2 class="scroll-slideshow-title">Большой кинологический парк</h2>
            <p class="scroll-slideshow-desc">Занятия, прогулки, социализация</p>
          </div>
        </div>
        <div class="scroll-slideshow-slide" data-slide="4">
          <div class="scroll-slideshow-bg" style="background-image:url('/assets/pharmacy-garden.png')"></div>
          <div class="scroll-slideshow-overlay"></div>
          <div class="scroll-slideshow-content">
            <h2 class="scroll-slideshow-title">Аптекарский сад</h2>
            <p class="scroll-slideshow-desc">Живая природная среда и атмосфера места</p>
          </div>
        </div>
        <div class="scroll-slideshow-slide" data-slide="5">
          <div class="scroll-slideshow-bg" style="background-image:url('/assets/memory-garden.jpg')"></div>
          <div class="scroll-slideshow-overlay"></div>
          <div class="scroll-slideshow-content">
            <h2 class="scroll-slideshow-title">Сад памяти лучшего друга</h2>
            <p class="scroll-slideshow-desc">Возможность посадить дерево в память о любимом ушедшем животном</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         БЛОК 10 — Почему нам нужна ваша помощь
         ═══════════════════════════════════════════════════════ -->
    <section id="why-help-section" class="why-help-block reveal-up">
      <div class="why-help-inner shell">
        <p class="why-help-overline">Путь к большой цели</p>
        <h2 class="why-help-heading">Почему нам нужна ваша помощь</h2>
        <div class="why-help-video">
          <div class="why-help-video-wrap">
            <iframe
              src="https://vk.com/video_ext.php?oid=-220471881&id=456239869&autoplay=0"
              class="why-help-iframe"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock"
              allowfullscreen
              loading="lazy"
              title="Видео-презентация проекта Дом с Хвостом"
            ></iframe>
          </div>
        </div>
        <div class="why-help-body">
          <p class="why-help-paragraph">
            Большие добрые проекты не появляются в один день. За каждым спасённым животным стоят
            лекарства, корм, уход, дорога, обработка, время, труд людей и инфраструктура, которая
            делает помощь возможной. Сейчас «Дом с Хвостом» находится в точке роста: уже есть
            действующий приют, есть доверие, есть опыт, есть земля и большая понятная цель.
          </p>
          <p class="why-help-paragraph">
            Но чтобы «Территория Добрых Дел» стала реальностью, нужна поддержка —
            людей, бизнеса, партнёров, волонтёров, друзей проекта и всех, кому не всё равно.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         БЛОК 11 — «Вы можете стать частью этой истории»
         Postcard collage: 5 способов помочь
         ═══════════════════════════════════════════════════════ -->
    <section id="postcard-section" class="pc-stage" aria-labelledby="pc-title">

      <!-- Doodles (декоративные SVG) -->
      <svg class="pc-doodle pc-doodle--arrow" viewBox="0 0 130 40" fill="none" aria-hidden="true">
        <path d="M4 22 Q 40 4 78 18 T 122 20" stroke="#B54F45" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M122 20 l -10 -6 M122 20 l -6 8" stroke="#B54F45" stroke-width="2.2" stroke-linecap="round"/>
      </svg>
      <svg class="pc-doodle pc-doodle--heart" viewBox="0 0 60 60" fill="none" aria-hidden="true">
        <path d="M30 52 C 8 38 4 20 16 12 C 24 7 30 14 30 18 C 30 14 36 7 44 12 C 56 20 52 38 30 52 Z" stroke="#66735A" stroke-width="2" fill="none"/>
      </svg>
      <svg class="pc-doodle pc-doodle--stars" viewBox="0 0 90 60" fill="none" aria-hidden="true">
        <path d="M12 12 l 4 8 l 8 2 l -6 6 l 2 8 l -8 -4 l -8 4 l 2 -8 l -6 -6 l 8 -2 z" stroke="#66735A" stroke-width="1.5"/>
        <path d="M60 40 l 3 6 l 6 1 l -4 5 l 1 6 l -6 -3 l -6 3 l 1 -6 l -4 -5 l 6 -1 z" stroke="#66735A" stroke-width="1.5"/>
      </svg>
      <svg class="pc-doodle pc-doodle--scribble" viewBox="0 0 140 60" fill="none" aria-hidden="true">
        <path d="M4 30 Q 20 4 40 30 T 80 30 T 120 30 T 138 30" stroke="#B54F45" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- Шапка секции -->
      <div class="pc-header shell">
        <div class="pc-header__left">
          <div class="pc-eyebrow">Как помочь · Открытка из приюта</div>
          <h2 class="pc-title" id="pc-title">
            Вы можете стать<br><span class="pc-hand">частью</span> этой истории
          </h2>
        </div>
        <div class="pc-header__right">
          <div class="pc-postmark" aria-hidden="true">
            <span>Дом с хвостом</span>
            <span>с любовью</span>
            <span>2026</span>
          </div>
          <p class="pc-lead">
            Пять простых способов быть рядом. Выберите тот, что откликается —
            <b>каждый шаг превращается в чью-то новую жизнь.</b>
          </p>
        </div>
      </div>

      <!-- Доска с карточками -->
      <div class="pc-board">

        <!-- 01 — Пожертвование -->
        <article class="pc-card pc-card--donate">
          <span class="pc-tape pc-tape--corner-tl" aria-hidden="true"></span>
          <span class="pc-sticky pc-sticky--donate" aria-hidden="true">спасибо!</span>
          <div class="pc-card__img">
            <img src="/static/pc-breloki.jpg" alt="Брелоки с логотипом Дом с хвостом" loading="lazy" decoding="async"/>
          </div>
          <div class="pc-card__meta">
            <div class="pc-card__num">01 · пожертвование</div>
            <h3 class="pc-card__title">Сделать пожертвование</h3>
            <p class="pc-card__desc">Даже небольшой регулярный вклад помогает спасать жизни и строить устойчивую систему помощи.</p>
            <span class="pc-cta">Помочь регулярно
              <span class="pc-cta__arrow" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5h7M5 1l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </span>
          </div>
        </article>

        <!-- 02 — Волонтёрство -->
        <article class="pc-card pc-card--volunteer">
          <span class="pc-tape" aria-hidden="true"></span>
          <span class="pc-sticky pc-sticky--volunteer" aria-hidden="true">приезжай к нам ♡</span>
          <div class="pc-card__img pc-card__img--square">
            <img src="/static/pc-nastya.jpg" alt="Волонтёр с белой собакой на фестивале" loading="lazy" decoding="async"/>
          </div>
          <div class="pc-card__meta">
            <div class="pc-card__num">02 · волонтёрство</div>
            <h3 class="pc-card__title">Стать волонтёром</h3>
            <p class="pc-card__desc">Приехать, помочь руками, делом, временем, участием, знаниями и теплом.</p>
            <span class="pc-cta">Записаться
              <span class="pc-cta__arrow" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5h7M5 1l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </span>
          </div>
        </article>

        <!-- 03 — Партнёрство (широкая горизонтальная) -->
        <article class="pc-card pc-card--partner">
          <span class="pc-tape pc-tape--right" aria-hidden="true"></span>
          <span class="pc-pin pc-pin--sage pc-pin--tl" aria-hidden="true"></span>
          <span class="pc-sticky pc-sticky--partner" aria-hidden="true">вместе ×</span>
          <div class="pc-card__layout">
            <div class="pc-card__img pc-card__img--wide">
              <img src="/static/pc-meksikancy.jpg" alt="Три мексиканские голые собаки рядом с подарками для приюта" loading="lazy" decoding="async"/>
            </div>
            <div class="pc-card__meta pc-card__meta--centered">
              <div class="pc-card__num">03 · партнёрство</div>
              <h3 class="pc-card__title pc-card__title--lg">Стать партнёром</h3>
              <p class="pc-card__desc">Проект открыт к сотрудничеству с бизнесом, специалистами, фондами и социально ответственными инициативами.</p>
              <span class="pc-cta">Обсудить проект
                <span class="pc-cta__arrow" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5h7M5 1l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
              </span>
            </div>
          </div>
        </article>

        <!-- Hero banner — строительство -->
        <div class="pc-hero-build">
          <span class="pc-hero-build__badge">главная миссия</span>
          <span class="pc-hero-build__kicker">и самое большое —</span>
          <h3 class="pc-hero-build__title">Поддержать строительство центра помощи</h3>
          <p class="pc-hero-build__desc">Это вклад не в одну историю, а в место, которое будет помогать животным долгие годы. Каждый рубль приближает открытие.</p>
          <div class="pc-hero-build__row">
            <a href="#" class="pc-hero-build__btn">Поддержать стройку
              <span class="pc-hero-build__btn-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none"><path d="M1 5h7M5 1l4 4-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </a>
            <div class="pc-hero-build__progress">
              Собрано <b>476 000 ₽</b> из 50 000 000 ₽
              <div class="pc-hero-build__bar"><i style="width:0.95%"></i></div>
            </div>
          </div>
        </div>

        <!-- 04 — Рассказать -->
        <article class="pc-card pc-card--share">
          <span class="pc-pin pc-pin--red pc-pin--top" aria-hidden="true"></span>
          <span class="pc-sticky pc-sticky--share" aria-hidden="true">расскажи!</span>
          <div class="pc-card__img">
            <img src="/static/pc-para.jpg" alt="Девушка держит листовку о проекте" loading="lazy" decoding="async"/>
          </div>
          <div class="pc-card__meta">
            <div class="pc-card__num">04 · рассказать</div>
            <h3 class="pc-card__title">Рассказать о проекте</h3>
            <p class="pc-card__desc">Иногда один репост, одно знакомство или одна рекомендация приводят к настоящему спасению.</p>
            <span class="pc-cta">Поделиться
              <span class="pc-cta__arrow" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5h7M5 1l4 4-4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
            </span>
          </div>
        </article>

        <!-- 05 — Строительство (маленькая) -->
        <article class="pc-card pc-card--build">
          <span class="pc-tape" aria-hidden="true"></span>
          <div class="pc-card__img pc-card__img--tall">
            <img src="/static/pc-lera.jpg" alt="Пара с чёрной собакой и табличкой истории Кайли" loading="lazy" decoding="async"/>
          </div>
          <div class="pc-card__meta">
            <div class="pc-card__num">05 · центр</div>
            <h3 class="pc-card__title">Дом, который останется</h3>
            <p class="pc-card__desc">Мы строим постоянный центр помощи — место, куда можно приехать, помочь и найти друга.</p>
          </div>
        </article>

      </div><!-- /.pc-board -->

      <!-- Подвал секции -->
      <div class="pc-foot shell">
        <span class="pc-foot__thanks">спасибо, что дочитали — это уже участие ♡</span>
      </div>

    </section>

    <!-- ═══════════════════════════════════════════════════════
         БЛОК 12 — Юлиана Гафарова — основатель
         ═══════════════════════════════════════════════════════ -->
    <section id="founder-section" class="founder-block reveal-up">
      <div class="founder-inner shell">
        <p class="founder-overline">Голос проекта</p>
        <h2 class="founder-heading">Юлиана Гафарова — основатель и руководитель проектов</h2>
        <div class="founder-visual">
          <div class="founder-collage">
            <div class="founder-collage__item founder-collage__item--a">
              <img src="/static/founder-stage.jpg" alt="Юлиана Гафарова на сцене" loading="lazy" decoding="async" />
            </div>
            <div class="founder-collage__item founder-collage__item--b">
              <img src="/static/founder-tenderness.jpg" alt="Юлиана Гафарова с животным" loading="lazy" decoding="async" />
            </div>
            <div class="founder-collage__item founder-collage__item--c">
              <img src="/static/founder-smile.jpg" alt="Юлиана Гафарова улыбается" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
        <div class="founder-body">
          <p class="founder-paragraph">
            Юлиана Гафарова — основатель «Дома с Хвостом» и автор проекта «Территория Добрых Дел».
          </p>
          <p class="founder-paragraph">
            По образованию дизайнер и юрист, уже шесть лет шаг за шагом Юлиана развивает систему
            помощи животным: от ежедневной практической работы в приюте до проектирования будущего
            центра, расчётов, смет и грантовой поддержки.
          </p>
          <p class="founder-paragraph">
            В основе её подхода — открытость, доверие, ответственность и желание строить помощь
            не на эмоции одного дня, а на прочной долгосрочной системе.
          </p>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════════════
         БЛОК 13 — Юлиана — о проекте и своём пути (slider)
         ═══════════════════════════════════════════════════════ -->
    <section id="yuliana-section" class="yuliana-block">
      <div class="yuliana-inner shell">
        <p class="yuliana-overline">О смыслах</p>
        <h2 class="yuliana-heading">Юлиана — о проекте и своём пути</h2>
        <div class="yuliana-slider" id="yuliana-slider">
          <div class="yuliana-slider__visual">
            <figure class="yuliana-slider__figure">
              <img id="yuliana-img" src="/assets/vtroem.jpg" alt="Юлиана с командой"
                class="yuliana-slider__img" loading="lazy" decoding="async" />
            </figure>
            <nav class="yuliana-slider__nav">
              <button class="yuliana-slider__btn" id="yuliana-prev" aria-label="Предыдущий слайд" type="button">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="yuliana-slider__btn" id="yuliana-next" aria-label="Следующий слайд" type="button">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </nav>
          </div>
          <div class="yuliana-slider__text" id="yuliana-text">
            <div class="yuliana-pawprints" aria-hidden="true"></div>
            <h3 class="yuliana-slider__title" id="yuliana-title">Об открытости проекта</h3>
            <p class="yuliana-slider__quote" id="yuliana-quote">
              Мой принцип — абсолютная открытость, доверие и сопричастность. Каждый, кто нас поддерживает,
              не «жертвует деньги» — он инвестирует в результат, который можно увидеть, потрогать и ощутить.
              Возможность приехать в любой момент и проверить. Доверие и репутация — мой главный
              и самый дорогой актив.
            </p>
          </div>
        </div>
      </div>
    </section>

  </main>

  <!-- ═══════════════ SITE FOOTER ═══════════════ -->
  <footer class="site-footer" id="contacts">
    <div class="footer-inner">

      <!-- LEFT: title + lead + portrait -->
      <div class="footer-lead">
        <div class="ft-eyebrow">Контакты</div>
        <h2 class="ft-title">
          Давайте <span class="ft-hand">знакомиться</span>
        </h2>
        <p class="ft-lead">
          Мы открыты для помощи, сотрудничества, волонтёрства и добрых знакомств.
          Напишите — ответим тепло и по-человечески.
        </p>

        <div class="footer-portrait" aria-hidden="true">
          <span class="fp-tape"></span>
          <div class="fp-img">
            <img src="/static/pc-dog-cards.jpg" alt="Собака из приюта улыбается" loading="lazy" decoding="async"/>
          </div>
          <span class="fp-cap">будем рады ♡</span>
        </div>
      </div>

      <!-- RIGHT: socials + contacts -->
      <div class="footer-socials">
        <span class="ft-kicker">пишите нам —</span>
        <h3 class="ft-socials-title">Мы всегда на связи в социальных сетях</h3>

        <div class="ft-socials-grid">

          <a class="ft-social" href="https://t.me/dom_s_hvostom" target="_blank" rel="noopener noreferrer" aria-label="Telegram Дом с хвостом">
            <span class="ft-social__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M21.5 3.5 2.8 10.9c-.9.35-.87 1.63.05 1.94l4.55 1.53 1.75 5.4c.24.75 1.18.98 1.74.43l2.55-2.51 4.7 3.45c.72.53 1.75.14 1.94-.72l3.15-14.4c.22-1-.75-1.85-1.7-1.52Z" fill="currentColor"/>
                <path d="m17.9 7.2-9.1 5.7c-.4.25-.4.36.02.49l2.34.74 6.94-4.35c.28-.18.55.05.32.24l-5.62 5.08 2.8 2.1c.25.19.44.09.5-.22l1.72-9.42c.09-.4-.18-.6-.52-.36Z" fill="#FBF5EA" opacity=".9"/>
              </svg>
            </span>
            <span class="ft-social__txt">
              <span class="ft-social__label">Telegram</span>
              <span class="ft-social__hint">канал и связь с командой</span>
            </span>
            <span class="ft-social__arrow" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </a>

          <a class="ft-social" href="https://vk.com/dom_s_hvostom" target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте Дом с хвостом">
            <span class="ft-social__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12.9 17.2c-6.05 0-9.5-4.15-9.65-11.05h3.05c.1 5.05 2.35 7.2 4.1 7.65V6.15h2.9v4.45c1.75-.2 3.55-2.15 4.15-4.45h2.9c-.45 2.85-2.4 4.8-3.8 5.6 1.4.65 3.6 2.35 4.45 5.45h-3.2c-.65-2.05-2.3-3.65-4.5-3.9v3.9h-.4Z" fill="currentColor"/>
              </svg>
            </span>
            <span class="ft-social__txt">
              <span class="ft-social__label">ВКонтакте</span>
              <span class="ft-social__hint">истории спасений и жизнь приюта</span>
            </span>
            <span class="ft-social__arrow" aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </a>

        </div>

        <!-- Прямые контакты -->
        <div class="ft-direct">
          <span class="ft-direct__kicker">или напрямую —</span>
          <ul class="ft-direct__list">
            <li class="ft-direct__item">
              <span class="ft-direct__ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" stroke-width="1.8"/>
                  <path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="ft-direct__txt">
                <span class="ft-direct__label">Написать на почту</span>
                <a class="ft-direct__value" href="mailto:hello@dom-s-hvostom.ru">hello@dom-s-hvostom.ru</a>
              </span>
            </li>
            <li class="ft-direct__item">
              <span class="ft-direct__ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M5.5 4.5c.6-.4 1.35-.5 1.9.15l2 2.35c.55.65.35 1.55-.3 2.05l-1.15.9c.8 2.2 2.5 3.9 4.7 4.7l.9-1.15c.5-.65 1.4-.85 2.05-.3l2.35 2c.65.55.55 1.3.15 1.9-.9 1.35-2.7 2.1-4.55 1.85-4.5-.6-8.05-4.15-8.65-8.65-.25-1.85.5-3.65 1.85-4.55Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="ft-direct__txt">
                <span class="ft-direct__label">Позвонить</span>
                <a class="ft-direct__value" href="tel:+79000000000">+7 (900) 000-00-00</a>
              </span>
            </li>
            <li class="ft-direct__item">
              <span class="ft-direct__ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 21s7-6.35 7-11.5C19 5.7 15.87 3 12 3S5 5.7 5 9.5C5 14.65 12 21 12 21Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                  <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" stroke-width="1.8"/>
                </svg>
              </span>
              <span class="ft-direct__txt">
                <span class="ft-direct__label">Приехать в гости</span>
                <span class="ft-direct__value">п. Лекаревка · по договорённости — напишите заранее</span>
              </span>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Bottom bar -->
    <div class="ft-bottom">
      <div class="ft-bottom__brand">
        <span class="ft-bottom__paw" aria-hidden="true">
          <img src="/static/paw-logo.svg" alt="" width="28" height="28"/>
        </span>
        Дом с хвостом
      </div>
      <div>© 2026 · сделано с теплом для тех, у кого хвост</div>
    </div>
  </footer>

  <script src="/static/app.js" defer></script>
</body>
</html>`)
})

export default app
