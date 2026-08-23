"use client";

import { useEffect, useRef, useState } from "react";

const slides = [
  {
    img: "/assets/vet-clinic.jpg",
    title: "Ветеринарная клиника",
    desc: "Помощь, диагностика, восстановление",
  },
  {
    img: "/assets/rehab-center.jpg",
    title: "Реабилитация и адаптация",
    desc: "Мягкое возвращение животных к жизни рядом с человеком",
  },
  {
    img: "/assets/tourist-zone.jpg",
    title: "Туристическая зона",
    desc: "Пространство для гостей, друзей и поддержки проекта",
  },
  {
    img: "/assets/dog-park.jpg",
    title: "Большой кинологический парк",
    desc: "Занятия, прогулки, социализация",
  },
  {
    img: "/assets/pharmacy-garden.png",
    title: "Аптекарский сад",
    desc: "Живая природная среда и атмосфера места",
  },
  {
    img: "/assets/memory-garden.jpg",
    title: "Сад памяти лучшего друга",
    desc: "Возможность посадить дерево в память о любимом ушедшем животном",
  },
];

export default function Slideshow() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [blend, setBlend] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const rect = wrapper.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = rect.height - windowHeight;
      if (totalScroll <= 0) return;

      const p = Math.max(0, Math.min(1, -rect.top / totalScroll));
      const exactIndex = p * (slides.length - 1);
      const ci = Math.min(Math.floor(exactIndex), slides.length - 1);
      const ni = Math.min(ci + 1, slides.length - 1);
      const b = exactIndex - ci;

      setCurrentIndex(ci);
      setNextIndex(ni);
      setBlend(b);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="scroll-slideshow"
      ref={wrapperRef}
      aria-label="Что появится на Территории Добрых Дел"
    >
      <div className="scroll-slideshow-sticky">
        {slides.map((slide, i) => {
          const isCurrent = i === currentIndex;
          const isNext = i === nextIndex && currentIndex !== nextIndex;

          let clipPathValue: string | undefined;
          if (isNext) {
            const hidden = (1 - blend) * 100;
            clipPathValue = `inset(${hidden}% 0 0 0)`;
          }

          return (
            <div
              key={i}
              className="scroll-slideshow-slide"
              style={{
                opacity: isCurrent || isNext ? 1 : 0,
                clipPath: clipPathValue,
                zIndex: isNext ? 2 : isCurrent ? 1 : 0,
              }}
            >
              <div
                className="scroll-slideshow-bg"
                style={{ backgroundImage: `url(${slide.img})` }}
                aria-hidden="true"
              />
              <div className="scroll-slideshow-overlay" aria-hidden="true" />
              <div className="scroll-slideshow-content">
                <h2 className="scroll-slideshow-title">{slide.title}</h2>
                <p className="scroll-slideshow-desc">{slide.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
