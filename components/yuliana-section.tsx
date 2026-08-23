"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function PawPrint({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="16" rx="5.5" ry="4.2" />
      <ellipse
        cx="4.8"
        cy="8.5"
        rx="2.8"
        ry="3.5"
        transform="rotate(-18, 4.8, 8.5)"
      />
      <ellipse
        cx="9.8"
        cy="5.8"
        rx="2.8"
        ry="3.8"
        transform="rotate(-5, 9.8, 5.8)"
      />
      <ellipse
        cx="14.2"
        cy="5.8"
        rx="2.8"
        ry="3.8"
        transform="rotate(5, 14.2, 5.8)"
      />
      <ellipse
        cx="19.2"
        cy="8.5"
        rx="2.8"
        ry="3.5"
        transform="rotate(18, 19.2, 8.5)"
      />
    </svg>
  );
}

interface PawPos {
  left: string;
  top: string;
  rotation: number;
  size: number;
}

function generateArcPaws(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
  count: number,
  sizeBase = 28,
  sizeVar = 8
): PawPos[] {
  const paws: PawPos[] = [];
  for (let i = 0; i < count; i++) {
    const t = count > 1 ? i / (count - 1) : 0.5;
    const angle = startAngle + (endAngle - startAngle) * t;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    const rotation = angle * (180 / Math.PI) + 90;
    const size = Math.round((sizeBase + Math.sin(i * 1.5) * sizeVar) * 10) / 10;
    paws.push({ left: `${x}%`, top: `${y}%`, rotation, size });
  }
  return paws;
}

const pawConfigs: PawPos[][] = [
  generateArcPaws(78, 18, 40, -0.5 * Math.PI, 0.7 * Math.PI, 4),
  generateArcPaws(30, 95, 42, 0.6 * Math.PI, 1.6 * Math.PI, 4),
  generateArcPaws(60, 5, 35, 0, 0.9 * Math.PI, 4),
  generateArcPaws(88, 55, 42, 0.1 * Math.PI, 1.0 * Math.PI, 4),
];

const slides = [
  {
    img: "/assets/vtroem.jpg",
    alt: "Юлиана с командой",
    title: "Об открытости проекта",
    quote:
      'Мой принцип — абсолютная открытость, доверие и сопричастность. Каждый, кто нас поддерживает, не „жертвует деньги" — он инвестирует в результат, который можно увидеть, потрогать и ощутить. Возможность приехать в любой момент и проверить. Доверие и репутация — мой главный и самый дорогой актив.',
  },
  {
    img: "/assets/lapka.jpg",
    alt: "Лапка собаки",
    title: "О своём месте",
    quote:
      'Моё место — быть „мостиком". Между отчаянием и надеждой. Между человеком, который хочет выбросить собаку, и собакой, которая хочет жить. Между болью и её смыслом. Между теми, кто хочет помочь, и теми, кто нуждается в помощи. Когда я нашла это место во „вселенском механизме", ушла суета. Я перестала метаться. Я перестала доказывать. Я перестала бояться, что у меня не получится.',
  },
  {
    img: "/assets/obiyatiya.jpeg",
    alt: "Объятия с собакой",
    title: "О выборе",
    quote:
      'Я не люблю слово „жертва". Оно пахнет несчастьем и жалостью. Я не жертвовала — я выбирала. Каждый раз осознанно, с открытыми глазами.',
  },
  {
    img: "/assets/siluet.jpg",
    alt: "Силуэт на закате",
    title: "О главных учителях",
    quote:
      "Нас с детства учат люди. Родители — как правильно. Учителя — как думать. Книги — как жить. Но мои главные учителя оказались с хвостами. И говорят они глазами. Иногда — молчанием. Иногда — внезапным тёплым носом, уткнувшимся в ладонь в тот момент, когда ты готов развалиться.",
  },
];

const MOBILE_QUERY = "(max-width: 860px)";

export default function YulianaSection() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const slide = slides[current];
  const isSiluetSlide = slide.title === "О главных учителях";
  const imgSrc =
    isSiluetSlide && isMobile ? "/assets/memory-teachers.png" : slide.img;

  return (
    <section id="yuliana-section" className="yuliana-block">
      <div className="yuliana-inner shell">
        <p className="yuliana-overline">О смыслах</p>
        <h2 className="yuliana-heading">Юлиана — о проекте и своём пути</h2>
        <div className="yuliana-slider">
          <div className="yuliana-slider__visual">
            <figure className="yuliana-slider__figure">
              <img
                key={current}
                src={imgSrc}
                alt={slide.alt}
                className={`yuliana-slider__img${
                  imgSrc.includes("siluet")
                    ? " yuliana-slider__img--siluet"
                    : ""
                }`}
                loading="lazy"
                decoding="async"
              />
            </figure>
            <nav className="yuliana-slider__nav">
              <button
                className="yuliana-slider__btn"
                onClick={prev}
                aria-label="Предыдущий слайд"
                type="button"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                className="yuliana-slider__btn"
                onClick={next}
                aria-label="Следующий слайд"
                type="button"
              >
                <ChevronRight size={20} />
              </button>
            </nav>
          </div>
          <div key={current} className="yuliana-slider__text">
            <div className="yuliana-pawprints">
              {pawConfigs[current].map((p, i) => (
                <span
                  key={i}
                  className="yuliana-paw"
                  style={{
                    left: p.left,
                    top: p.top,
                    transform: `rotate(${p.rotation}deg)`,
                  }}
                >
                  <PawPrint size={p.size} />
                </span>
              ))}
            </div>
            <h3 className="yuliana-slider__title">{slide.title}</h3>
            <p className="yuliana-slider__quote">{slide.quote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
