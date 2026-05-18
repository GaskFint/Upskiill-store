import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faShareNodes, faArrowRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Layout } from "@/components/site/Layout";
import { getCourse } from "@/lib/courses";
import { verifyCheckoutSession } from "@/lib/stripe.functions";
import { sendCoursePurchaseEmail } from "@/lib/email.functions";

type Search = { session_id?: string };

export const Route = createFileRoute("/success")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    session_id: typeof s.session_id === "string" ? s.session_id : undefined,
  }),
  head: () => ({
    meta: [
      { title: "You're in! — upskiill" },
      { name: "description", content: "Purchase complete. Check your email for instant access." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SuccessPage,
});

function SuccessPage() {
  const { session_id } = Route.useSearch();
  const [status, setStatus] = useState<"loading" | "ok" | "unpaid" | "error">("loading");
  const [slug, setSlug] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();

  useEffect(() => {
    if (!session_id) {
      setStatus("error");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const result = await verifyCheckoutSession({ data: { sessionId: session_id } });
        if (cancelled) return;
        if (!result.ok) {
          setStatus("error");
          return;
        }
        if (!result.paid) {
          setStatus("unpaid");
          return;
        }
        setSlug(result.slug);
        setEmail(result.email);
        setStatus("ok");
        // Fallback: also trigger the email here, in case the Stripe webhook
        // isn't wired up yet. The webhook is the authoritative path.
        if (result.slug && result.email) {
          sendCoursePurchaseEmail({
            data: { slug: result.slug, email: result.email },
          }).catch((err) => console.error("Fallback email failed:", err));
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [session_id]);

  const course = slug ? getCourse(slug) : undefined;

  if (status === "loading") {
    return (
      <Layout>
        <section className="bg-surface py-24">
          <div className="mx-auto max-w-md px-6 text-center">
            <FontAwesomeIcon icon={faSpinner} spin className="text-3xl text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">Confirming your payment…</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (status === "error" || status === "unpaid") {
    return (
      <Layout>
        <section className="bg-surface py-24">
          <div className="mx-auto max-w-md px-6 text-center">
            <h1 className="text-2xl font-bold text-foreground">We couldn't confirm your payment.</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {status === "unpaid"
                ? "Your payment hasn't been completed yet. If you were just charged, refresh in a few seconds."
                : "Something went wrong verifying your session. If you were charged, check your email — your access link is on the way."}
            </p>
            <Link to="/courses" className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
              Back to courses <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success/15">
            <FontAwesomeIcon icon={faCircleCheck} className="text-4xl text-success" />
          </div>
          <h1 className="mt-6 text-4xl font-extrabold text-foreground md:text-5xl">You're in! Check your email.</h1>
          <p className="mt-4 text-base text-muted-foreground">
            {email ? (
              <>We've sent your course access link to <span className="font-bold text-foreground">{email}</span>.</>
            ) : (
              "We've sent your course access link to your email."
            )}{" "}
            Check your spam folder if it doesn't arrive within 2 minutes.
          </p>

          {course && (
            <div className="mt-8 flex items-center gap-4 rounded-2xl bg-card p-5 text-left ring-1 ring-border">
              <img src={course.thumbnail} alt="" className="h-16 w-20 rounded-md object-cover" />
              <div className="flex-1">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Your course</div>
                <div className="text-sm font-bold text-foreground">{course.title}</div>
              </div>
            </div>
          )}

          <div className="mt-10 space-y-4 text-left">
            <h2 className="text-lg font-bold text-foreground">What happens next</h2>
            {[
              "Check your email for the Google Drive link.",
              "Open the link and save it to your Google Drive for permanent access.",
              "Start learning — lifetime access, no subscriptions, ever.",
            ].map((s, i) => (
              <div key={s} className="flex items-start gap-4 rounded-xl bg-card p-4 ring-1 ring-border">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {i + 1}
                </span>
                <p className="text-sm text-foreground">{s}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl bg-hero p-6 text-left text-hero-foreground md:p-8">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">While you learn</p>
              <h2 className="mt-2 text-xl font-extrabold leading-tight md:text-2xl">
                Meet Teyro — Duolingo for real-world skills
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-hero-foreground/75">
                A personalized, AI-driven platform built to help you actually finish and master skills — daily
                streaks, adaptive lessons, and real projects.
              </p>
              <a
                href="https://teyro.app"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Join the Teyro waitlist <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
              </a>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(window.location.origin)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-muted"
            >
              <FontAwesomeIcon icon={faShareNodes} /> Share upskiill
            </button>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Browse more courses <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
