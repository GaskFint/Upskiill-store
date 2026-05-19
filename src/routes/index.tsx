import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faUserGraduate,
  faArrowsRotate,
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
  faStar,
  faShieldHalved,
  faGlobe,
  faCreditCard,
  faQuoteRight,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { Layout } from "@/components/site/Layout";
import { CourseCard } from "@/components/site/CourseCard";
import { courses } from "@/lib/courses";
import heroMock from "@/assets/hero-mock.png";
import qualityImg from "@/assets/quality-edu.jpg";
import ctaImg from "@/assets/cta-banner.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "upskiill — Learn. Earn. Upskill." },
      {
        name: "description",
        content:
          "Premium digital courses on AI, ChatGPT, automation, and video editing. Instant access, lifetime updates, from $19.",
      },
      { property: "og:title", content: "upskiill — Learn. Earn. Upskill." },
      {
        property: "og:description",
        content: "Premium digital courses. Instant access. Starting from $19.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <Layout headerDark>
      <Hero />
      <PopularCourses />
      <FeatureStrip />
      <QualitySection />
      <Testimonials />
      <HowItWorks />
      <CTABanner />
    </Layout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero text-hero-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div className="relative order-2 md:order-1">
          <div className="absolute -left-4 top-4 hidden h-64 w-44 rounded-2xl bg-primary md:block" />
          <div className="relative rounded-2xl">
            <img src={heroMock} alt="" className="relative w-full" />
          </div>
        </div>
        <div className="order-1 md:order-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-hero-foreground/80">
            <FontAwesomeIcon icon={faBolt} className="text-primary" /> Premium courses · instant access
          </span>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight md:text-6xl">
            Learn The Exact Digital Skills To{" "}
            <span className="text-primary">Build Automated Income Streams.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base text-hero-foreground/70">
            Master AI, automation, and content creation. We provide the exact, step-by-step blueprints to make money online, automate your work, and scale digital products from anywhere.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-hero-foreground/70">
            <span className="inline-flex items-center gap-2">
              <FontAwesomeIcon icon={faShieldHalved} className="text-primary" /> Secure checkout
            </span>
            <span className="inline-flex items-center gap-2">
              <FontAwesomeIcon icon={faBolt} className="text-primary" /> Instant delivery
            </span>
            <span className="inline-flex items-center gap-2">
              <FontAwesomeIcon icon={faGlobe} className="text-primary" /> Worldwide
            </span>
            <span className="inline-flex items-center gap-2">
              <FontAwesomeIcon icon={faCreditCard} className="text-primary" /> Apple & Google Pay
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureStrip() {
  const items = [
    { icon: faBolt, title: "Instant Access", body: "Course delivered to your inbox within 60 seconds of checkout." },
    { icon: faUserGraduate, title: "Expert-Curated", body: "Built by creators with real, measurable results in the field." },
    { icon: faArrowsRotate, title: "Lifetime Updates", body: "Every course gets free updates as the tools evolve." },
  ];
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
              Great<br />Deals For You
            </h2>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Hand-picked, conversion-tested digital courses at honest prices — no subscriptions, no upsells.
            </p>
            <div className="mt-5 flex gap-2">
              <button type="button" aria-label="Previous" className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground hover:bg-muted">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button type="button" aria-label="Next" className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground hover:bg-muted">
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </div>
          {items.map((it) => (
            <div key={it.title} className="rounded-2xl bg-card p-6 ring-1 ring-border">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-primary">
                <FontAwesomeIcon icon={it.icon} className="text-lg" />
              </div>
              <h3 className="mt-5 text-base font-bold text-foreground">{it.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function QualitySection() {
  return (
    <section id="how" className="bg-background py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2">
        <div className="overflow-hidden rounded-2xl">
          <img src={qualityImg} alt="Student learning online" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <h2 className="text-3xl font-extrabold leading-tight text-foreground md:text-4xl">
            Quality Education,<br /><span className="text-primary">Superior Human Results.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm text-muted-foreground">
            By connecting learners worldwide with the best operator-instructors, we help individuals turn modern skills into real income — without gatekeepers, subscriptions, or fluff.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-foreground">
            {[
              "Pay once, learn forever — no monthly fees",
              "Mobile-first lessons you can finish on the train",
              "Real case studies and templates, not just theory",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                  <FontAwesomeIcon icon={faStar} className="text-[10px]" />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <Link
            to="/courses"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Explore More <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function PopularCourses() {
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">Our most popular courses</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Built by operators who've actually done the thing — chosen by thousands of learners worldwide.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Explore More <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      quote:
        "upskiill is a really great site with really great people and the quality of content is excellent. Some of the best education in the world use this.",
      name: "Himura Adrwes",
      role: "CEO at Marika",
      logo: "airbnb",
    },
    {
      quote:
        "upskiill has consistently delivered above and beyond my expectations. Brilliant tutor work, incredible response time and a really friendly team.",
      name: "Angela Karamoy",
      role: "CEO at Eduka",
      logo: "shopify",
    },
  ];
  return (
    <section id="testimonials" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">What our students say?</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Follow these steps below to start using upskiill — and join thousands of learners earning new skills.
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous" className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground hover:bg-muted">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button type="button" aria-label="Next" className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground hover:bg-muted">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((t) => (
            <div key={t.name} className="relative rounded-2xl bg-card p-8 ring-1 ring-border">
              <FontAwesomeIcon icon={faQuoteRight} className="absolute right-6 top-6 text-2xl text-muted/50" />
              <div className="mb-4 flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-foreground">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-accent-soft text-sm font-bold text-primary">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Pick a course", body: "Browse our catalog — every course built for real-world results." },
    { n: "02", title: "Checkout in 60s", body: "Pay securely with card, Apple Pay, or Google Pay. No account needed." },
    { n: "03", title: "Start learning", body: "Instant Google Drive link in your inbox. Lifetime access, no subscription." },
  ];
  return (
    <section className="bg-surface py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-foreground md:text-4xl">From zero to learning in 60 seconds</h2>
          <p className="mt-3 text-sm text-muted-foreground">No accounts. No subscriptions. Just press buy, get the link, start learning.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl bg-card p-8 ring-1 ring-border">
              <div className="text-3xl font-extrabold text-primary">{s.n}</div>
              <h3 className="mt-3 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-0 overflow-hidden rounded-3xl bg-hero md:grid-cols-2">
          <div className="p-10 text-hero-foreground md:p-14">
            <h2 className="text-3xl font-extrabold md:text-4xl">Get More Info About Us</h2>
            <p className="mt-3 max-w-md text-sm text-hero-foreground/70">
              Got questions about a course? Want to know which one fits you best? Our team is one click away — we reply within hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Book Now
              </Link>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-hero-foreground/30 px-6 py-3 text-sm font-semibold text-hero-foreground hover:bg-hero-foreground/10"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="hidden h-full md:block">
            <img src={ctaImg} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
