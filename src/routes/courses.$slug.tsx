import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faCircleCheck,
  faCircleXmark,
  faClock,
  faVideo,
  faMobileScreen,
  faInfinity,
  faShieldHalved,
  faBolt,
  faGlobe,
  faCreditCard,
  faChevronDown,
  faGift,
  faUserGraduate,
  faChartLine,
  faAward,
  faChevronRight,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcApplePay,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { Layout } from "@/components/site/Layout";
import { BuyButton } from "@/components/site/BuyButton";
import { Countdown } from "@/components/site/Countdown";
import { StickyMobileBar } from "@/components/site/StickyMobileBar";
import { getCourse, type Course } from "@/lib/courses";
import instructorImg from "@/assets/instructor.jpg";
import { useState } from "react";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.course;
    return {
      meta: c
        ? [
            { title: `${c.title} — upskiill` },
            { name: "description", content: c.tagline },
            { property: "og:title", content: c.title },
            { property: "og:description", content: c.tagline },
            { property: "og:image", content: c.thumbnail },
            { property: "og:type", content: "product" },
            { property: "og:url", content: `/courses/${c.slug}` },
          ]
        : [{ title: "Course — upskiill" }],
      links: c ? [{ rel: "canonical", href: `/courses/${c.slug}` }] : [],
    };
  },
  component: CoursePage,
});

function CoursePage() {
  const { course } = Route.useLoaderData();
  return (
    <Layout>
      <Hero course={course} />
      <ValueProps />
      <WhatsInside course={course} />
      <DetailsAndSticky course={course} />
      <Curriculum course={course} />
      <WhoFor course={course} />
      <Stats course={course} />
      <Instructor />
      <Reviews course={course} />
      <Comparison course={course} />
      <Bonuses course={course} />
      <Guarantee course={course} />
      <FAQ course={course} />
      <FinalCTA course={course} />
      <StickyMobileBar course={course} />
    </Layout>
  );
}

