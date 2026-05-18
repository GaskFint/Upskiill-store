import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faGraduationCap } from "@fortawesome/free-solid-svg-icons";

const nav = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/#how", label: "How It Works" },
  { to: "/#testimonials", label: "Testimonials" },
  { to: "/#faq", label: "FAQ" },
] as const;

export function Header({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const textCls = dark ? "text-hero-foreground" : "text-foreground";
  const linkCls = dark
    ? "text-hero-foreground/80 hover:text-hero-foreground"
    : "text-foreground/70 hover:text-foreground";
  return (
    <header className={`w-full ${dark ? "bg-hero" : "bg-background"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          to="/"
          className={`flex items-center gap-2 text-xl font-extrabold tracking-tight ${textCls}`}
        >
          <FontAwesomeIcon icon={faGraduationCap} className="text-primary" />
          upskiill
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.to} href={n.to} className={`text-sm font-medium transition-colors ${linkCls}`}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link
            to="/courses"
            className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            Browse Courses
          </Link>
        </div>
        <button
          type="button"
          aria-label="Toggle menu"
          className={`md:hidden ${textCls}`}
          onClick={() => setOpen((o) => !o)}
        >
          <FontAwesomeIcon icon={open ? faXmark : faBars} className="text-xl" />
        </button>
      </div>
      {open && (
        <div className={`border-t border-border md:hidden ${dark ? "bg-hero" : "bg-background"}`}>
          <div className="flex flex-col gap-1 px-6 py-4">
            {nav.map((n) => (
              <a
                key={n.to}
                href={n.to}
                onClick={() => setOpen(false)}
                className={`rounded-md px-3 py-2 text-sm font-medium ${linkCls}`}
              >
                {n.label}
              </a>
            ))}
            <Link
              to="/courses"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}