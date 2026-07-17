import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/styles/*', serveStatic({ root: './public' }))
app.use('/static/*', serveStatic({ root: './public' }))

app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Дом с Хвостом</title>
  <meta name="description" content="АНО Дом с Хвостом — центр реабилитации бездомных животных в Уфе." />
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
         БЛОК 4 — Пространство комплексной помощи (scroll story)
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
  </main>

  <script src="/static/app.js" defer></script>
</body>
</html>`)
})

export default app
