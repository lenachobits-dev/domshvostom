"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const appName = "Дом с Хвостом";

const NAV_ITEMS = [
  { label: "О проекте", href: "#about-section" },
  { label: "Направления работы", href: "#directions-section" },
  { label: "Грантовая поддержка", href: "#grant-section" },
  { label: "Территория Добрых Дел", href: "#territory-section" },
  { label: "Как помочь", href: "#postcard-section" },
  { label: "Руководитель проекта", href: "#founder-section" },
  { label: "Контакты", href: "#acquainted-section" },
];

const PRIMARY = "var(--color-portfolio-primary)";
const ACCENT = "var(--color-portfolio-accent)";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuId = useId();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const probe = window.innerHeight / 3;
        let current = "";
        NAV_ITEMS.forEach((item) => {
          const el = document.querySelector<HTMLElement>(item.href);
          if (!el) return;
          const top = el.getBoundingClientRect().top;
          if (top <= probe) current = item.href;
        });
        setActive(current);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[var(--color-portfolio-secondary)]">
      <div className="container relative mx-auto flex h-16 items-center px-4">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-sans text-lg font-semibold tracking-tight"
          style={{ color: PRIMARY, fontWeight: 600 }}
        >
          <Image
            src="/assets/paw-logo.svg"
            alt="Лапка"
            width={36}
            height={36}
            className="h-9 w-9 shrink-0"
            priority
          />
          {appName}
        </Link>

        <button
          type="button"
          className="absolute left-1/2 top-1/2 inline-flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border transition-colors"
          style={{ color: PRIMARY, borderColor: PRIMARY }}
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <button
          type="button"
          className="header-help-btn ml-auto"
          style={{ background: ACCENT, color: "#fff" }}
        >
          Помочь проекту
        </button>
      </div>

      {open && (
        <div
          id={menuId}
          className="absolute inset-x-0 top-full border-t bg-[var(--color-portfolio-secondary)] shadow-lg"
        >
          <nav className="mx-auto flex max-w-2xl flex-col items-center justify-center py-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-2.5 text-center font-sans text-sm leading-none tracking-normal"
                style={{
                  color: active === item.href ? ACCENT : PRIMARY,
                  fontWeight: 600,
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