function Hero({ course }: { course: Course }) {
  const saved = course.originalPrice - course.price;
  return (
    <section className="bg-surface pt-10 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <nav className="mb-6 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
          <Link to="/courses" className="hover:text-foreground">Courses</Link>
          <FontAwesomeIcon icon={faChevronRight} className="text-[10px]" />
          <span className="text-foreground">{course.category}</span>
        </nav>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-accent-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              {course.category}
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
              {course.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{course.tagline}</p>
            <div className="mt-5 flex items-center gap-3 text-sm">
              <div className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              </div>
              <span className="font-bold text-foreground">{course.rating}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{course.studentsCount.toLocaleString()} students</span>
            </div>
            <div className="mt-8 flex flex-wrap items-baseline gap-3">
              <span className="text-5xl font-extrabold text-foreground">${course.price}</span>
              <span className="text-xl text-muted-foreground line-through">${course.originalPrice}</span>
              <span className="inline-flex rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">
                You save ${saved}
              </span>
            </div>
            <div className="mt-5">
              <Countdown />
            </div>
            <div className="mt-6">
              <BuyButton course={course} size="lg" full />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2"><FontAwesomeIcon icon={faShieldHalved} className="text-primary" /> Secure checkout</span>
              <span className="inline-flex items-center gap-2"><FontAwesomeIcon icon={faBolt} className="text-primary" /> Instant delivery</span>
              <span className="inline-flex items-center gap-2"><FontAwesomeIcon icon={faInfinity} className="text-primary" /> Lifetime access</span>
            </div>
            <div className="mt-4 flex items-center gap-3 text-2xl text-muted-foreground">
              <FontAwesomeIcon icon={faCcVisa} />
              <FontAwesomeIcon icon={faCcMastercard} />
              <FontAwesomeIcon icon={faCcAmex} />
              <FontAwesomeIcon icon={faCcApplePay} />
              <FontAwesomeIcon icon={faGoogle} />
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl ring-1 ring-border">
            <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueProps() {
  const items = [
    { icon: faBolt, label: "Instant Delivery" },
    { icon: faInfinity, label: "Lifetime Access" },
    { icon: faCircleXmark, label: "No Subscription" },
    { icon: faMobileScreen, label: "Mobile + Desktop" },
  ];
  return (
    <section className="border-y border-border bg-background py-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.label} className="flex items-center gap-3 rounded-xl bg-card p-4 ring-1 ring-border">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-primary">
              <FontAwesomeIcon icon={i.icon} />
            </span>
            <span className="text-sm font-semibold text-foreground">{i.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhatsInside({ course }: { course: Course }) {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">What's Inside</span>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            Everything you get with this course
          </h2>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {course.features.map((f) => (
            <li key={f} className="flex items-start gap-3 rounded-xl bg-card p-5 ring-1 ring-border">
              <FontAwesomeIcon icon={faCircleCheck} className="mt-1 text-lg text-primary" />
              <span className="text-sm text-foreground">{f}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10 text-center">
          <BuyButton course={course} size="lg" />
        </div>
      </div>
    </section>
  );
}

function DetailsAndSticky({ course }: { course: Course }) {
  const rows = [
    { icon: faVideo, label: "Format", value: "Video course + PDF guides" },
    { icon: faClock, label: "Duration", value: course.duration },
    { icon: faUserGraduate, label: "Level", value: course.level },
    { icon: faInfinity, label: "Access", value: "Lifetime, instant" },
    { icon: faBolt, label: "Delivery", value: "Google Drive via email" },
  ];
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">Course details</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{course.description}</p>
          <div className="mt-8 divide-y divide-border overflow-hidden rounded-2xl bg-card ring-1 ring-border">
            {rows.map((r) => (
              <div key={r.label} className="flex items-center gap-4 p-5">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-soft text-primary">
                  <FontAwesomeIcon icon={r.icon} />
                </span>
                <div className="flex-1">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{r.label}</div>
                  <div className="text-sm font-semibold text-foreground">{r.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl bg-card p-6 ring-1 ring-border shadow-lg">
            <img src={course.thumbnail} alt="" className="aspect-video w-full rounded-lg object-cover" />
            <div className="mt-5 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-foreground">${course.price}</span>
              <span className="text-muted-foreground line-through">${course.originalPrice}</span>
            </div>
            <div className="mt-3">
              <Countdown />
            </div>
            <div className="mt-5">
              <BuyButton course={course} full size="lg" />
            </div>
            <ul className="mt-5 space-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-2"><FontAwesomeIcon icon={faShieldHalved} className="text-success" /> 30-day money-back guarantee</li>
              <li className="flex items-center gap-2"><FontAwesomeIcon icon={faBolt} className="text-primary" /> Instant Drive link via email</li>
              <li className="flex items-center gap-2"><FontAwesomeIcon icon={faInfinity} className="text-primary" /> Lifetime updates included</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Curriculum({ course }: { course: Course }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Curriculum</span>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            {course.lessons} lessons across {course.curriculum.length} modules
          </h2>
        </div>
        <div className="mt-10 space-y-3">
          {course.curriculum.map((m, idx) => {
            const isOpen = open === idx;
            return (
              <div key={m.title} className="overflow-hidden rounded-2xl bg-card ring-1 ring-border">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-base font-bold text-foreground">{m.title}</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <ul className="space-y-2 border-t border-border bg-surface px-6 py-5">
                    {m.items.map((i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                        <FontAwesomeIcon icon={faCircleCheck} className="mt-1 text-primary" /> {i}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <BuyButton course={course} />
        </div>
      </div>
    </section>
  );
}

function WhoFor({ course }: { course: Course }) {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Who This Is For</span>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">Is this course right for you?</h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {course.personaFits.map((p) => (
            <div key={p} className="flex items-start gap-4 rounded-2xl bg-card p-6 ring-1 ring-border">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-primary">
                <FontAwesomeIcon icon={faUserGraduate} className="text-lg" />
              </span>
              <p className="text-sm font-medium text-foreground">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats({ course }: { course: Course }) {
  const stats = [
    { icon: faUserGraduate, value: `${course.studentsCount.toLocaleString()}+`, label: "Students enrolled" },
    { icon: faStar, value: `${course.rating}/5`, label: "Average rating" },
    { icon: faChartLine, value: "30 days", label: "Avg. to first result" },
    { icon: faGlobe, value: "60+", label: "Countries learning" },
  ];
  return (
    <section className="bg-hero py-16 text-hero-foreground">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <FontAwesomeIcon icon={s.icon} className="text-2xl text-primary" />
              <div className="mt-3 text-3xl font-extrabold">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-hero-foreground/60">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <BuyButton course={course} size="lg" />
        </div>
      </div>
    </section>
  );
}

function Instructor() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl ring-1 ring-border">
          <img src={instructorImg} alt="Instructor" loading="lazy" className="w-full" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Your Instructor</span>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            Taught by operators, not theorists.
          </h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Every upskiill course is built by someone who's actually done the work, earned the income, and shipped the
            results. You learn the exact systems they use, not recycled YouTube tips.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-foreground">
            {[
              { icon: faAward, t: "5+ years of hands-on operator experience" },
              { icon: faUserGraduate, t: "Trained 1,000+ students worldwide" },
              { icon: faChartLine, t: "Documented six-figure case studies" },
            ].map((i) => (
              <li key={i.t} className="flex items-center gap-3">
                <FontAwesomeIcon icon={i.icon} className="text-primary" />
                {i.t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Reviews({ course }: { course: Course }) {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Testimonials</span>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            Real students. Real results.
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {course.testimonials.map((t) => (
            <div key={t.name} className="relative rounded-2xl bg-card p-6 ring-1 ring-border">
              <FontAwesomeIcon icon={faQuoteRight} className="absolute right-5 top-5 text-xl text-muted/40" />
              <div className="mb-3 flex text-primary">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              </div>
              <p className="text-sm text-foreground">{t.quote}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-sm font-bold text-primary">
                  {t.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Comparison({ course }: { course: Course }) {
  const rows = [
    ["Proven, step-by-step system", "Random YouTube tutorials"],
    ["Plug-and-play templates", "Build from scratch every time"],
    ["Real case studies with numbers", "Vague advice"],
    ["Lifetime updates as tools evolve", "Outdated info within months"],
    ["30-day money-back guarantee", "Wasted hours, no refund"],
  ];
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Why upskiill</span>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">
            With upskiill vs. without
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-card p-6 ring-1 ring-primary/30 shadow-lg">
            <h3 className="mb-4 text-base font-bold text-foreground">With upskiill</h3>
            <ul className="space-y-3">
              {rows.map(([yes]) => (
                <li key={yes} className="flex items-start gap-3 text-sm text-foreground">
                  <FontAwesomeIcon icon={faCircleCheck} className="mt-1 text-success" /> {yes}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-card p-6 ring-1 ring-border">
            <h3 className="mb-4 text-base font-bold text-muted-foreground">Without upskiill</h3>
            <ul className="space-y-3">
              {rows.map(([, no]) => (
                <li key={no} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <FontAwesomeIcon icon={faCircleXmark} className="mt-1 text-destructive" /> {no}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 text-center">
          <BuyButton course={course} size="lg" />
        </div>
      </div>
    </section>
  );
}

function Bonuses({ course }: { course: Course }) {
  const total = course.bonuses.reduce((s, b) => s + b.value, 0);
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground">
            <FontAwesomeIcon icon={faGift} /> Free bonuses
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-foreground md:text-4xl">
            Get ${total} of bonuses — included free
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">Enroll today and unlock everything below at no extra cost.</p>
        </div>
        <div className="mt-10 space-y-4">
          {course.bonuses.map((b) => (
            <div key={b.title} className="flex items-center gap-5 rounded-2xl bg-card p-6 ring-1 ring-border">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-accent-soft text-primary">
                <FontAwesomeIcon icon={faGift} className="text-xl" />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="text-base font-bold text-foreground">{b.title}</h3>
                  <span className="text-xs text-muted-foreground line-through">${b.value} value</span>
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-xs font-bold text-success">FREE</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{b.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <BuyButton course={course} size="lg" />
        </div>
      </div>
    </section>
  );
}

function Guarantee({ course }: { course: Course }) {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center gap-8 rounded-3xl bg-hero p-10 text-center text-hero-foreground md:flex-row md:text-left">
          <FontAwesomeIcon icon={faShieldHalved} className="text-6xl text-primary" />
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold md:text-3xl">30-day money-back guarantee</h2>
            <p className="mt-3 text-sm text-hero-foreground/70">
              Try the entire course risk-free. If it doesn't deliver what you expected within 30 days, email us and we'll
              refund 100% — no forms, no friction, no awkward questions.
            </p>
          </div>
          <BuyButton course={course} size="lg" />
        </div>
      </div>
    </section>
  );
}

function FAQ({ course }: { course: Course }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="bg-surface py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">FAQ</span>
          <h2 className="mt-3 text-3xl font-extrabold text-foreground md:text-4xl">Questions, answered</h2>
        </div>
        <div className="mt-10 space-y-3">
          {course.faq.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div key={f.q} className="overflow-hidden rounded-2xl bg-card ring-1 ring-border">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left"
                >
                  <span className="text-sm font-bold text-foreground">{f.q}</span>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && <p className="border-t border-border px-6 py-5 text-sm text-muted-foreground">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ course }: { course: Course }) {
  const saved = course.originalPrice - course.price;
  return (
    <section className="bg-background py-20 pb-28 md:pb-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-primary">Last chance</span>
        <h2 className="mt-3 text-4xl font-extrabold leading-tight text-foreground md:text-5xl">
          Ready to start? <span className="text-primary">Get instant access now.</span>
        </h2>
        <p className="mt-4 text-base text-muted-foreground">
          Join {course.studentsCount.toLocaleString()}+ students already learning. Lifetime access. Instant Drive link.
        </p>
        <div className="mt-8 flex flex-wrap items-baseline justify-center gap-3">
          <span className="text-5xl font-extrabold text-foreground">${course.price}</span>
          <span className="text-xl text-muted-foreground line-through">${course.originalPrice}</span>
          <span className="rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">Save ${saved}</span>
        </div>
        <div className="mt-5 flex justify-center">
          <Countdown />
        </div>
        <div className="mt-8">
          <BuyButton course={course} size="lg" />
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2"><FontAwesomeIcon icon={faShieldHalved} className="text-success" /> 30-day refund</span>
          <span className="inline-flex items-center gap-2"><FontAwesomeIcon icon={faBolt} className="text-primary" /> Instant access</span>
          <span className="inline-flex items-center gap-2"><FontAwesomeIcon icon={faCreditCard} className="text-primary" /> Secure checkout</span>
        </div>
      </div>
    </section>
  );
}