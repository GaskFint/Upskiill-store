import { Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCircleCheck,
  faCircleXmark,
  faClock,
  faVideo,
  faInfinity,
  faShieldHalved,
  faBolt,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faUserGraduate,
  faListCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcApplePay,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { BuyButton } from "@/components/site/BuyButton";
import { Countdown } from "@/components/site/Countdown";
import type { Course } from "@/lib/courses";
import instructorImg from "@/assets/instructor.jpg";
import { useState } from "react";

const COMPARISON_ROWS = [
  ["Proven step-by-step system", "Random YouTube rabbit holes"],
  ["Plug-and-play templates included", "Build everything from scratch"],
  ["Real case studies with numbers", "Vague motivational advice"],
  ["Lifetime updates as tools evolve", "Outdated content in months"],
  ["30-day money-back guarantee", "Hours lost, no recourse"],
] as const;

function PriceRow({ course, onDark = false, large = true }: { course: Course; onDark?: boolean; large?: boolean }) {
  const saved = course.originalPrice - course.price;
  return (
    <>
      <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
        <span className={`${large ? "text-5xl" : "text-3xl"} font-extrabold tabular-nums text-primary`}>
          ${course.price}.00
        </span>
        <span className={`text-lg line-through ${onDark ? "text-hero-foreground/50" : "text-muted-foreground"}`}>
          ${course.originalPrice}.00
        </span>
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${onDark ? "text-hero-foreground/50" : "text-muted-foreground"}`}
        >
          Course Fee
        </span>
      </div>
      <p className={`mt-2 text-sm font-medium ${onDark ? "text-hero-foreground/80" : "text-success"}`}>
        You save ${saved} today
      </p>
    </>
  );
}

function PurchaseCard({ course }: { course: Course }) {
  return (
    <div className="rounded-2xl bg-background p-6 shadow-xl ring-1 ring-border lg:sticky lg:top-6">
      <img src={course.thumbnail} alt="" className="aspect-video w-full rounded-xl object-cover" />
        <div className="mt-5">
          <PriceRow course={course} large={false} />
        </div>
        <div className="mt-4">
          <Countdown />
        </div>
        <div className="mt-5">
          <BuyButton course={course} full size="lg" />
        </div>
        <ul className="mt-5 space-y-2.5 border-t border-border pt-5 text-xs text-muted-foreground">
          <li className="flex gap-2">
            <FontAwesomeIcon icon={faShieldHalved} className="mt-0.5 text-success" />
            30-day money-back guarantee
          </li>
          <li className="flex gap-2">
            <FontAwesomeIcon icon={faBolt} className="mt-0.5 text-primary" />
            Instant Google Drive delivery
          </li>
          <li className="flex gap-2">
            <FontAwesomeIcon icon={faInfinity} className="mt-0.5 text-primary" />
            Lifetime updates included
          </li>
        </ul>
    </div>
  );
}

export function CourseSalesPage({ course }: { course: Course }) {
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const bonusTotal = course.bonuses.reduce((s, b) => s + b.value, 0);

  return (
    <>
      <section className="relative overflow-hidden bg-hero text-hero-foreground">
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs text-hero-foreground/60">
            <Link to="/" className="hover:text-hero-foreground">
              Home
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="text-[9px]" />
            <Link to="/courses" className="hover:text-hero-foreground">
              Courses
            </Link>
            <FontAwesomeIcon icon={faChevronRight} className="text-[9px]" />
            <span>{course.category}</span>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -left-3 top-6 hidden h-[72%] w-28 rounded-2xl bg-primary lg:block" />
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img src={course.thumbnail} alt="" className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold text-primary">{course.category}</p>
              {course.hook && (
                <div className="mt-4 mb-2 border-l-4 border-primary pl-4 text-base font-medium italic leading-relaxed text-hero-foreground/90 md:text-lg">
                  "{course.hook}"
                </div>
              )}
              <h1 className="mt-3 text-3xl font-extrabold leading-[1.12] tracking-tight md:text-[2.75rem]">
                {course.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-hero-foreground/75">{course.tagline}</p>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                <div className="flex text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-xs" />
                  ))}
                </div>
                <span className="font-bold">{course.rating}</span>
                <span className="text-hero-foreground/50">·</span>
                <span className="text-hero-foreground/70">{course.reviewCount} reviews</span>
              </div>
              <div className="mt-8">
                <PriceRow course={course} onDark />
              </div>
              <div className="mt-5">
                <Countdown onDark />
              </div>
              <div className="mt-7">
                <BuyButton course={course} size="lg" full />
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-hero-foreground/65">
                <li className="inline-flex items-center gap-2">
                  <FontAwesomeIcon icon={faShieldHalved} className="text-primary" /> Secure checkout
                </li>
                <li className="inline-flex items-center gap-2">
                  <FontAwesomeIcon icon={faBolt} className="text-primary" /> Instant Drive link
                </li>
                <li className="inline-flex items-center gap-2">
                  <FontAwesomeIcon icon={faInfinity} className="text-primary" /> Lifetime access
                </li>
              </ul>
                  <div className="mt-4 flex items-center gap-3 text-xl text-hero-foreground/45">
                    <FontAwesomeIcon icon={faCcVisa} />
                    <FontAwesomeIcon icon={faCcMastercard} />
                    <FontAwesomeIcon icon={faCcAmex} />
                    <FontAwesomeIcon icon={faCcApplePay} />
                    <FontAwesomeIcon icon={faGoogle} />
                  </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-14">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 md:grid-cols-[minmax(0,260px)_1fr]">
            <div>
              <h2 className="text-2xl font-extrabold leading-tight md:text-3xl">Why learners pick this course</h2>
              <p className="mt-3 text-sm text-muted-foreground">One payment. Full library. Yours forever.</p>
              <div className="mt-5 hidden gap-2 md:flex">
                <button type="button" aria-label="Previous" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-muted">
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <button type="button" aria-label="Next" className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-muted">
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: faBolt, title: "Instant Access", body: "Drive link in your inbox within 60 seconds." },
                { icon: faUserGraduate, title: "Expert-Curated", body: "Built by operators with real results." },
                { icon: faInfinity, title: "Lifetime Updates", body: "Every future update included free." },
              ].map((it) => (
                <div key={it.title} className="rounded-2xl bg-accent-soft/80 p-6">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-background text-primary shadow-sm">
                    <FontAwesomeIcon icon={it.icon} />
                  </div>
                  <h3 className="mt-4 text-sm font-bold">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">What&apos;s inside</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {course.lessons} lessons · {course.duration} · {course.level}
              </p>
            </div>
            <ul className="divide-y divide-border rounded-2xl bg-background">
              {course.features.map((f, i) => (
                <li key={f} className="flex gap-4 px-5 py-4">
                  <span className="shrink-0 text-xs font-bold tabular-nums text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-extrabold">About this course</h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">{course.description}</p>
                <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
                  {[
                    { icon: faVideo, label: "Format", value: "Video + guides" },
                    { icon: faClock, label: "Duration", value: course.duration },
                    { icon: faUserGraduate, label: "Level", value: course.level },
                    { icon: faInfinity, label: "Access", value: "Lifetime, instant" },
                    { icon: faBolt, label: "Delivery", value: "Google Drive via email" },
                  ].map((r) => (
                    <div key={r.label} className="flex gap-4 bg-background p-5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-primary">
                        <FontAwesomeIcon icon={r.icon} className="text-sm" />
                      </span>
                      <div>
                        <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{r.label}</dt>
                        <dd className="mt-0.5 text-sm font-semibold">{r.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
              <PurchaseCard course={course} />
            </div>
        </div>
      </section>

      <section id="curriculum" className="bg-surface py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-extrabold">Curriculum</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {course.lessons} lessons · {course.curriculum.length} modules
          </p>
          <div className="mt-8">
            {course.curriculum.map((m, idx) => {
              const open = openModule === idx;
              return (
                <div key={m.title} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpenModule(open ? null : idx)}
                    className="flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span className="text-sm font-bold tabular-nums text-primary">{String(idx + 1).padStart(2, "0")}</span>
                    <span className="flex-1 font-bold">{m.title}</span>
                    <FontAwesomeIcon icon={faChevronDown} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <ul className="space-y-2 pb-6 pl-10">
                      {m.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                          <FontAwesomeIcon icon={faListCheck} className="mt-1 text-[10px] text-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-extrabold">Built for you if…</h2>
          <ol className="mt-8">
            {course.personaFits.map((p, i) => (
              <li key={p} className="flex gap-5 border-b border-border py-6 last:border-0">
                <span className="text-2xl font-extrabold tabular-nums text-primary/30">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-medium leading-relaxed">{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-border bg-accent-soft/50 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 text-center text-sm sm:flex-row sm:justify-center sm:gap-8">
          <p className="font-semibold">{course.studentsCount.toLocaleString()}+ students enrolled</p>
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{course.rating}</span> avg · {course.reviewCount} reviews
          </p>
          <p className="text-muted-foreground">60+ countries</p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
          <div className="overflow-hidden rounded-2xl">
            <img src={instructorImg} alt="Instructor" loading="lazy" className="w-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary">Your instructor</p>
            <h2 className="mt-2 text-3xl font-extrabold leading-tight">Taught by operators, not theorists.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Real systems from people who have done the work — not recycled YouTube tips.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-extrabold">What students say</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {course.testimonials.map((t) => (
              <blockquote key={t.name} className="flex h-full flex-col rounded-2xl bg-background p-7">
                <div className="mb-4 flex text-primary">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-xs" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-xs font-bold text-primary">
                    {t.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <cite className="not-italic text-sm font-bold">{t.name}</cite>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-extrabold">upskiill vs. on your own</h2>
          <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-border">
              <div className="grid grid-cols-2 bg-border text-xs font-semibold uppercase tracking-wide">
                  <div className="bg-primary/10 px-4 py-3">With upskiill</div>
                  <div className="bg-muted px-4 py-3 text-muted-foreground">On your own</div>
              </div>
              {COMPARISON_ROWS.map(([yes, no]) => (
                <div key={yes} className="grid grid-cols-2 gap-px bg-border">
                  <div className="flex gap-2 bg-background px-4 py-3.5 text-sm">
                    <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5 shrink-0 text-success" />
                    {yes}
                  </div>
                  <div className="flex gap-2 bg-muted/40 px-4 py-3.5 text-sm text-muted-foreground">
                    <FontAwesomeIcon icon={faCircleXmark} className="mt-0.5 shrink-0 text-destructive/80" />
                    {no}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-extrabold">
            ${bonusTotal} in bonuses — <span className="text-primary">free</span>
          </h2>
          <ul className="mt-8 divide-y divide-border">
            {course.bonuses.map((b) => (
              <li key={b.title} className="flex flex-col gap-1 py-6 first:pt-0 sm:flex-row sm:justify-between">
                <div>
                  <h3 className="font-bold">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{b.description}</p>
                </div>
                <p className="text-sm text-muted-foreground line-through sm:shrink-0">${b.value} value</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background py-10">
        <div className="mx-auto max-w-3xl px-6">
          <div className="flex flex-col gap-4 rounded-2xl bg-accent-soft/60 p-8 sm:flex-row sm:items-center">
            <FontAwesomeIcon icon={faShieldHalved} className="text-3xl text-primary" />
            <div>
              <h2 className="text-lg font-extrabold">30-day money-back guarantee</h2>
              <p className="mt-1 text-sm text-muted-foreground">Full refund within 30 days — no friction.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-surface py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-extrabold">Common questions</h2>
          <div className="mt-8 divide-y divide-border">
            {course.faq.map((f, idx) => {
              const open = openFaq === idx;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : idx)}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-sm font-bold">{f.q}</span>
                    <FontAwesomeIcon icon={faChevronDown} className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-background px-6 py-16 pb-28 md:pb-16">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-hero p-8 text-hero-foreground md:grid md:grid-cols-2 md:items-center md:gap-10 md:p-12">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight md:text-4xl">Get instant access</h2>
            <p className="mt-4 text-sm text-hero-foreground/75">
              Join {course.studentsCount.toLocaleString()}+ students · lifetime access
            </p>
            <div className="mt-6">
              <PriceRow course={course} onDark />
            </div>
            <div className="mt-4">
              <Countdown onDark />
            </div>
          </div>
          <div className="mt-8 md:mt-0">
            <BuyButton course={course} size="lg" full />
          </div>
        </div>
      </section>
    </>
  );
}
