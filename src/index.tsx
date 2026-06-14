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
  <title>Тёплый сайт заботы</title>
  <meta name="description" content="Мягкий и человечный интерфейс с теплой палитрой и спокойной анимацией." />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600&family=Nunito+Sans:wght@400;600&family=Nunito:wght@800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles/colors.css" />
  <link rel="stylesheet" href="/styles/typography.css" />
  <link rel="stylesheet" href="/styles/motion.css" />
  <link rel="stylesheet" href="/styles/globals.css" />
</head>
<body>
  <header id="site-header" class="section shell reveal-up">
    <nav id="main-navigation" class="nav">
      <a href="#" class="brand">ТёплыйДом</a>
      <ul class="nav-list" aria-label="Навигация">
        <li><a href="#mission">Миссия</a></li>
        <li><a href="#stories">Истории</a></li>
        <li><a href="#support">Поддержка</a></li>
      </ul>
      <button class="btn btn-primary" type="button">Помочь сейчас</button>
    </nav>
  </header>

  <main id="main-content">
    <section id="hero-section" class="section shell hero reveal-up">
      <p class="eyebrow">место, где помощь становится ближе</p>
      <h1>Заботливое пространство для людей, которым нужна опора</h1>
      <p class="lead">Мы объединяем волонтёров, фонды и семьи в понятной платформе, где легко найти поддержку, поделиться временем и быть рядом.</p>
      <p class="accent-note reveal-soft-delay">с теплом и уважением к каждому пути</p>
      <div class="hero-actions">
        <button class="btn btn-accent" type="button">Сделать пожертвование</button>
        <button class="btn btn-secondary" type="button">Стать волонтёром</button>
      </div>
    </section>

    <section id="mission" class="section shell reveal-up">
      <h2>Почему нам доверяют</h2>
      <div class="card-grid">
        <article class="card soft-lift">
          <h3>Прозрачные сборы</h3>
          <p>Каждое действие фиксируется, а отчёты открыты и понятны — без сложных таблиц и формального языка.</p>
        </article>
        <article class="card soft-lift">
          <h3>Живое сопровождение</h3>
          <p>Кураторы отвечают лично и помогают выбрать формат поддержки, который действительно посилен.</p>
        </article>
        <article class="card soft-lift">
          <h3>Локальные инициативы</h3>
          <p>Мы фокусируемся на районных проектах, где помощь быстро превращается в ощутимый результат.</p>
        </article>
      </div>
    </section>

    <section id="stories" class="section shell reveal-up">
      <h2>Истории участия</h2>
      <article class="story-card soft-lift">
        <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80" alt="Люди за совместной встречей в светлом помещении" class="story-image" />
        <div class="story-content">
          <h3>«Когда поддержка приходит вовремя»</h3>
          <p>Семья из Казани получила помощь в оплате реабилитации за 8 дней. Часть средств внесли постоянные доноры, часть — новые участники, увидевшие историю на платформе.</p>
          <a href="#" class="text-link">Читать подробнее</a>
        </div>
      </article>
    </section>

    <section id="support" class="section shell reveal-up">
      <h2>Формы участия</h2>
      <div class="card-grid">
        <article class="card soft-lift">
          <h3>Разовое пожертвование</h3>
          <p>Подходит для быстрого участия в конкретной истории.</p>
          <button class="btn btn-accent" type="button">Поддержать</button>
        </article>
        <article class="card soft-lift">
          <h3>Ежемесячная поддержка</h3>
          <p>Стабильный вклад в долгосрочные программы помощи.</p>
          <button class="btn btn-secondary" type="button">Подключить</button>
        </article>
        <article class="card soft-lift">
          <h3>Волонтёрство</h3>
          <p>Если вам ближе помощь временем и навыками.</p>
          <button class="btn btn-secondary" type="button">Присоединиться</button>
        </article>
      </div>
    </section>
  </main>

  <footer id="site-footer" class="section shell reveal-up">
    <p>© 2026 ТёплыйДом. Люди помогают людям.</p>
  </footer>

  <script src="/static/app.js" defer></script>
</body>
</html>`)
})

export default app
