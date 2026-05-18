import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { CourseCard } from "@/components/site/CourseCard";
import { courses } from "@/lib/courses";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "All Courses — upskiill" },
      {
        name: "description",
        content: "Browse every upskiill course. AI, ChatGPT, automation, and mobile video editing — from $19.",
      },
      { property: "og:title", content: "All Courses — upskiill" },
      { property: "og:description", content: "Premium digital courses, from $19. Instant access." },
      { property: "og:url", content: "/courses" },
    ],
    links: [{ rel: "canonical", href: "/courses" }],
  }),
  component: CoursesIndex,
});

function CoursesIndex() {
  return (
    <Layout>
      <section className="bg-surface py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Course Library</span>
            <h1 className="mt-3 text-4xl font-extrabold text-foreground md:text-5xl">
              Every course you need to <span className="text-primary">level up.</span>
            </h1>
            <p className="mt-4 text-base text-muted-foreground">
              Hand-picked digital courses built by operators with real, measurable results. Pay once, learn forever.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}