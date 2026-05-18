import { createFileRoute, Link } from "@tanstack/react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faShareNodes, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Layout } from "@/components/site/Layout";
import { getCourse } from "@/lib/courses";

type Search = { slug?: string; email?: string };

export const Route = createFileRoute("/success")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    slug: typeof s.slug === "string" ? s.slug : undefined,
    email: typeof s.email === "string" ? s.email : undefined,
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
  const { slug, email } = Route.useSearch();
  const course = slug ? getCourse(slug) : undefined;

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