import { createFileRoute, notFound } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { CourseSalesPage } from "@/components/site/CourseSalesLayout";
import { StickyMobileBar } from "@/components/site/StickyMobileBar";
import { getCourse } from "@/lib/courses";

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
    <Layout headerDark>
      <CourseSalesPage course={course} />
      <StickyMobileBar course={course} />
    </Layout>
  );
}
