"use client";

import { useEffect, useRef } from "react";

const cards = [
  {
    img: "/assets/ветеринарка.jpg",
    title: "Ветеринарная клиника",
    desc: "Помощь, диагностика, восстановление",
  },
  {
    img: "/assets/адаптационный центр.jpg",
    title: "Реабилитация и адаптация",
    desc: "Мягкое возвращение животных к жизни рядом с человеком",
  },
  {
    img: "/assets/туристическая зона.jpg",
    title: "Туристическая зона",
    desc: "Пространство для гостей, друзей и поддержки проекта",
  },
  {
    img: "/assets/кинологический парк.jpg",
    title: "Большой кинологический парк",
    desc: "Занятия, прогулки, социализация",
  },
  {
    img: "/assets/аптекарский сад (1).png",
    title: "Аптекарский сад",
    desc: "Живая природная среда и атмосфера места",
  },
  {
    img: "/assets/сад лучшего друга.jpg",
    title: "Сад памяти лучшего друга",
    desc: "Возможность посадить дерево в память о любимом ушедшем животном",
  },
];

export default function FacilityCards() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>(".editorial-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          const i = Number(card.dataset.index) || 0;
          card.style.setProperty("--reveal-delay", `${i * 100}ms`);
          card.classList.add("is-visible");
          observer.unobserve(card);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="facility-block" ref={sectionRef}>
      <div className="facility-header shell">
        <p className="facility-overline">Территория Добрых Дел</p>
        <h2 className="facility-heading">Что появится на территории</h2>
        <p className="facility-subheading">
          Центр будет застраиваться постепенно. На территории запланированы
          пространства для помощи, отдыха и памяти.
        </p>
      </div>

      <div className="editorial-grid shell">
        {cards.map((card, i) => (
          <article key={i} className="editorial-card" data-index={i}>
            <div
              className="editorial-card__bg"
              style={{ backgroundImage: `url(${card.img})` }}
            />
            <div className="editorial-card__overlay" />
            <div className="editorial-card__body">
              <h3 className="editorial-card__title">{card.title}</h3>
              <p className="editorial-card__desc">{card.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
