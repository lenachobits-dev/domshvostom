"use client";

import { useEffect, useRef } from "react";

const STEPS = ["heel", "toe-1", "toe-2", "toe-3", "toe-4"];
const TOTAL_STORY_STEPS = 4;

export default function PawStorytelling() {
  const blockRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const block = blockRef.current;
    const content = contentRef.current;
    const progressBar = progressBarRef.current;
    if (!block || !content || !progressBar) return;

    let currentStep = 0;

    const getToe = (key: string) =>
      block.querySelector<SVGGElement>(`.paw-zone[data-zone="${key}"]`);
    const getDot = (step: number) =>
      block.querySelector<HTMLButtonElement>(`.paw-dot[data-step="${step}"]`);
    const getHeel = () => block.querySelector<SVGGElement>(".paw-heel");

    const setProgress = (ratio: number) => {
      progressBar.style.width = `${Math.round(ratio * 100)}%`;
    };

    const showPanel = (key: string) => {
      const panels = content.querySelectorAll<HTMLDivElement>(".paw-panel");
      panels.forEach((p) => {
        if (p.dataset.panel === key) {
          p.classList.add("is-active");
          p.removeAttribute("aria-hidden");
          p.classList.remove("is-leaving");
        } else if (p.classList.contains("is-active")) {
          p.classList.add("is-leaving");
          p.classList.remove("is-active");
          p.setAttribute("aria-hidden", "true");
          setTimeout(() => p.classList.remove("is-leaving"), 320);
        } else {
          p.classList.remove("is-leaving");
          p.setAttribute("aria-hidden", "true");
        }
      });
    };

    const updateVisuals = (step: number) => {
      const heel = getHeel();
      if (heel) heel.classList.toggle("is-active", step === 0);

      for (let i = 1; i <= 4; i++) {
        const toe = getToe(`toe-${i}`);
        if (!toe) continue;
        toe.classList.toggle("is-active", i === step);
        toe.classList.toggle("is-done", i < step);
      }

      for (let i = 1; i <= 4; i++) {
        const dot = getDot(i);
        if (!dot) continue;
        dot.classList.toggle("is-active", i === step);
        dot.classList.toggle("is-done", i < step);
      }
    };

    const updateMobileNav = (step: number) => {
      const btnPrev = block.querySelector<HTMLButtonElement>(
        ".paw-mobile-btn--prev"
      );
      const btnNext = block.querySelector<HTMLButtonElement>(
        ".paw-mobile-btn--next"
      );
      const counter = block.querySelector<HTMLSpanElement>(
        ".paw-mobile-counter"
      );
      if (!btnPrev) return;
      btnPrev.disabled = step === 0;
      btnNext!.disabled = step === 4;
      if (counter) counter.textContent = `${step === 0 ? 0 : step} / 4`;
    };

    const activateStep = (step: number, noAnim?: boolean) => {
      if (step < 0 || step > 4) return;
      currentStep = step;

      const key = STEPS[step];
      if (!noAnim) {
        showPanel(key);
      } else {
        const panels = content.querySelectorAll<HTMLDivElement>(".paw-panel");
        panels.forEach((p) => {
          const active = p.dataset.panel === key;
          p.classList.toggle("is-active", active);
          if (active) p.removeAttribute("aria-hidden");
          else p.setAttribute("aria-hidden", "true");
        });
      }

      updateVisuals(step);

      const ratio = step === 0 ? 0 : step / TOTAL_STORY_STEPS;
      setProgress(ratio);

      if (step > 0) block.classList.add("story-started");

      updateMobileNav(step);
    };

    const isMobile = () => window.innerWidth <= 768;

    const handleScroll = () => {
      const rect = block.getBoundingClientRect();
      const blockH = block.offsetHeight;
      const vpH = window.innerHeight;

      const scrolled = -rect.top;
      const scrollMax = blockH - vpH;

      if (scrolled < 0 || scrollMax <= 0) {
        activateStep(0);
        return;
      }

      if (scrolled >= scrollMax) {
        activateStep(4);
        return;
      }

      const ratio = scrolled / scrollMax;
      let step = 0;
      if (ratio < 0.1) step = 0;
      else if (ratio < 0.325) step = 1;
      else if (ratio < 0.55) step = 2;
      else if (ratio < 0.775) step = 3;
      else step = 4;

      if (step !== currentStep) activateStep(step);
    };

    const injectMobileNav = () => {
      if (block.querySelector(".paw-mobile-nav")) return;

      const nav = document.createElement("div");
      nav.className = "paw-mobile-nav";
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
      `;

      const stage = block.querySelector(".paw-stage");
      if (stage) stage.appendChild(nav);

      nav
        .querySelector(".paw-mobile-btn--prev")!
        .addEventListener("click", () => {
          if (currentStep > 0) activateStep(currentStep - 1);
        });
      nav
        .querySelector(".paw-mobile-btn--next")!
        .addEventListener("click", () => {
          if (currentStep < 4) activateStep(currentStep + 1);
        });
    };

    const init = () => {
      if (isMobile()) {
        injectMobileNav();
        activateStep(0, true);
      } else {
        activateStep(0, true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    init();

    let lastMobile = isMobile();
    const onResize = () => {
      const nowMobile = isMobile();
      if (nowMobile !== lastMobile) {
        lastMobile = nowMobile;
        if (nowMobile) injectMobileNav();
        activateStep(currentStep, true);
      }
      if (!nowMobile) handleScroll();
    };
    window.addEventListener("resize", onResize, { passive: true });

    block.querySelectorAll(".paw-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        const step = parseInt((dot as HTMLButtonElement).dataset.step!, 10);
        if (!isNaN(step)) {
          activateStep(step);

          if (!isMobile()) {
            const ratio =
              step === 0 ? 0.05 : (step - 1) / TOTAL_STORY_STEPS + 0.15;
            const blockH = block.offsetHeight;
            const vpH = window.innerHeight;
            const targetY = block.offsetTop + ratio * (blockH - vpH);
            window.scrollTo({ top: targetY, behavior: "smooth" });
          }
        }
      });
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      id="paw-section"
      className="paw-block"
      ref={blockRef}
      aria-label="Пространство комплексной помощи"
    >
      <div className="paw-sticky">
        <div className="paw-header shell">
          <p className="paw-overline">Наши возможности</p>
          <h2 className="paw-heading">Пространство комплексной помощи</h2>
          <p className="paw-subheading">
            От лечения до ухода — всё, что помогает животному восстановиться
          </p>
        </div>

        <div className="paw-stage shell">
          <div className="paw-illustration" aria-hidden="true">
            <svg
              className="paw-svg"
              viewBox="0 0 400 460"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter
                  id="paw-shadow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="12"
                    floodColor="rgba(102,115,90,0.18)"
                  />
                </filter>
                <filter
                  id="paw-shadow-active"
                  x="-30%"
                  y="-30%"
                  width="160%"
                  height="160%"
                >
                  <feDropShadow
                    dx="0"
                    dy="8"
                    stdDeviation="20"
                    floodColor="rgba(181,79,69,0.28)"
                  />
                </filter>
              </defs>

              <g className="paw-zone paw-heel" data-zone="heel">
                <ellipse
                  cx="200"
                  cy="320"
                  rx="110"
                  ry="100"
                  className="paw-shape paw-heel__shape"
                  fill="#e8e3d8"
                  stroke="#c8c2b0"
                  strokeWidth="1.5"
                />
                <ellipse
                  cx="200"
                  cy="340"
                  rx="68"
                  ry="52"
                  fill="rgba(102,115,90,0.07)"
                />
              </g>

              <g
                className="paw-zone paw-toe paw-toe--1"
                data-zone="toe-1"
                data-step="1"
              >
                <ellipse
                  cx="82"
                  cy="175"
                  rx="42"
                  ry="52"
                  className="paw-shape"
                  fill="#e8e3d8"
                  stroke="#c8c2b0"
                  strokeWidth="1.5"
                  transform="rotate(-18 82 175)"
                />
                <ellipse
                  cx="82"
                  cy="175"
                  rx="26"
                  ry="32"
                  className="paw-toe__inner"
                  fill="rgba(102,115,90,0.07)"
                  transform="rotate(-18 82 175)"
                />
              </g>

              <g
                className="paw-zone paw-toe paw-toe--2"
                data-zone="toe-2"
                data-step="2"
              >
                <ellipse
                  cx="152"
                  cy="138"
                  rx="42"
                  ry="54"
                  className="paw-shape"
                  fill="#e8e3d8"
                  stroke="#c8c2b0"
                  strokeWidth="1.5"
                  transform="rotate(-6 152 138)"
                />
                <ellipse
                  cx="152"
                  cy="138"
                  rx="26"
                  ry="34"
                  className="paw-toe__inner"
                  fill="rgba(102,115,90,0.07)"
                  transform="rotate(-6 152 138)"
                />
              </g>

              <g
                className="paw-zone paw-toe paw-toe--3"
                data-zone="toe-3"
                data-step="3"
              >
                <ellipse
                  cx="248"
                  cy="138"
                  rx="42"
                  ry="54"
                  className="paw-shape"
                  fill="#e8e3d8"
                  stroke="#c8c2b0"
                  strokeWidth="1.5"
                  transform="rotate(6 248 138)"
                />
                <ellipse
                  cx="248"
                  cy="138"
                  rx="26"
                  ry="34"
                  className="paw-toe__inner"
                  fill="rgba(102,115,90,0.07)"
                  transform="rotate(6 248 138)"
                />
              </g>

              <g
                className="paw-zone paw-toe paw-toe--4"
                data-zone="toe-4"
                data-step="4"
              >
                <ellipse
                  cx="318"
                  cy="175"
                  rx="42"
                  ry="52"
                  className="paw-shape"
                  fill="#e8e3d8"
                  stroke="#c8c2b0"
                  strokeWidth="1.5"
                  transform="rotate(18 318 175)"
                />
                <ellipse
                  cx="318"
                  cy="175"
                  rx="26"
                  ry="32"
                  className="paw-toe__inner"
                  fill="rgba(102,115,90,0.07)"
                  transform="rotate(18 318 175)"
                />
              </g>

              <path
                d="M 108 220 Q 100 250 120 270"
                stroke="#c8c2b0"
                strokeWidth="1"
                opacity="0.5"
                fill="none"
              />
              <path
                d="M 168 192 Q 168 240 168 265"
                stroke="#c8c2b0"
                strokeWidth="1"
                opacity="0.5"
                fill="none"
              />
              <path
                d="M 232 192 Q 232 240 232 265"
                stroke="#c8c2b0"
                strokeWidth="1"
                opacity="0.5"
                fill="none"
              />
              <path
                d="M 292 220 Q 300 250 280 270"
                stroke="#c8c2b0"
                strokeWidth="1"
                opacity="0.5"
                fill="none"
              />

              <text
                x="82"
                y="180"
                textAnchor="middle"
                className="paw-toe-num"
                fontSize="14"
                fill="rgba(102,115,90,0.5)"
                fontFamily="Nunito, sans-serif"
                fontWeight="800"
                transform="rotate(-18 82 180)"
              >
                1
              </text>
              <text
                x="152"
                y="143"
                textAnchor="middle"
                className="paw-toe-num"
                fontSize="14"
                fill="rgba(102,115,90,0.5)"
                fontFamily="Nunito, sans-serif"
                fontWeight="800"
              >
                2
              </text>
              <text
                x="248"
                y="143"
                textAnchor="middle"
                className="paw-toe-num"
                fontSize="14"
                fill="rgba(102,115,90,0.5)"
                fontFamily="Nunito, sans-serif"
                fontWeight="800"
              >
                3
              </text>
              <text
                x="318"
                y="180"
                textAnchor="middle"
                className="paw-toe-num"
                fontSize="14"
                fill="rgba(102,115,90,0.5)"
                fontFamily="Nunito, sans-serif"
                fontWeight="800"
                transform="rotate(18 318 180)"
              >
                4
              </text>

              <text
                x="200"
                y="330"
                textAnchor="middle"
                fontSize="32"
                fontFamily="Nunito, sans-serif"
              >
                🐾
              </text>
            </svg>
          </div>

          <div className="paw-content" ref={contentRef}>
            <div
              className="paw-panel paw-panel--heel is-active"
              data-panel="heel"
            >
              <div className="paw-panel__inner">
                <p className="paw-panel__overline">Комплексный подход</p>
                <h3 className="paw-panel__title">
                  Каждое животное получает полный цикл заботы
                </h3>
                <p className="paw-panel__text">
                  В нашем центре мы не ограничиваемся одной помощью. Каждый
                  подопечный проходит через все этапы — от первичной диагностики
                  до полного восстановления. Прокрутите вниз, чтобы узнать о
                  каждом направлении.
                </p>
                <div className="paw-scroll-hint">
                  <span>Прокрутите вниз</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M8 3v10M4 9l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div
              className="paw-panel paw-panel--step"
              data-panel="toe-1"
              data-step="1"
              aria-hidden="true"
            >
              <div className="paw-panel__inner">
                <div className="paw-panel__step-badge">
                  <span className="paw-panel__step-num">01</span>
                  <span className="paw-panel__step-label">Шаг первый</span>
                </div>
                <h3 className="paw-panel__title">
                  Диагностика и контроль состояния
                </h3>
                <p className="paw-panel__text">
                  Точная картина здоровья с первого дня. Весы, тонометр,
                  пульсоксиметр, микроскоп и диагностическое освещение позволяют
                  нам не упустить ни одной детали — и вовремя скорректировать
                  лечение.
                </p>
                <ul className="paw-panel__list">
                  <li>
                    <i className="fas fa-check-circle" /> Весы и тонометр
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Пульсоксиметр
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Микроскоп
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Диагностическое
                    освещение
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="paw-panel paw-panel--step"
              data-panel="toe-2"
              data-step="2"
              aria-hidden="true"
            >
              <div className="paw-panel__inner">
                <div className="paw-panel__step-badge">
                  <span className="paw-panel__step-num">02</span>
                  <span className="paw-panel__step-label">Шаг второй</span>
                </div>
                <h3 className="paw-panel__title">Лечение и поддержка</h3>
                <p className="paw-panel__text">
                  Современное оборудование для интенсивной терапии. Инфузионный
                  насос, кислородный концентратор и камера оксигенации
                  обеспечивают поддержку жизненно важных функций даже в самых
                  сложных случаях.
                </p>
                <ul className="paw-panel__list">
                  <li>
                    <i className="fas fa-check-circle" /> Инфузионный насос
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Кислородный
                    концентратор
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Камера оксигенации
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Медицинский штатив
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="paw-panel paw-panel--step"
              data-panel="toe-3"
              data-step="3"
              aria-hidden="true"
            >
              <div className="paw-panel__inner">
                <div className="paw-panel__step-badge">
                  <span className="paw-panel__step-num">03</span>
                  <span className="paw-panel__step-label">Шаг третий</span>
                </div>
                <h3 className="paw-panel__title">
                  Процедуры и клиническая работа
                </h3>
                <p className="paw-panel__text">
                  Профессиональное пространство для ежедневных процедур.
                  Ветеринарный стол со специальным освещением, носилки для
                  безопасной транспортировки и ультразвуковой скалер для
                  стоматологии.
                </p>
                <ul className="paw-panel__list">
                  <li>
                    <i className="fas fa-check-circle" /> Ветеринарный стол и
                    светильник
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Носилки
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Ультразвуковой скалер
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Специальный резиновый
                    коврик
                  </li>
                </ul>
              </div>
            </div>

            <div
              className="paw-panel paw-panel--step"
              data-panel="toe-4"
              data-step="4"
              aria-hidden="true"
            >
              <div className="paw-panel__inner">
                <div className="paw-panel__step-badge">
                  <span className="paw-panel__step-num">04</span>
                  <span className="paw-panel__step-label">Шаг четвёртый</span>
                </div>
                <h3 className="paw-panel__title">Уход и реабилитация</h3>
                <p className="paw-panel__text">
                  Полное восстановление требует комфорта и тепла. Груминг-стол,
                  ванна, фен-компрессор и матрац с подогревом создают среду, в
                  которой животное расслабляется и набирается сил.
                </p>
                <ul className="paw-panel__list">
                  <li>
                    <i className="fas fa-check-circle" /> Груминг-стол и стул
                    грумера
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Ванна и фен-компрессор
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Машинка и ножницы
                  </li>
                  <li>
                    <i className="fas fa-check-circle" /> Матрац с подогревом
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="paw-progress" aria-hidden="true">
          <div className="paw-progress__track">
            <div className="paw-progress__bar" ref={progressBarRef} />
          </div>
          <div className="paw-progress__dots">
            <button
              className="paw-dot"
              data-step="1"
              aria-label="Шаг 1: Диагностика"
            />
            <button
              className="paw-dot"
              data-step="2"
              aria-label="Шаг 2: Лечение"
            />
            <button
              className="paw-dot"
              data-step="3"
              aria-label="Шаг 3: Процедуры"
            />
            <button
              className="paw-dot"
              data-step="4"
              aria-label="Шаг 4: Уход"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
