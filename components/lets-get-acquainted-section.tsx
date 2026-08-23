import Image from "next/image";

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21.5 3.5 2.8 10.9c-.9.35-.87 1.63.05 1.94l4.55 1.53 1.75 5.4c.24.75 1.18.98 1.74.43l2.55-2.51 4.7 3.45c.72.53 1.75.14 1.94-.72l3.15-14.4c.22-1-.75-1.85-1.7-1.52Z"
        fill="currentColor"
      />
      <path
        d="m17.9 7.2-9.1 5.7c-.4.25-.4.36.02.49l2.34.74 6.94-4.35c.28-.18.55.05.32.24l-5.62 5.08 2.8 2.1c.25.19.44.09.5-.22l1.72-9.42c.09-.4-.18-.6-.52-.36Z"
        fill="#fbf5ea"
        opacity=".9"
      />
    </svg>
  );
}

function VkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12.9 17.2c-6.05 0-9.5-4.15-9.65-11.05h3.05c.1 5.05 2.35 7.2 4.1 7.65V6.15h2.9v4.45c1.75-.2 3.55-2.15 4.15-4.45h2.9c-.45 2.85-2.4 4.8-3.8 5.6 1.4.65 3.6 2.35 4.45 5.45h-3.2c-.65-2.05-2.3-3.65-4.5-3.9v3.9h-.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LetsGetAcquaintedSection() {
  return (
    <footer id="acquainted-section" className="site-footer">
      <div className="footer-inner">
        <div className="footer-lead">
          <p className="ft-eyebrow">Контакты</p>
          <h2 className="ft-title">
            Давайте <span className="ft-hand">знакомиться</span>
          </h2>
          <p className="ft-lead">
            Мы открыты для помощи, сотрудничества, волонтёрства и добрых
            знакомств. Напишите — ответим тепло и по-человечески.
          </p>

          <div className="footer-portrait" aria-hidden="true">
            <span className="fp-tape" />
            <div className="fp-img">
              <Image
                src="/static/pc-dog-cards.jpg"
                alt="Собака из приюта улыбается"
                width={600}
                height={800}
                sizes="(max-width: 860px) 60vw, 300px"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="fp-cap">будем рады ♡</span>
          </div>
        </div>

        <div className="footer-socials">
          <span className="ft-kicker">пишите нам —</span>
          <h3 className="ft-socials-title">
            Мы всегда на связи в социальных сетях
          </h3>

          <div className="ft-socials-grid">
            <a
              className="ft-social"
              href="https://t.me/dom_s_hvostom"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram Дом с хвостом"
            >
              <span className="ft-social__icon" aria-hidden="true">
                <TelegramIcon />
              </span>
              <span className="ft-social__txt">
                <span className="ft-social__label">Telegram</span>
                <span className="ft-social__hint">
                  канал и связь с командой
                </span>
              </span>
              <span className="ft-social__arrow" aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>

            <a
              className="ft-social"
              href="https://vk.com/dom_s_hvostom"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ВКонтакте Дом с хвостом"
            >
              <span className="ft-social__icon" aria-hidden="true">
                <VkIcon />
              </span>
              <span className="ft-social__txt">
                <span className="ft-social__label">ВКонтакте</span>
                <span className="ft-social__hint">
                  истории спасений и жизнь приюта
                </span>
              </span>
              <span className="ft-social__arrow" aria-hidden="true">
                <ArrowIcon />
              </span>
            </a>
          </div>

          <div className="ft-direct">
            <span className="ft-direct__kicker">или напрямую —</span>
            <ul className="ft-direct__list">
              <li className="ft-direct__item">
                <span className="ft-direct__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="m4 7 8 6 8-6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="ft-direct__txt">
                  <span className="ft-direct__label">Написать на почту</span>
                  <a
                    className="ft-direct__value"
                    href="mailto:hello@dom-s-hvostom.ru"
                  >
                    hello@dom-s-hvostom.ru
                  </a>
                </span>
              </li>
              <li className="ft-direct__item">
                <span className="ft-direct__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5.5 4.5c.6-.4 1.35-.5 1.9.15l2 2.35c.55.65.35 1.55-.3 2.05l-1.15.9c.8 2.2 2.5 3.9 4.7 4.7l.9-1.15c.5-.65 1.4-.85 2.05-.3l2.35 2c.65.55.55 1.3.15 1.9-.9 1.35-2.7 2.1-4.55 1.85-4.5-.6-8.05-4.15-8.65-8.65-.25-1.85.5-3.65 1.85-4.55Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="ft-direct__txt">
                  <span className="ft-direct__label">Позвонить</span>
                  <a className="ft-direct__value" href="tel:+79000000000">
                    +7 (900) 000-00-00
                  </a>
                </span>
              </li>
              <li className="ft-direct__item">
                <span className="ft-direct__ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 21s7-6.35 7-11.5C19 5.7 15.87 3 12 3S5 5.7 5 9.5C5 14.65 12 21 12 21Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="9.5"
                      r="2.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                  </svg>
                </span>
                <span className="ft-direct__txt">
                  <span className="ft-direct__label">Приехать в гости</span>
                  <span className="ft-direct__value">
                    п. Лекаревка · по договорённости — напишите заранее
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="ft-bottom">
        <div className="ft-bottom__brand">
          <span className="ft-bottom__paw" aria-hidden="true">
            <Image
              src="/assets/paw-logo.svg"
              alt=""
              width={28}
              height={28}
              loading="lazy"
              decoding="async"
            />
          </span>
          Дом с хвостом
        </div>
        <div>© 2026 · сделано с теплом для тех, кто заботится о животных</div>
      </div>
    </footer>
  );
}
