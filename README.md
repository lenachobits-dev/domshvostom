# webapp

## Project Overview
- **Name**: webapp
- **Goal**: Тёплый промо-сайт в human-centered стиле с четкой дизайн-системой (цвета, типографика, motion)
- **Main Features**:
  - Семантическая адаптивная верстка
  - Централизованная дизайн-система в отдельных CSS-файлах
  - Мягкая система анимаций (viewport reveal + gentle hover)
  - Четкое разделение ролей цветов и шрифтов

## URLs
- **Local (PM2 + Wrangler)**: http://localhost:3000
- **Main entry**: `/`

## Functional Entry URIs
- `GET /` — основная страница сайта
- `GET /styles/colors.css` — цветовые токены
- `GET /styles/typography.css` — типографическая система
- `GET /styles/motion.css` — система motion-анимаций
- `GET /styles/globals.css` — базовые и компонентные стили
- `GET /static/app.js` — JS для reveal-анимаций секций

## Data Architecture
- **Data models**: не используются (статический лендинг)
- **Storage services**: не подключены (D1/KV/R2 отсутствуют)

## Completed Features
- Реальный файловый проект в `/home/user/webapp`
- Отдельные файлы для цветов, типографики, анимации и глобальных стилей
- Настроены скрипты сборки и Cloudflare Pages preview
- Подготовлена PM2-конфигурация для sandbox запуска

## Not Implemented Yet
- API/формы с отправкой данных
- CMS/админ-панель
- Подключение D1/KV/R2
- Продакшн-деплой в Cloudflare Pages
- Push в GitHub remote (зависит от выбора репозитория и авторизации)

## Recommended Next Steps
1. Подключить форму обратной связи и API endpoint в Hono.
2. Добавить контентные страницы (FAQ, отчеты, контакты).
3. Выполнить deploy в Cloudflare Pages.
4. Привязать GitHub remote и включить CI/CD.

## Deployment
- **Platform**: Cloudflare Pages (готово к деплою)
- **Status**: ⚙️ Local-ready
- **Tech Stack**: Hono + TypeScript + Vite + Wrangler + PM2
- **Last Updated**: 2026-06-14
