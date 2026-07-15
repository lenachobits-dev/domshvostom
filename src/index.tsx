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
      <video class="hero-video" autoplay muted loop playsinline preload="auto" aria-hidden="true">
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
            <button class="dir-card__toggle" aria-label="Раскрыть описание" aria-expanded="false">
              <span class="dir-card__toggle-icon" aria-hidden="true"></span>
            </button>
            <div class="dir-card__media">
              <img src="/static/dir-1.jpg" alt="Волонтёр с собакой у деревянного домика"
                class="dir-card__img" loading="lazy" decoding="async"
                style="object-position: center 35%;" />
            </div>
            <div class="dir-card__overlay"></div>
            <div class="dir-card__body">
              <p class="dir-card__desc">Берём в работу сложные случаи, когда животному действительно нужна помощь, а у приюта есть возможность обеспечить уход, восстановление и сопровождение.</p>
              <h3 class="dir-card__title">Помощь в трудных случаях</h3>
            </div>
          </li>

          <li class="dir-card">
            <button class="dir-card__toggle" aria-label="Раскрыть описание" aria-expanded="false">
              <span class="dir-card__toggle-icon" aria-hidden="true"></span>
            </button>
            <div class="dir-card__media">
              <img src="/static/dir-2.jpg" alt="Девушка играет с радостной собакой в саду"
                class="dir-card__img" loading="lazy" decoding="async"
                style="object-position: center 40%;" />
            </div>
            <div class="dir-card__overlay"></div>
            <div class="dir-card__body">
              <p class="dir-card__desc">Организуем ветеринарную помощь, диагностику, восстановление после травм и болезней.</p>
              <h3 class="dir-card__title">Лечение и восстановление</h3>
            </div>
          </li>

          <li class="dir-card">
            <button class="dir-card__toggle" aria-label="Раскрыть описание" aria-expanded="false">
              <span class="dir-card__toggle-icon" aria-hidden="true"></span>
            </button>
            <div class="dir-card__media">
              <img src="/static/dir-3.jpg" alt="Человек с табличкой и собака на поводке"
                class="dir-card__img" loading="lazy" decoding="async"
                style="object-position: center 25%;" />
            </div>
            <div class="dir-card__overlay"></div>
            <div class="dir-card__body">
              <p class="dir-card__desc">Помогаем животным снова почувствовать безопасность, привыкнуть к человеку и подготовиться к жизни в семье.</p>
              <h3 class="dir-card__title">Уход и социализация</h3>
            </div>
          </li>

          <li class="dir-card">
            <button class="dir-card__toggle" aria-label="Раскрыть описание" aria-expanded="false">
              <span class="dir-card__toggle-icon" aria-hidden="true"></span>
            </button>
            <div class="dir-card__media">
              <img src="/static/dir-4.jpg" alt="Чёрная собака даёт лапу человеку"
                class="dir-card__img" loading="lazy" decoding="async"
                style="object-position: center 30%;" />
            </div>
            <div class="dir-card__overlay"></div>
            <div class="dir-card__body">
              <p class="dir-card__desc">Рассказываем истории наших подопечных, знакомим их с будущими хозяевами и помогаем обрести дом.</p>
              <h3 class="dir-card__title">Поиск дома</h3>
            </div>
          </li>

          <li class="dir-card">
            <button class="dir-card__toggle" aria-label="Раскрыть описание" aria-expanded="false">
              <span class="dir-card__toggle-icon" aria-hidden="true"></span>
            </button>
            <div class="dir-card__media">
              <img src="/static/dir-5.jpg" alt="Голова собаки рядом с рукой, держащей синий поводок"
                class="dir-card__img" loading="lazy" decoding="async"
                style="object-position: center 45%;" />
            </div>
            <div class="dir-card__overlay"></div>
            <div class="dir-card__body">
              <p class="dir-card__desc">Создаём инфраструктуру, которая позволит помогать не разово, а системно и качественно.</p>
              <h3 class="dir-card__title">Развитие устойчивой системы</h3>
            </div>
          </li>

        </ul>
      </div>
    </section>
  </main>

  <script src="/static/app.js" defer></script>
</body>
</html>`)
})

export default app
