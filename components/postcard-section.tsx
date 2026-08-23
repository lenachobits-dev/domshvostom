export default function PostcardSection() {
  return (
    <section
      id="postcard-section"
      className="pc-stage"
      aria-labelledby="pc-title"
    >
      <svg
        className="pc-doodle pc-doodle--arrow"
        viewBox="0 0 130 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 22 Q 40 4 78 18 T 122 20"
          stroke="var(--color-portfolio-accent)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M122 20 l -10 -6 M122 20 l -6 8"
          stroke="var(--color-portfolio-accent)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
      <svg
        className="pc-doodle pc-doodle--heart"
        viewBox="0 0 60 60"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M30 52 C 8 38 4 20 16 12 C 24 7 30 14 30 18 C 30 14 36 7 44 12 C 56 20 52 38 30 52 Z"
          stroke="var(--color-portfolio-primary)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      <svg
        className="pc-doodle pc-doodle--stars"
        viewBox="0 0 90 60"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 12 l 4 8 l 8 2 l -6 6 l 2 8 l -8 -4 l -8 4 l 2 -8 l -6 -6 l 8 -2 z"
          stroke="var(--color-portfolio-primary)"
          strokeWidth="1.5"
        />
        <path
          d="M60 40 l 3 6 l 6 1 l -4 5 l 1 6 l -6 -3 l -6 3 l 1 -6 l -4 -5 l 6 -1 z"
          stroke="var(--color-portfolio-primary)"
          strokeWidth="1.5"
        />
      </svg>
      <svg
        className="pc-doodle pc-doodle--scribble"
        viewBox="0 0 140 60"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4 30 Q 20 4 40 30 T 80 30 T 120 30 T 138 30"
          stroke="var(--color-portfolio-accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <div className="pc-header shell">
        <div className="pc-header__left">
          <div className="pc-eyebrow">Как помочь · Открытка из приюта</div>
          <h2 className="pc-title" id="pc-title">
            Вы можете стать
            <br />
            <span className="pc-hand">частью</span> этой истории
          </h2>
        </div>
        <div className="pc-header__right">
          <div className="pc-postmark" aria-hidden="true">
            <span className="pc-postmark__line1">Дом с хвостом</span>
            <span className="pc-postmark__line2">с любовью</span>
            <span className="pc-postmark__line3">2026</span>
          </div>
          <p className="pc-lead">
            Пять простых способов быть рядом. Выберите тот, что откликается —{" "}
            <b>каждый шаг превращается в чью-то новую жизнь.</b>
          </p>
        </div>
      </div>

      <div className="pc-board">
        <article className="pc-card pc-card--donate">
          <span className="pc-tape pc-tape--corner-tl" aria-hidden="true" />
          <span className="pc-sticky pc-sticky--donate" aria-hidden="true">
            спасибо!
          </span>
          <div className="pc-card__img">
            <img
              src="/static/pc-para.jpg"
              alt="Пара с чёрной собакой и табличкой истории Кайли"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="pc-card__meta">
            <div className="pc-card__num">01 · пожертвование</div>
            <h3 className="pc-card__title">Сделать пожертвование</h3>
            <p className="pc-card__desc">
              Даже небольшой регулярный вклад помогает спасать жизни и строить
              устойчивую систему помощи.
            </p>
            <span className="pc-cta">
              Помочь регулярно
              <span className="pc-cta__arrow" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1 5h7M5 1l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </div>
        </article>

        <article className="pc-card pc-card--volunteer">
          <span className="pc-tape" aria-hidden="true" />
          <span className="pc-sticky pc-sticky--volunteer" aria-hidden="true">
            приезжай к нам ♡
          </span>
          <div className="pc-card__img pc-card__img--square">
            <img
              src="/static/pc-nastya.jpg"
              alt="Волонтёр с белой собакой на фестивале"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="pc-card__meta">
            <div className="pc-card__num">02 · волонтёрство</div>
            <h3 className="pc-card__title">Стать волонтёром</h3>
            <p className="pc-card__desc">
              Приехать, помочь руками, делом, временем, участием, знаниями и
              теплом.
            </p>
            <span className="pc-cta">
              Записаться
              <span className="pc-cta__arrow" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1 5h7M5 1l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </div>
        </article>

        <article className="pc-card pc-card--partner">
          <span className="pc-tape pc-tape--right" aria-hidden="true" />
          <span className="pc-pin pc-pin--sage pc-pin--tl" aria-hidden="true" />
          <span className="pc-sticky pc-sticky--partner" aria-hidden="true">
            вместе ×
          </span>
          <div className="pc-card__layout">
            <div className="pc-card__img pc-card__img--wide">
              <img
                src="/static/pc-meksikancy.jpg"
                alt="Три мексиканские голые собаки рядом с подарками для приюта"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="pc-card__meta pc-card__meta--centered">
              <div className="pc-card__num">03 · партнёрство</div>
              <h3 className="pc-card__title pc-card__title--lg">
                Стать партнёром
              </h3>
              <p className="pc-card__desc">
                Проект открыт к сотрудничеству с бизнесом, специалистами,
                фондами и социально ответственными инициативами.
              </p>
              <span className="pc-cta">
                Обсудить проект
                <span className="pc-cta__arrow" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1 5h7M5 1l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>
            </div>
          </div>
        </article>

        <div className="pc-hero-build">
          <span className="pc-hero-build__badge">главная миссия</span>
          <span className="pc-hero-build__kicker">и самое большое —</span>
          <h3 className="pc-hero-build__title">
            Поддержать строительство центра помощи
          </h3>
          <p className="pc-hero-build__desc">
            Это вклад не в одну историю, а в место, которое будет помогать
            животным долгие годы. Каждый рубль приближает открытие.
          </p>
          <div className="pc-hero-build__row">
            <a href="#" className="pc-hero-build__btn">
              Поддержать стройку
              <span className="pc-hero-build__btn-arrow" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1 5h7M5 1l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <div className="pc-hero-build__progress">
              Собрано <b>476 000 ₽</b> из 50 000 000 ₽
              <div className="pc-hero-build__bar">
                <i style={{ width: "0.95%" }} />
              </div>
            </div>
          </div>
        </div>

        <article className="pc-card pc-card--share">
          <span className="pc-pin pc-pin--red pc-pin--top" aria-hidden="true" />
          <span className="pc-sticky pc-sticky--share" aria-hidden="true">
            расскажи!
          </span>
          <div className="pc-card__img">
            <img
              src="/static/pc-lera.jpg"
              alt="Девушка держит листовку о проекте"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="pc-card__meta">
            <div className="pc-card__num">04 · рассказать</div>
            <h3 className="pc-card__title">Рассказать о проекте</h3>
            <p className="pc-card__desc">
              Иногда один репост, одно знакомство или одна рекомендация приводят
              к настоящему спасению.
            </p>
            <span className="pc-cta">
              Поделиться
              <span className="pc-cta__arrow" aria-hidden="true">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M1 5h7M5 1l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </div>
        </article>

        <article className="pc-card pc-card--build">
          <span className="pc-tape" aria-hidden="true" />
          <div className="pc-card__img pc-card__img--tall">
            <img
              src="/static/pc-breloki.jpg"
              alt="Пара с чёрной собакой и табличкой истории Кайли"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="pc-card__meta">
            <div className="pc-card__num">05 · центр</div>
            <h3 className="pc-card__title">Дом, который останется</h3>
            <p className="pc-card__desc">
              Мы строим постоянный центр помощи — место, куда можно приехать,
              помочь и найти друга.
            </p>
          </div>
        </article>
      </div>

      <div className="pc-foot shell">
        <span className="pc-foot__thanks">
          спасибо, что дочитали — это уже участие ♡
        </span>
      </div>
    </section>
  );
}
