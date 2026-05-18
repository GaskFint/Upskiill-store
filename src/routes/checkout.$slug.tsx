import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLock,
  faShieldHalved,
  faBolt,
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
import { createCheckoutSession } from "@/lib/stripe.functions";
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
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const result = await createCheckoutSession({
        data: { slug: course.slug, email },
      });
      if (!result.ok || !result.url) {
        setError(result.ok ? "Missing checkout URL." : result.error);
        setLoading(false);
        return;
      }
      window.location.href = result.url;
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
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
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email address</span>
                <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 focus-within:border-primary">
                  <FontAwesomeIcon icon={faEnvelope} className="text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                  />
                </div>
              </label>

              <p className="text-xs text-muted-foreground">
                We'll send your course access link here right after payment.
              </p>

              <button
                type="submit"
                disabled={loading || !email}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Redirecting to Stripe…" : `Continue to payment — $${course.price}`}
              </button>

              {error && (
                <p className="text-center text-sm font-medium text-destructive">{error}</p>
              )}

              <div className="flex items-center justify-center gap-3 pt-2 text-xs text-muted-foreground">
                <FontAwesomeIcon icon={faLock} className="text-success" /> 256-bit SSL · Powered by Stripe
              </div>
              <div className="flex items-center justify-center gap-3 pt-1 text-xl text-muted-foreground/70">
                <FontAwesomeIcon icon={faCcVisa} />
                <FontAwesomeIcon icon={faCcMastercard} />
                <FontAwesomeIcon icon={faCcAmex} />
                <FontAwesomeIcon icon={faCcApplePay} />
                <FontAwesomeIcon icon={faGoogle} />
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
