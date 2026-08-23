"use client";

import { useEffect, useRef } from "react";
import PawStorytelling from "./paw-storytelling";
import TerritoryOfGoodDeeds from "./territory-of-good-deeds";
import TerritoryIntro from "./territory-intro";
import Slideshow from "./slideshow";
import WhyWeNeedHelp from "./why-we-need-help";
import PostcardSection from "./postcard-section";
import FounderSection from "./founder-section";
import YulianaSection from "./yuliana-section";
import LetsGetAcquaintedSection from "./lets-get-acquainted-section";

const facts = [
  { icon: "fa-heart", text: "Больше 5 лет реальной помощи животным" },
  { icon: "fa-home", text: "Действующий приют" },
  {
    icon: "fa-stethoscope",
    text: "Развитие ветеринарного и грумерского направления",
  },
  {
    icon: "fa-seedling",
    text: "Строительство нового эко-системного Центра «Территория Добрых Дел»",
  },
];

const directions = [
  {
    img: "/static/dir-1.jpg",
    alt: "Волонтёр с собакой у деревянного домика",
    pos: "center 35%",
    title: "Помощь в трудных случаях",
    desc: "Берём в работу сложные случаи, когда животному действительно нужна помощь, а у приюта есть возможность обеспечить уход, восстановление и сопровождение.",
  },
  {
    img: "/static/dir-2.jpg",
    alt: "Девушка играет с радостной собакой в саду",
    pos: "center 40%",
    title: "Лечение и восстановление",
    desc: "Организуем ветеринарную помощь, диагностику, восстановление после травм и болезней.",
  },
  {
    img: "/static/dir-3.jpg",
    alt: "Человек с табличкой и собака на поводке",
    pos: "center 25%",
    title: "Уход и социализация",
    desc: "Помогаем животным снова почувствовать безопасность, привыкнуть к человеку и подготовиться к жизни в семье.",
  },
  {
    img: "/static/dir-4.jpg",
    alt: "Чёрная собака даёт лапу человеку",
    pos: "center 30%",
    title: "Поиск дома",
    desc: "Рассказываем истории наших подопечных, знакомим их с будущими хозяевами и помогаем обрести дом.",
  },
  {
    img: "/static/dir-5.jpg",
    alt: "Голова собаки рядом с рукой, держащей синий поводок",
    pos: "center 45%",
    title: "Развитие устойчивой системы",
    desc: "Создаём инфраструктуру, которая позволит помогать не разово, а системно и качественно.",
  },
];

