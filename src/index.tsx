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
        <h1>Место, где животные снова начинают доверять человеку</h1>
        <p class="lead">
          АНО «Дом с Хвостом» — центр реабилитации животных в Уфе. Мы лечим,
          восстанавливаем и даём шанс на новую жизнь тем, кто оказался в беде.
        </p>

        <div class="hero-actions">
          <button class="btn btn-accent" type="button">Помочь проекту</button>
          <button class="btn btn-secondary" type="button">Стать волонтёром</button>
        </div>

        <ul class="hero-facts">
          <li>Больше 5 лет реальной помощи животным</li>
          <li>Действующий приют</li>
          <li>Развитие ветеринарного и грумерского направления</li>
          <li>Строительство нового эко-системного Центра «Территория Добрых Дел»</li>
        </ul>
      </div>
    </section>
  </main>

  <script src="/static/app.js" defer></script>
</body>
</html>`)
})

export default app
