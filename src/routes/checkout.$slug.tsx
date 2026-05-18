import { createFileRoute, notFound, Link, useNavigate } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLock,
  faShieldHalved,
  faBolt,
  faCreditCard,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcApplePay,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { Layout } from "@/components/site/Layout";
import { getCourse } from "@/lib/courses";
import { useState } from "react";

export const Route = createFileRoute("/checkout/$slug")({
  loader: ({ params }) => {
    const course = getCourse(params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.course ? `Checkout — ${loaderData.course.title}` : "Checkout — upskiill" },
      { name: "description", content: "Secure checkout. Pay once, get instant access." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { course } = Route.useLoaderData();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate({
        to: "/success",
        search: { slug: course.slug, email },
      });
    }, 700);
  };

  return (
    <Layout withFooter={false}>
      <section className="bg-surface py-12 md:py-20">
        <div className="mx-auto max-w-md px-6">
          <Link to="/courses/$slug" params={{ slug: course.slug }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to course
          </Link>
          <div className="mt-6 overflow-hidden rounded-2xl bg-card ring-1 ring-border">
            <div className="flex items-center gap-4 border-b border-border p-5">
              <img src={course.thumbnail} alt="" className="h-16 w-20 rounded-md object-cover" />
              <div className="flex-1">
                <h2 className="line-clamp-2 text-sm font-bold text-foreground">{course.title}</h2>
                <p className="text-xs text-muted-foreground">Instant delivery via email</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-extrabold text-foreground">${course.price}</div>
                <div className="text-xs text-muted-foreground line-through">${course.originalPrice}</div>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4 p-5">
              <Field label="Email address" icon={faEnvelope}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                />
              </Field>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md bg-foreground py-3 text-sm font-bold text-background hover:opacity-90"
              >
                <FontAwesomeIcon icon={faCcApplePay} className="text-base" /> Pay with Apple Pay
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background py-3 text-sm font-bold text-foreground hover:bg-muted"
              >
                <FontAwesomeIcon icon={faGoogle} /> Pay with Google Pay
              </button>

              <div className="flex items-center gap-3 py-1">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs uppercase tracking-wider text-muted-foreground">Or card</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <Field label="Card number" icon={faCreditCard}>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Expiry">
                  <input
                    type="text"
                    required
                    placeholder="MM / YY"
                    className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </Field>
                <Field label="CVC">
                  <input
                    type="text"
                    required
                    placeholder="123"
                    className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </Field>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Processing…" : `Pay $${course.price} — Get instant access`}
              </button>

              <div className="flex items-center justify-center gap-3 pt-2 text-xs text-muted-foreground">
                <FontAwesomeIcon icon={faLock} className="text-success" /> 256-bit SSL · Powered by Stripe
              </div>
              <div className="flex items-center justify-center gap-3 pt-1 text-xl text-muted-foreground/70">
                <FontAwesomeIcon icon={faCcVisa} />
                <FontAwesomeIcon icon={faCcMastercard} />
                <FontAwesomeIcon icon={faCcAmex} />
              </div>
            </form>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
            <span className="flex flex-col items-center gap-1"><FontAwesomeIcon icon={faShieldHalved} className="text-primary" /> 30-day refund</span>
            <span className="flex flex-col items-center gap-1"><FontAwesomeIcon icon={faBolt} className="text-primary" /> Instant access</span>
            <span className="flex flex-col items-center gap-1"><FontAwesomeIcon icon={faLock} className="text-primary" /> Secure checkout</span>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon?: typeof faEnvelope;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 focus-within:border-primary">
        {icon && <FontAwesomeIcon icon={icon} className="text-muted-foreground" />}
        {children}
      </div>
    </label>
  );
}