export default function PortfolioPage() {
  const trackRef = useRef<HTMLUListElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".reveal-up");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealItems.forEach((item) => revealObserver.observe(item));

    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const btnPrev = prevRef.current;
    const btnNext = nextRef.current;
    if (!track || !btnPrev || !btnNext) return;

    const getStep = () => {
      const card = track.querySelector(".dir-card") as HTMLElement | null;
      if (!card) return 320;
      const gap = parseFloat(getComputedStyle(track).columnGap || "20") || 20;
      return card.offsetWidth + gap;
    };

    const updateNav = () => {
      const max = track.scrollWidth - track.clientWidth;
      btnPrev.disabled = track.scrollLeft <= 1;
      btnNext.disabled = track.scrollLeft >= max - 1;
    };

    track.addEventListener("scroll", updateNav, { passive: true });
    requestAnimationFrame(updateNav);

    btnNext.addEventListener("click", () => {
      track.scrollBy({ left: getStep(), behavior: "smooth" });
    });
    btnPrev.addEventListener("click", () => {
      track.scrollBy({ left: -getStep(), behavior: "smooth" });
    });

    const DRAG_THRESHOLD = 8;
    let pointerId: number | null = null;
    let startX = 0;
    let startScroll = 0;
    let dragDelta = 0;
    let isDragging = false;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      pointerId = e.pointerId;
      startX = e.clientX;
      startScroll = track.scrollLeft;
      dragDelta = 0;
      isDragging = false;
      track.classList.remove("is-dragging");
      track.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerId !== pointerId) return;
      dragDelta = e.clientX - startX;
      if (!isDragging && Math.abs(dragDelta) > DRAG_THRESHOLD) {
        isDragging = true;
        track.classList.add("is-dragging");
      }
      if (isDragging) {
        track.scrollLeft = startScroll - dragDelta;
      }
    };

    const endDrag = (_e: PointerEvent) => {
      if (_e.pointerId !== pointerId) return;
      pointerId = null;
      track.classList.remove("is-dragging");
      if (isDragging) {
        isDragging = false;
        (track as unknown as Record<string, boolean>)._suppressNextClick = true;
        setTimeout(() => {
          (track as unknown as Record<string, boolean>)._suppressNextClick =
            false;
        }, 120);
      }
    };

    track.addEventListener("pointerdown", onPointerDown, { passive: true });
    track.addEventListener("pointermove", onPointerMove, { passive: true });
    track.addEventListener("pointerup", endDrag, { passive: true });
    track.addEventListener("pointercancel", endDrag, { passive: true });

    const cards = Array.from(track.querySelectorAll(".dir-card"));

    const closeAll = () => {
      cards.forEach((c) => {
        c.classList.remove("is-open");
        const btn = c.querySelector(".dir-card__toggle");
        if (btn) {
          btn.setAttribute("aria-expanded", "false");
          btn.setAttribute("aria-label", "Раскрыть описание");
        }
      });
    };

    const toggleCard = (card: Element) => {
      const isOpen = card.classList.contains("is-open");
      closeAll();
      if (!isOpen) {
        card.classList.add("is-open");
        const btn = card.querySelector(".dir-card__toggle");
        if (btn) {
          btn.setAttribute("aria-expanded", "true");
          btn.setAttribute("aria-label", "Закрыть описание");
        }
      }
    };

    cards.forEach((card) => {
      card.addEventListener("click", (_e) => {
        if ((track as unknown as Record<string, boolean>)._suppressNextClick)
          return;
        toggleCard(card);
      });
    });

    const onDocClick = (e: MouseEvent) => {
      if (!(e.target as Element).closest("#dir-track")) {
        closeAll();
      }
    };
    document.addEventListener("click", onDocClick);

    return () => {
      track.removeEventListener("scroll", updateNav);
      track.removeEventListener("pointerdown", onPointerDown);
      track.removeEventListener("pointermove", onPointerMove);
      track.removeEventListener("pointerup", endDrag);
      track.removeEventListener("pointercancel", endDrag);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  return (
    <div className="portfolio-body">
      <section id="hero-section" className="hero-block reveal-up">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline
          preload="auto"
          poster="/static/hero-poster.jpg"
          aria-hidden="true"
          disableRemotePlayback
          x-webkit-airplay="deny"
        >
          <source
            src="/static/hero-bg-mobile.mp4"
            type="video/mp4"
            media="(max-width: 768px)"
          />
          <source src="/static/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />

        <div className="hero-content shell">
          <div className="hero-text">
            <h1>Место, где животные снова начинают доверять человеку</h1>
            <p className="lead">
              АНО «Дом с Хвостом» — центр реабилитации животных в Уфе. Мы лечим,
              восстанавливаем и даём шанс на новую жизнь тем, кто оказался в
              беде.
            </p>

            <div className="hero-actions">
              <button className="btn btn-accent" type="button">
                Помочь проекту
              </button>
              <button className="btn btn-secondary" type="button">
                Стать волонтёром
              </button>
            </div>
          </div>

          <ul className="hero-facts">
            {facts.map((fact, i) => (
              <li className="hero-fact" key={i}>
                <span className="hero-fact__icon">
                  <i className={`fas ${fact.icon}`} />
                </span>
                <span className="hero-fact__text">{fact.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="trust-block" aria-label="Наши достижения">
        <ul className="trust-list shell">
          {facts.map((fact, i) => (
            <li className="trust-item" key={i}>
              <span className="trust-item__icon">
                <i className={`fas ${fact.icon}`} />
              </span>
              <span className="trust-item__text">{fact.text}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="about-section" className="about-block reveal-up">
        <div className="about-inner shell">
          <p className="about-overline">О проекте</p>
          <h2 className="about-heading">
            Не просто приют —<br />
            целая система помощи
          </h2>

          <div className="about-body">
            <p>
              «Дом с Хвостом» вырос из многолетней волонтёрской работы в
              системный проект помощи бездомным животным. Сегодня это не только
              спасение животного, но и реабилитация, социализация, ветеринарная
              помощь, уход, поиск дома и развитие инфраструктуры, которая
              позволяет помогать качественно и в долгую.
            </p>
            <p>
              Мы верим, что животному недостаточно просто выжить. Ему нужны
              безопасность, восстановление, забота, адаптация и шанс снова
              поверить человеку. Именно поэтому мы строим не временное решение,
              а устойчивую модель помощи.
            </p>
          </div>

          <div className="about-visual reveal-soft-delay">
            <figure className="about-figure">
              <img
                src="/static/about-bg.jpg"
                alt="Фотографии животных и людей на верёвке — атмосфера праздника «Дом с Хвостом»"
                className="about-img"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>

          <p className="about-accent">
            Люди. Животные. Добрые дела. Каждый день.
          </p>
        </div>
      </section>

      <section id="directions-section" className="directions-block reveal-up">
        <div className="directions-header shell">
          <div className="directions-header__text">
            <p className="directions-overline">Что мы делаем</p>
            <h2 className="directions-heading">Направления нашей работы</h2>
          </div>
          <div className="directions-nav" aria-label="Навигация по карточкам">
            <button
              className="dir-nav-btn dir-nav-btn--prev"
              id="dir-prev"
              ref={prevRef}
              aria-label="Предыдущие карточки"
              disabled
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="dir-nav-btn dir-nav-btn--next"
              id="dir-next"
              ref={nextRef}
              aria-label="Следующие карточки"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7.5 5L12.5 10L7.5 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="directions-track-wrap">
          <ul className="directions-track" id="dir-track" ref={trackRef}>
            {directions.map((dir, i) => (
              <li className="dir-card" key={i}>
                <div className="dir-card__media">
                  <img
                    src={dir.img}
                    alt={dir.alt}
                    className="dir-card__img"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    style={{ objectPosition: dir.pos }}
                  />
                </div>
                <div className="dir-card__overlay" />
                <div className="dir-card__body">
                  <h3 className="dir-card__title">{dir.title}</h3>
                  <p className="dir-card__desc">{dir.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="trust-section" className="trust-numbers-block reveal-up">
        <div className="trust-numbers-bg" />
        <div className="trust-numbers-overlay" />
        <div className="trust-numbers-content shell">
          <p className="trust-numbers-overline">Цифры и факты</p>
          <h2 className="trust-numbers-heading">
            Проект, который уже работает
          </h2>
          <p className="trust-numbers-desc">
            АНО «Дом с Хвостом» — это не просто приют, а системная помощь
            животным. За цифрами — реальные судьбы, ежедневный труд и развитие
            инфраструктуры, которая работает каждый день.
          </p>
          <ul className="trust-numbers-stats">
            <li className="trust-numbers-stat">
              <span className="trust-numbers-stat__number">5+</span>
              <span className="trust-numbers-stat__label">
                лет помощи животным
              </span>
            </li>
            <li className="trust-numbers-stat">
              <span className="trust-numbers-stat__number">2021</span>
              <span className="trust-numbers-stat__label">
                официальная регистрация АНО
              </span>
            </li>
            <li className="trust-numbers-stat">
              <span className="trust-numbers-stat__number">80+</span>
              <span className="trust-numbers-stat__label">
                хвостиков проживают в приюте
              </span>
            </li>
            <li className="trust-numbers-stat">
              <span className="trust-numbers-stat__number">9 га</span>
              <span className="trust-numbers-stat__label">
                земли под развитие проекта «Территория Добрых Дел»
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section id="grant-section" className="grant-block reveal-up">
        <div className="grant-inner shell">
          <p className="grant-overline">Оснащение для заботы</p>
          <h2 className="grant-heading">Грантовая поддержка</h2>
          <div className="grant-visual">
            <figure className="grant-figure">
              <img
                className="grant-img"
                src="/static/vet.jpg"
                alt="Ветеринарное оборудование"
              />
            </figure>
          </div>
          <div className="grant-body">
            <p className="grant-desc">
              Благодаря поддержке гранта Главы Республики Башкортостан при
              содействии Фонда грантов проект получил возможность усилить свою
              практическую базу. Эти средства были направлены на закупку
              оборудования для ветеринарной помощи и груминга — того, что
              ежедневно влияет на качество жизни животных, скорость
              восстановления и уровень ухода. Это не формальная поддержка на
              бумаге, а конкретные инструменты, которые уже работают на благо
              животных: ветеринарное оборудование, инвентарь для процедур,
              техника и оснащение для санитарно-гигиенического ухода.
            </p>
          </div>
        </div>
      </section>

      <PawStorytelling />
      <TerritoryOfGoodDeeds />
      <TerritoryIntro />
      <div className="territory-intro-separator">
        <p className="territory-intro-separator-text">
          Листайте ниже, чтобы ознакомиться с проектом
        </p>
      </div>
      <Slideshow />
      <WhyWeNeedHelp />
      <PostcardSection />
      <FounderSection />
      <YulianaSection />
      <LetsGetAcquaintedSection />
    </div>
  );
}
